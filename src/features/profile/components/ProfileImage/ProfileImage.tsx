import colors from "@/constants/colors";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { profileImageStyles } from "./ProfileImage.styles";
import { ProfileImageProps } from "./ProfileImage.types";

const ICON_SIZE = 40;

export function ProfileImage({ uri }: ProfileImageProps) {
  const { t } = useTranslation("profile");
  const accessibilityLabel = t("overview.profileImage.accessibilityLabel");

  return (
    <View style={profileImageStyles.container}>
      {uri ? (
        <Image
          testID="profile-image"
          source={{ uri }}
          accessibilityLabel={accessibilityLabel}
          style={profileImageStyles.image}
        />
      ) : (
        <MaterialDesignIcons
          name="account"
          size={ICON_SIZE}
          color={colors.primary}
          accessibilityLabel={accessibilityLabel}
        />
      )}
    </View>
  );
}
