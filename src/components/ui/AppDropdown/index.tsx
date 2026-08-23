import { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { appDropdownStyles } from "./AppDropdown.styles";
import { AppDropdownProps } from "./AppDropdown.types";

export default function AppDropdown({ label, ...props }: AppDropdownProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <Text style={appDropdownStyles.label}>{label}</Text>
      <Dropdown
        mode="outlined"
        CustomDropdownInput={(props) => (
          <TextInput
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            outlineStyle={appDropdownStyles.outline}
            right={
              isFocused ? (
                <TextInput.Icon icon="menu-up" />
              ) : (
                <TextInput.Icon icon="menu-down" />
              )
            }
          />
        )}
        {...props}
      />
    </View>
  );
}
