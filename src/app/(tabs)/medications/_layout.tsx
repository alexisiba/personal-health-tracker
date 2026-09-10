import { colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function MedicationsLayout() {
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
          title: "Medicamentos",
        }}
      />

      <Stack.Screen
        name="add-medication-form"
        options={{
          title: "Agregar medicamento",
        }}
      />
    </Stack>
  );
}
