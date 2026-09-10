import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const nextMedicationCardStyles = StyleSheet.create({
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
  nextDoseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextDoseLabel: {
    color: colors.gray700,
  },
  nextDoseTime: {
    fontWeight: "bold",
    color: colors.primary,
  },
});
