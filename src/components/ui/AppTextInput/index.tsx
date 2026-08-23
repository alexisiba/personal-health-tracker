import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { appTextInputStyles } from "./AppTextInput.styles";
import { AppTextInputProps } from "./AppTextInput.types";

export default function AppTextInput({ label, ...props }: AppTextInputProps) {
  return (
    <View>
      <Text style={appTextInputStyles.label}>{label}</Text>
      <TextInput
        mode="outlined"
        outlineStyle={appTextInputStyles.outline}
        {...props}
      />
    </View>
  );
}
