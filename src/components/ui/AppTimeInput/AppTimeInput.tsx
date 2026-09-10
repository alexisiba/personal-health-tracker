import { AppFieldLabel } from "@/components/ui/AppFieldLabel";
import { AppSegmentedButtons } from "@/components/ui/AppSegmentedButtons";
import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, Pressable, View } from "react-native";
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { appTimeInputStyles } from "./AppTimeInput.styles";
import { AppTimeInputProps } from "./AppTimeInput.types";
import {
  clampHours12,
  clampMinutes,
  formatTime,
  Period,
  to12Hour,
  to24Hour,
} from "./AppTimeInput.utils";

// Renders its own hour/minute inputs instead of using react-native-paper-dates's
// TimePickerModal: that component's keyboard-entry fields treat a cleared field
// as `Number("") === 0` and immediately redraw "0" into it, which makes it
// impossible to delete a digit and type a new one. `selectTextOnFocus` below
// sidesteps the same scenario differently — tapping a field selects its
// existing value so typing overwrites it directly, without deleting first.
//
// Always shown as 12-hour + AM/PM (regardless of locale), since a 24-hour
// clock is unfamiliar to a meaningful share of users, older adults especially.
export function AppTimeInput<TFieldValues extends FieldValues>({
  label,
  required,
  control,
  name,
  locale,
  testID,
}: AppTimeInputProps<TFieldValues>) {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);
  const [hoursText, setHoursText] = useState("");
  const [minutesText, setMinutesText] = useState("");
  const [period, setPeriod] = useState<Period>("AM");

  const periodOptions = [
    { label: t("timePicker.am"), value: "AM" },
    { label: t("timePicker.pm"), value: "PM" },
  ];

  const openPicker = (value?: Date) => {
    if (value) {
      const asTwelveHour = to12Hour(value.getHours());
      setHoursText(String(asTwelveHour.hours).padStart(2, "0"));
      setMinutesText(String(value.getMinutes()).padStart(2, "0"));
      setPeriod(asTwelveHour.period);
    } else {
      setHoursText("");
      setMinutesText("");
      setPeriod("AM");
    }
    setVisible(true);
  };

  const onlyDigits = (text: string) => text.replace(/[^0-9]/g, "").slice(0, 2);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState }) => (
        <View>
          <AppFieldLabel
            label={label}
            required={required}
            style={appTimeInputStyles.label}
          />
          <Pressable testID={testID} onPress={() => openPicker(value)}>
            <View pointerEvents="none" style={appTimeInputStyles.trigger}>
              <TextInput
                mode="outlined"
                editable={false}
                outlineStyle={
                  !!fieldState.error
                    ? appTimeInputStyles.outlineError
                    : appTimeInputStyles.outline
                }
                style={appTimeInputStyles.trigger}
                value={value ? formatTime(value, locale) : ""}
                right={<TextInput.Icon icon="clock-outline" />}
                error={!!fieldState.error}
              />
            </View>
          </Pressable>
          <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
              <Dialog.Title>{t("timePicker.label")}</Dialog.Title>
              <Dialog.Content>
                <View style={appTimeInputStyles.row}>
                  <View style={appTimeInputStyles.column}>
                    <TextInput
                      testID={testID ? `${testID}-hours` : undefined}
                      mode="outlined"
                      keyboardType="number-pad"
                      maxLength={2}
                      selectTextOnFocus
                      style={appTimeInputStyles.timeField}
                      value={hoursText}
                      onChangeText={(text) => setHoursText(onlyDigits(text))}
                      placeholder="12"
                    />
                    <Text style={appTimeInputStyles.fieldCaption}>
                      {t("timePicker.hoursLabel")}
                    </Text>
                  </View>
                  <Text style={appTimeInputStyles.separator}>:</Text>
                  <View style={appTimeInputStyles.column}>
                    <TextInput
                      testID={testID ? `${testID}-minutes` : undefined}
                      mode="outlined"
                      keyboardType="number-pad"
                      maxLength={2}
                      selectTextOnFocus
                      style={appTimeInputStyles.timeField}
                      value={minutesText}
                      onChangeText={(text) => setMinutesText(onlyDigits(text))}
                      placeholder="00"
                    />
                    <Text style={appTimeInputStyles.fieldCaption}>
                      {t("timePicker.minutesLabel")}
                    </Text>
                  </View>
                </View>
                <View style={appTimeInputStyles.periodRow}>
                  <AppSegmentedButtons
                    value={period}
                    onPress={(nextValue) => setPeriod(nextValue as Period)}
                    options={periodOptions}
                  />
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setVisible(false);
                    Keyboard.dismiss();
                  }}
                >
                  {t("timePicker.cancelLabel")}
                </Button>
                <Button
                  testID={testID ? `${testID}-confirm` : undefined}
                  onPress={() => {
                    const hours24 = to24Hour(
                      clampHours12(Number(hoursText) || 12),
                      period,
                    );
                    const next = new Date(value ?? new Date());
                    next.setHours(
                      hours24,
                      clampMinutes(Number(minutesText) || 0),
                      0,
                      0,
                    );
                    onChange(next);
                    setVisible(false);
                    Keyboard.dismiss();
                  }}
                >
                  {t("timePicker.confirmLabel")}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <HelperText type="error" visible={!!fieldState.error}>
            {fieldState.error?.message}
          </HelperText>
        </View>
      )}
    />
  );
}
