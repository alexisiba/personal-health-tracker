import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const appSegmentedButtonsStyles = StyleSheet.create({
  container: {
    padding: spacing.xs,
    backgroundColor: colors.surfaceContainerHighest,
    flexDirection: "row",
    borderRadius: spacing.sm,
  },
});
