import React, { useState, useEffect, useCallback, createContext } from 'react';
import RaceDataServices from './RaceDataServices';
import { rankRaces } from '../utilities/raceDataUtils'; 

export const RaceDataContext = createContext({
  raceData: [],
  distanceUnit: 'km',
  personalBests: {},
  setDistanceUnit: () => {},
  onNewRaceData: () => {},
  onDeleteRaceData: () => {},
  onUpdateRaceData: () => {},
  setPersonalBest: () => {},
  deletePersonalBest: () => {},
});

const DEFAULT_PERSONAL_BESTS = {
  '5k': '5',
  '10k': '10',
  'Half Marathon': '21.1',
  'Marathon': '42.2'
};

const RaceDataProvider = ({ children }) => {
  const [raceDataState, setRaceDataState] = useState([]);
  const [distanceUnit, setDistanceUnit] = useState('km')
  const [personalBests, setPersonalBests] = useState({});

  useEffect(() => {
    const initializeData = async () => {
      const fetchedData = await RaceDataServices.getRaceData();
      const rankedData = rankRaces(fetchedData);
      setRaceDataState(rankedData);

      const fetchedPersonalBests = await RaceDataServices.getPersonalBests();
      if (Object.keys(fetchedPersonalBests).length === 0) {
        // If no personal bests are stored, set to default values
        setPersonalBests(DEFAULT_PERSONAL_BESTS);
        await RaceDataServices.saveOrUpdateMultiplePersonalBests(DEFAULT_PERSONAL_BESTS);
      } else {
        // Use the fetched personal bests
        setPersonalBests(fetchedPersonalBests);
      }
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

  const handleSetPersonalBest = useCallback(async (event, distance) => {
    try {
      await RaceDataServices.saveOrUpdatePersonalBest(event, distance);
      setPersonalBests(prevBests => ({ ...prevBests, [event]: distance }));
    } catch (error) {
      console.error('Error setting personal best', error);
    }
  }, []);

  const handleDeletePersonalBest = useCallback(async (event) => {
    try {
      await RaceDataServices.deletePersonalBest(event);
      setPersonalBests(prevBests => {
        const updatedBests = { ...prevBests };
        delete updatedBests[event];
        return updatedBests;
      });
    } catch (error) {
      console.error('Error deleting personal best', error);
    }
  }, []);

  return (
    <RaceDataContext.Provider
      value={{
        raceData: raceDataState,
        distanceUnit: distanceUnit,
        personalBests: personalBests,
        onNewRaceData: handleNewRaceData,
        onDeleteRaceData: handleDeleteRaceData,
        onUpdateRaceData: handleUpdateRaceData,
        setDistanceUnit: (unit) => {
          setDistanceUnit(unit);
          RaceDataServices.setDistanceUnitPreference(unit); 
        },
        setPersonalBest: handleSetPersonalBest,
        deletePersonalBest: handleDeletePersonalBest,
      }}
    >
      {children}
    </RaceDataContext.Provider>
  );
};

export default RaceDataProvider;
