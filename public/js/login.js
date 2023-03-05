// Import the necessary Firebase libraries
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Import petite-vue
import { createApp } from 'https://unpkg.com/petite-vue?module';

// Your Firebase project's configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVsw8cVFyZj5KwRAMID2Dc06amVD6_LVg",
    authDomain: "login-for-the-artmart.firebaseapp.com",
    databaseURL: "https://login-for-the-artmart-default-rtdb.firebaseio.com",
    projectId: "login-for-the-artmart",
    storageBucket: "login-for-the-artmart.appspot.com",
    messagingSenderId: "453895598278",
    appId: "1:453895598278:web:cac2395b4d9c635e54a7c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create the Vue app
const vm = createApp({
  email: '',
  password: '',
  handleLogin() {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        console.log('Successfully logged in.');
        // Redirect the user to their dashboard or homepage
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        // Display an error message to the user
      });
  }
}).mount('#login');