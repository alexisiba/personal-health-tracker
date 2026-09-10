import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { StyleSheet } from "react-native";

const SIZE = 100;

export const profileImageStyles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: spacing.huge,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.inversePrimary,
  },
  image: {
    width: SIZE,
    height: SIZE,
    borderRadius: spacing.huge,
  },
});
