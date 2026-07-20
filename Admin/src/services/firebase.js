import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


  const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "restaurant-app-166ea.firebaseapp.com",
  databaseURL: "https://restaurant-app-166ea-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-166ea",
  storageBucket: "restaurant-app-166ea.firebasestorage.app",
  messagingSenderId: "461147532505",
  appId: "1:461147532505:web:9fcd450580fadbc511e2c8",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const DATABASE_URL = firebaseConfig.databaseURL;