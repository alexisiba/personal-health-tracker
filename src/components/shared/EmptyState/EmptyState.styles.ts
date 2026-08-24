import { colors, spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const emptyStateStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    padding: spacing.huge,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: spacing.huge * 2,
    backgroundColor: colors.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: spacing.huge,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  description: {
    color: colors.gray700,
    marginBottom: spacing.xxl,
    textAlign: "center",
  },
});
