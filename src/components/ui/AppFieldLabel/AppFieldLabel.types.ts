import { StyleProp, TextStyle } from "react-native";

export interface AppFieldLabelProps {
  label: string;
  required?: boolean;
  style?: StyleProp<TextStyle>;
}
