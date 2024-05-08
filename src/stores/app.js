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
      async set_cookies_in_app_data(state){
          var app = window.localStorage.getItem(import.meta.env.VITE_AUTH_APP);

          if(app){
            app = JSON.parse(app);
            var {lead_statuses, pipelines, permissions, company} = app;
          }
          var user = VueCookies.get(import.meta.env.VITE_AUTH_USER)??{};

        try{
          state.lead_statuses = lead_statuses??[];
        }catch(error){}

        try{
          state.pipelines = pipelines??[];
        }catch(error){}

        try{
          state.permissions = permissions??[];
        }catch(error){}

        try{
          state.company = company??{};
        }catch(error){}
        
        try{
          state.user = user??{};
        }catch(error){}

      },
      set_app_data(context, data) {
        window.localStorage.removeItem(import.meta.env.VITE_AUTH_APP)
        window.localStorage.setItem(import.meta.env.VITE_AUTH_APP, JSON.stringify(data))
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
