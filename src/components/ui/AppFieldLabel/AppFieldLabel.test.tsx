import { render, screen } from "@testing-library/react-native";
// Ensures the global i18next instance is initialized before this component's
// useTranslation() call resolves any key — the app does this once via
// src/app/_layout.tsx, which this standalone component test doesn't render.
import "@/i18n";
import { AppFieldLabel } from ".";

describe("AppFieldLabel", () => {
  it("renders the label with no asterisk and no accessibility hint when not required", async () => {
    await render(<AppFieldLabel label="Nombre" />);

    const label = screen.getByText("Nombre");
    expect(label).toBeOnTheScreen();
    expect(label.props.accessibilityLabel).toBeUndefined();
  });

  it("renders a red asterisk and an accessibility hint when required", async () => {
    await render(<AppFieldLabel label="Nombre" required />);

    const label = screen.getByText("Nombre *");
    expect(label).toBeOnTheScreen();
    expect(label.props.accessibilityLabel).toBe("Nombre, Required field");
  });
});
