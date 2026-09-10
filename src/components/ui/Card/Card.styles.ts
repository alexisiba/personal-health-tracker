import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: spacing.sm,
    borderColor: colors.gray200,
    borderWidth: 1,
    borderLeftColor: colors.primary,
    borderLeftWidth: spacing.xs,
  },
  header: {
    paddingBottom: spacing.md,
    borderBottomColor: colors.gray200,
    borderBottomWidth: 1,
    marginBottom: spacing.md,
  },
});
