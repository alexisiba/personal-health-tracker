import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { CardHeader } from "./CardHeader";

describe("CardHeader", () => {
  it("renders its children", async () => {
    await render(
      <CardHeader>
        <Text>Próxima cita</Text>
      </CardHeader>,
    );

    expect(screen.getByText("Próxima cita")).toBeOnTheScreen();
  });
});
