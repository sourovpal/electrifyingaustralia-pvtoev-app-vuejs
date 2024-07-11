import { createApp, ref } from 'vue';
import App from './App.vue';
import router from './router';
import * as mdb from 'mdb-ui-kit';
import LoadingButton from "./components/LoadingButton.vue";

import { plugin as VueTippy } from 'vue-tippy';

import ToastPlugin from 'vue-toast-notification';

import VueLazyLoad from 'vue3-lazyload';

import { createPinia } from 'pinia';
import { FontAwesomeIcon } from './plugins/font-awesome';
import { ProgressBar, ProgressBarOptions } from './plugins/progress-bar';
import {CONFIG} from './config';

import 'mdb-ui-kit/css/mdb.min.css';
import 'custom-vue-scrollbar/dist/style.css';
import 'tippy.js/dist/tippy.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-skeletor/dist/vue-skeletor.css';
import CustomCheckbox from './components/CustomCheckbox.vue';

var appData = ref({});
function updateAppData(key, val) {
  try {
    appData.value = appData.value[key] = val;
  } catch (error) { }
}

const pinia = createPinia();
var app = createApp(App);
app.component('LoadingButton', LoadingButton);
app.component('custom-checkbox', CustomCheckbox);
app.component('font-awesome-icon', FontAwesomeIcon);

app.provide('app_data', {
  appData: appData.value,
  updateAppData: updateAppData,
});

app.use(ProgressBar, ProgressBarOptions);
app.use(pinia);
app.use(router);

app.use(ToastPlugin, {
  position: 'bottom',
  duration: 5000,
});

app.use(VueLazyLoad, {});

app.use(
  VueTippy,
  CONFIG.TIPPYOPTIONS
);

app.mount('#app');

// app.config.errorHandler = (err, instance, info) => {
//   console.log(err, instance, info);
// }

// ==================================================
//+++++++++++++++++ Router Middleware ++++++++++++++
// ==================================================

router.beforeEach(async (to, from, next) => {
  try {
    app.config.globalProperties.$Progress.start()
    return next();
  } catch (e) {
    throw new Error(e);
  }
});

router.afterEach((to, from) => {
  app.config.globalProperties.$Progress.finish();
});
