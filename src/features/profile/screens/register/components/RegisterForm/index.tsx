import AppDateInput from "@/components/ui/AppDateInput";
import AppDropdown from "@/components/ui/AppDropdown";
import AppTextInput from "@/components/ui/AppTextInput";
import AppTextInputSuffix from "@/components/ui/AppTextInput/components/AppTextInputSuffix";
import { colors } from "@/constants/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Text, TouchableRipple } from "react-native-paper";
import { registerFormStyles } from "./RegisterForm.styles";

export default function RegisterForm() {
  const router = useRouter();
  return (
    <View style={registerFormStyles.formContainer}>
      <View style={registerFormStyles.profileImageButtonContainer}>
        <TouchableRipple
          onPress={() => console.log("Pressed")}
          style={registerFormStyles.profileImageButton}
        >
          <MaterialDesignIcons
            name="account-plus"
            size={40}
            color={colors.primary}
          />
        </TouchableRipple>
      </View>
      <View style={registerFormStyles.headContainer}>
        <Text variant="headlineSmall" style={registerFormStyles.headTitle}>
          Crea tu perfil
        </Text>
        <Text variant="bodyLarge" style={registerFormStyles.headDescription}>
          Ingresa tus datos para personalizar tu experiencia de salud.
        </Text>
      </View>
      <View style={registerFormStyles.form}>
        <AppTextInput
          label="Nombre completo *"
          onChange={() => {}}
          outlineStyle={{ borderColor: "lightgray" }}
        />
        <AppDateInput
          label="Fecha de nacimiento"
          onChange={() => {}}
          value={undefined}
          inputMode="end"
          locale="es"
        />
        <AppDropdown
          label="Sexo"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
          value=""
          onSelect={() => {}}
        />
        <View style={registerFormStyles.formInputColumns}>
          <View style={registerFormStyles.formInputColumn}>
            <AppTextInput
              label="Peso"
              render={(props) => (
                <AppTextInputSuffix text="Kg" renderProps={props} />
              )}
            />
          </View>
          <View style={registerFormStyles.formInputColumn}>
            <AppTextInput
              label="Altura"
              render={(props) => (
                <AppTextInputSuffix text="cm" renderProps={props} />
              )}
            />
          </View>
        </View>
      </View>
      <View style={registerFormStyles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.navigate("/(tabs)")}
          contentStyle={{ paddingVertical: 5 }}
        >
          Crear cuenta
        </Button>
      </View>
    </View>
  );
}
