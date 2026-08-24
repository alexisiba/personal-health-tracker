import AppButton from "@/components/ui/AppButton";
import { colors, spacing } from "@/constants/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";

export default function Profile() {
  return (
    <View style={{ padding: spacing.lg, paddingTop: spacing.huge }}>
      <View style={{ gap: spacing.xxl, marginBottom: spacing.xxxl }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/profile.jpeg")}
            style={{ width: 100, height: 100, borderRadius: spacing.huge }}
          />
        </View>
        <Text
          variant="headlineMedium"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Alexis Isidoro Bolaños Avalos
        </Text>
        <AppButton
          mode="contained"
          style={{ marginHorizontal: "auto" }}
          icon="pencil"
        >
          Editar Perfil
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
            Tu perfil de salud está incompleto
          </Text>
        </View>
        <Text
          variant="bodyMedium"
          style={{ marginBottom: spacing.md, color: colors.gray700 }}
        >
          Ayúdanos a personalizar la información de salud que te mostramos
          completando tus datos básicos.
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
              Progreso
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
        <AppButton mode="contained">Completar perfil de salud</AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
