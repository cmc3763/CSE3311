import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";


// Protected page, if the user isn't logged in, redirect to /login
if (!JSON.parse(sessionStorage.getItem("loggedIn"))) {
    window.location = "/login";
  }
  

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
const auth = getAuth();
const MyBtn = document.getElementById("SignOutBtn");

MyBtn.addEventListener("click",function(e){
    auth.signOut().then(() =>{
      sessionStorage.setItem("loggedIn", false);
      sessionStorage.setItem("user", null);
      setTimeout(() => {
          window.location = "/login";
      }, 1000);
    });
});



