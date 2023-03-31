import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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
var email;


const MyBtn = document.getElementById("TheButton");

MyBtn.addEventListener("click",function(e){
    email = document.getElementById("EmailBtn").value;
    
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        alert("Email has been sent");
        window.location.href = "http://localhost:3000/login";

    })
    .catch((error)=>{
        alert(error);
    });


});
