import { createStore, useStore } from "vuex";

const app = useStore('app', {
    state:{
        app_name:'CRM',
    },
    getters:{

    },
    mutations: {
        increment (state) {
          state.app_name = 'Hello';
        }
    },
    actions: {
        increment ({commit}) {
          commit('increment')
        }
    },
});

export default app;