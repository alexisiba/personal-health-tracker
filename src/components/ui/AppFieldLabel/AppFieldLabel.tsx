import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { appFieldLabelStyles } from "./AppFieldLabel.styles";
import { AppFieldLabelProps } from "./AppFieldLabel.types";

export function AppFieldLabel({ label, required, style }: AppFieldLabelProps) {
  const { t } = useTranslation("common");

  return (
    <Text
      style={style}
      accessibilityLabel={required ? `${label}, ${t("form.required")}` : undefined}
    >
      {label}
      {required && (
        <Text
          style={appFieldLabelStyles.required}
          accessibilityElementsHidden
          importantForAccessibility="no"
        >
          {" *"}
        </Text>
      )}
    </Text>
  );
}
