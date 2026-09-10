import { render, screen } from "@testing-library/react-native";
// Ensures the global i18next instance is initialized before this component's
// useTranslation() call resolves any key — the app does this once via
// src/app/_layout.tsx, which this standalone component test doesn't render.
import "@/i18n";
import { ProfileImage } from ".";

describe("ProfileImage", () => {
  it("renders the profile photo when a uri is provided", async () => {
    await render(<ProfileImage uri="file:///photo.jpg" />);

    const image = screen.getByTestId("profile-image");
    expect(image.props.source).toEqual([{ uri: "file:///photo.jpg" }]);
    expect(screen.getByLabelText("Profile photo")).toBeOnTheScreen();
  });

  it("renders a placeholder icon when no photo is set", async () => {
    await render(<ProfileImage />);

    expect(screen.queryByTestId("profile-image")).not.toBeOnTheScreen();
    expect(screen.getByLabelText("Profile photo")).toBeOnTheScreen();
  });
});
