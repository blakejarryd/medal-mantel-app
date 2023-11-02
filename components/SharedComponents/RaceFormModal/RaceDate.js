import React, { useState } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../../../theme';

const RaceDate = ({ value, onDateSelected, style }) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setIsDatePickerVisible(Platform.OS === 'ios'); // Keep picker open on iOS after selection
    onDateSelected(currentDate);
  };

  const displayDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const renderDatePicker = () => {
    if (Platform.OS === 'web') {
      // Render an HTML input element for web
      return (
        <input
          type="date"
          value={value.toISOString().split('T')[0]}
          onChange={(e) => onDateSelected(new Date(e.target.value))}
        />
      );
    } else if (Platform.OS === 'android') {
      // For Android, show the button that triggers the DatePicker
      if (!isDatePickerVisible) {
        return (
          <Button
            onPress={displayDatePicker}
            title={value.toDateString()}
          />
        );
      } else {
        // For Android, when the DatePicker is visible
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        );
      }
    } else {
      // For iOS
      return (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode="date"
          display="compact"
          onChange={onDateChange}
        />
      );
    }
  };

  return (
    <View style={style}>
      <Text style={styles.label}>Race Date</Text>
      <View style={styles.dateContainer}>
        {renderDatePicker()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSizes.medium,
    marginTop: theme.spacing.s,
    color: theme.colors.textPrimary,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
});

export default RaceDate;
