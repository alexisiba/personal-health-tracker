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
import { DOSE_UNIT_KEYS } from "./Forms.constants";
import { nonScheduledFormSchema } from "./Forms.schema";
import { NonScheduledFormData } from "./Forms.types";

export default function NonScheduledMedicationForm() {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation("medications");

  const { control, handleSubmit } = useForm<NonScheduledFormData>({
    resolver: zodResolver(nonScheduledFormSchema),
    defaultValues: {
      medicationName: "",
      doseQuantity: undefined,
      doseUnit: "",
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

  const onSubmit = (data: NonScheduledFormData) => {
    console.log("Datos validados y listos:", data);
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        control={control}
        name="medicationName"
        label={t("nonScheduledForm.medicationName.label")}
        placeholder={t("nonScheduledForm.medicationName.placeholder")}
        required
        outlineStyle={{ borderColor: "lightgray" }}
        testID="medication-name-input"
      />
      <AppQuantityUnitInput
        control={control}
        quantityName="doseQuantity"
        unitName="doseUnit"
        label={t("nonScheduledForm.dose.label")}
        quantityPlaceholder={t("nonScheduledForm.dose.quantityPlaceholder")}
        required
        options={doseUnitOptions}
        testID="dose"
      />
      <AppDateInput
        control={control}
        name="endDate"
        label={t("nonScheduledForm.endDate.label")}
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
        {t("nonScheduledForm.additionalDetails.title")}
      </Text>
      <AppTextInput
        control={control}
        name="prescribingDoctor"
        label={t("nonScheduledForm.prescribingDoctor.label")}
        placeholder={t("nonScheduledForm.prescribingDoctor.placeholder")}
        outlineStyle={{ borderColor: "lightgray" }}
        testID="prescribing-doctor-input"
      />
      <AppTextInput
        control={control}
        name="notes"
        label={t("nonScheduledForm.notes.label")}
        outlineStyle={{ borderColor: "lightgray" }}
        testID="notes-input"
      />
      <AppButton mode="contained" onPress={handleSubmit(onSubmit)}>
        {t("nonScheduledForm.submit")}
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  divider: { marginVertical: spacing.sm },
  sectionTitle: { marginBottom: spacing.xs },
});
