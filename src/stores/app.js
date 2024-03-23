import api from "../actions/api";
import VueCookies from "vue-cookies";
var {lead_statuses} = VueCookies.get(import.meta.env.VITE_AUTH_APP)??{};
const app = {
    state:{
      user:{},
      company:{},
      lead_statuses:lead_statuses,
    },
    getters:{
      getUser(state){
        return {...state.user};
      },
      getCompany(state){
        return {...state.company};
      },
      getLeadStatuses(state){
        return [...state.lead_statuses];
      },
    },
    mutations: {
        set_app_data(state, data) {

          VueCookies.remove(import.meta.env.VITE_AUTH_APP, '/');
          // =====================================================
          state.user = VueCookies.get(import.meta.env.VITE_AUTH_USER);
          state.company = VueCookies.get(import.meta.env.VITE_AUTH_COMPANY);
          // =====================================================
          VueCookies.set(import.meta.env.VITE_AUTH_APP, data, '1y', '/');
          // =====================================================
          state.lead_statuses = data.lead_statuses;
        }
    },
    actions: {
        async fetch_app_data({commit}) {
          try{
              await api.get(`/app`).then((res)=>{
                return commit('set_app_data', res.data);
              }).catch((error)=>{

              });
          }catch(error){

          }
        }
    },
};

export default app;