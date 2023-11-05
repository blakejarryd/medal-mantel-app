import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const RACE_DATA_KEY = 'raceData';

const getRaceData = async () => {
  try {
    const existingData = await AsyncStorage.getItem(RACE_DATA_KEY);
    return existingData ? JSON.parse(existingData) : [];
  } catch (e) {
    console.error("Failed to fetch data", e);
    return []; // Consider how you want to handle errors
  }
};

const saveRaceData = async (newData) => {
  try {
    await AsyncStorage.setItem(RACE_DATA_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error("Failed to save the data", e);
    // Handle the error according to your needs
  }
};

const addNewRace = async (newRace) => {
  const currentData = await getRaceData();
  const newRaceWithId = { ...newRace, id: uuidv4() };
  const updatedData = [...currentData, newRaceWithId];
  await saveRaceData(updatedData);
  return updatedData; // Return updated data for immediate use
};

const deleteRace = async (raceId) => {
  try {
    const currentData = await getRaceData();
    const updatedData = currentData.filter(race => race.id !== raceId);
    await saveRaceData(updatedData);
    return updatedData; // Return updated data for immediate use
  } catch (e) {
    console.error("Failed to delete the race", e);
  }
};

const updateRace = async (raceId, raceUpdates) => {
  try {
    const currentData = await getRaceData();
    const updatedData = currentData.map(race =>
      race.id === raceId ? { ...race, ...raceUpdates } : race
    );
    await saveRaceData(updatedData);
    return updatedData; // Return updated data for immediate use
  } catch (e) {
    console.error("Failed to update the race", e);
  }
};

export default {
  getRaceData,
  saveRaceData,
  addNewRace,
  deleteRace,
  updateRace,
};
