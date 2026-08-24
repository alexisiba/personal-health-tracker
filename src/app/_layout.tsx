import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { paperTheme } from "@/constants/theme";
import "@/i18n";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { en, es, registerTranslation } from "react-native-paper-dates";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
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
