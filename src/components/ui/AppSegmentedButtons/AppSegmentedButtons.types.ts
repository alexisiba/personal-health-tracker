export interface AppSegmentedButtonsOption {
  label: string;
  value: string | number;
}

export interface AppSegmentedButtonsProps {
  options: AppSegmentedButtonsOption[];
  value: string | number;
  onPress: (value: string | number) => void;
}
