import { AppFieldLabel } from "@/components/ui/AppFieldLabel";
import { Controller, FieldValues } from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { appTextInputStyles } from "./AppTextInput.styles";
import { AppTextInputProps } from "./AppTextInput.types";

export function AppTextInput<TFieldValues extends FieldValues>({
  label,
  required,
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
          <AppFieldLabel label={label} required={required} style={appTextInputStyles.label} />
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
