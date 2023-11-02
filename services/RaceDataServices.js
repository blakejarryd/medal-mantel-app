// RaceDataService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const updatedData = [...currentData, newRace];
  await saveRaceData(updatedData);
  return updatedData; // Return updated data for immediate use
};

// ... Include other CRUD operations similarly

export default {
  getRaceData,
  saveRaceData,
  addNewRace,
  // ... export other CRUD operations
};
