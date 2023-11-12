import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import DistanceUnit from './DistanceUnit';

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.settingsWrapper}>
        <DistanceUnit />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center', // Center the content horizontally
    backgroundColor: theme.colors.altBackground,
    paddingTop: theme.spacing.m,
  },
  settingsWrapper: {
    width: 290, // Fixed width for the settings wrapper
    alignItems: 'center', // Center the content inside the wrapper
    margin: theme.spacing.s,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Settings;
