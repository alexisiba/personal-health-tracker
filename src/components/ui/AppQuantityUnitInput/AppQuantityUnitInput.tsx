import { AppFieldLabel } from "@/components/ui/AppFieldLabel";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { FieldValues, useController } from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { AppQuantityUnitInputProps } from "./AppQuantityUnitInput.types";

// Lifted as-is from ScheduledMedicationForm's original inline "Dosis" row —
// same layout, same styling, same plain react-native-paper-dropdown usage
// (no custom Touchable, no shared focus container). Only the react-hook-form
// wiring was added on top, since the original was static (hardcoded dropdown
// value, uncontrolled text input).
export function AppQuantityUnitInput<TFieldValues extends FieldValues>({
  control,
  quantityName,
  unitName,
  label,
  required,
  quantityPlaceholder,
  options,
  testID,
}: AppQuantityUnitInputProps<TFieldValues>) {
  const { field: quantityField, fieldState: quantityFieldState } = useController({
    control,
    name: quantityName,
  });
  const { field: unitField, fieldState: unitFieldState } = useController({
    control,
    name: unitName,
  });
  const error = quantityFieldState.error ?? unitFieldState.error;

  return (
    <View style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
      <AppFieldLabel label={label} required={required} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          testID={testID ? `${testID}-quantity` : undefined}
          placeholder={quantityPlaceholder}
          mode="outlined"
          outlineStyle={{
            borderRadius: 0,
            borderTopLeftRadius: spacing.xs,
            borderBottomLeftRadius: spacing.xs,
            borderColor: quantityFieldState.error ? colors.error : colors.gray400,
            borderWidth: quantityFieldState.error ? 2 : undefined,
            borderRightWidth: 0,
          }}
          value={quantityField.value == null ? "" : String(quantityField.value)}
          onChangeText={(text) =>
            quantityField.onChange(text === "" ? undefined : Number(text))
          }
          onBlur={quantityField.onBlur}
          error={!!quantityFieldState.error}
        />
        <Dropdown
          testID={testID ? `${testID}-unit` : undefined}
          value={unitField.value}
          options={options}
          onSelect={(value) => unitField.onChange(value)}
          CustomDropdownInput={(innerProps) => (
            <TextInput
              {...innerProps}
              mode="outlined"
              outlineStyle={{
                borderColor: unitFieldState.error ? colors.error : colors.gray400,
                borderWidth: unitFieldState.error ? 2 : undefined,
                borderRadius: 0,
                borderTopRightRadius: spacing.xs,
                borderBottomRightRadius: spacing.xs,
                borderLeftWidth: 0,
                paddingVertical: spacing.xs,
              }}
              contentStyle={{
                borderLeftWidth: 1,
                borderLeftColor: colors.gray200,
                paddingVertical: spacing.xs,
              }}
              right={<TextInput.Icon icon="menu-down" />}
              // `innerProps` carries `selectedLabel`, not `value` — react-native-paper's
              // TextInput doesn't recognize that prop name, so without this the box
              // never shows the selection (see AppDropdown, which does the same).
              value={innerProps.selectedLabel}
              error={!!unitFieldState.error}
            />
          )}
        />
      </View>
      <HelperText type="error" visible={!!error}>
        {error?.message}
      </HelperText>
    </View>
  );
}
