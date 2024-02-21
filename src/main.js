import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as mdb from 'mdb-ui-kit';
import 'mdb-ui-kit/css/mdb.min.css';
import "vue-custom-scrollbar/dist/vueScrollbar.css";


import { plugin as VueTippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling


var app = createApp(App);


app.use(
    VueTippy,
    // optional
    {
      directive: 'tippy', // => v-tippy
      component: 'tippy', // => <tippy/>
      componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
      defaultProps: {
        placement: 'auto-end',
        allowHTML: true,
      }, // => Global default options * see all props
    }
)


app.use(router);

app.mount('#app');
