import { Control, FieldValues, Path } from "react-hook-form";
import { DropdownProps } from "react-native-paper-dropdown";

export interface AppDropdownProps<
  TFieldValues extends FieldValues,
> extends Omit<
  DropdownProps,
  "label" | "mode" | "onSelect" | "value" | "error"
> {
  control: Control<TFieldValues>;
  label: string;
  name: Path<TFieldValues>; // 'Path' restringe el string a solo llaves válidas del schema
  required?: boolean;
}
