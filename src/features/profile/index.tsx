import { AppButton } from "@/components/ui/AppButton";
import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import { findUserQuery } from "@/db/queries/users";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import { ProfileImage } from "./components/ProfileImage";

export default function Profile() {
  const { t } = useTranslation("profile");
  const { data: user } = useLiveQuery(findUserQuery());

  return (
    <View style={{ padding: spacing.lg, paddingTop: spacing.huge }}>
      <View style={{ gap: spacing.xxl, marginBottom: spacing.xxxl }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProfileImage uri={user?.profileImageUri} />
        </View>
        {user && (
          <Text
            variant="headlineMedium"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            {`${user.name} ${user.lastName}`}
          </Text>
        )}
        <AppButton
          mode="contained"
          style={{ marginHorizontal: "auto" }}
          icon="pencil"
        >
          {t("overview.editProfile")}
        </AppButton>
      </View>
      <View
        style={{
          padding: spacing.md,
          backgroundColor: colors.warningBg,
          borderWidth: 1,
          borderColor: colors.warningBorderline,
          borderRadius: spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: spacing.xs,
          }}
        >
          <MaterialDesignIcons
            name="alert"
            color={colors.warning}
            size={20}
            style={{ marginTop: spacing.xs }}
          />
          <Text
            variant="titleLarge"
            style={{ fontWeight: "bold", marginBottom: spacing.sm }}
          >
            {t("overview.incompleteHealthProfile.title")}
          </Text>
        </View>
        <Text
          variant="bodyMedium"
          style={{ marginBottom: spacing.md, color: colors.gray700 }}
        >
          {t("overview.incompleteHealthProfile.description")}
        </Text>
        <View style={{ marginBottom: spacing.lg }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: spacing.xs,
            }}
          >
            <Text style={{ fontWeight: "bold", color: colors.primary }}>
              {t("overview.incompleteHealthProfile.progressLabel")}
            </Text>
            <Text style={{ fontWeight: "bold", color: colors.primary }}>
              30%
            </Text>
          </View>
          <ProgressBar
            progress={0.3}
            style={{ height: 10, borderRadius: spacing.huge }}
            fillStyle={{ backgroundColor: colors.secondaryContainer }}
          />
        </View>
        <AppButton mode="contained">{t("overview.incompleteHealthProfile.cta")}</AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
