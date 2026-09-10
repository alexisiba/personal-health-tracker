import { Text, TextInput, View } from "react-native";
import { appTextInputSuffixStyles } from "./AppTextInputSuffix.styles";
import { AppTextInputSuffixProps } from "./AppTextInputSuffix.types";

export function AppTextInputSuffix({
  text,
  renderProps,
}: AppTextInputSuffixProps) {
  return (
    <View style={appTextInputSuffixStyles.container}>
      <TextInput
        {...renderProps}
        style={[renderProps.style, appTextInputSuffixStyles.textInput]}
      />
      <Text style={appTextInputSuffixStyles.suffix}>{text}</Text>
    </View>
  );
}
