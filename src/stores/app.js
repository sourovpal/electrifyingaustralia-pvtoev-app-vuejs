import api from "../actions/api";
import VueCookies from "vue-cookies";
var app = {};
try{
  app = {
    state:{
      user:null,
      company:{},
      lead_statuses:[],
      pipelines:[],
      permissions:[],
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
      getPermissions(state){
        return [...state.permissions];
      },
    },
    mutations: {
      set_cookies_in_app_data(state){

        var {lead_statuses, pipelines, permissions, company} = VueCookies.get(import.meta.env.VITE_AUTH_APP)??{};
        var user = VueCookies.get(import.meta.env.VITE_AUTH_USER)??{};

        try{
          state.lead_statuses = lead_statuses;
        }catch(error){}

        try{
          state.pipelines = pipelines;
        }catch(error){}

        try{
          state.permissions = permissions;
        }catch(error){}

        try{
          state.company = company;
        }catch(error){}
        
        try{
          state.user = user;
        }catch(error){}

      },
      set_app_data(state, data) {
        
        VueCookies.remove(import.meta.env.VITE_AUTH_APP, '/');
        VueCookies.set(import.meta.env.VITE_AUTH_APP, data, '1y', '/');
        state.lead_statuses = data.lead_statuses;
        state.pipelines = data.pipelines;
      }
    },
    actions: {
        async fetchAppData({commit}) {
          try{
              await api.get(`/app`).then((res)=>{
                commit('set_cookies_in_app_data');
                return commit('set_app_data', res.data);
              }).catch((error)=>{});
          }catch(error){}
        },
        async setCookiesInAppData({commit}){
          return commit('set_cookies_in_app_data');
        }
    },
  };
  
}catch(error){
  
}

export default app;
