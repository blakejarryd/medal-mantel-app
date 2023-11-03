import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../../../theme';

const RaceDuration = ({ initialHours, initialMinutes, initialSeconds, onDurationChange }) => {
  const [hours, setHours] = useState(initialHours ? initialHours.toString() : '');
  const [minutes, setMinutes] = useState(initialMinutes ? initialMinutes.toString() : '');
  const [seconds, setSeconds] = useState(initialSeconds ? initialSeconds.toString() : '');

  const updateDuration = () => {
    const newDuration = `${validateNumberInput(hours, 99)}:${validateNumberInput(minutes, 59)}:${validateNumberInput(seconds, 59)}`;
    onDurationChange(newDuration); 
  };

  const validateNumberInput = (value, max) => {
    let num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
      return '00';
    }
    if (num > max) {
      return max.toString().padStart(2, '0');
    }
    return num.toString().padStart(2, '0');
  };

  const handleBlurHours = () => {
    setHours(validateNumberInput(hours, 99));
    updateDuration();
  };

  const handleBlurMinutesOrSeconds = (setter, value) => {
    setter(validateNumberInput(value, 59));
    updateDuration();
  };

  // You can create a function to get the duration in the format you want
  const getDuration = () => {
    return `${validateNumberInput(hours, 99)}:${validateNumberInput(minutes, 59)}:${validateNumberInput(seconds, 59)}`;
  };

  return (
    <>
      <Text style={styles.label}>Time</Text>
      <View style={styles.timeInputContainer}>
        <TextInput
          value={hours}
          onChangeText={setHours}
          onBlur={handleBlurHours}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="HH"
        />
        <Text style={styles.timeSeparator}>:</Text>
        <TextInput
          value={minutes}
          onChangeText={setMinutes}
          onBlur={() => handleBlurMinutesOrSeconds(setMinutes, minutes)}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="MM"
        />
        <Text style={styles.timeSeparator}>:</Text>
        <TextInput
          value={seconds}
          onChangeText={setSeconds}
          onBlur={() => handleBlurMinutesOrSeconds(setSeconds, seconds)}
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
