import { createApp } from 'https://unpkg.com/petite-vue?module'

window.vue = createApp({
    handleLogin() {
        alert("Login logic goes here!");
        window.location = '/';
    }
}).mount()
