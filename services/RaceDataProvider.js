import React, { useState, useEffect, useCallback, createContext } from 'react';
import RaceDataServices from './RaceDataServices';
import { rankRaces } from '../utilities/raceDataUtils'; 

export const RaceDataContext = createContext({
  raceData: [],
  distanceUnit: 'mi',
  setDistanceUnit: () => {},
  onNewRaceData: () => {},
  onDeleteRaceData: () => {},
  onUpdateRaceData: () => {},
});

const RaceDataProvider = ({ children }) => {
  const [raceDataState, setRaceDataState] = useState([]);
  const [distanceUnit, setDistanceUnit] = useState('km')

  useEffect(() => {
    const initializeData = async () => {
      const fetchedData = await RaceDataServices.getRaceData();
      const rankedData = rankRaces(fetchedData); 
      setRaceDataState(rankedData);
    };

    initializeData();

    RaceDataServices.getDistanceUnitPreference()
      .then((unit) => {
        setDistanceUnit(unit);
      });
  }, []);

  const handleNewRaceData = useCallback(async (newData) => {
    try {
      const updatedData = await RaceDataServices.addNewRace(newData);
      const rankedData = rankRaces(updatedData); 
      setRaceDataState(rankedData);
    } catch (error) {
      console.error('Error adding new race data', error);
    }
  }, []);

  const handleDeleteRaceData = useCallback(async (raceId) => {
    try {
      const updatedData = await RaceDataServices.deleteRace(raceId);
      const rankedData = rankRaces(updatedData);
      setRaceDataState(rankedData);
    } catch (error) {
      console.error('Error deleting race data', error);
    }
  }, []);

  const handleUpdateRaceData = useCallback(async (raceId, updates) => {
    try {
      const updatedData = await RaceDataServices.updateRace(raceId, updates);
      const rankedData = rankRaces(updatedData);
      setRaceDataState(rankedData);
    } catch (error) {
      console.error('Error updating race data', error);
    }
  }, []);

  return (
    <RaceDataContext.Provider
      value={{
        raceData: raceDataState,
        distanceUnit: distanceUnit,
        onNewRaceData: handleNewRaceData,
        onDeleteRaceData: handleDeleteRaceData,
        onUpdateRaceData: handleUpdateRaceData,
        setDistanceUnit: (unit) => {
          setDistanceUnit(unit);
          RaceDataServices.setDistanceUnitPreference(unit); 
        },
      }}
    >
      {children}
    </RaceDataContext.Provider>
  );
};

export default RaceDataProvider;
