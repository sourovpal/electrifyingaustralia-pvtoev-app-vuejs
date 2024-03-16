import { createApp, watch, onUpdated } from 'vue';
import App from './App.vue';
import router from './router';
import * as mdb from 'mdb-ui-kit';

import VueProgressBar from "@aacassandra/vue3-progressbar";

import { plugin as VueTippy } from 'vue-tippy'
import axios from 'axios';
import VueCookies from 'vue-cookies';

import ToastPlugin from 'vue-toast-notification';


import 'mdb-ui-kit/css/mdb.min.css';
import "vue-custom-scrollbar/dist/vueScrollbar.css"; // remove
import 'custom-vue-scrollbar/dist/style.css';
import 'tippy.js/dist/tippy.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';



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

var app = createApp(App);



app.use(VueProgressBar, VueProgressBarOptions);
app.use(router);
app.use(VueCookies, { expires: '1y', path: window.location.origin})
app.use(ToastPlugin, {
  position: 'bottom',
  duration:5000,
});
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


app.config.errorHandler = (err, instance, info) => {
  console.log(err);
}


// ==================================================
//+++++++++++++++++ Router Middleware ++++++++++++++
// ==================================================


router.beforeEach(async(to, from, next) => {
  if (to.meta.progress) {
    app.config.globalProperties.$Progress.start();
  }
  try{
      if(to.meta.auth){
          var user = VueCookies.get('user_data');
          var token = VueCookies.get('access_token');
          if(user != null && token != null){
              return next();
          }else{
              next('/login');
              window.location.replace('/login');
              return false;
          }
      }

      if(to.path === '/login' || to.path === '/register'){
          var user = VueCookies.get('user_data');
          var token = VueCookies.get('access_token');
          if(user == null || token == null){
              return next();
          }else{
              window.location.replace(from.path);
              return false;
          }
      }

  }catch(e){
      return false;
  }
});


router.afterEach((to, from)=>{
  if (to.meta.progress) {
    app.config.globalProperties.$Progress.finish();
  }
});