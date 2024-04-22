import { StyleSheet, Text, View, Animated } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Logout from '../logoutComp';
import { ref, onValue } from "firebase/database";
import { Audio } from 'expo-av';
import { Pressable } from 'react-native';
import { database } from '../firebaseConfig';
import { Link } from 'expo-router';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);

export default function EmegrencyScreen({ goToPage, currentPage }) {
   
   const [scaleAnim] = useState(new Animated.Value(1));
   const [isEmergency, setIsEmergency] = useState(true);

   const [first, setFirst] = useState(true);

   useEffect(() => {
      const animation = Animated.loop(
         
         Animated.sequence([
            Animated.timing(scaleAnim, {
               toValue: .9, // Increase size to 20% larger than original
               useNativeDriver: true, 
               duration: 700, // Add duration for better performance
            }),
            Animated.timing(scaleAnim, {
               toValue: 1, // Increase size to 20% larger than original
               useNativeDriver: true, // Add useNativeDriver for better performance
               duration: 700, // Add duration for better performance
            }),
         ])
      );
      animation.start();
   
      const starCountRef = ref(database, 'emergency');
      
      const soundObject = new Audio.Sound();
      
      onValue(starCountRef, async (snapshot) => {
         const data = snapshot.val();
         setIsEmergency(data.value == "on");
         
         if(data.value == "on") {
            await soundObject.loadAsync(require('../emergency_sound.mp3'));
            await soundObject.playAsync({ shouldPlay: true, isLooping: true });
         } else {
            soundObject && soundObject.unloadAsync();
         }
      });

      return () => {
         animation.stop();
         soundObject && soundObject.unloadAsync();
      };
   }, []);

   return (  
      <View style={styles.container}>
         <Pressable onPress={() => {goToPage(2)}} style={styles.top}>
            <MaterialIcons name="arrow-back" size={24} color="#2980b9" />
            <Text style={styles.backText}>sensors</Text>
         </Pressable>
         <View style={styles.content}>
            {
               isEmergency?
               <View style={styles.block}>
                  <AnimatedIcon style={{ transform: [{ scale: scaleAnim }] }} name="exclamation-triangle" size={300} color="#c0392b" />
                  <Text style={styles.dangerText}>EMERGENCY</Text>
               </View>:
               <View style={styles.block}>
                  <FontAwesome5 name="shield-alt" size={300} color="#27ae60" />
                  <Text style={styles.noDangerText}>No Emergency</Text>
               </View>
            }
         </View>
         <View></View>
         <Logout soundObject goToPage/>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 20,
      justifyContent: "space-between"
   },
   top: {
      flexDirection: "row",
      gap: 5,
      marginBottom: 20
   },
   backText: {
      color: "#2980b9",
      fontWeight: "500",
   },
   content: {
      marginBottom: 150,
   },
   block: {
      justifyContent: "center",
      alignItems: "center"
   },
   dangerText: {
      color: "#c0392b",
      fontSize: 50,
      fontWeight: "400",
   },
   noDangerText: {
      color: "#27ae60",
      fontSize: 50,
      fontWeight: "400",
   }
});