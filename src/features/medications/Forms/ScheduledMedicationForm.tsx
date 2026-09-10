import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { scheduledFormSchema } from "./Forms.schema";
import { ScheduledFormData } from "./Forms.types";
import AppButton from "@/components/ui/AppButton";
import AppTextInput from "@/components/ui/AppTextInput";
import { Text, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";

export default function ScheduledMedicationForm() {
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
      <View style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
        <Text>Dosis indicada por el medico:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="Eg: 1"
            mode="outlined"
            outlineStyle={{
              borderRadius: 0,
              borderTopLeftRadius: spacing.xs,
              borderBottomLeftRadius: spacing.xs,
              borderColor: colors.gray400,
              borderRightWidth: 0,
            }}
          />
          <Dropdown
            value="hours"
            options={[
              {
                label: "Horas",
                value: "hours",
              },
              {
                label: "Días",
                value: "days",
              },
            ]}
            CustomDropdownInput={(innerProps) => (
              <TextInput
                {...innerProps}
                mode="outlined"
                outlineStyle={{
                  borderColor: colors.gray400,
                  borderRadius: 0,
                  borderTopRightRadius: spacing.xs,
                  borderBottomRightRadius: spacing.xs,
                  borderLeftWidth: 0,
                  paddingVertical: spacing.xs
                }}
                contentStyle={{borderLeftWidth: 1, borderLeftColor: colors.gray200, paddingVertical: spacing.xs}}
                right={<TextInput.Icon icon="menu-down" />}
              />
            )}
          />
        </View>
      </View>
      <AppButton mode="contained" onPress={handleSubmit(onSubmit)}>
        Registrar medicamento
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({});
