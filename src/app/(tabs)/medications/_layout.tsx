import { AppButton } from "@/components/ui/AppButton";
import colors from "@/constants/colors";
import { Stack, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function MedicationsLayout() {
  const router = useRouter();
  const { t } = useTranslation("medications");

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.white,
        },
        headerTintColor: colors.white,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: t("list.header.title"),
          headerRight: () => (
            <AppButton
              mode="text"
              icon="plus"
              compact
              textColor={colors.white}
              onPress={() => router.navigate("/(tabs)/medications/add-medication-form")}
            >
              {t("list.header.addButtonLabel")}
            </AppButton>
          ),
        }}
      />

      <Stack.Screen
        name="add-medication-form"
        options={{
          title: t("addMedicationForm.title"),
        }}
      />
    </Stack>
  );
}
