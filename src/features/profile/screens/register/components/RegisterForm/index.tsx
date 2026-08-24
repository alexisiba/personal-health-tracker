import AppButton from "@/components/ui/AppButton";
import AppDateInput from "@/components/ui/AppDateInput";
import AppDropdown from "@/components/ui/AppDropdown";
import AppTextInput from "@/components/ui/AppTextInput";
import { colors } from "@/constants/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { SEX_OPTIONS } from "./RegisterForm.constants";
import { registerFormStyles } from "./RegisterForm.styles";

export default function RegisterForm() {
  const router = useRouter();
  const { t } = useTranslation("profile");
  return (
    <View style={registerFormStyles.formContainer}>
      <View style={registerFormStyles.profileImageButtonContainer}>
        <TouchableRipple
          onPress={() => console.log("Pressed")}
          style={registerFormStyles.profileImageButton}
        >
          <MaterialDesignIcons
            name="account-plus"
            size={40}
            color={colors.primary}
          />
        </TouchableRipple>
      </View>
      <View style={registerFormStyles.headContainer}>
        <Text variant="headlineSmall" style={registerFormStyles.headTitle}>
          {t("onboardingRegister.title")}
        </Text>
        <Text variant="bodyLarge" style={registerFormStyles.headDescription}>
          {t("onboardingRegister.description")}
        </Text>
      </View>
      <View style={registerFormStyles.form}>
        <AppTextInput
          label={`${t("onboardingRegister.form.fullName")} *`}
          onChange={() => {}}
          outlineStyle={{ borderColor: "lightgray" }}
        />
        <AppDateInput
          label={`${t("onboardingRegister.form.dob")} *`}
          onChange={() => {}}
          value={undefined}
          inputMode="end"
          locale="es"
        />
        <AppDropdown
          label={`${t("onboardingRegister.form.sexAtBirth")} *`}
          options={SEX_OPTIONS}
          value=""
          onSelect={() => {}}
        />
      </View>
      <View style={registerFormStyles.buttonContainer}>
        <AppButton
          mode="contained"
          onPress={() => router.navigate("/(tabs)")}
          contentStyle={{ paddingVertical: 5 }}
        >
          {t("onboardingRegister.form.createAccount")}
        </AppButton>
      </View>
    </View>
  );
}
