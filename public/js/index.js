const { createApp } = Vue;
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {getFirestore,collection,addDoc} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import {getStorage, ref as sRef, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
import {getDatabase, ref, set, child, get} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Protected page, if the user isn't logged in, redirect to /login
if (!JSON.parse(sessionStorage.getItem("loggedIn"))) {
  window.location = "/login";
}


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVsw8cVFyZj5KwRAMID2Dc06amVD6_LVg",
  authDomain: "login-for-the-artmart.firebaseapp.com",
  databaseURL: "https://login-for-the-artmart-default-rtdb.firebaseio.com",
  projectId: "login-for-the-artmart",
  storageBucket: "gs://login-for-the-artmart.appspot.com",
  messagingSenderId: "453895598278",
  appId: "1:453895598278:web:cac2395b4d9c635e54a7c7"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);
const realdb = getDatabase(app);

createApp({
    data() {
        return {
            loggedIn: false,
            user: null
        }
    },
    mounted() {
        this.loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
        this.user = JSON.parse(sessionStorage.getItem("user"));
    }
}).mount("#app");

var OuterDiv = document.getElementById('gallery');
var productArray = [];
window.addEventListener("load", createGallery);

function createGallery(){
    const dbref = ref(realdb);
    get(child(dbref, "GalleryInfo"))
    .then((snapshot) =>{
        snapshot.forEach(prod =>{
            productArray.push(prod.val());
        });
        AddAllProducts();
    })
}

function AddAllProducts(){
    let i = 0;
    productArray.forEach(prod =>{
        AddAProduct(prod, i++);
    });
}

function AddAProduct(product, index){
    let html = 
    `
    <a href="http://localhost:3000/art_page">
        <div class="w-80 mb-2">
            <img src="`+ product.LinksOfImagesArray[0] +`" class="w-full rounded-tr-3xl" id="thumbnail`+ index +`">
            <div class="p-2 border-2 w-full font-thin text-center rounded-bl-3xl border-black">
                <div class="text-2xl whitespace-pre-wrap" id="title`+ index +`">`+ product.ArtTitle +`</div>
                <div class="text-2xl" id="artist">`+ product.Artist +`</div>
                <div class="text-lg" id="price">$`+ product.Price +`.00</div>
            </div>
        </div>
    </a>
    `

    let newProd = document.createElement("div");
    console.log(product.LinksOfImagesArray[0]);
    newProd.classList.add('artcard');
    newProd.innerHTML = html;
    OuterDiv.append(newProd);
}
