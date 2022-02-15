const admin = require("firebase-admin");

const serviceAccount = require("../Firebase/firebase-config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://support-demo-e9c2c-default-rtdb.firebaseio.com/",
  storageBucket: "support-demo-e9c2c.appspot.com",
});

module.exports = admin;