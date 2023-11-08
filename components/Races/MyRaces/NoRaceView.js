import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NoRaceView = () => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.welcomeTitle}>Welcome to Medal One</Text>
    <Text style={styles.instructions}>
      To get started, add your first race result by tapping the "+" button below.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  welcomeIllustration: {
    width: '100%',
    height: 200, 
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default NoRaceView;
