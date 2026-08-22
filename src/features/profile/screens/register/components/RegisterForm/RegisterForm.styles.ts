import { colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const registerFormStyles = StyleSheet.create({
  formContainer: { padding: 20, backgroundColor: "white", borderRadius: 10 },
  profileImageButtonContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignSelf: "center",
  },
  profileImageButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors["inverse-primary"],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headContainer: { paddingVertical: 20 },
  headTitle: { marginBottom: 10, textAlign: "center" },
  headDescription: { textAlign: "center" },
  form: { paddingVertical: 20, gap: 20 },
});
