import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../theme';
import { RaceDataContext } from '../../services/RaceDataProvider';

const DistanceUnit = () => {
  const { distanceUnit, setDistanceUnit } = useContext(RaceDataContext); 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Distance Unit:</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            distanceUnit === 'km' ? styles.selectedButton : null,
          ]}
          onPress={() => setDistanceUnit('km')}
        >
          <Text
            style={[
              styles.unitText,
              distanceUnit === 'km' ? styles.selectedUnitText : null,
            ]}
          >
            Kilometers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            distanceUnit === 'mi' ? styles.selectedButton : null,
          ]}
          onPress={() => setDistanceUnit('mi')}
        >
          <Text
            style={[
              styles.unitText,
              distanceUnit === 'mi' ? styles.selectedUnitText : null,
            ]}
          >
            Miles
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.altBackground,
    paddingTop: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.s,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.roundness,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.s,
    marginHorizontal: theme.spacing.m, 
  },
  selectedButton: {
    backgroundColor: theme.colors.primary,
  },
  unitText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  selectedUnitText: {
    color: theme.colors.surface,
  },
});


export default DistanceUnit;
