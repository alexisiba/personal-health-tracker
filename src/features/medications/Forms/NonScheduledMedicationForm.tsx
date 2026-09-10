import { AppButton } from "@/components/ui/AppButton";
import { AppDateInput } from "@/components/ui/AppDateInput";
import { AppQuantityUnitInput } from "@/components/ui/AppQuantityUnitInput";
import { AppTextInput } from "@/components/ui/AppTextInput";
import spacing from "@/constants/spacing";
import { createMedication } from "@/db/queries/medications";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { DOSE_UNIT_KEYS } from "./Forms.constants";
import { nonScheduledFormSchema } from "./Forms.schema";
import { NonScheduledFormData } from "./Forms.types";

export default function NonScheduledMedicationForm() {
  const router = useRouter();
  const {
    t,
    i18n: { language: locale },
  } = useTranslation("medications");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NonScheduledFormData>({
    resolver: zodResolver(nonScheduledFormSchema),
    defaultValues: {
      medicationName: "",
      doseQuantity: undefined,
      doseUnit: undefined,
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

  const onSubmit = async (data: NonScheduledFormData) => {
    try {
      await createMedication({
        type: "non-scheduled",
        name: data.medicationName,
        doseQuantity: data.doseQuantity,
        doseUnit: data.doseUnit,
        endDate: data.endDate,
        prescribingDoctor: data.prescribingDoctor,
        notes: data.notes,
      });

      router.back();
    } catch {
      Alert.alert(
        t("nonScheduledForm.errors.saveFailedTitle"),
        t("nonScheduledForm.errors.saveFailedMessage"),
      );
    }
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
      <AppButton
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
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
