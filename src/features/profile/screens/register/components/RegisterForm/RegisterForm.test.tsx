import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import RegisterForm from ".";

// react-native-paper-dates throws if a locale hasn't been registered; the
// app does this once in src/app/_layout.tsx, which tests don't render.
registerTranslation("en", en);

jest.mock("expo-router", () => ({
  useRouter: () => ({ navigate: jest.fn() }),
}));

jest.mock("expo-image-picker", () => ({
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

// See AppDropdown.test.tsx: react-native-paper-dropdown's real Menu never
// finishes opening in this test renderer (its useNativeDriver animation
// callback has no native bridge to call it back from), so we swap in a
// synchronous stand-in that preserves the same props contract.
jest.mock("react-native-paper-dropdown", () => {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { useState } = require("react");
  const { Pressable, Text: RNText } = require("react-native");
  /* eslint-enable @typescript-eslint/no-require-imports */

  function Dropdown({ testID, options, onSelect, CustomDropdownInput }: any) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Pressable testID={testID} onPress={() => setOpen((prev: boolean) => !prev)}>
          {CustomDropdownInput({})}
        </Pressable>
        {open &&
          options.map((option: { label: string; value: string }) => (
            <Pressable
              key={option.value}
              onPress={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              <RNText>{option.label}</RNText>
            </Pressable>
          ))}
      </>
    );
  }

  return { Dropdown };
});

const mockRequestCameraPermissions = ImagePicker.requestCameraPermissionsAsync as jest.Mock;
const mockRequestLibraryPermissions =
  ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock;
const mockLaunchCamera = ImagePicker.launchCameraAsync as jest.Mock;
const mockLaunchLibrary = ImagePicker.launchImageLibraryAsync as jest.Mock;

function renderForm() {
  return render(
    <PaperProvider>
      <RegisterForm />
    </PaperProvider>,
  );
}

// `Alert.alert`'s buttons are a plain array passed to the native module, not
// rendered UI — "pressing" one in a test means finding it in the spy's last
// call and invoking its onPress directly, the same way the OS would.
function pressAlertButton(alertSpy: jest.SpyInstance, buttonText: string) {
  const lastCall = alertSpy.mock.calls[alertSpy.mock.calls.length - 1];
  const buttons = lastCall[2] as { text: string; onPress?: () => void }[];
  const button = buttons.find((b) => b.text === buttonText);
  if (!button?.onPress) throw new Error(`No "${buttonText}" button with an onPress found`);
  button.onPress();
}

describe("RegisterForm", () => {
  let alertSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRequestCameraPermissions.mockReset();
    mockRequestLibraryPermissions.mockReset();
    mockLaunchCamera.mockReset();
    mockLaunchLibrary.mockReset();
    alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  it("exposes an accessibility label on the profile image button", async () => {
    await renderForm();

    expect(screen.getByLabelText("Choose profile photo")).toBeOnTheScreen();
  });

  it("offers a camera/gallery/cancel choice when the button is pressed", async () => {
    await renderForm();

    await fireEvent.press(screen.getByLabelText("Choose profile photo"));

    expect(alertSpy).toHaveBeenCalledWith(
      "Profile photo",
      undefined,
      expect.arrayContaining([
        expect.objectContaining({ text: "Take photo" }),
        expect.objectContaining({ text: "Choose from gallery" }),
        expect.objectContaining({ text: "Cancel", style: "cancel" }),
      ]),
    );
  });

  it("shows a permission alert and never opens the camera when camera access is denied", async () => {
    mockRequestCameraPermissions.mockResolvedValue({ granted: false });

    await renderForm();
    await fireEvent.press(screen.getByLabelText("Choose profile photo"));
    pressAlertButton(alertSpy, "Take photo");

    await waitFor(() =>
      expect(alertSpy).toHaveBeenLastCalledWith("Permission needed", expect.any(String)),
    );
    expect(mockLaunchCamera).not.toHaveBeenCalled();
  });

  it("shows a permission alert and never opens the gallery when photo access is denied", async () => {
    mockRequestLibraryPermissions.mockResolvedValue({ granted: false });

    await renderForm();
    await fireEvent.press(screen.getByLabelText("Choose profile photo"));
    pressAlertButton(alertSpy, "Choose from gallery");

    await waitFor(() =>
      expect(alertSpy).toHaveBeenLastCalledWith("Permission needed", expect.any(String)),
    );
    expect(mockLaunchLibrary).not.toHaveBeenCalled();
  });

  it("stores and displays the photo taken with the camera", async () => {
    mockRequestCameraPermissions.mockResolvedValue({ granted: true });
    mockLaunchCamera.mockResolvedValue({
      canceled: false,
      assets: [{ uri: "file:///camera-photo.jpg" }],
    });

    await renderForm();
    await fireEvent.press(screen.getByLabelText("Choose profile photo"));
    pressAlertButton(alertSpy, "Take photo");

    // expo-image's <Image> normalizes a single `source` object into an array
    // of sources internally, so assert against that shape.
    const image = await screen.findByTestId("profile-image");
    expect(image.props.source).toEqual([{ uri: "file:///camera-photo.jpg" }]);
  });

  it("stores and displays the image picked from the gallery", async () => {
    mockRequestLibraryPermissions.mockResolvedValue({ granted: true });
    mockLaunchLibrary.mockResolvedValue({
      canceled: false,
      assets: [{ uri: "file:///gallery-photo.jpg" }],
    });

    await renderForm();
    await fireEvent.press(screen.getByLabelText("Choose profile photo"));
    pressAlertButton(alertSpy, "Choose from gallery");

    const image = await screen.findByTestId("profile-image");
    expect(image.props.source).toEqual([{ uri: "file:///gallery-photo.jpg" }]);
  });

  it("leaves the field empty when the gallery picker is canceled", async () => {
    mockRequestLibraryPermissions.mockResolvedValue({ granted: true });
    mockLaunchLibrary.mockResolvedValue({ canceled: true, assets: null });

    await renderForm();
    await fireEvent.press(screen.getByLabelText("Choose profile photo"));
    pressAlertButton(alertSpy, "Choose from gallery");

    await waitFor(() => expect(mockLaunchLibrary).toHaveBeenCalledTimes(1));
    expect(screen.queryByTestId("profile-image")).not.toBeOnTheScreen();
  });
});
