import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rankRaces } from '../../utilities/raceDataUtils';
import RaceDataServices from '../../services/RaceDataServices';

const RaceDataProvider = ({ children }) => {
  const [raceDataState, setRaceDataState] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      const fetchedData = await fetchDataFromStorage();
      setRaceDataState(fetchedData);
    };

    initializeData();
  }, []);

  const fetchDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('raceData');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // In case of an error, you can handle it or return an empty array
      console.error('Error fetching race data from storage', e);
      return [];
    }
  };

  const handleNewRaceData = useCallback(async (newData) => {
    try {
      const updatedData = await RaceDataServices.addNewRace(newData);
      // Make sure to use rankRaces if necessary before setting the state
      setRaceDataState(rankRaces(updatedData));
      await AsyncStorage.setItem('raceData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error adding new race data', error);
    }
  }, []);

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { data: rankRaces(raceDataState), onNewRaceData: handleNewRaceData })
  );

  return <>{childrenWithProps}</>;
};

export default RaceDataProvider;
