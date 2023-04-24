import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
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

loadImage();

document.getElementById("postReviewBtn").addEventListener('click', postReview);



// Gets all the images from the realtime DB and sorts through them by name.
// This is a crime against god and all that exists, but hey it works :)
// Also updates all the other things like description and price with direct DOM
// manipulation. Gross.
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
        document.getElementById("imageDescription").innerText = "No description provided.";
    } else {
        document.getElementById("imageDescription").innerText = image.Description;
    }
    document.getElementById("priceValue").innerText = "$" + image.Price + ".00";
}


function loadReviewsFor(artist) {
    let reviewsRef = ref(realdb, "ArtistReviews");
    let reviewsList = document.getElementById("reviewsList");
    // Clear it so that when we call this again to reload reviews, it doesn't
    // duplicate reviews
    reviewsList.innerHTML = "";
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

function postReview() {
    let reviewTextbox = document.getElementById("reviewTextbox");
    // this one is particularly fucked
    let artist = document.getElementById("artistName").innerText;
    // come to think of it, so is this one
    let reviewer = JSON.parse(sessionStorage.getItem("user")).email;

    if (reviewTextbox.value.length == 0 || artist.length == 0 || reviewer.length == 0) {
        console.error("Something went wrong, I'm missing values");
        console.log(reviewTextbox.value);
        console.log(artist);
        console.log(reviewer);
        return;
    }

    get(ref(realdb), "ArtistReviews/").then(snapshot => {
        if (snapshot.exists()) {
            let id = snapshot.val().ArtistReviews.length;
            set(ref(realdb, "ArtistReviews/" + id), {
                artist: artist,
                reviewer: reviewer,
                content: reviewTextbox.value
            });
            reviewTextbox.value = "";
            loadReviewsFor(artist);
        }
    })
}

//If user adds to cart
var itemToAdd = document.getElementById('addToCart');
itemToAdd.addEventListener('click', function(event) {
    var buttonClicked = event.target;
    console.log("Adding to cart");
    //need to pass image, description, and price
    localStorage.setItem("piece", image.ArtTitle);
    localStorage.setItem("artistName", image.Artist);
    localStorage.setItem("description", image.Description);
    localStorage.setItem("PriceValue", image.Price);
    localStorage.setItem("image", image.LinksOfImagesArray[0]);
    window.location.href = "http://localhost:3000/cart";


})


