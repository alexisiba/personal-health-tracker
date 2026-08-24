import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/Card/CardHeader";
import { colors, spacing } from "@/constants/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function NextAppointment() {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text variant="titleLarge">Próxima Cita</Text>
        <Button mode="text">Ver todas</Button>
      </View>
      <Card>
        <CardHeader style={styles.headContainer}>
          <View style={styles.specialtyContainer}>
            <View style={styles.iconContainer}>
              <MaterialDesignIcons
                name="calendar"
                size={spacing.xxxl}
                color={colors.onPrimaryContainer}
              />
            </View>
            <View>
              <Text variant="bodyMedium" style={styles.specialtyTitle}>
                ESPECIALIDAD
              </Text>
              <Text variant="headlineSmall">Cardiología</Text>
            </View>
          </View>
          <View>
            <Text variant="titleLarge" style={styles.dateLabel}>
              15 Oct
            </Text>
            <Text>10:30 AM</Text>
          </View>
        </CardHeader>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialDesignIcons
              name="stethoscope"
              size={spacing.xl}
              color={colors.gray700}
            />
            <Text variant="titleMedium" style={styles.infoText}>
              Dra. Elena Ramos
            </Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialDesignIcons
              name="map-marker-outline"
              size={spacing.xl}
              color={colors.gray700}
            />
            <Text variant="titleMedium" style={styles.infoText}>
              Centro Médico Integral
            </Text>
          </View>
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
  headContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  specialtyContainer: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  specialtyTitle: { fontWeight: "bold", color: colors.primary },
  dateLabel: { fontWeight: "bold", color: colors.primary },
  infoContainer: { gap: spacing.md },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  infoText: { color: colors.gray700 },
});
