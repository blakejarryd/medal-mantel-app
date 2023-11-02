import React, {useEffect, useState} from 'react';
import { BottomNavigation } from 'react-native-paper';
import RaceResultsList from '../Races/MyRaces/RaceResultsList';
import MyRacesScreen from '../Races/PersonalBests/PersonalBests';
import Settings from '../Settings/Settings';
import raceData from '../../raceData';
import theme from '../../theme';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { rankRaces } from '../../utilities/raceDataUtils';
import checkDataExistsAndSetMockData from '../../utilities/populateAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RaceDataProvider from '../Races/RaceDataProvider';

const BottomTabNavigator = ({ setActiveRouteName }) => {
  const [index, setIndex] = React.useState(0);
  const [raceDataState, setRaceDataState] = useState([]);

  const [routes] = React.useState([
    { key: 'myraces', title: 'My Races' },
    { key: 'personalbests', title: 'Personal Bests' },
    // { key: 'settings', title: 'Settings' },
  ]);

  const sceneMap = {
    myraces: () => (
      <RaceDataProvider>
        <RaceResultsList />
      </RaceDataProvider>
    ),
    personalbests: () => (
      <RaceDataProvider>
        <MyRacesScreen />
      </RaceDataProvider>
    ),
    // settings: Settings,
  };

  const renderIcon = (props) => {
    const { route, focused } = props;
    const iconSize = 24;
    const color = focused ? theme.colors.primary : theme.colors.textSecondary;

    if (route.key === 'myraces') return <MaterialCommunityIcons name="run" size={iconSize} color={color} />;
    if (route.key === 'personalbests') return <MaterialCommunityIcons name="medal" size={iconSize} color={color} />;
    if (route.key === 'settings') return <Ionicons name="settings-sharp" size={iconSize} color={color} />;
    return null;
  };

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    if (setActiveRouteName) {
      setActiveRouteName(routes[newIndex].key);
    }
  };

  return (
    <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={handleIndexChange}
        renderScene={BottomNavigation.SceneMap(sceneMap)}
        renderIcon={renderIcon}
        shifting={false}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.textSecondary}
        barStyle={{ backgroundColor: theme.colors.background }}
    />
  );
};

export default BottomTabNavigator;
