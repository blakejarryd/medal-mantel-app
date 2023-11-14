import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RACE_DATA_KEY = 'raceData';
const DISTANCE_UNIT_KEY = 'distanceUnit';
const PERSONAL_BESTS_KEY = 'personalBests';

const getRaceData = async () => {
  try {
    const existingData = await AsyncStorage.getItem(RACE_DATA_KEY);
    return existingData ? JSON.parse(existingData) : [];
  } catch (e) {
    console.error('Failed to fetch data', e);
    return [];
  }
};

const saveRaceData = async (newData) => {
  try {
    await AsyncStorage.setItem(RACE_DATA_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error('Failed to save the data', e);
  }
};

const addNewRace = async (newRace) => {
  const currentData = await getRaceData();
  const newRaceWithId = { ...newRace, id: uuidv4() };
  const updatedData = [...currentData, newRaceWithId];
  await saveRaceData(updatedData);
  return updatedData;
};

const deleteRace = async (raceId) => {
  try {
    const currentData = await getRaceData();
    const updatedData = currentData.filter((race) => race.id !== raceId);
    await saveRaceData(updatedData);
    return updatedData;
  } catch (e) {
    console.error('Failed to delete the race', e);
  }
};

const updateRace = async (raceId, raceUpdates) => {
  try {
    const currentData = await getRaceData();
    const updatedData = currentData.map((race) =>
      race.id === raceId ? { ...race, ...raceUpdates } : race
    );
    await saveRaceData(updatedData);
    return updatedData;
  } catch (e) {
    console.error('Failed to update the race', e);
  }
};

const getDistanceUnitPreference = async () => {
  try {
    const unit = await AsyncStorage.getItem(DISTANCE_UNIT_KEY);
    return unit || 'km'; // Default to 'km' if not found in AsyncStorage
  } catch (e) {
    console.error('Failed to fetch distance unit preference', e);
    return 'km'; // Default to 'km' in case of an error
  }
};

const setDistanceUnitPreference = async (unit) => {
  try {
    await AsyncStorage.setItem(DISTANCE_UNIT_KEY, unit);
  } catch (e) {
    console.error('Failed to save distance unit preference', e);
  }
};

const getPersonalBests = async () => {
  try {
    const existingData = await AsyncStorage.getItem(PERSONAL_BESTS_KEY);
    return existingData ? JSON.parse(existingData) : [];
  } catch (e) {
    console.error('Failed to fetch personal bests', e);
    return [];
  }
};

const saveOrUpdatePersonalBest = async (event, distance, id = null) => {
  try {
    const personalBests = await getPersonalBests();
    if (id) {
      const existingPersonalBestIndex = personalBests.findIndex(pb => pb.id === id);
      if (existingPersonalBestIndex !== -1) {
        personalBests[existingPersonalBestIndex] = { id, event, distance };
      } else {
        personalBests.push({ id, event, distance });
      }
    } else {
      const uuid = uuidv4(); 
      personalBests.push({ id: uuid, event, distance });
    }
    await AsyncStorage.setItem(PERSONAL_BESTS_KEY, JSON.stringify(personalBests));
    
    // Return the updated personalBests array
    return personalBests;
  } catch (e) {
    console.error('Failed to save or update personal best', e);
    return []; // Return an empty array or handle the error appropriately
  }
};

const deletePersonalBest = async (id) => {
  try {
    const personalBests = await getPersonalBests();
    const updatedPersonalBests = personalBests.filter((pb) => pb.id !== id);
    await AsyncStorage.setItem(PERSONAL_BESTS_KEY, JSON.stringify(updatedPersonalBests));
    
    // Return the updated personalBests array
    return updatedPersonalBests;
  } catch (e) {
    console.error('Failed to delete personal best', e);
    return []; // Return an empty array or handle the error appropriately
  }
};

export default {
  getRaceData,
  addNewRace,
  deleteRace,
  updateRace,
  getDistanceUnitPreference, 
  setDistanceUnitPreference,
  getPersonalBests,
  saveOrUpdatePersonalBest,
  deletePersonalBest,
};
