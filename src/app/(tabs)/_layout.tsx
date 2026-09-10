import AppTabs from "@/components/navigation/AppTabs";
import { StatusBar } from "react-native";

export default function TabsLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppTabs />
    </>
  );
}
