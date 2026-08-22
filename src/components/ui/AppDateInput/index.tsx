import { StyleSheet, Text, View } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";

interface AppDateInputProps extends Omit<
  DatePickerInputProps,
  "label" | "mode"
> {
  label: string;
}

export default function AppDateInput({ label, ...props }: AppDateInputProps) {
  return (
    <View>
      <Text>{label}</Text>
      <DatePickerInput
        mode="outlined"
        outlineStyle={{ borderColor: "lightgray" }}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
