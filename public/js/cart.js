import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import {getDatabase,ref,remove} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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


//Retrieve data from art page
const Artist = localStorage.getItem('artistName');
const Piece = localStorage.getItem('piece');
const Description = localStorage.getItem('description');
const Price = localStorage.getItem('PriceValue');
const image = localStorage.getItem('image');

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const realdb = getDatabase(app);



//This will change the art but it will also mess up every art on artpage
//I dont know why it does that
document.getElementById('artist').textContent = "Artist: " + Artist;
document.getElementById('Title1').textContent = "Title: " + Piece;
document.getElementById('price').textContent = "$" + Price;
document.getElementById('TheImage').src = image;
document.getElementById('SubPrice').textContent = "$" + Price;
var total = Number(Price) + 8;
document.getElementById('TotalPrice').textContent ="$" + total;

// removing items from cart
var removeCartItemButtons = document.getElementsByClassName('remove-button');
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        checkQuantity();
    })
}

paypal.Buttons({
    createOrder: (data,actions) => {
       return actions.order.create({
        purchase_units: [{
            amount: {
                value: Price
            }

        }]
       })

    },
    onApprove: (data, actions) => {
        remove(ref(realdb, "GalleryInfo/" + Piece)).then(() => {
            localStorage.clear();
            alert("Transaction Complete");
            setTimeout(gohome,2000);

            function gohome()
            {
                window.location.href = "http://localhost:3000";
            }
            
        });

        
    }
}).render('#paypal-button');

// If the cart is empty
function checkQuantity() {
    var cartQuantity = document.getElementsByClassName('preview');
    if (cartQuantity.length < 1) {
        var summary = document.getElementsByClassName('summary');
        summary[0].remove();
        var element = document.createElement("input");
        var label = document.createElement("Label");
        var cart = document.getElementsByClassName("cart1")[0];
        label.innerHTML = "Your cart is empty.";  
        element.setAttribute("type", "text");
        element.setAttribute("value", "");
        element.setAttribute("name", "Test Name");
        element.setAttribute("style", "width:200px");
        cart.appendChild(label);
    }
}
