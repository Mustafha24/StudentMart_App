const admin = require("./index");
const winston = require("winston");
const { ref, push, child } =require("firebase/database");
const database=require("./fire")
const createUser = async (data) => {
  admin
    .auth()
    .createUser(data)
    .then((userRecord) => {
      winston.info("Successfully created new user: ", userRecord.uid);
    })
    .catch((error) => {
      winston.error("Error creating new user:", error);
    });
};

const authenticate = async (uid, callback) => {
  admin
    .auth()
    .createCustomToken(uid)
    .then((customToken) => {
      callback(customToken);
    })
    .catch((error) => {
      winston.error("Error creating custom token:");
      winston.error(error);
    });
};

const sendMessage = async (conversationId, listingId, message) => {
  console.log(database)
  const dbRef = ref(database);
  const messageRef = child(dbRef, `${listingId}/${conversationId}/`);

  try {
    await push(messageRef, message);
    console.log('Message sent successfully!');
  } catch (err) {
    console.error('Error sending message:', err);
  }
};

module.exports = {
  createUser,
  authenticate,
  sendMessage,
};
