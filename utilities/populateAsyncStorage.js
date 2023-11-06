import AsyncStorage from '@react-native-async-storage/async-storage';

const setMockData = async (mockRaceData) => {
  try {
    await AsyncStorage.setItem('raceData', JSON.stringify(mockRaceData));
    console.log("Mock data set successfully!");
  } catch (e) {
    console.error("Error setting mock data: ", e);
  }
};

const checkDataExistsAndSetMockData = async (mockRaceData) => {
  try {
    const existingData = await AsyncStorage.getItem('raceData');
    if (existingData === null) {
      await setMockData(mockRaceData); 
    }
  } catch (e) {
    console.error("Error checking and setting mock data: ", e);
  }
};

export default checkDataExistsAndSetMockData