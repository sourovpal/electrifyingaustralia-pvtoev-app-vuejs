import { createApp, onMounted } from 'vue';
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
  color: "rgb(233 134 32)",
  failedColor: "rgb(233 134 32)",
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

app.mount('#app');


app.use(ToastPlugin, {
  position: 'bottom',
  duration:5000,
});

app.use(
  VueTippy,
  {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton',
    defaultProps: {
      placement: 'auto-end',
      allowHTML: true,
    }, 
  }
  );
  
  app.use(VueCookies, { expires: '1y', path: window.location.origin})
  
  axios.defaults.baseURL = 'http://localhost/pylon-api/public/api/v1';
  // axios.defaults.headers.common['deviceid'] = uid;
  axios.defaults.headers.common['Accept'] = 'application/json';
  // axios.defaults.headers.common['Content-Type'] = 'application/json';

  // app.use(VueProgressBar);
  
  axios.interceptors.request.use((request)=>{
    var token = VueCookies.get('access_token');
    if(token != null){
      request.headers.set('Authorization', 'Bearer '+token);
    }
    return request;
  },(error)=>{
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log(error)
    if (error.response.status === 401)// acces denied
    {
      VueCookies.remove('access_token');
      VueCookies.remove('user_data');
      window.location.replace('/login');
    }
    else if (error.response.status === 404)// page not found
    {
      // history.push('404')
    }
    return Promise.reject(error);
  }
);
