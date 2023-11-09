import React, { useState, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RaceResultDetails from '../Races/RaceResultDetails/RaceResultDetails';
import BottomTabNavigator from './BottomTabNavigator';
import Settings from '../Settings/Settings';
import theme from '../../theme';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [activeRouteName, setActiveRouteName] = useState('myraces'); 

  const handleSetActiveRouteName = useCallback((routeName) => {
    setActiveRouteName(routeName);
  }, []);

  const getHeaderTitle = () => {
    switch (activeRouteName) {
      case 'myraces':
        return 'My Races';
      case 'personalbests':
        return 'Personal Bests';
      case 'settings':
        return 'Settings';
      default:
        return 'Races';
    }
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home"
        children={(props) => (
          <BottomTabNavigator 
            {...props} 
            setActiveRouteName={handleSetActiveRouteName} 
          />
        )}
        options={{
          headerShown: true,
          title: getHeaderTitle(),
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.primary,
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="ResultDetails"
        component={RaceResultDetails}
        options={{
          headerShown: true,
          presentation: 'modal',
          title: 'Race Details', 
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.primary,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          title: 'Settings', 
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.primary,
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
