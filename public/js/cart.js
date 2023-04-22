// Protected page, if the user isn't logged in, redirect to /login
if (!JSON.parse(sessionStorage.getItem("loggedIn"))) {
    window.location = "/login";
}
    
var removeCartItemButtons = document.getElementsByClassName('remove-button');
var checkoutButton = document.getElementsByClassName('checkoutbutton');

console.log(removeCartItemButtons)
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        console.log("clicky clicky");
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal()
    })
}

function updateCartTotal() {
    //need to update cart total
}

//needs logic if there is nothing in the cart.
