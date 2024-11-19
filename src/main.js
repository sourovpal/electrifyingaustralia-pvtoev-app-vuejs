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
import AvatarGroup from "primevue/avatargroup";
import Avatar from "primevue/avatar";
import InputGroup from "primevue/inputgroup";
import InputNumber from "primevue/inputnumber";
import ScrollPanel from 'primevue/scrollpanel';
import DatePicker from 'primevue/datepicker';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import ConfirmDialog from 'primevue/confirmdialog';
import OverlayBadge from 'primevue/overlaybadge';
import Badge from 'primevue/badge';
import Tabs from 'primevue/tabs';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import MultiSelect from 'primevue/multiselect';

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
app.component("avatar-group", AvatarGroup);
app.component("Avatar", Avatar);
app.component("input-group", InputGroup);
app.component("input-number", InputNumber);
app.component("input-date", DatePicker);
app.component("ScrollPanel", ScrollPanel);
app.component("confirm-dialog", ConfirmDialog);
app.component("overlay-badge", OverlayBadge);
app.component("Badge", Badge);
app.component("Tabs", Tabs);
app.component("Tab", Tab);
app.component("TabList", TabList);
app.component("TabPanel", TabPanel);
app.component("TabPanels", TabPanels);
app.component("MultiSelect", MultiSelect);

app.use(ConfirmationService);
app.use(ToastService);

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
