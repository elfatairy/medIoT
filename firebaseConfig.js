import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyDcH4Uuwvvt9Keo8u6FhZpNumRq6L_5tB4",
   authDomain: "esp32-16690.firebaseapp.com",
   databaseURL: "https://esp32-16690-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "esp32-16690",
   storageBucket: "esp32-16690.appspot.com",
   messagingSenderId: "270762185717",
   appId: "1:270762185717:web:7712bb5b437b935fab46bc",
   measurementId: "G-P76M6SCGSH"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);