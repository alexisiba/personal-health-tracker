import EmptyState from "@/components/shared/EmptyState";
import { AppSegmentedButtons } from "@/components/ui/AppSegmentedButtons";
import spacing from "@/constants/spacing";
import { findAllMedicationsQuery, markMedicationAsTaken } from "@/db/queries/medications";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { Text } from "react-native-paper";
import { NextMedicationCard } from "./components/NextMedicationCard";
import { FORM_OPTIONS } from "./Forms/Forms.constants";

export default function Medications() {
  const router = useRouter();
  const {
    t,
    i18n: { language: locale },
  } = useTranslation("medications");
  const { data: medications } = useLiveQuery(findAllMedicationsQuery());
  const [selectedType, setSelectedType] = useState<"scheduled" | "non-scheduled">(
    "scheduled",
  );

  const goToAddMedicationForm = () =>
    router.navigate("/(tabs)/medications/add-medication-form");

  const handleMarkAsTaken = async (id: number) => {
    try {
      await markMedicationAsTaken(id);
    } catch {
      Alert.alert(
        t("list.nextMedication.markAsTakenErrorTitle"),
        t("list.nextMedication.markAsTakenErrorMessage"),
      );
    }
  };

  if (medications.length === 0) {
    return (
      <View style={{ padding: spacing.lg }}>
        <EmptyState
          icon="medical-bag"
          title={t("list.empty.title")}
          description={t("list.empty.description")}
          actionLabel={t("list.empty.actionLabel")}
          onButtonPress={goToAddMedicationForm}
        />
      </View>
    );
  }

  const scheduledMedications = medications.filter(
    (medication) => medication.type === "scheduled",
  );
  const nonScheduledMedications = medications.filter(
    (medication) => medication.type === "non-scheduled",
  );

  // The real "which dose is coming up next" schedule computation doesn't
  // exist yet — as a placeholder, show the first scheduled medication using
  // its firstDoseDate as the next dose time.
  const nextMedication = scheduledMedications.find(
    (medication) => medication.firstDoseDate,
  );

  const today = new Date();
  const formattedDate = today.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View style={{ padding: spacing.lg }}>
      <Text
        variant="headlineSmall"
        style={{ fontWeight: "bold", marginBottom: spacing.lg, textTransform: "capitalize" }}
      >
        {formattedDate}
      </Text>
      <AppSegmentedButtons
        value={selectedType}
        onPress={(value) => setSelectedType(value as "scheduled" | "non-scheduled")}
        options={FORM_OPTIONS}
      />
      <View style={{ marginTop: spacing.xxl }}>
        {selectedType === "scheduled" ? (
          scheduledMedications.length === 0 ? (
            <EmptyState
              icon="calendar-clock"
              title={t("list.scheduledEmpty.title")}
              description={t("list.scheduledEmpty.description")}
              actionLabel={t("list.empty.actionLabel")}
              onButtonPress={goToAddMedicationForm}
            />
          ) : nextMedication ? (
            <View>
              <Text variant="titleLarge" style={{ fontWeight: "bold", marginBottom: spacing.sm }}>
                {t("list.nextMedication.heading")}
              </Text>
              <NextMedicationCard
                medication={nextMedication}
                nextDoseDate={nextMedication.nextDoseDate ?? nextMedication.firstDoseDate!}
                onMarkAsTaken={() => handleMarkAsTaken(nextMedication.id)}
              />
            </View>
          ) : null
        ) : nonScheduledMedications.length === 0 ? (
          <EmptyState
            icon="pill"
            title={t("list.nonScheduledEmpty.title")}
            description={t("list.nonScheduledEmpty.description")}
            actionLabel={t("list.empty.actionLabel")}
            onButtonPress={goToAddMedicationForm}
          />
        ) : (
          <Text>{t("list.nonScheduledPlaceholder")}</Text>
        )}
      </View>
    </View>
  );
}
