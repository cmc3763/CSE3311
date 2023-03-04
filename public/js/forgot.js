import { createApp } from 'https://unpkg.com/petite-vue?module'

window.vue = createApp({
    sendPasswordResetEmail() {
        alert("Password reset logic goes here");
        window.location = '/';
    }
}).mount()
