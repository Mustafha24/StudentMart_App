import { auth } from "./Fire"; // Ensure the correct path to Fire.js
import { signInWithCustomToken } from "firebase/auth";

const authenticate = (token, firebaseToken, cb) => {
  console.log("Starting authentication with Firebase token:",);

  signInWithCustomToken(auth, firebaseToken)
    .then((userCredential) => {
      console.log("Authentication successful:", userCredential);
      cb(token, firebaseToken);
    })
    .catch((error) => {
      console.error("Error during Firebase authentication:", error.message);
      console.error("Error details:", error);
    });
};


export default {
  authenticate,
};
