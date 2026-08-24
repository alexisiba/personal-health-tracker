import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/Card/CardHeader";
import { colors, spacing } from "@/constants/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function NextMedication() {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text variant="titleLarge">Próximo Medicamento</Text>
        <Button mode="text">Ver todos</Button>
      </View>
      <Card>
        <CardHeader>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.sm,
            }}
          >
            <MaterialDesignIcons
              name="clock-outline"
              size={spacing.xxl}
              color={colors.primary}
            />
            <Text
              variant="bodyLarge"
              style={{ color: colors.primary, fontWeight: "bold" }}
            >
              02:00 PM
            </Text>
            <Text variant="bodyLarge" style={{ color: colors.primary }}>
              (En 2 horas)
            </Text>
          </View>
        </CardHeader>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text variant="headlineSmall">Losartán</Text>
            <Text variant="titleMedium" style={{ color: colors.gray700 }}>
              50 mg - 1 Tableta
            </Text>
          </View>
          <Button mode="contained" style={{ alignSelf: "flex-end" }}>
            Marcar Tomado
          </Button>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
});
