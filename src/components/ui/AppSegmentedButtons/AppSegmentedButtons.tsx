import spacing from "@/constants/spacing";
import { View } from "react-native";
import AppButton from "../AppButton";
import { appSegmentedButtonsStyles } from "./AppSegmentedButtons.styles";
import { AppSegmentedButtonsProps } from "./AppSegmentedButtons.types";

export function AppSegmentedButtons({
  options,
  value,
  onPress,
}: AppSegmentedButtonsProps) {
  return (
    <View style={appSegmentedButtonsStyles.container}>
      {options.map((button) => (
        <AppButton
          key={button.value}
          mode={button.value === value ? "contained" : "text"}
          style={{ flex: 1, borderRadius: spacing.sm }}
          onPress={() => onPress(button.value)}
        >
          {button.label}
        </AppButton>
      ))}
    </View>
  );
}
