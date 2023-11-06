import React, { useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';
import theme from '../../../theme';

const RaceDistance = ({ eventName, setEventName, distance, setDistance }) => {
  const events = ['5k', '10k', 'Half Marathon', 'Marathon', 'Ultra Marathon', 'Other'];
  const distances = { '5k': '5', '10k': '10', 'Half Marathon': '21.1', 'Marathon': '42.2' };


  useEffect(() => {
    if (eventName in distances && !distance) {
      setDistance(distances[eventName]);
    }
  }, [eventName, distances, distance, setDistance]); 
  
  const isSelected = (event) => eventName === event;

  const handleEventSelection = (event) => {
    setEventName(event);
    if (event in distances) {
      setDistance(distances[event]);
    } else {
     
      if (eventName !== event) { 
        setDistance('');
      }
    }
  };

  return (
    <View>
      <Text style={styles.label}>Distance</Text>
      <View style={styles.verticalButtonGroup}>
        {events.map(event => (
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
        <TextInput
          value={distance}
          onChangeText={setDistance}
          style={styles.input}
          placeholder="Distance in km"
          keyboardType="numeric"
        />
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
