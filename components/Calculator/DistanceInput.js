import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../theme';

const DistanceInput = ({ distance, setDistance, isKilometers, toggleUnit }) => {
  return (
    <View>
      <View style={styles.distanceInputWrapper}>
        <View style={styles.distanceInputContainer}>
          <TextInput
            value={String(distance)}
            onChangeText={setDistance}
            style={styles.input}
            placeholder={isKilometers ? 'Distance in KM' : 'Distance in Mi'}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.unitToggleButtonContainer}>
          <TouchableOpacity
            style={[
              styles.unitToggleButton,
              isKilometers ? styles.unitToggleButtonSelected : null,
            ]}
            onPress={() => toggleUnit(true)} 
          >
            <Text
              style={
                isKilometers
                  ? styles.unitToggleButtonTextSelected
                  : styles.unitToggleButtonText
              }
            >
              KM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitToggleButton,
              !isKilometers ? styles.unitToggleButtonSelected : null,
            ]}
            onPress={() => toggleUnit(false)} 
          >
            <Text
              style={
                !isKilometers
                  ? styles.unitToggleButtonTextSelected
                  : styles.unitToggleButtonText
              }
            >
              Mi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSizes.medium,
    marginTop: theme.spacing.s,
    color: theme.colors.textPrimary,
  },
  input: {
    backgroundColor: theme.colors.grey,
    height: 45,
    width: 130,
    borderRadius: theme.roundness,
    color: theme.colors.textPrimary,
    paddingHorizontal: 12, 
    marginVertical: theme.spacing.s,
  },
  distanceInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  unitToggleButtonContainer: {
    flexDirection: 'column', 
    margin: theme.spacing.s,
  },
  unitToggleText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textPrimary,
  },
  unitToggleButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  unitToggleButton: {
    margin: 2,
    padding: 5,
    borderRadius: theme.roundness,
    borderWidth: 1,
    borderColor: theme.colors.primary,
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
  distanceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DistanceInput;
