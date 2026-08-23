import { StyleSheet } from "react-native";

export const appTextInputSuffixStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  textInput: { flex: 1, paddingRight: 5 },
  suffix: { color: "gray", fontSize: 16 },
});
