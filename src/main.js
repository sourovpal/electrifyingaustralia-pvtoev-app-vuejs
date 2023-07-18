import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import * as mdb from 'mdb-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-ui-kit/css/mdb.min.css';

var app = createApp(App);

app.use(router);

app.mount('#app');
