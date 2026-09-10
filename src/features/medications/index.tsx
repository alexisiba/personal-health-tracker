import EmptyState from "@/components/shared/EmptyState";
import { AppSegmentedButtons } from "@/components/ui/AppSegmentedButtons";
import spacing from "@/constants/spacing";
import { findAllMedicationsQuery, markMedicationAsTaken } from "@/db/queries/medications";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { AsNeededMedicationCard } from "./components/AsNeededMedicationCard";
import { NextMedicationCard } from "./components/NextMedicationCard";
import { FORM_OPTIONS } from "./Forms/Forms.constants";
import { getUpcomingAsNeededMedications, getUpcomingScheduledMedications } from "./Medications.helpers";

export default function Medications() {
  const router = useRouter();
  const {
    t,
    i18n: { language: locale },
  } = useTranslation("medications");
  const { data: medications, updatedAt } = useLiveQuery(findAllMedicationsQuery());
  const [selectedType, setSelectedType] = useState<"scheduled" | "non-scheduled">(
    "scheduled",
  );

  const goToAddMedicationForm = () =>
    router.navigate("/(tabs)/medications/add-medication-form");

  const handleMarkAsTaken = async (id: number) => {
    try {
      await markMedicationAsTaken(id);
    } catch {
      Alert.alert(t("list.markAsTakenErrorTitle"), t("list.markAsTakenErrorMessage"));
    }
  };

  // Wait for the first read so we don't briefly flash the empty state for
  // medications that do exist, before the query has resolved.
  if (!updatedAt) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator accessibilityLabel={t("list.loading")} />
      </View>
    );
  }

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

  const upcomingScheduledMedications = getUpcomingScheduledMedications(scheduledMedications);
  const upcomingAsNeededMedications = getUpcomingAsNeededMedications(nonScheduledMedications);

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
          ) : upcomingScheduledMedications.length > 0 ? (
            <View>
              <Text variant="titleLarge" style={{ fontWeight: "bold", marginBottom: spacing.sm }}>
                {t("list.nextMedication.heading")}
              </Text>
              <View style={{ gap: spacing.sm }}>
                {upcomingScheduledMedications.map((medication) => (
                  <NextMedicationCard
                    key={medication.id}
                    medication={medication}
                    nextDoseDate={medication.nextDoseDate ?? medication.firstDoseDate!}
                    onMarkAsTaken={() => handleMarkAsTaken(medication.id)}
                  />
                ))}
              </View>
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
          <View style={{ gap: spacing.sm }}>
            {upcomingAsNeededMedications.map((medication) => (
              <AsNeededMedicationCard
                key={medication.id}
                medication={medication}
                onMarkAsTaken={() => handleMarkAsTaken(medication.id)}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
