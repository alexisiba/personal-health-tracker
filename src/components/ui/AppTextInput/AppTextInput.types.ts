import { TextInputProps } from "react-native-paper";

export interface AppTextInputProps extends Omit<
  TextInputProps,
  "label" | "mode"
> {
  label: string;
}
