import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';
import { RaceDataContext } from '../../services/RaceDataProvider';
import TimeCalculator from './TimeCalculator';
import DistanceCalculator from './DistanceCalculator';
import PaceCalculator from './PaceCalculator';

const Calculator = () => {
  const { distanceUnit } = useContext(RaceDataContext);

  const [unit, setUnit] = useState(distanceUnit);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [distance, setDistance] = useState('');
  const [paceMinutes, setPaceMinutes] = useState('');
  const [paceSeconds, setPaceSeconds] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.paceCalculatorCard}>
          <Text style={styles.paceCalculatorTitle}>Pace Calculator</Text>
          <TimeCalculator
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            setHours={setHours}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            paceMinutes={paceMinutes}
            paceSeconds={paceSeconds}
            distance={distance}
          />
          <View style={styles.cardSeparator} />
          <DistanceCalculator
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            distance={distance}
            paceMinutes={paceMinutes}
            paceSeconds={paceSeconds}
            setDistance={setDistance}
            unit={unit}
            toggleUnit={() => setUnit(unit === 'km' ? 'mi' : 'km')}
          />
          <View style={styles.cardSeparator} />
          <PaceCalculator
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            distance={distance}
            paceMinutes={paceMinutes}
            paceSeconds={paceSeconds}
            setPaceMinutes={setPaceMinutes}
            setPaceSeconds={setPaceSeconds}
            unit={unit}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Move calculations to the top
    alignItems: 'center',
    backgroundColor: theme.colors.altBackground,
    paddingTop: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
  },
  cardWrapper: {
    width: 290, // Fixed width for the card wrapper
    alignItems: 'center', // Center the card horizontally
    margin: theme.spacing.s,
  },
  paceCalculatorCard: {
    backgroundColor: theme.colors.background, // Use the theme's background color for the pace calculator card
    padding: theme.spacing.m,
    borderRadius: 8,
  },
  paceCalculatorTitle: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  cardSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.altBackground,
    marginVertical: theme.spacing.s,
  },
});

export default Calculator;
