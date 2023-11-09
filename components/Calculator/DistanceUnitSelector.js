import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../theme';

const DistanceUnitSelector = ({ unit, setUnit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            unit === 'km' ? styles.selectedButton : null,
          ]}
          onPress={() => setUnit('km')}
        >
          <Text
            style={[
              styles.buttonText,
              unit === 'km' ? styles.selectedButtonText : null,
            ]}
          >
            Kilometers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            unit === 'mi' ? styles.selectedButton : null,
          ]}
          onPress={() => setUnit('mi')}
        >
          <Text
            style={[
              styles.buttonText,
              unit === 'mi' ? styles.selectedButtonText : null,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.altBackground,
    paddingTop: theme.spacing.s,
    paddingBottom: theme.spacing.m,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: theme.spacing.s,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.roundness,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    marginHorizontal: theme.spacing.s,
  },
  selectedButton: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  selectedButtonText: {
    color: theme.colors.surface,
  },
});

export default DistanceUnitSelector;
