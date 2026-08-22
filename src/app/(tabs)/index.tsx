import Register from "@/features/profile/screens/register";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function MainScreem() {
  return (
    <View>
      <Text>index</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Hello World!")}
      >
        Press me
      </Button>
      <Register />
    </View>
  );
}
