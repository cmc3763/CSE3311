// Import the necessary Firebase libraries
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Import petite-vue
import { createApp } from 'https://unpkg.com/petite-vue?module';

// Your Firebase project's configuration
const firebaseConfig = {
    apiKey: "undefined",
    authDomain: "undefined",
    projectId: "login-sign-up-the-artmart",
    storageBucket: "undefined",
    messagingSenderId: "undefined",
    appId: "1:472331438304:web:4cd9fba159c8888029a885"
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
