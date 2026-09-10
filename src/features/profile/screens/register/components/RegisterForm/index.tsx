import AppButton from "@/components/ui/AppButton";
import AppDateInput from "@/components/ui/AppDateInput";
import AppDropdown from "@/components/ui/AppDropdown";
import AppTextInput from "@/components/ui/AppTextInput";
import { colors } from "@/constants/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { SEX_OPTIONS } from "./RegisterForm.constants";
import { registerFormSchema } from "./RegisterForm.schemas";
import { registerFormStyles } from "./RegisterForm.styles";
import { RegisterFormData } from "./RegisterForm.types";

export default function RegisterForm() {
  const router = useRouter();
  const { t } = useTranslation("profile");

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", dob: undefined, sexAtBirth: undefined },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Datos validados y listos:", data);
    router.navigate("/(tabs)");
  };

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
          control={control}
          name="name"
          label={`${t("onboardingRegister.form.fullName")} *`}
          outlineStyle={{ borderColor: "lightgray" }}
        />
        <AppDateInput
          control={control}
          name="dob"
          label={`${t("onboardingRegister.form.dob")} *`}
          inputMode="end"
          locale="es"
        />
        <AppDropdown
          control={control}
          name="sexAtBirth"
          label={`${t("onboardingRegister.form.sexAtBirth")} *`}
          options={SEX_OPTIONS}
        />
      </View>
      <View style={registerFormStyles.buttonContainer}>
        <AppButton
          mode="contained"
          onPress={() => router.navigate("/(tabs)")}
          // onPress={handleSubmit(onSubmit)}
          contentStyle={{ paddingVertical: 5 }}
        >
          {t("onboardingRegister.form.createAccount")}
        </AppButton>
      </View>
    </View>
  );
}
