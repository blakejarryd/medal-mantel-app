import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../theme';
import { RaceDataContext } from '../../services/RaceDataProvider';

const DistanceUnit = () => {
  const { distanceUnit, setDistanceUnit } = useContext(RaceDataContext); 

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Distance Unit</Text>
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
  card: {
    width: 320,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginBottom: theme.spacing.m,
  },
  cardTitle: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.m,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: theme.fontSizes.small,
    color: theme.colors.primary,
  },
  selectedUnitText: {
    color: theme.colors.surface,
  },
});

export default DistanceUnit;
