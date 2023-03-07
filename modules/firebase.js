var fb_app = require("firebase/app");
var fb_auth = require("firebase/auth");

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVsw8cVFyZj5KwRAMID2Dc06amVD6_LVg",
  authDomain: "login-for-the-artmart.firebaseapp.com",
  databaseURL: "https://login-for-the-artmart-default-rtdb.firebaseio.com",
  projectId: "login-for-the-artmart",
  storageBucket: "login-for-the-artmart.appspot.com",
  messagingSenderId: "453895598278",
  appId: "1:453895598278:web:cac2395b4d9c635e54a7c7",
};

const app = fb_app.initializeApp(firebaseConfig);
const auth = fb_auth.getAuth(app);

function newUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
