import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CompleteHealthProfile from "./components/CompleteHealthProfile";
import NextAppointment from "./components/NextAppointment";
import NextMedication from "./components/NextMedication";

export default function Home() {
  const appointments = false;
  const medications = false;
  return (
    <View style={styles.homeContainer}>
      <View style={styles.headContainer}>
        <Text variant="headlineMedium" style={styles.headTitle}>
          Buenos días, Alexis
        </Text>
        <Text variant="bodyLarge" style={styles.headSubTitle}>
          Aqui tienes un resumen de tu salud
        </Text>
      </View>
      <View style={{ gap: spacing.xl }}>
        {appointments ? <NextAppointment /> : null}
        {medications ? <NextMedication /> : null}
        <CompleteHealthProfile />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    padding: spacing.xl,
    paddingTop: spacing.huge,
  },
  headContainer: { marginBottom: spacing.xxl },
  headTitle: { fontWeight: "bold", marginBottom: spacing.xs },
  headSubTitle: { color: colors.onSurfaceVariant },
});
