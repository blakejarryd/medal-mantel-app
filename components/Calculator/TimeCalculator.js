import React from 'react';
import { View, Text } from 'react-native';
import theme from '../../theme';
import TimeInput from './TimeInput';
import { paceToSeconds } from './utlities/calculations';
import CalculateButton from './CalculateButton';

const TimeCalculator = ({ hours, minutes, seconds, setHours, setMinutes, setSeconds, paceMinutes, paceSeconds, distance }) => {

  const handleFocus = (part) => {
    if (part === 'hours') {
      setHours('');
    } else if (part === 'minutes') {
      setMinutes('');
    } else if (part === 'seconds') {
      setSeconds('');
    }
  };

  const calculateTime = () => {
    const distanceValue = parseFloat(distance);
    const paceInSeconds = paceToSeconds(`${paceMinutes}:${paceSeconds}`);
  
    if (distanceValue && paceInSeconds) {
      const calculatedTime = distanceValue * paceInSeconds;
  
      const calculatedHours = Math.floor(calculatedTime / 3600).toString().padStart(2, '0');
      const calculatedMinutes = Math.floor((calculatedTime % 3600) / 60).toString().padStart(2, '0');
      const calculatedSeconds = Math.round(calculatedTime % 60).toString().padStart(2, '0');
  
      setHours(calculatedHours);
      setMinutes(calculatedMinutes);
      setSeconds(calculatedSeconds);
    }
  };

  return (
    <View>
      <Text style={styles.cardTitle}>Time</Text>
      <View style={styles.rowContainer}>
        <View style={styles.timeInputContainer}>
          <TimeInput
            value={hours}
            onChange={(value) => setHours(value)}
            onFocus={() => handleFocus('hours')}
            placeholder="HH"
            style={styles.timeInput}
          />
          <Text style={styles.timeSeparator}>:</Text>
          <TimeInput
            value={minutes}
            onChange={(value) => setMinutes(value)}
            onFocus={() => handleFocus('minutes')}
            placeholder="MM"
            style={styles.timeInput}
          />
          <Text style={styles.timeSeparator}>:</Text>
          <TimeInput
            value={seconds}
            onChange={(value) => setSeconds(value)}
            onFocus={() => handleFocus('seconds')}
            placeholder="SS"
            style={styles.timeInput}
          />
        </View>
        <CalculateButton onPress={calculateTime} />
      </View>
    </View>
  );
};

const styles = {
  cardTitle: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  timeSeparator: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.xs,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align to flex-end
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
};
  

export default TimeCalculator;
