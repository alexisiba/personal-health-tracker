import { Button, ButtonProps } from "react-native-paper";
import { appButtonStyles } from "./AppButton.styles";

export default function AppButton({ ...props }: ButtonProps) {
  return (
    <Button style={appButtonStyles.buttonBorderRadius} {...props}>
      {props.children}
    </Button>
  );
}
