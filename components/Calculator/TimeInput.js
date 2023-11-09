import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

const TimeInput = ({ value, onChange, onFocus, placeholder }) => {
  const validateNumberInput = (value, max) => {
    let num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
      return '';
    }
    if (num > max) {
      num = max;
    }
    return num.toString().padStart(2, '0');
  };

  const handleTimeChange = (value) => {
    const validatedValue = validateNumberInput(value, 59);
    onChange(validatedValue);
  };

  return (
      <View style={[styles.inputSection]}>
        <TextInput
          value={value}
          onChangeText={handleTimeChange}
          onFocus={onFocus}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder={placeholder}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  timeInput: {
    backgroundColor: theme.colors.grey,
    height: 45,
    borderRadius: theme.roundness,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.s,
    marginVertical: theme.spacing.s,
    width: 50,
    textAlign: 'center',
  },
});

export default TimeInput;
