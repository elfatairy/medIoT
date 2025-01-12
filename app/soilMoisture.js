import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Logout from '../logoutComp';
import { Line, Path, Svg } from 'react-native-svg';
import { ref, onValue } from "firebase/database";
import { Pressable } from 'react-native';
import { database } from '../firebaseConfig';
import { Link } from 'expo-router';

export default function SoilMoistureScreen({ goToPage }) {

   const [soilMoisture, setSoilMoisture] = useState(0);
   const [soilMoistureData, setSoilMoistureData] = useState([]);

   const chartWidth = 280;
   const chartHeight = 200;

   const [hourLabels, setHourLabels] = useState([]);

   const [lastHour, setLastHour] = useState('');

   useEffect(() => {
         
      const starCountRef = ref(database, 'soilMoisture');

      onValue(starCountRef, (snapshot) => {
         const data = snapshot.val();
         setSoilMoisture(data.value);
         setSoilMoistureData(data['24h'].split(','));
         
         const now = new Date();
         const hour = now.getHours();
         if(hour != lastHour) {
            setHourLabels(Array.from({ length: 7 }, (_, index) => `${(index * 4 + hour - 1) % 12 == 0 ? 12 : (index * 4 + hour - 1) % 12} ${((index * 4 + hour - 1) % 24) >= 12 ? `PM` : 'AM'}`));
            setLastHour(hour);
         }
      });
   }, []);

   return (  
      <View style={styles.container}>
         <Pressable onPress={() => {goToPage(2)}} style={styles.top}>
            <MaterialIcons name="arrow-back" size={24} color="#2980b9" />
            <Text style={styles.backText}>sensors</Text>
         </Pressable>
         <LinearGradient
            colors={['#92400e', '#78350f']} 
            style={styles.block}>
            <View style={styles.blockContainer}>
               <Text style={styles.title}>Soil Moisture</Text>
               <View style={styles.value}>
                  <Text style={styles.number}>{soilMoisture}</Text>
                  <Text style={styles.unit}>%</Text>
               </View>
               <View style={styles.graphContainer}>
                  <View style={styles.yaxis}>
                     <Text style={styles.v}>{Math.min(1000, Math.max(...soilMoistureData))}%</Text>
                     <Text style={styles.v}>{Math.max(0, Math.min(...soilMoistureData))}%</Text>
                  </View>
                  <View style={styles.graph}>
                     <Svg width={chartWidth} height={chartHeight}>
                        <Line x1="0" y1="0" x2="0" y2={chartHeight} stroke="black" strokeWidth="1" />
                        <Line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="black" strokeWidth="1" />
                        <Path d={
                           soilMoistureData.map((soilMoisture, index) => ({
                              x: (index * chartWidth) / (soilMoistureData.length - 1),
                              y: ((soilMoisture - Math.min(...soilMoistureData)) / (Math.max(...soilMoistureData) - Math.min(...soilMoistureData))) * chartHeight + 1,
                           })).map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${chartHeight - point.y}`).join(' ')
                        } stroke="#fff" strokeWidth="3" fill="none" />
                     </Svg>
                     <View style={styles.labelsContainer}>
                        {hourLabels.map((hour, index) => (
                           <Text key={index} style={styles.hourLabel}>
                              {hour}
                           </Text>
                        ))}
                     </View>
                  </View>
               </View>
            </View>
         </LinearGradient>
         <Logout goToPage/>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 20,
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
   block: {   
      borderRadius: 10,
      paddingTop: 20,
      paddingBottom: 10,
      paddingHorizontal: 20,
   },
   blockContainer: {
      flexDirection: "column",
   },
   title: {
      fontSize: 20,
      fontWeight: '400',
      marginBottom: 0,
      color: "#f5f5f5",
   },
   value: {
      flexDirection: "row",
      gap: 5
   },
   number: {
      fontSize: 30,
      fontWeight: 'bold',
      color: "#fff"
   },
   unit: {
      fontSize: 30,
      fontWeight: 'bold',
      color: "#fff"
   },
   graphContainer: {
      gap: 5,
      flexDirection: "row",
   },
   yaxis: {
      justifyContent: "space-between",
      paddingBottom: 35,
      paddingTop: 20
   }, 
   graph: {
      marginTop: 30,
      marginBottom: 15
   },
   chart: {
      marginVertical: 8,
      borderRadius: 16,
   },
   labelsContainer: {
      marginLeft: 8,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   hourLabel: {
      fontSize: 12,
      marginBottom: 4,
      color: "#fff"
   },
   v: {
      fontSize: 12,
      color: "#fff"
   }
});