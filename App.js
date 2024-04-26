import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import LoginScreen from './app/login';
import SignupScreen from './app/signup';
import HomeScreen from './app/home';
import TempratureScreen from './app/temprature';
import HumidityScreen from './app/humidity';
import AirqualityScreen from './app/airquality';
import EmegrencyScreen from './app/emergency';
import { useEffect, useRef, useState } from 'react';
import { usePushNotifications } from "./usePushNotifications";


export default function App() {
  const pagerRef = useRef(null);
  const [logged, setLogged] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { expoPushToken, notification } = usePushNotifications();

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    console.log(expoPushToken);
  }, [expoPushToken]);

  return (
    <View style={{ flex: 1 }}>
        {
          currentPage == 0?
          <LoginScreen goToPage={goToPage} setLogged={setLogged}/>:
          currentPage == 1?
          <SignupScreen goToPage={goToPage}/>:
          currentPage == 2?
          <HomeScreen goToPage={goToPage}/>:
          currentPage == 3?
          <TempratureScreen goToPage={goToPage}/>:
          currentPage == 4?
          <HumidityScreen goToPage={goToPage}/>:
          currentPage == 5?
          <AirqualityScreen goToPage={goToPage}/>:
          currentPage == 6?
          <EmegrencyScreen goToPage={goToPage} currentPage={currentPage}/>:null
        }
    </View>
  );
}
