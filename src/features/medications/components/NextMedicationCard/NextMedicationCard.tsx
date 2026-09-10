import { AppButton } from "@/components/ui/AppButton";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/Card/CardHeader";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { nextMedicationCardStyles } from "./NextMedicationCard.styles";
import { NextMedicationCardProps } from "./NextMedicationCard.types";
import { formatDoseTime } from "./NextMedicationCard.utils";

export function NextMedicationCard({
  medication,
  nextDoseDate,
  onMarkAsTaken,
}: NextMedicationCardProps) {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation("medications");

  const doseUnitLabel = t(`doseUnits.${medication.doseUnit}`, {
    count: medication.doseQuantity,
  });
  const typeLabel = t(
    `addMedicationForm.options.${medication.type === "scheduled" ? "scheduled" : "nonScheduled"}`,
  );

  return (
    <Card>
      <CardHeader>
        <View style={nextMedicationCardStyles.headerRow}>
          <View>
            <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
              {medication.name}
            </Text>
            <Text style={nextMedicationCardStyles.doseText}>
              {medication.doseQuantity} {doseUnitLabel}
            </Text>
          </View>
          <Text style={nextMedicationCardStyles.typeText}>{typeLabel}</Text>
        </View>
      </CardHeader>
      <View style={nextMedicationCardStyles.nextDoseRow}>
        <View>
          <Text style={nextMedicationCardStyles.nextDoseLabel}>
            {t("list.nextMedication.nextDoseLabel")}
          </Text>
          <Text variant="titleLarge" style={nextMedicationCardStyles.nextDoseTime}>
            {formatDoseTime(nextDoseDate, locale)}
          </Text>
        </View>
        <AppButton mode="contained" onPress={onMarkAsTaken}>
          {t("list.nextMedication.markAsTakenLabel")}
        </AppButton>
      </View>
    </Card>
  );
}
