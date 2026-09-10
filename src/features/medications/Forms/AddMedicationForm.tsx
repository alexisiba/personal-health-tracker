import { AppSegmentedButtons } from "@/components/ui/AppSegmentedButtons";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { FORM_OPTIONS } from "./Forms.constants";
import NonScheduledMedicationForm from "./NonScheduledMedicationForm";
import ScheduledMedicationForm from "./ScheduledMedicationForm";

export default function AddMedicationForm() {
  const { t } = useTranslation("medications");
  const [formSelected, setFormSelected] = useState("scheduled");

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <Text variant="bodyLarge">{t("addMedicationForm.question")}</Text>
      <AppSegmentedButtons
        value={formSelected}
        onPress={(selectedValue) => setFormSelected(selectedValue as string)}
        options={FORM_OPTIONS}
      />
      <View style={styles.formContainer}>
        {formSelected === "scheduled" ? (
          <ScheduledMedicationForm />
        ) : (
          <NonScheduledMedicationForm />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: spacing.xl },
  formContainer: {
    marginTop: spacing.xxl,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: spacing.sm,
  },
});
