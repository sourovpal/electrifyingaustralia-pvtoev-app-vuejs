import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./router";
import * as mdb from "mdb-ui-kit";
import LoadingButton from "./components/LoadingButton.vue";
import SvgCustomIcon from "./assets/svg/SvgCustomIcon.vue";
import { plugin as VueTippy } from "vue-tippy";
import ToastPlugin from "vue-toast-notification";
import VueLazyLoad from "vue3-lazyload";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "./plugins/font-awesome";
// import { ProgressBar, ProgressBarOptions } from "./plugins/progress-bar";
import { CONFIG } from "./config";
import VueNumberFormat from "@coders-tm/vue-number-format";
// import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import CustomCheckbox from "./components/CustomCheckbox.vue";
import request from "./plugins/request";
import InfiniteLoading from "v3-infinite-loading";
import drag from "v-drag";
import FetchImage from "./components/FetchImage.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import BootstrapModal from "@components/Modals/BootstrapModal.vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

import "@vuepic/vue-datepicker/dist/main.css";
import "mdb-ui-kit/css/mdb.min.css";
import "custom-vue-scrollbar/dist/style.css";
import "tippy.js/dist/tippy.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
import "vue-skeletor/dist/vue-skeletor.css";
import "v-calendar/style.css";
import "v3-infinite-loading/lib/style.css";

const pinia = createPinia();
var app = createApp(App);
app.component("FetchImage", FetchImage);
app.component("LoadingButton", LoadingButton);
app.component("bootstrap-modal", BootstrapModal);
app.component("custom-checkbox", CustomCheckbox);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("svg-custom-icon", SvgCustomIcon);
app.component("InfiniteLoading", InfiniteLoading);
// app.component('VCalendar', Calendar);
app.component("VueDatePicker", VueDatePicker);
// app.use(setupCalendar, {});
app.use(VueNumberFormat, { precision: 4 });
// app.use(ProgressBar, ProgressBarOptions);
app.use(pinia);
app.use(router);
app.use(drag);
app.use(request);
app.use(ToastPlugin, {
  position: "bottom",
  duration: 5000,
});
app.use(VueLazyLoad, {});
app.use(VueTippy, CONFIG.TIPPYOPTIONS);
app.mount("#app");

// Pusher Configer
// window.Pusher = Pusher;
// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: CONFIG.MIX_PUSHER_APP_KEY,
//   cluster: CONFIG.MIX_PUSHER_APP_CLUSTER,
//   forceTLS: true,
// });

// app.config.errorHandler = (err, instance, info) => {
//   console.log(err, instance, info);
// }

// ==================================================
//+++++++++++++++++ Router Middleware ++++++++++++++
// ==================================================

