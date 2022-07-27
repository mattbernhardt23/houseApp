import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAwClEqPpsma5oyMe7V8A5Dfw6G3vzBNw4",
  authDomain: "houseapp-4f52e.firebaseapp.com",
  projectId: "houseapp-4f52e",
  storageBucket: "houseapp-4f52e.appspot.com",
  messagingSenderId: "359966264879",
  appId: "1:359966264879:web:13b4e685565cdcbfe340da",
  measurementId: "G-193C26V3J8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()