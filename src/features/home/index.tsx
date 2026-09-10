import spacing from "@/constants/spacing";
import colors from "@/constants/colors";
import { findUserQuery } from "@/db/queries/users";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CompleteHealthProfile from "./components/CompleteHealthProfile";
import NextAppointment from "./components/NextAppointment";
import NextMedication from "./components/NextMedication";

export default function Home() {
  const { t } = useTranslation("home");
  const { data: user } = useLiveQuery(findUserQuery());
  const appointments = false;
  const medications = false;
  return (
    <View style={styles.homeContainer}>
      <View style={styles.headContainer}>
        <Text variant="headlineMedium" style={styles.headTitle}>
          {user ? t("greeting.withName", { name: user.name }) : t("greeting.default")}
        </Text>
        <Text variant="bodyLarge" style={styles.headSubTitle}>
          {t("subtitle")}
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
