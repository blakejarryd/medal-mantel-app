import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/Navigation/BottomTabNavigator'; // Import the new BottomTabNavigator
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import theme from './theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './components/Navigation/AppNavigator'

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: 100
  },
});