import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../../../theme';

const FormButtons = ({ onSave, onCancel }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        mode="contained"
        onPress={onSave}
        style={styles.button}
        color={theme.colors.primary}
        contentStyle={{ backgroundColor: theme.colors.primary }}
        labelStyle={{ color: theme.colors.surface }}
      >
        Save
      </Button>
      <Button
        mode="outlined"
        onPress={onCancel}
        style={styles.button}
        color={theme.colors.primary}
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
});

export default FormButtons;
