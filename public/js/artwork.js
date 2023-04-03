const { createApp } = Vue;

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