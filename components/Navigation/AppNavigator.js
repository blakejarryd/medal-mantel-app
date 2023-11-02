import React, { useState, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RaceResultDetails from '../Races/MyRaces/RaceResultDetails';
import BottomTabNavigator from './BottomTabNavigator';
import theme from '../../theme';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [activeRouteName, setActiveRouteName] = useState('myraces'); // Start with 'myraces' as default

  // Callback to set the active route name
  const handleSetActiveRouteName = useCallback((routeName) => {
    setActiveRouteName(routeName);
  }, []);

  // Dynamic header title based on the active route
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
      <Stack.Screen name="ResultDetails" component={RaceResultDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
