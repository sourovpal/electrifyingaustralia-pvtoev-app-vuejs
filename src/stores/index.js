import { createStore } from 'vuex';
import app from './app';
import lead from './lead';


const store = createStore({
  modules:{
    app:app,
    lead:lead
  }
});
export default store;