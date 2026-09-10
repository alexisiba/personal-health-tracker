import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { Card } from ".";

describe("Card", () => {
  it("renders its children", async () => {
    await render(
      <Card>
        <Text>Contenido de la tarjeta</Text>
      </Card>,
    );

    expect(screen.getByText("Contenido de la tarjeta")).toBeOnTheScreen();
  });
});
