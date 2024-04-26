import express from "express";

import BodyParser from "body-parser";

import * as FirebaseService from "./firebaseService.js";
import {Expo} from "expo-server-sdk";
import { CronJob } from "cron";

const app = express();
const port = 8000;

const expo = new Expo();

const jsonParser = BodyParser.json();
const httpParser = BodyParser.urlencoded({ extended: false });

let tempSent = false;
let humdSent = false;
let airSent = false;
let emergSent = false;

new CronJob(
   "*/10 * * * * *",
   async function() {
      const token = await FirebaseService.getToken();
      const temp = await FirebaseService.getTemprature();
      const humd = await FirebaseService.getHumidity();
      const air = await FirebaseService.getAirQuality();
      const emergency = await FirebaseService.getEmergency();

      if (temp > 26) {
         if(!tempSent) {
            expo.sendPushNotificationsAsync([
               {
                  to: token,
                  title: "WARNING!",
                  body: "Temprature is too high"
               }
            ]);
            tempSent = true;
         }
      } else {
         tempSent = false;
      }
      
      if (humd > 60) {
         if(!humdSent) {
            expo.sendPushNotificationsAsync([
               {
                  to: token,
                  title: "WARNING!",
                  body: "Humidity is too high"
               }
            ]);
            humdSent = true;
         }
      } else {
         humdSent = false;
      }
      
      if (air > 400) {
         if(!airSent) {
            expo.sendPushNotificationsAsync([
               {
                  to: token,
                  title: "WARNING!",
                  body: "Air Quality is too low"
               }
            ])
            airSent = true;
         }
      } else {
         airSent = false;
      }
      
      if (emergency == "on") {
         if(!emergSent) {
            expo.sendPushNotificationsAsync([
               {
                  to: token,
                  title: "WARNING!",
                  body: "There is an emergency"
               }
            ])
            emergSent = true;
         }
      } else {
         emergSent = false;
      }
   },
   null,
   true
)

app.post("/registerPushToken", jsonParser, async (req, res) => {
   const token = String(req.body.token);
   await FirebaseService.saveToken(token);

   res.status(200).send("success");
});

app.listen(port, () => console.log(`listening on port: ${port}`));