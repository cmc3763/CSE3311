
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const auth = getAuth();


var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var email = document.getElementById('email');
var password = document.getElementById("password");



  window.signup = function(e){
    e.preventDefault();

    createUserWithEmailAndPassword(auth,email.value,password.value)
    .then(function(success){
      alert("signup sucessfully")
    })
    .catch(function(err){
      alert("error" + err)
    })

    console.log(email);
    console.log(password);
  }