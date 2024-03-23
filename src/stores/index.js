import { createStore } from 'vuex';
import app from './app';


const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    // increment (state) {
    //   state.count++
    // }
  },
  modules:{
    app:app
  }
});
export default store;