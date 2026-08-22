import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { appTextInputStyles } from "./AppTextInput.styles";
import { AppTextInputProps } from "./AppTextInput.types";

export default function AppTextInput({ label, ...props }: AppTextInputProps) {
  return (
    <View style={appTextInputStyles.inputContainer}>
      <Text style={appTextInputStyles.label}>{label}</Text>
      <TextInput
        mode="outlined"
        outlineStyle={{ borderColor: "lightgray" }}
        {...props}
      />
    </View>
  );
}
