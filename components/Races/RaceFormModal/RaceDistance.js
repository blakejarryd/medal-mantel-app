import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';
import theme from '../../../theme';

const RaceDistance = ({ eventName, setEventName, personalBests, distance, setDistance, isKilometers, distanceUnitToggle }) => {
  const [inputDistance, setInputDistance] = useState(distance || '');

  const eventTypes = personalBests.map(personalBest => personalBest.event);
  

  const isSelected = (eventType) => eventName === eventType;

  const handleEventSelection = (eventType) => {
    setEventName(eventType);
    if (eventType === 'Other') {
      setInputDistance('');
    } else {
      const personalBest = personalBests.find(pb => pb.event === eventType);
      if (personalBest) {
        setDistance(personalBest.distance);
      } else {
        setDistance('');
      }
    }
  };

  useEffect(() => {
    if (eventName) {
      const personalBest = personalBests.find(pb => pb.event === eventName);
      if (personalBest) {
        setDistance(personalBest.distance);
      } else {
        const inputValue = parseFloat(inputDistance);
        setDistance(inputValue);
      }
    } else {
      const inputValue = parseFloat(inputDistance);
      setDistance(inputValue);
    }
  }, [eventName, inputDistance, distance, personalBests]);

  return (
    <View>
      <Text style={styles.label}>Event</Text>
      <View style={styles.verticalButtonGroup}>
        {eventTypes.map((eventType) => (
          <TouchableOpacity
            key={eventType}
            style={[
              styles.buttonWrapper,
              isSelected(eventType) ? styles.selectedButtonWrapper : null,
            ]}
            onPress={() => handleEventSelection(eventType)}
          >
            <Text style={isSelected(eventType) ? styles.selectedButtonText : styles.buttonText}>
              {eventType}
            </Text>
          </TouchableOpacity>
        ))}
        {/* Hardcoded 'Other' button */}
        <TouchableOpacity
          style={[
            styles.buttonWrapper,
            isSelected('Other') ? styles.selectedButtonWrapper : null,
          ]}
          onPress={() => handleEventSelection('Other')}
        >
          <Text style={isSelected('Other') ? styles.selectedButtonText : styles.buttonText}>
            Other
          </Text>
        </TouchableOpacity>
      </View>
  
      {eventName === 'Other' && (
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
}
  

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