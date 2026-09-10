import { AppButton } from "@/components/ui/AppButton";
import { AppDateInput } from "@/components/ui/AppDateInput";
import { AppQuantityUnitInput } from "@/components/ui/AppQuantityUnitInput";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { AppTimeInput } from "@/components/ui/AppTimeInput";
import spacing from "@/constants/spacing";
import { createMedication } from "@/db/queries/medications";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { DOSE_UNIT_KEYS, FREQUENCY_UNIT_KEYS } from "./Forms.constants";
import { scheduledFormSchema } from "./Forms.schema";
import { ScheduledFormData } from "./Forms.types";
import { combineDateAndTime } from "./Forms.utils";

export default function ScheduledMedicationForm() {
  const router = useRouter();
  const {
    t,
    i18n: { language: locale },
  } = useTranslation("medications");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ScheduledFormData>({
    resolver: zodResolver(scheduledFormSchema),
    defaultValues: {
      medicationName: "",
      doseQuantity: undefined,
      doseUnit: undefined,
      frequencyValue: undefined,
      frequencyUnit: undefined,
      firstDoseDate: undefined,
      firstDoseTime: undefined,
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

  const onSubmit = async (data: ScheduledFormData) => {
    try {
      await createMedication({
        type: "scheduled",
        name: data.medicationName,
        doseQuantity: data.doseQuantity,
        doseUnit: data.doseUnit,
        frequencyValue: data.frequencyValue,
        frequencyUnit: data.frequencyUnit,
        firstDoseDate: combineDateAndTime(data.firstDoseDate, data.firstDoseTime),
        endDate: data.endDate,
        prescribingDoctor: data.prescribingDoctor,
        notes: data.notes,
      });

      router.back();
    } catch {
      Alert.alert(
        t("scheduledForm.errors.saveFailedTitle"),
        t("scheduledForm.errors.saveFailedMessage"),
      );
    }
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
      <View style={styles.firstDoseRow}>
        <View style={styles.firstDoseField}>
          <AppDateInput
            control={control}
            name="firstDoseDate"
            label={t("scheduledForm.firstDoseDate.label")}
            inputMode="start"
            locale={locale}
            required
            testID="first-dose-date-input"
          />
        </View>
        <View style={styles.firstDoseField}>
          <AppTimeInput
            control={control}
            name="firstDoseTime"
            label={t("scheduledForm.firstDoseTime.label")}
            locale={locale}
            required
            testID="first-dose-time-input"
          />
        </View>
      </View>
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
      <AppButton
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {t("scheduledForm.submit")}
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  divider: { marginVertical: spacing.sm },
  sectionTitle: { marginBottom: spacing.xs },
  firstDoseRow: { flexDirection: "row", gap: spacing.sm },
  firstDoseField: { flex: 1 },
});
