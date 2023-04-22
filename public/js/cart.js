// Protected page, if the user isn't logged in, redirect to /login
if (!JSON.parse(sessionStorage.getItem("loggedIn"))) {
    window.location = "/login";
}
    
var removeCartItemButtons = document.getElementsByClassName('remove-button');
var checkoutButton = document.getElementsByClassName('checkoutbutton');

for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        checkQuantity();
    })
}

// This is called in artwork.js
export function addToCart() {
    //display image, description, price
}

function updateCartTotal() {
    //need to update cart total
}

// If the cart is empty
function checkQuantity() {
    var cartQuantity = document.getElementsByClassName('preview');
    if (cartQuantity.length < 1) {
        var summary = document.getElementsByClassName('summary');
        summary[0].remove();
    }
    // need to display "your cart is empty"
    //alert("Your cart is empty");
}