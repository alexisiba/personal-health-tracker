import EmptyState from "@/components/shared/EmptyState";
import { spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

export default function Directory() {
  const directory = false;
  return (
    <View style={{ padding: spacing.lg }}>
      {!directory ? (
        <EmptyState
          icon="calendar-outline"
          title="Tu directorio está vacío"
          description="Agrega a tus médicos de cabecera, especialistas o contactos de emergencia para tener su información siempre a mano."
          actionLabel="Agregar contacto"
          onButtonPress={() => {}}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
