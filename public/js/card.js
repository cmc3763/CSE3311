import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {getFirestore,collection,setDoc,doc,getDocs} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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
const db = getFirestore(app);

//work on this
//add listener and go from there

auth.onAuthStateChanged(user =>{
  if(user != null){
    var email = user.email;  
    var id;
    var MyBtn = document.getElementById("SaveBtn");

    const ref = getDocs(collection(db,"Users")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {          
          if(email == doc._document.data.value.mapValue.fields.email.stringValue){
              id = doc.id;
          }      
      });
  });

  const ref2 = getDocs(collection(db,"Card_Info")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {   
        
        
        
            if(id == doc.id)
            {
               document.getElementById("cnum").value = doc._document.data.value.mapValue.fields.Card_details.stringValue;
               document.getElementById("fname").value = doc._document.data.value.mapValue.fields.Fname.stringValue;
               document.getElementById("lname").value = doc._document.data.value.mapValue.fields.Lname.stringValue;
               document.getElementById("month").value =doc._document.data.value.mapValue.fields.expiration_month.stringValue;
               document.getElementById("year").value =doc._document.data.value.mapValue.fields.expiration_year.stringValue;
               document.getElementById("sec").value = doc._document.data.value.mapValue.fields.security_code.stringValue;
            }

        
    });
});



  MyBtn.addEventListener("click",function(e){
    var cardD = document.getElementById("cnum");
    var Fname = document.getElementById("fname");
    var Lname = document.getElementById("lname");
    var expM = document.getElementById("month");
    var expY = document.getElementById("year");
    var sec = document.getElementById("sec");



    setDoc(doc(db,"Card_Info",id),{
      Card_details:cardD.value,
      Fname:Fname.value,
      Lname:Lname.value,
      expiration_month:expM.value,
      expiration_year:expY.value,
      security_code:sec.value
    });
    alert("Card Info Updated");


  });
  }
});