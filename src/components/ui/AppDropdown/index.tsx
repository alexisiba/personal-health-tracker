import { Controller, FieldValues } from "react-hook-form";
import { Text, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { appDropdownStyles } from "./AppDropdown.styles";
import { AppDropdownProps } from "./AppDropdown.types";

export default function AppDropdown<TFieldValues extends FieldValues>({
  label,
  control,
  name,
  ...props
}: AppDropdownProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState }) => {
        const selectedValueLabel =
          props.options.find((option) => option.value === value)?.label ?? "";

        return (
          <View>
            <Text style={appDropdownStyles.label}>{label}</Text>
            <Dropdown
              {...props}
              mode="outlined"
              onSelect={onChange}
              value={value}
              CustomDropdownInput={(innerProps) => (
                <TextInput
                  {...innerProps}
                  outlineStyle={
                    !!fieldState.error
                      ? appDropdownStyles.outlineError
                      : appDropdownStyles.outline
                  }
                  right={<TextInput.Icon icon="menu-down" />}
                  error={!!fieldState.error}
                  value={selectedValueLabel}
                />
              )}
            />
            <HelperText type="error" visible={!!fieldState.error}>
              {fieldState.error?.message}
            </HelperText>
          </View>
        );
      }}
    />
  );
}
