/**
 * React Native Paper Theme for Salud Tranquila App
 *
 * Based on Material Design 3 color system and the app's DESIGN.md specifications
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
  "surface-bright": "#f3faff",
  "surface-container-lowest": "#ffffff",
  "surface-container-low": "#e6f6ff",
  "surface-container": "#dbf1fe",
  "surface-container-high": "#d5ecf8",
  "surface-container-highest": "#cfe6f2",
  "surface-variant": "#cfe6f2",
  "surface-disabled": "#bdc9ca",

  // Surface Tints
  "on-surface": "#071e27",
  "on-surface-variant": "#3e494a",
  "on-surface-disabled": "#8d9a9b",
  "inverse-surface": "#1e333c",
  "inverse-on-surface": "#dff4ff",

  // Outline & Borders
  outline: "#6e797a",
  "outline-variant": "#bdc9ca",

  // Primary Color (Deep Teal - Clinical anchor)
  primary: "#006068",
  "on-primary": "#ffffff",
  "primary-container": "#007b85",
  "on-primary-container": "#d5faff",
  "inverse-primary": "#7ad4df",

  // Secondary Color (Sky Blue - Supportive information)
  secondary: "#006398",
  "on-secondary": "#ffffff",
  "secondary-container": "#6cbdfe",
  "on-secondary-container": "#004b75",

  // Tertiary Color (Mint Frost - Background tints)
  tertiary: "#495a59",
  "on-tertiary": "#ffffff",
  "tertiary-container": "#617271",
  "on-tertiary-container": "#e5f7f6",

  // Error Colors
  error: "#ba1a1a",
  "on-error": "#ffffff",
  "error-container": "#ffdad6",
  "on-error-container": "#93000a",

  // Fixed Colors (Alternative backgrounds)
  "primary-fixed": "#96f1fc",
  "primary-fixed-dim": "#7ad4df",
  "on-primary-fixed": "#001f23",
  "on-primary-fixed-variant": "#004f56",

  "secondary-fixed": "#cde5ff",
  "secondary-fixed-dim": "#94ccff",
  "on-secondary-fixed": "#001d32",
  "on-secondary-fixed-variant": "#004b74",

  "tertiary-fixed": "#d4e6e5",
  "tertiary-fixed-dim": "#b8cac9",
  "on-tertiary-fixed": "#0e1e1e",
  "on-tertiary-fixed-variant": "#3a4a49",

  // Background & Surface Variant
  background: "#f3faff",
  "on-background": "#071e27",
};

export const theme = {
  colors: {
    // Material Design 3 specific properties
    primary: colors.primary,
    onPrimary: colors["on-primary"],
    primaryContainer: colors["primary-container"],
    onPrimaryContainer: colors["on-primary-container"],

    secondary: colors.secondary,
    onSecondary: colors["on-secondary"],
    secondaryContainer: colors["secondary-container"],
    onSecondaryContainer: colors["on-secondary-container"],

    tertiary: colors.tertiary,
    onTertiary: colors["on-tertiary"],
    tertiaryContainer: colors["tertiary-container"],
    onTertiaryContainer: colors["on-tertiary-container"],

    background: colors.background,
    onBackground: colors["on-background"],

    surface: colors.surface,
    onSurface: colors["on-surface"],
    surfaceVariant: colors["surface-variant"],
    onSurfaceVariant: colors["on-surface-variant"],
    outline: colors.outline,

    error: colors.error,
    onError: colors["on-error"],
    errorContainer: colors["error-container"],
    onErrorContainer: colors["on-error-container"],

    // Disabled States
    surfaceDisabled: colors["surface-disabled"],
    onSurfaceDisabled: colors["on-surface-disabled"],
  },
};
