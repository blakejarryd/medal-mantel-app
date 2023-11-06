import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../../../theme';

const RaceDuration = ({ duration, onDurationChange }) => {
  const [time, setTime] = useState(parseDuration(duration));

  useEffect(() => {
    setTime(parseDuration(duration));
  }, [duration]);

  useEffect(() => {
    onDurationChange(formatDuration(time));
  }, [time]);

  function parseDuration(duration) {
    const parts = duration.split(':');
    return {
      hours: parts[0] || '00',
      minutes: parts[1] || '00',
      seconds: parts[2] || '00',
    };
  }

  function formatDuration({ hours, minutes, seconds }) {
    return `${validateNumberInput(hours, 99)}:${validateNumberInput(minutes, 59)}:${validateNumberInput(seconds, 59)}`;
  }

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

  const handleTimeChange = (part, value) => {
    setTime(prev => ({
      ...prev,
      [part]: validateNumberInput(value, part === 'hours' ? 99 : 59),
    }));
  };

  return (
    <>
      <Text style={styles.label}>Time</Text>
      <View style={styles.timeInputContainer}>
        <TextInput
          value={time.hours}
          onChangeText={(value) => handleTimeChange('hours', value)}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="HH"
        />
        <Text style={styles.timeSeparator}>:</Text>
        <TextInput
          value={time.minutes}
          onChangeText={(value) => handleTimeChange('minutes', value)}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="MM"
        />
        <Text style={styles.timeSeparator}>:</Text>
        <TextInput
          value={time.seconds}
          onChangeText={(value) => handleTimeChange('seconds', value)}
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
