import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Dropdown, DropdownProps } from "react-native-paper-dropdown";

interface AppDropdownProps extends Omit<DropdownProps, "label" | "mode"> {
  label: string;
}

export default function AppDropdown({ label, ...props }: AppDropdownProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <Text style={{ marginBottom: 5 }}>{label}</Text>
      <Dropdown
        mode="outlined"
        CustomDropdownInput={(props) => (
          <TextInput
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            outlineStyle={{ borderColor: "lightgray" }}
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

const styles = StyleSheet.create({});
