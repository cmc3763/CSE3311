const firebase = require('firebase');
const { initializeApp } = require('firebase/app');
require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyAVsw8cVFyZj5KwRAMID2Dc06amVD6_LVg",
    authDomain: "login-for-the-artmart.firebaseapp.com",
    databaseURL: "https://login-for-the-artmart-default-rtdb.firebaseio.com",
    projectId: "login-for-the-artmart",
    storageBucket: "login-for-the-artmart.appspot.com",
    messagingSenderId: "453895598278",
    appId: "1:453895598278:web:cac2395b4d9c635e54a7c7"
};

const app = initializeApp(firebaseConfig);
const database = firebase.database();

window.vue = createApp({
  newPassword: '',
  newPasswordConfirm: '',
  createAccount() {
    const nameInput = document.querySelector('#nameInput');
    const emailInput = document.querySelector('#emailInput');
    const passwordInput = document.querySelector('#passwordInput');
    const passwordConfirmInput = document.querySelector('#passwordConfirmInput');

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }

    firebase.database().ref('users/' + name).set({
      name: name,
      email: email,
      password: password,
    }).then(() => {
      alert('User created successfully!');
    }).catch((error) => {
      alert('Error creating user: ' + error);
    });
  }
}).mount();