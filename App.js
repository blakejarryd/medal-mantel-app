import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabNavigator from './components/Navigation/BottomTabNavigator'; // Import the new BottomTabNavigator
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import theme from './theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './components/Navigation/AppNavigator'
import RaceDataProvider from './services/RaceDataProvider'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer>
            <RaceDataProvider>
              <AppNavigator />
            </RaceDataProvider>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: 100
  },
});