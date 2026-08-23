import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";

export interface AppDateInputProps extends Omit<
  DatePickerInputProps,
  "label" | "mode"
> {
  label: string;
}
