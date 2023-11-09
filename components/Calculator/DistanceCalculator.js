import React from 'react';
import { View, Text } from 'react-native';
import theme from '../../theme';
import { paceToSeconds, timeToSeconds } from './utlities/calculations';
import DistanceInput from './DistanceInput';
import CalculateButton from './CalculateButton';

const DistanceCalculator = ({ hours, minutes, seconds, paceMinutes, paceSeconds, distance, setDistance, unit, toggleUnit }) => {

  const calculateDistance = () => {
    const timeInSeconds = timeToSeconds(hours, minutes, seconds);
    const paceInSeconds = paceToSeconds(`${paceMinutes}:${paceSeconds}`);

    if (timeInSeconds && paceInSeconds) {
      const calculatedDistance = timeInSeconds / paceInSeconds;
      setDistance(calculatedDistance.toFixed(2).toString());
    }
  };

  return (
    <View>
      <Text style={styles.cardTitle}>Distance</Text>
      <View style={styles.inputSection}>
        <DistanceInput
          distance={distance}
          setDistance={setDistance}
          isKilometers={unit === 'km'}
          toggleUnit={toggleUnit}
        />
        <CalculateButton onPress={calculateDistance} />
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

export default DistanceCalculator;
