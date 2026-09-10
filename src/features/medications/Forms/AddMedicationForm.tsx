import AppButton from "@/components/ui/AppButton";
import AppSegmentedButtons from "@/components/ui/AppSegmentedButtons";
import { colors, spacing } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { FORM_OPTIONS } from "./Forms.constants";
import ScheduledMedicationForm from "./ScheduledMedicationForm";
import NonScheduledMedicationForm from "./NonScheduledMedicationForm";

export default function AddMedicationForm() {
  const [formSelected, setFormSelected] = useState("scheduled");
  return (
    <View style={{ padding: spacing.xl }}>
      <Text variant="bodyLarge">Como debe tomar este medicamento ?</Text>
      <AppSegmentedButtons
        value={formSelected}
        onPress={(selectedValue) => setFormSelected(selectedValue as string)}
        options={FORM_OPTIONS}
      />
      <View
        style={{
          marginTop: spacing.xxl,
          backgroundColor: colors.white,
          padding: spacing.md,
          borderWidth: 1,
          borderColor: colors.gray200,
          borderRadius: spacing.sm,
        }}
      >
        {formSelected === "scheduled" ? (
          <ScheduledMedicationForm />
        ) : (
          <NonScheduledMedicationForm />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
