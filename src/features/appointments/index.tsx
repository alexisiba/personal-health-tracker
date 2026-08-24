import EmptyState from "@/components/shared/EmptyState";
import { spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

export default function Appointments() {
  const appointments = false;
  return (
    <View style={{ padding: spacing.lg }}>
      {!appointments ? (
        <EmptyState
          icon="calendar-outline"
          title="Aún no tienes citas programadas "
          description="Lleva un control de tus consultas médicas y recibe recordatorios automáticos para que nunca olvides una visita al doctor."
          actionLabel="Agendar mi primer cita"
          onButtonPress={() => {}}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
