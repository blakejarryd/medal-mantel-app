import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../../../theme';

const RaceDuration = ({ duration, onDurationChange }) => {
  const [time, setTime] = useState(parseDuration(duration));

  useEffect(() => {
    if (duration) {
      setTime(parseDuration(duration));
    }
  }, [duration]);

  useEffect(() => {
    if (time.hours || time.minutes || time.seconds) {
      onDurationChange(formatDuration(time));
    }
  }, [time]);

  function parseDuration(duration) {
    if (!duration) {
      return { hours: '', minutes: '', seconds: '' };
    }
    const parts = duration.split(':').map((part) => part.padStart(2, '0'));
    return {
      hours: parts[0] || '00',
      minutes: parts[1] || '00',
      seconds: parts[2] || '00',
    };
  }

  function formatDuration({ hours, minutes, seconds }) {
    return `${hours ? hours.padStart(2, '0') : '00'}:${minutes ? minutes.padStart(2, '0') : '00'}:${seconds ? seconds.padStart(2, '0') : '00'}`;
  }

  const validateNumberInput = (value, max) => {
    if (value === '') {
      return '';
    }
    let num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
      return '00';
    }
    if (num > max) {
      return max.toString();
    }
    return num.toString();
  };

  const handleTimeChange = (part, value) => {
    setTime((prev) => ({
      ...prev,
      [part]: value,
    }));
  };

  const handleBlur = (part) => {
    setTime((prev) => ({
      ...prev,
      [part]: validateNumberInput(prev[part], part === 'hours' ? 99 : 59).padStart(2, '0'),
    }));
  };

  return (
    <>
      <Text style={styles.label}>Time</Text>
      <View style={styles.timeInputContainer}>
        <TextInput
          value={time.hours}
          onChangeText={(value) => handleTimeChange('hours', value)}
          onBlur={() => handleBlur('hours')}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="HH"
        />
        <Text style={styles.timeSeparator}>:</Text>
        <TextInput
          value={time.minutes}
          onChangeText={(value) => handleTimeChange('minutes', value)}
          onBlur={() => handleBlur('minutes')}
          style={styles.timeInput}
          keyboardType="numeric"
          placeholder="MM"
        />
        <Text style={styles.timeSeparator}>:</Text>
        <TextInput
          value={time.seconds}
          onChangeText={(value) => handleTimeChange('seconds', value)}
          onBlur={() => handleBlur('seconds')}
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
    justifyContent: 'start', 
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs, 
  },
  timeInput: {
    backgroundColor: theme.colors.grey, 
    width: 50,
    textAlign: 'center',
    marginHorizontal: theme.spacing.xs, 
    height: 45, 
    borderRadius: theme.roundness, 
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.medium, 
  },
  timeSeperator: {
    alignSelf: 'center',
  },
});

export default RaceDuration;