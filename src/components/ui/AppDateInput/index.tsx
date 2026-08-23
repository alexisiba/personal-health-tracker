import { Text, View } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { appDateInputStyles } from "./AppDateInput.styles";
import { AppDateInputProps } from "./AppDateInput.types";

export default function AppDateInput({ label, ...props }: AppDateInputProps) {
  return (
    <View>
      <Text>{label}</Text>
      <DatePickerInput
        mode="outlined"
        outlineStyle={appDateInputStyles.outline}
        {...props}
      />
    </View>
  );
}
