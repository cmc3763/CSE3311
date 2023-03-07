const axios = require("axios");

function createAccount(email, password) {
  console.log(email);
  console.log(password);

  axios
    .put("http://localhost:3000/users/registerl", {
      email: email,
      password: password,
    })
    .then((response) => (element.innerHTML = response.data.updatedAt))
    .catch((error) => {
      element.parentElement.innerHTML = `Error: ${error.message}`;
      console.error("There was an error!", error);
    });

  console.log(response.json);
}
