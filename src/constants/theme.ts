/**
 * React Native Paper Theme for Salud Tranquila App
 *
 * Based on Material Design 3 color system
 *
 * @module theme
 */

// ============================================================================
// COLORS - Extracted from assets/DESIGN.md
// ============================================================================

export const colors = {
  // Surface Colors (Backgrounds)
  surface: "#f3faff",
  surfaceDim: "#c7dde9",
  surfaceBright: "#f3faff",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#e6f6ff",
  surfaceContainer: "#dbf1fe",
  surfaceContainerHigh: "#d5ecf8",
  surfaceContainerHighest: "#cfe6f2",
  surfaceVariant: "#cfe6f2",
  surfaceDisabled: "#bdc9ca",

  onSurface: "#071e27",
  onSurfaceVariant: "#3e494a",
  onSurfaceDisabled: "#8d9a9b",
  inverseSurface: "#1e333c",
  inverseOnSurface: "#dff4ff",

  outline: "#6e797a",
  outlineVariant: "#bdc9ca",

  primary: "#006068",
  onPrimary: "#ffffff",
  primaryContainer: "#007b85",
  onPrimaryContainer: "#d5faff",
  inversePrimary: "#7ad4df",

  secondary: "#006398",
  onSecondary: "#ffffff",
  secondaryContainer: "#6cbdfe",
  onSecondaryContainer: "#004b75",

  tertiary: "#495a59",
  onTertiary: "#ffffff",
  tertiaryContainer: "#617271",
  onTertiaryContainer: "#e5f7f6",

  // Error
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
  errorBg: "#ffebee",
  errorFocus: "#ef9a9a",
  errorBorderline: "#c62828",

  // Success
  success: "#2e7d32",
  onSuccess: "#ffffff",
  successContainer: "#c8e6c9",
  onSuccessContainer: "#1b5e20",
  successBg: "#e8f5e9",
  successFocus: "#a5d6a7",
  successBorderline: "#2e7d32",

  // Warning
  warning: "#f57c00",
  onWarning: "#ffffff",
  warningContainer: "#ffe0b2",
  onWarningContainer: "#3e2723",
  warningBg: "#fffaf1",
  warningFocus: "#ffcc80",
  warningBorderline: "#f57c00",

  // Info
  info: "#1976d2",
  onInfo: "#ffffff",
  infoContainer: "#bbdefb",
  onInfoContainer: "#0d47a1",
  infoBg: "#e3f2fd",
  infoFocus: "#90caf9",
  infoBorderline: "#1976d2",

  primaryFixed: "#96f1fc",
  primaryFixedDim: "#7ad4df",
  onPrimaryFixed: "#001f23",
  onPrimaryFixedVariant: "#004f56",

  secondaryFixed: "#cde5ff",
  secondaryFixedDim: "#94ccff",
  onSecondaryFixed: "#001d32",
  onSecondaryFixedVariant: "#004b74",

  tertiaryFixed: "#d4e6e5",
  tertiaryFixedDim: "#b8cac9",
  onTertiaryFixed: "#0e1e1e",
  onTertiaryFixedVariant: "#3a4a49",

  // Basic Colors
  white: "#ffffff",
  black: "#000000",

  // Grayscale Scale
  gray50: "#fafafa",
  gray100: "#f5f5f5",
  gray200: "#eeeeee",
  gray300: "#e0e0e0",
  gray400: "#bdbdbd",
  gray500: "#9e9e9e",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",

  // Background & Surface Variant
  background: "#f6fffe",
  onBackground: "#071e27",
};

// ============================================================================
// SPACING - Common values for gap, padding, margin
// ============================================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

// ============================================================================
// REACT NATIVE PAPER THEME
// ============================================================================

export const paperTheme = {
  colors: {
    // Material Design 3 specific properties
    primary: colors.primary,
    onPrimary: colors.onPrimary,
    primaryContainer: colors.primaryContainer,
    onPrimaryContainer: colors.onPrimaryContainer,

    secondary: colors.secondary,
    onSecondary: colors.onSecondary,
    secondaryContainer: colors.secondaryContainer,
    onSecondaryContainer: colors.onSecondaryContainer,

    tertiary: colors.tertiary,
    onTertiary: colors.onTertiary,
    tertiaryContainer: colors.tertiaryContainer,
    onTertiaryContainer: colors.onTertiaryContainer,

    background: colors.background,
    onBackground: colors.onBackground,

    surface: colors.surface,
    onSurface: colors.onSurface,
    surfaceVariant: colors.surfaceVariant,
    onSurfaceVariant: colors.onSurfaceVariant,
    outline: colors.outline,

    error: colors.error,
    onError: colors.onError,
    errorContainer: colors.errorContainer,
    onErrorContainer: colors.onErrorContainer,
    errorBg: colors.errorBg,
    errorFocus: colors.errorFocus,
    errorBorderline: colors.errorBorderline,

    success: colors.success,
    onSuccess: colors.onSuccess,
    successContainer: colors.successContainer,
    onSuccessContainer: colors.onSuccessContainer,
    successBg: colors.successBg,
    successFocus: colors.successFocus,
    successBorderline: colors.successBorderline,

    warning: colors.warning,
    onWarning: colors.onWarning,
    warningContainer: colors.warningContainer,
    onWarningContainer: colors.onWarningContainer,
    warningBg: colors.warningBg,
    warningFocus: colors.warningFocus,
    warningBorderline: colors.warningBorderline,

    info: colors.info,
    onInfo: colors.onInfo,
    infoContainer: colors.infoContainer,
    onInfoContainer: colors.onInfoContainer,
    infoBg: colors.infoBg,
    infoFocus: colors.infoFocus,
    infoBorderline: colors.infoBorderline,

    // Disabled States
    surfaceDisabled: colors.surfaceDisabled,
    onSurfaceDisabled: colors.onSurfaceDisabled,
  },
};
