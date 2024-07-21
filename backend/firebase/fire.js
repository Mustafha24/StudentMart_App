const {initializeApp} = require('firebase/app');
const {getDatabase}=require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAhyVkFy9DYfJ4pZqGkTVdzJc92JrTe-3Q",
  authDomain: "marketplace-c9f19.firebaseapp.com",
  databaseURL: "https://marketplace-c9f19-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "marketplace-c9f19",
  storageBucket: "marketplace-c9f19.appspot.com",
  messagingSenderId: "409354266615",
  appId: "1:409354266615:web:14c959ef16e0fb7c7270f2",
  measurementId: "G-6PKX89N4RL" 
};

const app=initializeApp(firebaseConfig);
const database = getDatabase(app)

module.exports = database; 