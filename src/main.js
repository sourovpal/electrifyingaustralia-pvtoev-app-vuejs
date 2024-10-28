import { createApp } from "vue";

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

import VueNumberFormat from "@coders-tm/vue-number-format";

import CustomCheckbox from "./components/CustomCheckbox.vue";

import request from "./plugins/request";

import InfiniteLoading from "v3-infinite-loading";

import FetchImage from "./components/FetchImage.vue";

import VueDatePicker from "@vuepic/vue-datepicker";

import BootstrapModal from "@components/Modals/BootstrapModal.vue";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import AutoComplete from "primevue/autocomplete";
import SelectOption from "primevue/select";
import ModalDialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Popover from "primevue/popover";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";

import Echo from "laravel-echo";

import Pusher from "pusher-js";

import drag from "v-drag";

import { CONFIG } from "./config";

import "@vuepic/vue-datepicker/dist/main.css";

import "mdb-ui-kit/css/mdb.min.css";

import "custom-vue-scrollbar/dist/style.css";

import "tippy.js/dist/tippy.css";

import "vue-toast-notification/dist/theme-bootstrap.css";

import "vue-skeletor/dist/vue-skeletor.css";

import "v-calendar/style.css";

import "v3-infinite-loading/lib/style.css";

// import "primeicons/primeicons.css";

const pinia = createPinia();
var app = createApp(App);

app.component("FetchImage", FetchImage);
app.component("LoadingButton", LoadingButton);
app.component("bootstrap-modal", BootstrapModal);
app.component("custom-checkbox", CustomCheckbox);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("svg-custom-icon", SvgCustomIcon);
app.component("InfiniteLoading", InfiniteLoading);
app.component("VueDatePicker", VueDatePicker);
//
app.component("Skeleton", Skeleton);
app.component("select-option", SelectOption);
app.component("icon-field", IconField);
app.component("input-icon", InputIcon);
app.component("input-text", InputText);
app.component("auto-complete", AutoComplete);
app.component("modal-dialog", ModalDialog);
app.component("text-area", Textarea);
app.component("Popover", Popover);
app.component("Button", Button);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "light",
      cssLayer: false,
    },
  },
});

app.use(VueNumberFormat, { precision: 4 });

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
