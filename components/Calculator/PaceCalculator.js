import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import PaceInput from './PaceInput';
import { secondsToPace, timeToSeconds } from './utlities/calculations';
import CalculateButton from './CalculateButton';

const PaceCalculator = ({ hours, minutes, seconds, distance, paceMinutes, paceSeconds, setPaceMinutes, setPaceSeconds, unit }) => {

  const calculatePace = () => {
    const timeInSeconds = timeToSeconds(hours, minutes, seconds);
    if (timeInSeconds && distance) {
      const calculatedPaceInSeconds = timeInSeconds / parseFloat(distance);
      const calculatedPace = secondsToPace(calculatedPaceInSeconds);
      const [calculatedPaceMinutes, calculatedPaceSeconds] = calculatedPace.split(':');
      setPaceMinutes(calculatedPaceMinutes);
      setPaceSeconds(calculatedPaceSeconds);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{`Pace per ${unit === 'km' ? 'kilometer' : 'mile'}`}</Text>
      <View style={styles.inputSection}>
        <PaceInput
          minutes={paceMinutes}
          seconds={paceSeconds}
          setMinutes={setPaceMinutes}
          setSeconds={setPaceSeconds}
        />
      <CalculateButton onPress={calculatePace} />
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
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
};

export default PaceCalculator;
