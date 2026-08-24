import EmptyState from "@/components/shared/EmptyState";
import { spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

export default function Medications() {
  const medications = false;
  return (
    <View style={{ padding: spacing.lg }}>
      {!medications ? (
        <EmptyState
          icon="medical-bag"
          title="Tu botiquín está vacío"
          description="Registra tus medicamentos para recibir recordatorios oportunos, realizar un seguimiento de tus dosis y mantener tu salud bajo control sin esfuerzo."
          actionLabel="Agregar medicamento"
          onButtonPress={() => {}}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
