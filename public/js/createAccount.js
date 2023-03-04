import { createApp } from 'https://unpkg.com/petite-vue?module'

window.vue = createApp({
    newPassword: '',
    newPasswordConfirm: '',
    createAccount() {
        alert("create account logic goes here!");
        window.location = '/';
    }
}).mount()
