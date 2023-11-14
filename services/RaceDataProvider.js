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

const DEFAULT_PERSONAL_BESTS = [
  { id: '1', event: '5k', distance: '5' },
  { id: '2', event: '10k', distance: '10' },
  { id: '3', event: 'Half Marathon', distance: '21.1' },
  { id: '4', event: 'Marathon', distance: '42.2' },
];

const RaceDataProvider = ({ children }) => {
  const [raceDataState, setRaceDataState] = useState([]);
  const [distanceUnit, setDistanceUnit] = useState('km')
  const [personalBests, setPersonalBests] = useState([]);

  // Fetch personal bests
  useEffect(() => {
    const fetchPersonalBests = async () => {
      const fetchedPersonalBests = await RaceDataServices.getPersonalBests();
      if (fetchedPersonalBests.length === 0) {
        setPersonalBests(DEFAULT_PERSONAL_BESTS);
        for (const personalBest of DEFAULT_PERSONAL_BESTS) {
          await RaceDataServices.saveOrUpdatePersonalBest(
            personalBest.event,
            personalBest.distance,
            personalBest.id,
          );
        }
      } else {
        setPersonalBests(fetchedPersonalBests);
      }
    };

    fetchPersonalBests();
  }, []);

  // Fetch and rank race data
  useEffect(() => {
    const fetchAndRankRaceData = async () => {
      const fetchedData = await RaceDataServices.getRaceData();
      const rankedData = rankRaces(fetchedData, personalBests);
      setRaceDataState(rankedData);
    };

    if (personalBests.length > 0) {
      fetchAndRankRaceData();
    }
  }, [personalBests]);
  
  // Get distance unit preference
  useEffect(() => {
    RaceDataServices.getDistanceUnitPreference()
      .then((unit) => {
        setDistanceUnit(unit);
      });
  }, []);

  const handleNewRaceData = useCallback(async (newData) => {
    try {
      const updatedData = await RaceDataServices.addNewRace(newData);
      const rankedData = rankRaces(updatedData, personalBests); 
      setRaceDataState(rankedData);
    } catch (error) {
      console.error('Error adding new race data', error);
    }
  }, [personalBests]);

  const handleDeleteRaceData = useCallback(async (raceId) => {
    try {
      const updatedData = await RaceDataServices.deleteRace(raceId);
      const rankedData = rankRaces(updatedData, personalBests);
      setRaceDataState(rankedData);
    } catch (error) {
      console.error('Error deleting race data', error);
    }
  }, [personalBests]);

  const handleUpdateRaceData = useCallback(async (raceId, updates) => {
    try {
      const updatedData = await RaceDataServices.updateRace(raceId, updates);
      const rankedData = rankRaces(updatedData, personalBests);
      setRaceDataState(rankedData);
    } catch (error) {
      console.error('Error updating race data', error);
    }
  }, [personalBests]);

  const handleSetPersonalBest = useCallback(async (event, distance, id) => {
    try {
      const updatedPersonalBests = await RaceDataServices.saveOrUpdatePersonalBest(event, distance, id);
      setPersonalBests(updatedPersonalBests);
    } catch (error) {
      console.error('Error setting personal best', error);
    }
  }, [setPersonalBests]);

  const handleDeletePersonalBest = useCallback(async (id) => {
    try {
      const updatedPersonalBests = await RaceDataServices.deletePersonalBest(id);
      setPersonalBests(updatedPersonalBests);
    } catch (error) {
      console.error('Error deleting personal best', error);
    }
  }, [setPersonalBests]);

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
