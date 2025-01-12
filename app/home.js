import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Logout from '../logoutComp';
import { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { Link } from "expo-router";
import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { database } from '../firebaseConfig';
import AiOutput from './aiOutput';

const ArrowIconWithBackground = () => {
   return (
      <View style={styles.iconContainer}>
         <View style={styles.background} />
         <Feather name="arrow-right" size={24} color="white" style={styles.icon} />
      </View>
   );
};

export default function HomeScreen({ goToPage }) {
   
   return (  
      <View style={styles.container}>
         <Text style={styles.title}>AgriHawk</Text>
         <View style={styles.blocks}>
            <View style={styles.row}>
               <LinearGradient
                  colors={['#e67e22', '#d35400']}
                  style={[styles.block, styles.temp]}>
                  <Pressable style={styles.blockContainer} onPress={() => {goToPage(3)}}>
                        <View style={styles.icons}>
                           <MaterialCommunityIcons name="thermometer" size={30} color="#fff" />
                           <ArrowIconWithBackground />
                        </View>
                        <Text style={styles.text}>Temprature</Text>
                  </Pressable>
               </LinearGradient>
               <LinearGradient
                  colors={['#3498db', '#3498db']}
                  style={[styles.block, styles.humd]}>
                  <Pressable style={styles.blockContainer} onPress={() => {goToPage(4)}}>
                        <View style={styles.icons}>
                           <MaterialIcons name="water" size={30} color="#fff" />
                           <ArrowIconWithBackground />
                        </View>
                        <Text style={styles.text}>Humidity</Text>
                  </Pressable>
               </LinearGradient>
            </View>
            <View style={styles.row}>
               <LinearGradient
                  colors={['#1abc9c', '#16a085']}
                  style={[styles.block, styles.air]}>
                  <Pressable style={styles.blockContainer} onPress={() => {goToPage(5)}}>
                        <View style={styles.icons}>
                           <FontAwesome5 name="mask" size={30} color="#fff" />
                           <ArrowIconWithBackground />
                        </View>
                        <Text style={styles.text}>VOCs</Text>
                  </Pressable>
               </LinearGradient>
               <LinearGradient
                  colors={['#92400e', '#78350f']}
                  style={[styles.block, styles.emerg]}>
                  <Pressable style={styles.blockContainer} onPress={() => {goToPage(6)}}>
                        <View style={styles.icons}>
                           <FontAwesome5 name="percentage" size={30} color="#fff" />
                           <ArrowIconWithBackground />
                        </View>
                        <Text style={styles.text}>Soil Moisture</Text>
                  </Pressable>
               </LinearGradient>
            </View>
         </View>
         <AiOutput />
         <Logout goToPage={goToPage}/>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 60,
      paddingHorizontal: 15,
      flex: 1,
      flexDirection: "column",
   },
   title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
   },
   blocks: {
      flexDirection: 'column',
      gap: 10,
   },
   row: {
      gap: 10,
      flexDirection: 'row',
      justifyContent: "center"
   },
   block: {
      width: 180,
      borderRadius: 10,
      color: "#fff",
      padding: 10
   },
   blockContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: 100,
   },
   temp: {
      backgroundColor: '#d35400',
   },
   humd: {
      backgroundColor: '#27ae60',
   },
   air: {
      backgroundColor: '#2980b9',
   },
   emerg: {
      backgroundColor: '#c0392b',
   },
   text: {
      color: '#fff',
      fontSize: 22
   },
   icons: {
      justifyContent: "space-between",
      flexDirection: "row",
   },
   iconContainer: {
      flexDirection: 'row', // Arrange icon and background horizontally
      alignItems: 'center',  
   },
   background: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)', // Opaque background color
      borderRadius: 20, // Adjust border radius as needed
      padding: 14,
      position: "absolute",
      right: -2
   },
   icon: {
   },
   logoutContainer: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: "#c0392b",
      padding: 10,
      borderRadius: 10,
   },
   logoutContainerContent: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 7

   },
   logoutText: {
      color: "#fff",
      fontWeight: "bold"
   }
});