import { colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function ProfileLayout() {
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
          title: "Perfil",
        }}
      />

      <Stack.Screen
        name="profile-form-selection"
        options={{
          title: "Perfil de salud",
        }}
      />
    </Stack>
  );
}
