import { Control, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native-paper";

export interface AppTextInputProps<
  TFieldValues extends FieldValues,
> extends Omit<
  TextInputProps,
  "label" | "mode" | "onChangeText" | "value" | "error"
> {
  control: Control<TFieldValues>;
  label: string;
  name: Path<TFieldValues>; // 'Path' restringe el string a solo llaves válidas del schema
}
