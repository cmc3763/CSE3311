// const { createApp } = Vue;
//
// createApp({
//     data() {
//         return {
//             loggedIn: false,
//             user: null
//         }
//     },
//     mounted() {
//         this.loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
//         this.user = JSON.parse(sessionStorage.getItem("user"));
//     }
// }).mount("#app");


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const realdb = getDatabase(app);
var image = null;

// This is really really bad and needs to be refactored but I don't have the resources now.
// Right now, it's fetching all images from the DB and finding the current image by matching 
// the last part of the URL to the name of the image. This is because there's no ID attached to each
// image (at least at the moment).
//
// After fetching all images and finding the current one, it fill in the HTML elements with the image
// name, description, artist, etc. through manual DOM manipulation (gross)
async function loadImage() {
    const dbref = ref(realdb);
    await get(child(dbref, "GalleryInfo"))
        .then(snapshot => {
            snapshot.forEach(prod => {
                let possible_image = prod.val()
                let imageName = window.location.pathname.split('?')[0].split('/').filter(i => { return i !== "" }).slice(-1)[0];
                if (encodeURIComponent(possible_image.ArtTitle) == imageName) {
                    image = possible_image;
                }
            })
        });

    console.log(image);
    document.getElementById("imageDisplay").src = image.LinksOfImagesArray[0];
    document.getElementById("piece").innerText = image.ArtTitle;
    document.getElementById("artistName").innerText = image.Artist;
    if (image.Description.length == 0) {
        document.getElementById("description").innerText = "No description provided.";
    } else {
        document.getElementById("description").innerText = image.Description;
    }
    document.getElementById("priceValue").innerText = "$" + image.Price + ".00";
}


loadImage();
