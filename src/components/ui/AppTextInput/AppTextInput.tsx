import { Controller, FieldValues } from "react-hook-form";
import { Text, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { appTextInputStyles } from "./AppTextInput.styles";
import { AppTextInputProps } from "./AppTextInput.types";

export function AppTextInput<TFieldValues extends FieldValues>({
  label,
  control,
  name,
  ...props
}: AppTextInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <View>
          <Text style={appTextInputStyles.label}>{label}</Text>
          <TextInput
            {...props}
            mode="outlined"
            outlineStyle={
              !!fieldState.error
                ? appTextInputStyles.outlineError
                : appTextInputStyles.outline
            }
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={!!fieldState.error}
          />
          <HelperText type="error" visible={!!fieldState.error}>
            {fieldState.error?.message}
          </HelperText>
        </View>
      )}
    />
  );
}
