import { AppButton } from "@/components/ui/AppButton";
import { AppQuantityUnitInput } from "@/components/ui/AppQuantityUnitInput";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { DOSE_UNIT_KEYS } from "./Forms.constants";
import { scheduledFormSchema } from "./Forms.schema";
import { ScheduledFormData } from "./Forms.types";

export default function ScheduledMedicationForm() {
  const { t } = useTranslation("medications");

  const { control, handleSubmit } = useForm<ScheduledFormData>({
    resolver: zodResolver(scheduledFormSchema),
    defaultValues: {
      medicationName: "",
      doseQuantity: undefined,
      doseUnit: "",
      frequencyValue: undefined,
      frequencyUnit: "",
      firstDoseDate: undefined,
      firstDoseTime: undefined,
      routeOfAdministration: "",
      endDate: undefined,
      notes: "",
    },
  });

  const doseQuantity = useWatch({ control, name: "doseQuantity" });
  const doseUnitOptions = DOSE_UNIT_KEYS.map((key) => ({
    label: t(`doseUnits.${key}`, { count: doseQuantity ?? 1 }),
    value: key,
  }));

  const onSubmit = (data: ScheduledFormData) => {
    console.log("Datos validados y listos:", data);
  };
  return (
    <View>
      <AppTextInput
        control={control}
        name="medicationName"
        label="Nombre del medicamento:"
        placeholder="Eg: Paracetamol"
        outlineStyle={{ borderColor: "lightgray" }}
      />
      <AppQuantityUnitInput
        control={control}
        quantityName="doseQuantity"
        unitName="doseUnit"
        label="Dosis indicada por el medico:"
        quantityPlaceholder="Eg: 1"
        options={doseUnitOptions}
      />
      <AppButton mode="contained" onPress={handleSubmit(onSubmit)}>
        Registrar medicamento
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({});
