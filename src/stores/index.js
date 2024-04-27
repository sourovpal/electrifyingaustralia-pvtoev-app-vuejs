import { createStore } from 'vuex';
import app from './app';
import leadEdit from './leadEdit';


const store = createStore({
  modules:{
    app:app,
    leadEdit:leadEdit
  }
});
export default store;