import { DropdownProps } from "react-native-paper-dropdown";

export interface AppDropdownProps extends Omit<
  DropdownProps,
  "label" | "mode"
> {
  label: string;
}
