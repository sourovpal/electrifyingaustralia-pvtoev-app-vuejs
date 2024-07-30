import api from "../actions/api";
import Storage from "../helpers/Storage";
import { defineStore } from 'pinia';
import { CONFIG } from "../config";

const appStorage = new Storage(CONFIG.VITE_AUTH_APP);
const userStorage = new Storage(CONFIG.VITE_AUTH_USER);

export const useAppStore = defineStore('app', {

  state: () => {
    return {
        user:null,
        company:{},
        lead_statuses:[],
        pipelines:[],
        permissions:[],

        // this value is used to open the send modal on mobile screens
        toggleSendModal: false,
        toggleCustomerDetailsSidebar: false,
    }
  },

  getters:{
    getUser(state){
      return state.user;
    },
    getCompany(state){
      return state.company;
    },
    getLeadStatuses(state){
      return state.lead_statuses;
    },
    getPipelines(state){
      return state.pipelines;
    },
    getPermissions(state){
      return state.permissions;
    },
  },

  actions: {
    setToggleSendModal(state = true) {
        this.toggleSendModal = state;
    },
    setToggleCustomerDetailsSidebar(state = true) {
        this.toggleCustomerDetailsSidebar = state;
    },
    async fetchAppData() {
      this.setLocalStorageData();
      try{
          await api.get(`/app`).then((res)=>{
            this.setLocalStorageData(res.data);
          }).catch((error)=>{
            console.log(error);
          });
      }catch(error){}
    },
    setLocalStorageData(payload=null){
      var data = {};
      if(payload){
        data = payload;
        appStorage.remove();
        appStorage.set(payload);
      }else{
        data = appStorage.get();
      }

      if(Object.keys(data??{})?.length > 0){
        var {lead_statuses, pipelines, permissions, company} = data;
      }else{
        return;
      }

      try{
        this.lead_statuses = lead_statuses??[];
      }catch(error){}

      try{
        this.pipelines = pipelines??[];
      }catch(error){}

      try{
        this.permissions = permissions??[];
      }catch(error){}

      try{
        this.company = company??{};
      }catch(error){}
      
      try{
        this.user = userStorage.get()??{};
      }catch(error){}
       
    },
  }

});
