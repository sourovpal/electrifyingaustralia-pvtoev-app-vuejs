import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as mdb from 'mdb-ui-kit';
import 'mdb-ui-kit/css/mdb.min.css';
import "vue-custom-scrollbar/dist/vueScrollbar.css"; // remove
import 'custom-vue-scrollbar/dist/style.css';

import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling
import axios from 'axios';
import VueCookies from 'vue-cookies';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


var app = createApp(App);

// this.$toast.error(message,?options)
// this.$toast.warning(message,?options)
// this.$toast.info(message,?options)
// this.$toast.default(message,?options)
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
  
  // default options config: { expires: '1d', path: '/', domain: '', secure: '', sameSite: 'Lax' }
  app.use(VueCookies, { expires: '1y', path: window.location.origin})
  
  
  axios.defaults.baseURL = 'http://localhost/pylon-api/public/api/v1';
// axios.defaults.headers.common['deviceid'] = uid;
axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['Content-Type'] = 'application/json';
  
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
