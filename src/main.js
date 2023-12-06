import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as mdb from 'mdb-ui-kit';
import 'mdb-ui-kit/css/mdb.min.css';
import "vue-custom-scrollbar/dist/vueScrollbar.css";
var app = createApp(App);

app.use(router);

app.mount('#app');
