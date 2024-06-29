import { createApp, ref, provide } from 'vue';
import App from './App.vue';
import router from './router';
import * as mdb from 'mdb-ui-kit';

import VueProgressBar from "@aacassandra/vue3-progressbar";

import { plugin as VueTippy } from 'vue-tippy';

import ToastPlugin from 'vue-toast-notification';

import VueLazyLoad from 'vue3-lazyload';

import { createPinia } from 'pinia';

import 'mdb-ui-kit/css/mdb.min.css';
import 'custom-vue-scrollbar/dist/style.css';
import 'tippy.js/dist/tippy.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-skeletor/dist/vue-skeletor.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faUserSecret,
    faTrash,
    faArrowRight,
    faChevronRight,
    faPlus,
    faXmark,
    faSpinner,
    faCircleNotch,
    faBars,
    faStopwatch,
    faCaretDown,
    faSignal,
    faSignature,
    faThumbsUp,
    faPen,
    faCopy,
    faCheck,
    faCircleCheck,
    faPuzzlePiece,
    faCircleUser,
    faEllipsisVertical,
    faUpRightFromSquare,
    faShareNodes,
    faClipboardList,
    faCircleQuestion,
    faLock,
    faGem,
} from '@fortawesome/free-solid-svg-icons'

const iconsToUse = [
    faUserSecret,
    faTrash,
    faArrowRight,
    faChevronRight,
    faPlus,
    faXmark,
    faSpinner,
    faCircleNotch,
    faBars,
    faStopwatch,
    faCaretDown,
    faSignal,
    faSignature,
    faThumbsUp,
    faPen,
    faCopy,
    faCheck,
    faCircleCheck,
    faPuzzlePiece,
    faCircleUser,
    faEllipsisVertical,
    faUpRightFromSquare,
    faShareNodes,
    faClipboardList,
    faCircleQuestion,
    faLock,
    faGem,
]

library.add(iconsToUse)


const VueProgressBarOptions = {
  color: "rgb(67 138 255)",
  failedColor: "rgb(67 138 255)",
  thickness: "3px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
  autoFinish:false,
};

var appData = ref({});

function updateAppData(key, val){
  try{
    appData.value = appData.value[key] = val;
  }catch(error){}
}

const pinia = createPinia();
var app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

app.provide('app_data', {
  appData:appData.value,
  updateAppData:updateAppData,
});

app.use(VueProgressBar, VueProgressBarOptions);
app.use(pinia);
app.use(router);

app.use(ToastPlugin, {
  position: 'bottom',
  duration:5000,
});

app.use(VueLazyLoad, {});

app.use(
  VueTippy,
  {
    directive: 'tippy',
    component: 'tippy',
    componentSingleton: 'tippy-singleton',
    defaultProps: {
      placement: 'auto-end',
      allowHTML: true,
    }, 
  }
);
  
app.mount('#app');

// app.config.errorHandler = (err, instance, info) => {
//   console.log(err, instance, info);
// }

// ==================================================
//+++++++++++++++++ Router Middleware ++++++++++++++
// ==================================================

router.beforeEach(async(to, from, next) => {
  try{
    app.config.globalProperties.$Progress.start()
    return next();
  }catch(e){
    throw new Error(e);
  }
});

router.afterEach((to, from)=>{
  app.config.globalProperties.$Progress.finish();
});
