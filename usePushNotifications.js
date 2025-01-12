import { useState, useEffect, useRef } from "react";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";

export const usePushNotifications = () => {
   Notifications.setNotificationHandler({
      handleNotification: async () => ({
         shouldShowAlert: true,
         shouldPlaySound: false,
         shouldSetBadge: false,
      }),
   });

   const [expoPushToken, setExpoPushToken] = useState("");
   const [notification, setNotification] = useState(false);
   const notificationListener = useRef();
   const responseListener = useRef();

   async function registerForPushTokensAsync() {
      let token;

      if (Device.isDevice) {
         console.log("is Device")
         const { status: existingStatus } = await Notifications.getPermissionsAsync();

         let finalStatus = existingStatus;

         if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            console.log("ungranted st");
         }
         if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            console.log("ungranted nd");
            return;
         }

         token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
         });
         console.log(Constants.expoConfig.extra.eas.projectId);
         console.log(token);

         if (Platform.OS === "Android") {
            console.log("yes android");
            Notifications.setNotificationChannelAsync("default", {
               name: "default",
               importance: Notifications.AndroidImportance.MAX,
               vibrationPattern: [0, 250, 250, 250],
               lightColor: "#FF231F7C",
            });
         }

         return token;
      } else {
         console.log("isn't device");
      }
   }

   useEffect(() => {
      registerForPushTokensAsync().then(async token => {
         try {
            console.log("entering");
            const baseApi = process.env.EXPO_PUBLIC_BACKEND_API;
            console.log(token.data);
            // const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_API}/registerPushToken`, {
            const res = await fetch(`${baseApi}/registerPushToken`, {
               headers: {
                  "Content-Type": "application/json",
               },
               method: "POST",
               body: JSON.stringify({
                  token: token.data
               })
            })
         } catch (error) {
            console.log("error");
            console.log(error);
         }
      });

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
         setNotification(notification);
      });

      return () => {
         Notifications.removeNotificationSubscription(notificationListener.current);
      }

   }, []);

   return {
      expoPushToken,
      notification
   }
}