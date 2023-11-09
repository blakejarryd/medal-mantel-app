import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

const PaceInput = ({ minutes, seconds, setMinutes, setSeconds }) => {
  return (
    <View style={[styles.inputSection]}>
      <View style={styles.paceContainer}>
        <TextInput
          placeholder="MM"
          value={minutes}
          onChangeText={setMinutes}
          keyboardType="numeric"
          style={styles.paceInput}
        />
        <Text style={styles.paceSeparator}>:</Text>
        <TextInput
          placeholder="SS"
          value={seconds}
          onChangeText={setSeconds}
          keyboardType="numeric"
          style={styles.paceInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: theme.spacing.s,
  },
  paceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paceInput: {
    backgroundColor: theme.colors.grey,
    height: 45,
    borderRadius: theme.roundness,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.s,
    marginVertical: theme.spacing.s,
    width: 50,
    textAlign: 'center',
  },
  paceSeparator: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.xs,
  },
  label: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textPrimary,
    alignSelf: 'flex-start',
  },
});

export default PaceInput;
