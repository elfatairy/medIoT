import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data to AsyncStorage
export const saveData = async (key, value) => {
   try {
      await AsyncStorage.setItem(key, value);
   } catch (error) {
      console.error('Error saving data:', error);
   }
};

   // Retrieve data from AsyncStorage
export const getData = async (key) => {
   try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
         return value;
      }
   } catch (error) {
      console.error('Error retrieving data:', error);
   }
};