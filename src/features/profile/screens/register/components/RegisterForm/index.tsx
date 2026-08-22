import AppDateInput from "@/components/ui/AppDateInput";
import AppDropdown from "@/components/ui/AppDropdown";
import AppTextInput from "@/components/ui/AppTextInput";
import { colors } from "@/constants/theme";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { TextInput as NativeTextInput, View } from "react-native";
import { Button, Text, TouchableRipple } from "react-native-paper";
import { registerFormStyles } from "./RegisterForm.styles";

export default function RegisterForm() {
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
          value={""}
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
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 10,
          }}
        >
          <AppTextInput
            label="Peso"
            contentStyle={{ width: "100%", flex: 1 }}
            render={(props) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  padding: 12,
                }}
              >
                <NativeTextInput
                  {...props}
                  style={[props.style, { flex: 1, paddingRight: 5 }]}
                />
                <Text style={{ color: "gray", fontSize: 16 }}>Kg</Text>
              </View>
            )}
          />
          <AppTextInput label="Altura" />
        </View>
      </View>
      <View style={{ paddingVertical: 20, gap: 10 }}>
        <Button
          mode="contained"
          onPress={() => {}}
          contentStyle={{ paddingVertical: 5 }}
        >
          Crear cuenta
        </Button>
        <Text>Al continuar, aceptas nuestros términos y condiciones.</Text>
      </View>
    </View>
  );
}
