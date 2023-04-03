import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth,updateEmail} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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


auth.onAuthStateChanged(user =>{
    
    
    if(user.uid != null)
    {
        var email = user.email;  
        var id;
        const Mybtn = document.getElementById("saveBtn");

        const ref = getDocs(collection(db,"Users")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {          

                if(email == doc._document.data.value.mapValue.fields.email.stringValue){
                    id = doc.id;
                    TheHead.innerText = doc._document.data.value.mapValue.fields.name.stringValue;
                    document.getElementById("fname").value = doc._document.data.value.mapValue.fields.name.stringValue;
                    document.getElementById("email").value = email;
                    document.getElementById("lname").value =doc._document.data.value.mapValue.fields.lname.stringValue;
                    document.getElementById("cnum").value =doc._document.data.value.mapValue.fields.contactNum.stringValue;
                    document.getElementById("address").value =doc._document.data.value.mapValue.fields.address.stringValue;
                    document.getElementById("city").value =doc._document.data.value.mapValue.fields.city.stringValue;
                    document.getElementById("state").value =doc._document.data.value.mapValue.fields.state.stringValue;
                    document.getElementById("zip").value =doc._document.data.value.mapValue.fields.zip.stringValue;
                    document.getElementById("country").value =doc._document.data.value.mapValue.fields.country.stringValue;
                }   
                
            //use that id to make changes and update collection document   
            
            });

    
        });

        Mybtn.addEventListener("click",function(e){
            var fname = document.getElementById("fname");
            var lname = document.getElementById("lname");
            var email2 = document.getElementById("email");
            var contactNum = document.getElementById("cnum");
            var address = document.getElementById("address");
            var city = document.getElementById("city");
            var state = document.getElementById("state");
            var zip = document.getElementById("zip");
            var country = document.getElementById("country");

            

            updateEmail(auth.currentUser, email2.value).then(() => {
                setDoc(doc(db,"Users",id),{
                    email:email2.value,
                    name:fname.value,
                    lname:lname.value,
                    contactNum:contactNum.value,
                    address:address.value,
                    city:city.value,
                    state:state.value,
                    zip:zip.value,
                    country:country.value
                });
                
                alert("Profile Updated");
              
              }).catch((error) => {
                alert(error);
               
              });

            
            

        });

        }

});





