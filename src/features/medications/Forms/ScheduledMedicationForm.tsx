import { AppButton } from "@/components/ui/AppButton";
import { AppDateInput } from "@/components/ui/AppDateInput";
import { AppQuantityUnitInput } from "@/components/ui/AppQuantityUnitInput";
import { AppTextInput } from "@/components/ui/AppTextInput";
import spacing from "@/constants/spacing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { DOSE_UNIT_KEYS, FREQUENCY_UNIT_KEYS } from "./Forms.constants";
import { scheduledFormSchema } from "./Forms.schema";
import { ScheduledFormData } from "./Forms.types";

export default function ScheduledMedicationForm() {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation("medications");

  const { control, handleSubmit } = useForm<ScheduledFormData>({
    resolver: zodResolver(scheduledFormSchema),
    defaultValues: {
      medicationName: "",
      doseQuantity: undefined,
      doseUnit: "",
      frequencyValue: undefined,
      frequencyUnit: "",
      firstDoseDate: undefined,
      endDate: undefined,
      prescribingDoctor: "",
      notes: "",
    },
  });

  const doseQuantity = useWatch({ control, name: "doseQuantity" });
  const doseUnitOptions = DOSE_UNIT_KEYS.map((key) => ({
    label: t(`doseUnits.${key}`, { count: doseQuantity ?? 1 }),
    value: key,
  }));

  const frequencyValue = useWatch({ control, name: "frequencyValue" });
  const frequencyUnitOptions = FREQUENCY_UNIT_KEYS.map((key) => ({
    label: t(`frequencyUnits.${key}`, { count: frequencyValue ?? 1 }),
    value: key,
  }));

  const onSubmit = (data: ScheduledFormData) => {
    console.log("Datos validados y listos:", data);
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        control={control}
        name="medicationName"
        label={t("scheduledForm.medicationName.label")}
        placeholder={t("scheduledForm.medicationName.placeholder")}
        required
        outlineStyle={{ borderColor: "lightgray" }}
        testID="medication-name-input"
      />
      <AppQuantityUnitInput
        control={control}
        quantityName="doseQuantity"
        unitName="doseUnit"
        label={t("scheduledForm.dose.label")}
        quantityPlaceholder={t("scheduledForm.dose.quantityPlaceholder")}
        required
        options={doseUnitOptions}
        testID="dose"
      />
      <AppQuantityUnitInput
        control={control}
        quantityName="frequencyValue"
        unitName="frequencyUnit"
        label={t("scheduledForm.frequency.label")}
        quantityPlaceholder={t("scheduledForm.frequency.quantityPlaceholder")}
        required
        options={frequencyUnitOptions}
        testID="frequency"
      />
      <AppDateInput
        control={control}
        name="firstDoseDate"
        label={t("scheduledForm.firstDoseDate.label")}
        inputMode="start"
        locale={locale}
        required
        testID="first-dose-date-input"
      />
      <AppDateInput
        control={control}
        name="endDate"
        label={t("scheduledForm.endDate.label")}
        inputMode="start"
        locale={locale}
        testID="end-date-input"
      />
      <Divider style={styles.divider} />
      <Text
        variant="titleSmall"
        accessibilityRole="header"
        style={styles.sectionTitle}
      >
        {t("scheduledForm.additionalDetails.title")}
      </Text>
      <AppTextInput
        control={control}
        name="prescribingDoctor"
        label={t("scheduledForm.prescribingDoctor.label")}
        placeholder={t("scheduledForm.prescribingDoctor.placeholder")}
        outlineStyle={{ borderColor: "lightgray" }}
        testID="prescribing-doctor-input"
      />
      <AppTextInput
        control={control}
        name="notes"
        label={t("scheduledForm.notes.label")}
        outlineStyle={{ borderColor: "lightgray" }}
        testID="notes-input"
      />
      <AppButton mode="contained" onPress={handleSubmit(onSubmit)}>
        {t("scheduledForm.submit")}
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  divider: { marginVertical: spacing.sm },
  sectionTitle: { marginBottom: spacing.xs },
});
