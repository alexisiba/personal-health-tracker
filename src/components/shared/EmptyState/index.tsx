import AppButton from "@/components/ui/AppButton";
import colors from "@/constants/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { emptyStateStyles } from "./EmptyState.styles";
import { EmptyStateProps } from "./EmptyState.types";

export default function EmptyState({
  actionLabel,
  description,
  icon,
  title,
  onButtonPress,
}: EmptyStateProps) {
  return (
    <View style={emptyStateStyles.container}>
      <View style={emptyStateStyles.iconContainer}>
        <MaterialDesignIcons
          name={icon}
          color={colors.primaryContainer}
          size={60}
        />
      </View>
      <Text variant="headlineMedium" style={emptyStateStyles.title}>
        {title}
      </Text>
      <Text variant="bodyLarge" style={emptyStateStyles.description}>
        {description}
      </Text>
      <AppButton icon="plus" mode="contained" onPress={onButtonPress}>
        {actionLabel}
      </AppButton>
    </View>
  );
}
