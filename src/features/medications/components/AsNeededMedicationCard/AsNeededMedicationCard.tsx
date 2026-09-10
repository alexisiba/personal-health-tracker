import { AppButton } from "@/components/ui/AppButton";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/Card/CardHeader";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { asNeededMedicationCardStyles } from "./AsNeededMedicationCard.styles";
import { AsNeededMedicationCardProps } from "./AsNeededMedicationCard.types";
import { formatLastDoseDate } from "./AsNeededMedicationCard.utils";

export function AsNeededMedicationCard({
  medication,
  onMarkAsTaken,
}: AsNeededMedicationCardProps) {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation(["medications", "common"]);

  const doseUnitLabel = t(`doseUnits.${medication.doseUnit}`, {
    count: medication.doseQuantity,
  });
  const typeLabel = t("addMedicationForm.options.nonScheduled");
  const lastDoseValue = medication.lastTakenAt
    ? formatLastDoseDate(medication.lastTakenAt, locale, t)
    : t("list.asNeededMedication.noLastDoseValue");

  return (
    <Card>
      <CardHeader>
        <View style={asNeededMedicationCardStyles.headerRow}>
          <View>
            <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
              {medication.name}
            </Text>
            <Text style={asNeededMedicationCardStyles.doseText}>
              {medication.doseQuantity} {doseUnitLabel}
            </Text>
          </View>
          <Text style={asNeededMedicationCardStyles.typeText}>{typeLabel}</Text>
        </View>
      </CardHeader>
      <View style={asNeededMedicationCardStyles.lastDoseRow}>
        <View>
          <Text style={asNeededMedicationCardStyles.lastDoseLabel}>
            {t("list.asNeededMedication.lastDoseLabel")}
          </Text>
          <Text variant="titleLarge" style={asNeededMedicationCardStyles.lastDoseValue}>
            {lastDoseValue}
          </Text>
        </View>
        <AppButton mode="contained" onPress={onMarkAsTaken}>
          {t("list.markAsTakenLabel")}
        </AppButton>
      </View>
    </Card>
  );
}
