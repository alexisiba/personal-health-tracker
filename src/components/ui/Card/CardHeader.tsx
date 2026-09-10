import { StyleProp, View, ViewStyle } from "react-native";
import { JSX } from "react/jsx-runtime";
import { cardStyles } from "./Card.styles";

interface CardHeaderProps {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return <View style={[cardStyles.header, style]}>{children}</View>;
}
