import { MaterialDesignIconsIconName } from "@react-native-vector-icons/material-design-icons";

export interface EmptyStateProps {
  icon: MaterialDesignIconsIconName;
  title: string;
  description: string;
  actionLabel: string;
  onButtonPress: () => void;
}
