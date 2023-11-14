import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import DistanceUnit from './DistanceUnit';
import PersonalBestView from './PersonalBestView';

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.settingsCard}>
          <DistanceUnit />
          <PersonalBestView />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Move calculations to the top
    alignItems: 'center',
    backgroundColor: theme.colors.altBackground,
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
  },
  cardWrapper: {
    width: 350, // Fixed width for the card wrapper
    alignItems: 'center', // Center the card horizontally
    margin: theme.spacing.s,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Settings;
