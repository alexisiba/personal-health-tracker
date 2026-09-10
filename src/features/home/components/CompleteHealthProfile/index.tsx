import { AppButton } from "@/components/ui/AppButton";
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function CompleteHealthProfile() {
  const router = useRouter();
  const { t } = useTranslation("home");
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
        {t("completeHealthProfile.title")}
      </Text>
      <Text
        variant="bodyLarge"
        style={{ color: colors.gray700, marginBottom: spacing.xxl }}
      >
        {t("completeHealthProfile.description")}
      </Text>
      <AppButton
        mode="contained"
        onPress={() => {
          router.navigate("/profile");
        }}
      >
        {t("completeHealthProfile.cta")}
      </AppButton>
    </View>
  );
}

const styles = StyleSheet.create({});
