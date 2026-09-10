import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const asNeededMedicationCardStyles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  doseText: {
    color: colors.gray700,
    fontSize: 18,
    marginTop: spacing.xs,
  },
  typeText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  lastDoseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastDoseLabel: {
    color: colors.gray700,
  },
  lastDoseValue: {
    fontWeight: "bold",
    color: colors.primary,
  },
});
