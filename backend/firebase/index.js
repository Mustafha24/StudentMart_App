const admin = require("firebase-admin");
require('dotenv').config();
// admin.initializeApp({
//     credential: admin.credential.cert({
//       type: process.env.FIREBASE_TYPE,
//       project_id: process.env.FIREBASE_PROJECT_ID,
//       private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//       private_key: process.env.FIREBASE_PRIVATE_KEY ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY) : undefined,
//       client_email: process.env.FIREBASE_CLIENT_EMAIL,
//       client_id: process.env.FIREBASE_CLIENT_ID,
//       auth_uri: process.env.FIREBASE_AUTH_URI,
//       token_uri: process.env.FIREBASE_TOKEN_URI,
//       auth_provider_x509_cert_url:
//         process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//       client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//     }),
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//   });
var serviceAccount=require('../firebaseCreds.json')
admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  databaseURL: "https://marketplace-c9f19-default-rtdb.asia-southeast1.firebasedatabase.app"
})
module.exports=admin;
