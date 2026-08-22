import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
  return (
    <SafeAreaView>
      <View style={{ padding: 10 }}>
        <RegisterForm />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
