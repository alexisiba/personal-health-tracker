import { Control, FieldValues, Path } from "react-hook-form";

export interface AppTimeInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  label: string;
  name: Path<TFieldValues>; // 'Path' restringe el string a solo llaves válidas del schema
  required?: boolean;
  locale?: string;
  testID?: string;
}
