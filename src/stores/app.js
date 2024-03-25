import api from "../actions/api";
import VueCookies from "vue-cookies";
var app = {};
try{
  var {lead_statuses, pipelines} = VueCookies.get(import.meta.env.VITE_AUTH_APP)??{};
   app = {
      state:{
        user:{},
        company:{},
        lead_statuses:lead_statuses,
        pipelines:pipelines,
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
        getPipelines(state){
          return [...state.pipelines];
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
            state.pipelines = data.pipelines;
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
  
}catch(error){
  
}

export default app;
