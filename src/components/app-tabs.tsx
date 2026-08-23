import { colors } from "@/constants/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Tabs } from "expo-router";

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 6, // Empuja el ícono hacia abajo
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 8,
          shadowOpacity: 0.1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialDesignIcons
              name={focused ? "home" : "home-outline"}
              size={30}
              color={focused ? colors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="medications"
        options={{
          title: "Medications",
          tabBarIcon: ({ color, focused }) => (
            <MaterialDesignIcons
              name={focused ? "medication" : "medication-outline"}
              size={30}
              color={focused ? colors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ color, focused }) => (
            <MaterialDesignIcons
              name={focused ? "calendar" : "calendar-outline"}
              size={30}
              color={focused ? colors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="directory"
        options={{
          title: "Directory",
          tabBarIcon: ({ color, focused }) => (
            <MaterialDesignIcons
              name={focused ? "book-open" : "book-open-outline"}
              size={30}
              color={focused ? colors.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <MaterialDesignIcons
              name={focused ? "account" : "account-outline"}
              size={30}
              color={focused ? colors.primary : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
