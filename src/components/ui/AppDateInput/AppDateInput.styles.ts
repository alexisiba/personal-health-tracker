import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const appDateInputStyles = StyleSheet.create({
  outline: { borderColor: colors.gray400 },
  outlineError: { borderColor: colors.error, borderWidth: 2 },
});
