import { AppButton } from "@/components/ui/AppButton";
import { AppDateInput } from "@/components/ui/AppDateInput";
import { AppDropdown } from "@/components/ui/AppDropdown";
import { AppTextInput } from "@/components/ui/AppTextInput";
import colors from "@/constants/colors";
import { createUser } from "@/db/queries/users";
import { zodResolver } from "@hookform/resolvers/zod";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useController, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { SEX_OPTIONS } from "./RegisterForm.constants";
import { registerFormSchema } from "./RegisterForm.schemas";
import { registerFormStyles } from "./RegisterForm.styles";
import { RegisterFormData } from "./RegisterForm.types";
import { copyProfileImageToPersistentStorage } from "./RegisterForm.utils";

export default function RegisterForm() {
  const router = useRouter();
  const { t } = useTranslation("profile");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      lastName: "",
      dob: undefined,
      sexAtBirth: undefined,
      profileImageUri: undefined,
    },
  });

  const { field: profileImageField } = useController({
    control,
    name: "profileImageUri",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const profileImageUri = data.profileImageUri
        ? await copyProfileImageToPersistentStorage(data.profileImageUri)
        : undefined;

      await createUser({
        name: data.name,
        lastName: data.lastName,
        dateOfBirth: data.dob,
        sexAtBirth: data.sexAtBirth,
        profileImageUri,
      });

      router.navigate("/(tabs)");
    } catch {
      Alert.alert(
        t("onboardingRegister.form.errors.saveFailedTitle"),
        t("onboardingRegister.form.errors.saveFailedMessage"),
      );
    }
  };

  const applyPickedImage = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      profileImageField.onChange(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      Alert.alert(
        t("onboardingRegister.form.profileImage.permissionDeniedTitle"),
        t("onboardingRegister.form.profileImage.cameraPermissionDeniedMessage"),
      );
      return;
    }

    applyPickedImage(
      await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      }),
    );
  };

  const pickFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        t("onboardingRegister.form.profileImage.permissionDeniedTitle"),
        t("onboardingRegister.form.profileImage.photosPermissionDeniedMessage"),
      );
      return;
    }

    applyPickedImage(
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      }),
    );
  };

  const pickProfileImage = () => {
    Alert.alert(
      t("onboardingRegister.form.profileImage.sourceActionSheet.title"),
      undefined,
      [
        {
          text: t("onboardingRegister.form.profileImage.sourceActionSheet.camera"),
          onPress: pickFromCamera,
        },
        {
          text: t("onboardingRegister.form.profileImage.sourceActionSheet.gallery"),
          onPress: pickFromGallery,
        },
        {
          text: t("onboardingRegister.form.profileImage.sourceActionSheet.cancel"),
          style: "cancel",
        },
      ],
    );
  };

  return (
    <View style={registerFormStyles.formContainer}>
      <View style={registerFormStyles.profileImageButtonContainer}>
        <TouchableRipple
          onPress={pickProfileImage}
          style={registerFormStyles.profileImageButton}
          accessibilityLabel={t(
            "onboardingRegister.form.profileImage.accessibilityLabel",
          )}
        >
          {profileImageField.value ? (
            <Image
              testID="profile-image"
              source={{ uri: profileImageField.value }}
              style={registerFormStyles.profileImage}
            />
          ) : (
            <MaterialDesignIcons
              name="account-plus"
              size={40}
              color={colors.primary}
            />
          )}
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
          label={`${t("onboardingRegister.form.name")} *`}
          outlineStyle={{ borderColor: "lightgray" }}
          testID="name-input"
        />
        <AppTextInput
          control={control}
          name="lastName"
          label={`${t("onboardingRegister.form.lastName")} *`}
          outlineStyle={{ borderColor: "lightgray" }}
          testID="last-name-input"
        />
        <AppDateInput
          control={control}
          name="dob"
          label={`${t("onboardingRegister.form.dob")} *`}
          inputMode="end"
          locale="es"
          testID="dob-input"
        />
        <AppDropdown
          control={control}
          name="sexAtBirth"
          label={`${t("onboardingRegister.form.sexAtBirth")} *`}
          options={SEX_OPTIONS}
          testID="sex-at-birth-dropdown"
        />
      </View>
      <View style={registerFormStyles.buttonContainer}>
        <AppButton
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
          contentStyle={{ paddingVertical: 5 }}
        >
          {t("onboardingRegister.form.createAccount")}
        </AppButton>
      </View>
    </View>
  );
}
