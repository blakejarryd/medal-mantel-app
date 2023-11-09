import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RACE_DATA_KEY = 'raceData';
const DISTANCE_UNIT_KEY = 'distanceUnit';

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

export default {
  getRaceData,
  addNewRace,
  deleteRace,
  updateRace,
  getDistanceUnitPreference, 
  setDistanceUnitPreference,
};
