import { spacing } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    padding: spacing.lg,
  },
});
