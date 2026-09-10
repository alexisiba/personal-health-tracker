import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const appDropdownStyles = StyleSheet.create({
  label: { marginBottom: 5 },
  outline: { borderColor: colors.gray400 },
  outlineError: { borderColor: colors.error },
});
