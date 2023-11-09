import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';
import theme from '../../../theme';

const RaceDistance = ({ eventName, setEventName, distance, setDistance, isKilometers, distanceUnitToggle }) => {
  const events = ['5k', '10k', 'Half Marathon', 'Marathon', 'Ultra Marathon', 'Other'];
  const distances = { '5k': '5', '10k': '10', 'Half Marathon': '21.1', 'Marathon': '42.2' };
  const [inputDistance, setInputDistance] = useState(distance || '');

  useEffect(() => {
    if (eventName in distances && !distance) {
      setDistance(distances[eventName]);
      setInputDistance(distances[eventName]);
    } else {
      const inputValue = parseFloat(inputDistance);
      setDistance(inputValue);
    }
  }, [eventName, distances, distance, setDistance, inputDistance]);

  const isSelected = (event) => eventName === event;

  const handleEventSelection = (event) => {
    setEventName(event);
    if (event in distances) {
      setDistance(distances[event]);
      setInputDistance(distances[event]);
    } else {
      if (eventName !== event) {
        setDistance('');
        setInputDistance('');
      }
    }
  };

  return (
    <View>
      <Text style={styles.label}>Distance</Text>
      <View style={styles.verticalButtonGroup}>
        {events.map((event) => (
          <TouchableOpacity
            key={event}
            style={[
              styles.buttonWrapper,
              isSelected(event) ? styles.selectedButtonWrapper : null,
            ]}
            onPress={() => handleEventSelection(event)}
          >
            <Text style={isSelected(event) ? styles.selectedButtonText : styles.buttonText}>
              {event}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {(eventName === 'Ultra Marathon' || eventName === 'Other') && (
        <>
          <View style={styles.unitToggleContainer}>
            <Text style={styles.unitToggleText}>Enter Distance in:</Text>
            <TouchableOpacity
              style={[
                styles.unitToggleButton,
                isKilometers ? styles.unitToggleButtonSelected : null,
              ]}
              onPress={distanceUnitToggle}
            >
              <Text style={isKilometers ? styles.unitToggleButtonTextSelected : styles.unitToggleButtonText}>
                KM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.unitToggleButton,
                !isKilometers ? styles.unitToggleButtonSelected : null,
              ]}
              onPress={distanceUnitToggle}
            >
              <Text style={!isKilometers ? styles.unitToggleButtonTextSelected : styles.unitToggleButtonText}>
                Mi
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            value={String(inputDistance)}
            onChangeText={setInputDistance}
            style={styles.input}
            placeholder={
              isKilometers ? 'Enter Distance in kilometers' : 'Enter Distance in miles'
            }
            keyboardType="numeric"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSizes.medium,
    marginTop: theme.spacing.s,
    color: theme.colors.textPrimary,
  },
  verticalButtonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.s,
  },
  buttonWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexBasis: '45%',
    margin: theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.s,
  },
  selectedButtonWrapper: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.primary,
  },
  selectedButtonText: {
    color: theme.colors.surface,
  },
  unitToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.s,
  },
  unitToggleText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
  },
  unitToggleButton: {
    padding: 10,
    borderRadius: theme.roundness,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  unitToggleButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  unitToggleButtonText: {
    color: theme.colors.primary,
  },
  unitToggleButtonTextSelected: {
    color: theme.colors.surface,
  },
  input: {
    backgroundColor: theme.colors.grey,
    height: 45,
    borderRadius: theme.roundness,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.s,
    marginVertical: theme.spacing.s,
  },
});

export default RaceDistance;
