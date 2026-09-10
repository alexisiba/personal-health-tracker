import { Control, FieldValues, Path } from "react-hook-form";
import { Option } from "react-native-paper-dropdown";

export interface AppQuantityUnitInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  quantityName: Path<TFieldValues>;
  unitName: Path<TFieldValues>;
  label: string;
  quantityPlaceholder?: string;
  options: Option[];
  // Suffixed into `${testID}-quantity` and `${testID}-unit` on the two inner inputs.
  testID?: string;
}
