import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";


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



const MyBtn = document.getElementById("loginBtn");


MyBtn.addEventListener("click", function(e) {
    var email = document.getElementById('email');
    var password = document.getElementById('password');


    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Set the user is sessionStorage
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("user", JSON.stringify(userCredential.user));
            window.location.href = "http://localhost:3000";
        })
        .catch((error) => {
            let errorMsg = document.getElementById("errorMsg");
            errorMsg.style.display = "block";
        });
});













// Initialize Firebase



