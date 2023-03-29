import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {getFirestore,collection,getDocs} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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
const db = getFirestore(app);


auth.onAuthStateChanged(user =>{
    
    var email = user.email;  

    const ref = getDocs(collection(db,"Users")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {          

            if(email == doc._document.data.value.mapValue.fields.email.stringValue){
                document.getElementById("fname").value = doc._document.data.value.mapValue.fields.name.stringValue;
                document.getElementById("email").value = email;
            }      
            
        })
    })
})





