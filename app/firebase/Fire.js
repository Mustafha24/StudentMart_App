import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Add this import
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APP_CONFIG from "../config/config"; // Adjust the path as necessary
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: APP_CONFIG.API_KEY,
  authDomain: APP_CONFIG.AUTH_DOMAIN,
  databaseURL: APP_CONFIG.DATABASE_URL,
  projectId: APP_CONFIG.PROJECT_ID,
  storageBucket: APP_CONFIG.STORAGE_BUCKET,
  messagingSenderId: APP_CONFIG.MESSAGING_SENDER_ID,
  appId: APP_CONFIG.APP_ID,
  measurementId: APP_CONFIG.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Storage
const storage = getStorage(app); // Add this line
const database=getDatabase(app)
// Export the Auth and Storage instances
export { auth, storage,database };

