import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { Audio } from 'expo-av';

const Logout = ({ soundObject = false, goToPage }) => {
   
   const logout = () => {
      if(soundObject && (typeof soundObject == Audio.Sound) && soundObject.unloadAsync()) {
      }

      goToPage(0);
   }

   return (
      <View style={styles.logoutContainer}>
         <Pressable style={styles.logoutContainerContent} onPress={logout}>
            <FontAwesome name="sign-out" size={24} color="white" />
            <Text style={styles.logoutText}>Log Out</Text>
         </Pressable>   
      </View>
   )
}

export default Logout;

const styles = StyleSheet.create({
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