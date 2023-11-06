import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../../../theme';

const FormButtons = ({ onSave, onCancel, isSaveDisabled }) => {
  const saveButtonColor = isSaveDisabled ? theme.colors.disabled : theme.colors.primary;
  
  return (
    <View style={styles.buttonContainer}>
      <Button
        mode="contained"
        onPress={onSave}
        style={styles.button}
        disabled={isSaveDisabled}
        contentStyle={{ backgroundColor: saveButtonColor }}
        labelStyle={{ color: isSaveDisabled ? theme.colors.disabledText : theme.colors.surface }}
      >
        Save
      </Button>
      <Button
        mode="outlined"
        onPress={onCancel}
        style={styles.button}
        contentStyle={{ backgroundColor: theme.colors.surface }}
        labelStyle={{ color: theme.colors.primary }}
      >
        Close
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.l,
  },
  button: {
    flex: 0.48,
  },
  colors: {
    primary: theme.colors.primary, 
    surface: theme.colors.surface,
    disabled: '#D3D3D3', 
    disabledText: '#A9A9A9' 
  }
});

export default FormButtons;
