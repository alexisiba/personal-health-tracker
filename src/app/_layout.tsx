import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { paperTheme } from "@/constants/theme";
import { db } from "@/db/client";
import migrations from "@/db/migrations/migrations.js";
import "@/i18n";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";
import { DefaultTheme, PaperProvider, Text } from "react-native-paper";
import { en, es, registerTranslation } from "react-native-paper-dates";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { t } = useTranslation("common");
  const { success, error } = useMigrations(db, migrations);

  registerTranslation("en", en);
  registerTranslation("es", es);

  const theme = {
    ...DefaultTheme,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      ...paperTheme.colors,
    },
  };

  if (error) {
    return (
      <PaperProvider theme={theme}>
        <Text
          accessibilityRole="header"
          style={{ textAlign: "center", marginTop: 40, paddingHorizontal: 20 }}
        >
          {t("database.migrationError", { message: error.message })}
        </Text>
      </PaperProvider>
    );
  }

  if (!success) return null;

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}
