import { colors, spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const appSegmentedButtonsStyles = StyleSheet.create({
  container: {
    padding: spacing.xs,
    backgroundColor: colors.surfaceContainerHighest,
    flexDirection: "row",
    borderRadius: spacing.sm,
  },
});
