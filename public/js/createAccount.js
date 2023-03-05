const firebase = require('firebase');
const { initializeApp } = require('firebase/app');
require('firebase/database');

const firebaseConfig = {
    apiKey: "undefined",
    authDomain: "undefined",
    projectId: "login-sign-up-the-artmart",
    storageBucket: "undefined",
    messagingSenderId: "undefined",
    appId: "1:472331438304:web:4cd9fba159c8888029a885"
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