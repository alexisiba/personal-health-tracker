import { Control, FieldValues, Path } from "react-hook-form";
import { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";

export interface AppDateInputProps<
  TFieldValues extends FieldValues,
> extends Omit<
  DatePickerInputProps,
  "label" | "mode" | "onChange" | "value" | "error"
> {
  control: Control<TFieldValues>;
  label: string;
  name: Path<TFieldValues>; // 'Path' restringe el string a solo llaves válidas del schema
  required?: boolean;
}
