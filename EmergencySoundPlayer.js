import React, { useEffect } from 'react';
import Sound from 'react-native-sound';
import { View } from 'react-native';

const BackgroundSoundPlayer = () => {
   useEffect(() => {
      const sound = new Sound('emergency_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
         if (error) {
         console.log('Error loading sound:', error);
         return;
         }

         sound.setNumberOfLoops(-1); // Set to loop indefinitely
         sound.play(); // Play the sound
      });

      return () => {
         sound.stop(); // Stop the sound when the component unmounts
         sound.release(); // Release resources
      };
   }, []);

   return <View></View>; // This component doesn't render anything in the UI
};

export default BackgroundSoundPlayer;
