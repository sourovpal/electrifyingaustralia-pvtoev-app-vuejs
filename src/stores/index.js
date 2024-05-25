import { createStore } from 'vuex';
import lead from './lead';


const store = createStore({
  modules:{
    lead:lead
  }
});
export default store;