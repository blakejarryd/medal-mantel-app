import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import DistanceUnit from './DistanceUnit';
import Events from './Events/Events';

const Settings = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.cardWrapper}>
        <View style={styles.settingsCard}>
          <DistanceUnit />
          <Events />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.altBackground,
  },
  container: {
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
  },
  cardWrapper: {
    alignItems: 'center', 
    margin: theme.spacing.s,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Settings;
