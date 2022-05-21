import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from "@/App.vue";
import { Quasar } from 'quasar'
import "quasar/dist/quasar.sass"
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions)
app.use(VueAxios, axios) // 👈
app.mount('#app')