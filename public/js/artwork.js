import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { addToCart } from "./cart.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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
const auth = getAuth();
var image = null;
localStorage.clear();

function loadReviewsFor(artist) {
    let reviewsRef = ref(realdb, "ArtistReviews");
    let reviewsList = document.getElementById("reviewsList");
    get(reviewsRef).then((snapshot) => {
        if (snapshot.exists()) {
            let reviews = snapshot.val();
            reviews.forEach((review) => {
                if (review.artist === artist) {
                    let liElement = document.createElement("li");
                    liElement.innerHTML = `<strong>${review.reviewer} said:</strong> ${review.content}`;
                    reviewsList.appendChild(liElement);
                }
            })
        } else {
            console.log("Couldn't get review data from Firestore (request success, but no data was returned)");
        }
    }).catch(console.error);
}



// This is really really bad and needs to be refactored but I don't have the resources now.
// Right now, it's fetching all images from the DB and finding the current image by matching 
// the last part of the URL to the name of the image. This is because there's no ID attached to each
// image (at least at the moment).
//
// What we should do is put the images ID as a url parameter from the gallery page, then dynamically
// fetch just that image when we load this page.
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

    loadReviewsFor(image.Artist);
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

//If user adds to cart
var itemToAdd = document.getElementById('buttonGroup')
itemToAdd.addEventListener('click', function(event) {
    var buttonClicked = event.target;
    //need to pass image, description, and price
    localStorage.setItem("piece", image.ArtTitle);
    localStorage.setItem("artistName", image.Artist);
    localStorage.setItem("description", image.Description);
    localStorage.setItem("PriceValue", image.Price);
    localStorage.setItem("image", image.LinksOfImagesArray[0]);
    window.location.href = "http://localhost:3000/cart";

    addToCart();
})


