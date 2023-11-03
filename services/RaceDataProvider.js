import React, { useState, useEffect, useCallback, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rankRaces } from '../utilities/raceDataUtils';
import RaceDataServices from './RaceDataServices';

export const RaceDataContext = createContext({
  raceData: [],
  onNewRaceData: () => {},
  onDeleteRaceData: () => {},
});

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

  const handleDeleteRaceData = useCallback(async (raceId) => {
    try {
      console.log('Before deletion', raceDataState);
      const updatedData = await RaceDataServices.deleteRace(raceId);
      console.log('After deletion', updatedData);
      setRaceDataState(rankRaces(updatedData));
      await AsyncStorage.setItem('raceData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error deleting race data', error);
    }
  }, [raceDataState]);


  return (
    <RaceDataContext.Provider value={{
      raceData: rankRaces(raceDataState), // make sure to rank the races before providing them
      onNewRaceData: handleNewRaceData,
      onDeleteRaceData: handleDeleteRaceData
    }}>
      {children}
    </RaceDataContext.Provider>
  );
};

export default RaceDataProvider;
