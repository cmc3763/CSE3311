import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {getDatabase,ref,remove} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";


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
const realdb = getDatabase(app);



paypal.Buttons({
    createOrder: (data,actions) => {
       return actions.order.create({
        purchase_units: [{
            amount: {
                value:'100.00'
            }

        }]
       })

    },
    onApprove: (data, actions) => {
        remove(ref(realdb, "GalleryInfo/horse")).then(() => {
            alert("Transaction Complete");
        });

        
    }
}).render('#paypal-button');