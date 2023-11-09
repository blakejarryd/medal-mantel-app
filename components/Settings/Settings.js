import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import DistanceUnit from './DistanceUnit';

const Settings = () => {
  return (
    <View style={styles.container}>
      <DistanceUnit />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.altBackground,
    paddingTop: theme.spacing.m,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Settings;