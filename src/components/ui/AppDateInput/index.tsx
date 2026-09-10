import { Controller, FieldValues } from "react-hook-form";
import { Text, View } from "react-native";
import { HelperText } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { appDateInputStyles } from "./AppDateInput.styles";
import { AppDateInputProps } from "./AppDateInput.types";

export default function AppDateInput<TFieldValues extends FieldValues>({
  label,
  control,
  name,
  ...props
}: AppDateInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <View>
          <Text>{label}</Text>
          <DatePickerInput
            mode="outlined"
            outlineStyle={
              !!fieldState.error
                ? appDateInputStyles.outlineError
                : appDateInputStyles.outline
            }
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            error={!!fieldState.error}
            {...props}
          />
          <HelperText type="error" visible={!!fieldState.error}>
            {fieldState.error?.message}
          </HelperText>
        </View>
      )}
    />
  );
}
