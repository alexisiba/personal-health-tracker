import { View } from "react-native";
import { CardProps } from "react-native-paper";
import { cardStyles } from "./Card.styles";

export function Card({ children }: CardProps) {
  return <View style={cardStyles.card}>{children}</View>;
}
