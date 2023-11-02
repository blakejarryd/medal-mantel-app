import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import theme from '../../../theme';

const RaceName = ({ raceName, setRaceName }) => {
  return (
    <>
      <Text style={styles.label}>Race Name</Text>
      <TextInput 
        value={raceName} 
        onChangeText={setRaceName} 
        style={styles.input} 
        placeholder="Name of the Race"
      />
    </>
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
    borderRadius: theme.roundness,
    color: theme.colors.textPrimary,
    padding: theme.spacing.s,
    marginVertical: theme.spacing.s,
  },
});

export default RaceName;