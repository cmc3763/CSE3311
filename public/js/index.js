import { createApp } from 'https://unpkg.com/petite-vue?module'

window.vue = createApp({
    testing: 7,
    getTesting() {
        return this.testing;
    }
}).mount()
