import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../../../theme';

const RaceDuration = ({
  hours,
  minutes,
  seconds,
  setHours,
  setMinutes,
  setSeconds,
}) => {

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

  const handleTimeChange = (part, value) => {
    const validatedValue = validateNumberInput(value, part === 'hours' ? 99 : 59);
    if (part === 'hours') {
      setHours(validatedValue);
    } else if (part === 'minutes') {
      setMinutes(validatedValue);
    } else if (part === 'seconds') {
      setSeconds(validatedValue);
    }
  };

  const handleFocus = (part) => {
    if (part === 'hours') {
      setHours('');
    } else if (part === 'minutes') {
      setMinutes('');
    } else if (part === 'seconds') {
      setSeconds('');
    }
  };

  return (
    <>
      <Text style={styles.label}>Time</Text>
      <View style={styles.timeInputContainer}>
        <TextInput
          value={hours}
          onChangeText={(value) => handleTimeChange('hours', value)}
          onFocus={() => handleFocus('hours')}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="HH"
        />
        <Text style={styles.timeSeparator}>:</Text>
        <TextInput
          value={minutes}
          onChangeText={(value) => handleTimeChange('minutes', value)}
          onFocus={() => handleFocus('minutes')}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="MM"
        />
        <Text style={styles.timeSeparator}>:</Text>
        <TextInput
          value={seconds}
          onChangeText={(value) => handleTimeChange('seconds', value)}
          onFocus={() => handleFocus('seconds')}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="SS"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSizes.medium,
    marginTop: theme.spacing.s,
    color: theme.colors.textPrimary,
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'start', // Align items to the center to reduce space around
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs, // To add some space below the container
  },
  timeInput: {
    backgroundColor: theme.colors.grey, // Set the background color to grey
    width: 50,
    textAlign: 'center',
    marginHorizontal: theme.spacing.xs, // Add horizontal margin for spacing between inputs
    height: 45, // Match the height of other inputs
    borderRadius: theme.roundness, // Match the border radius of other inputs
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.medium, // Optional, to match font size of other inputs
  },
  timeSeperator: {
    alignSelf: 'center',
  },
});

export default RaceDuration;