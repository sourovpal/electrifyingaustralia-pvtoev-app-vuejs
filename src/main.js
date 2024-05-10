import { createApp, watch, onUpdated } from 'vue';
import App from './App.vue';
import router from './router';
import stores from './stores';
import * as mdb from 'mdb-ui-kit';

import VueProgressBar from "@aacassandra/vue3-progressbar";

import { plugin as VueTippy } from 'vue-tippy'
import VueCookies from 'vue-cookies';

import ToastPlugin from 'vue-toast-notification';


import 'mdb-ui-kit/css/mdb.min.css';
import 'custom-vue-scrollbar/dist/style.css';
import 'tippy.js/dist/tippy.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-skeletor/dist/vue-skeletor.css';


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
app.use(stores);
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


// app.config.errorHandler = (err, instance, info) => {
//   console.log(err, instance, info);
// }


// ==================================================
//+++++++++++++++++ Router Middleware ++++++++++++++
// ==================================================


router.beforeEach(async(to, from, next) => {
  
  const NotCheckPaths = ['/forbidden', '/'];
  const IfAuthNotAllowPaths = ['/login', '/register'];
  const user = VueCookies.get(import.meta.env.VITE_AUTH_USER);
  const token = VueCookies.get(import.meta.env.VITE_AUTH_TOKEN);

  if (to.meta.progress) {
    app.config.globalProperties.$Progress.start();
  }
  if(IfAuthNotAllowPaths.includes(to.path)){
      if(user == null || token == null){
          return next();
      }else{
        return next(from.path);
      }
  }else if(NotCheckPaths.includes(to.path)){
    return next();
  }

  // Check Auth
  try{

    if(to.meta.auth){

      if(user != null && token != null){

        if(to.meta.permissions && to.meta.permissions.length){

          const checkPermission = to.meta.permissions.map(permission=>stores.getters.getPermissions.includes(permission));

          if(checkPermission.includes(true)){

            return next();

          }else{

            return next('/forbidden');

          }

        }else{

          return next();

        }

      }else{

        return next('/login');

      }
    }
  }catch(e){
      throw new Error(e);
  }

  
});


router.afterEach((to, from)=>{
  if (to.meta.progress) {
    app.config.globalProperties.$Progress.finish();
  }
});