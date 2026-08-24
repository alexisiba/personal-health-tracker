import AppButton from "@/components/ui/AppButton";
import { colors, spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function CompleteHealthProfile() {
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: spacing.md,
        borderWidth: 1,
        borderColor: colors.gray200,
        padding: spacing.xl,
      }}
    >
      <Text
        variant="headlineSmall"
        style={{ fontWeight: "bold", marginBottom: spacing.md }}
      >
        Tu perfil de salud está incompleto
      </Text>
      <Text
        variant="bodyLarge"
        style={{ color: colors.gray700, marginBottom: spacing.xxl }}
      >
        Ayúdanos a personalizar tu experiencia médica completando tus datos
        básicos.
      </Text>
      <AppButton
        mode="contained"
        onPress={() => {
          router.navigate("/profile");
          //   router.navigate("/profile/profile-form-selection");
        }}
      >
        Completar perfil de salud
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({});
