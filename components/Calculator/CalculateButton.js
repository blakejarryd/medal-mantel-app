import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';

const CalculateButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.calculatorButton}>
      <MaterialCommunityIcons name="calculator" style={styles.calculatorIcon} />
    </TouchableOpacity>
  );
};

const styles = {
  calculatorButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    width: 70,
    height: 40,
    borderRadius: 10,
    margin: theme.spacing.s,
  },
  calculatorIcon: {
    fontSize: 28,
    color: theme.colors.altBackground,
  },
  buttonText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.altBackground,
  },
};

export default CalculateButton;
