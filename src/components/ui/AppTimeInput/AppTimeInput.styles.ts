import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const appTimeInputStyles = StyleSheet.create({
  label: { marginBottom: 6 },
  outline: { borderColor: colors.gray400 },
  outlineError: { borderColor: colors.error, borderWidth: 2 },
  // Matches react-native-paper's MD3 outlined TextInput min height, so the
  // trigger lines up with sibling fields (e.g. AppDateInput) at the same height.
  trigger: { height: 50 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  timeField: {
    width: 80,
    textAlign: "center",
  },
  separator: {
    fontSize: 24,
    fontWeight: "bold",
  },
  fieldCaption: {
    textAlign: "center",
    color: colors.gray700,
    marginTop: spacing.xs,
  },
  column: {
    alignItems: "center",
  },
  periodRow: {
    marginTop: spacing.lg,
    alignSelf: "center",
    width: 180,
  },
});
