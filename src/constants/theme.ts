/**
 * React Native Paper Theme for Salud Tranquila App
 *
 * Based on Material Design 3 color system
 *
 * @module theme
 */

import colors from "./colors";

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
