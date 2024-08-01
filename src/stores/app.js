import api from "../actions/api";
import Storage from "../helpers/Storage";
import { defineStore } from 'pinia';
import { CONFIG } from "../config";

const appStorage = new Storage(CONFIG.VITE_AUTH_APP);

export const useAppStore = defineStore('app', {

  state: () => {
    return {
        company:{},
        leadStatuses:[],
        pipelines:[],
        permissions:[],

        // this value is used to open the send modal on mobile screens
        toggleSendModal: false,
        toggleCustomerDetailsSidebar: false,
        users:[],
    }
  },

  getters:{
    getUsers(state){
      return state.users;
    },
    getPermissions(state){
      return state.permissions;
    },
    getCompany(state){
      return state.company;
    },
    getLeadStatuses(state){
      return state.leadStatuses;
    },
    getPipelines(state){
      return state.pipelines;
    },
  },
  actions: {
    setToggleSendModal(state = true) {
        this.toggleSendModal = state;
    },
    setToggleCustomerDetailsSidebar(state = true) {
        this.toggleCustomerDetailsSidebar = state;
    },
    setUsers(payload){
      this.users = payload;
    },
    setPermssions(payload){
      this.permissions = payload;
    },
    setCompany(payload){
      this.company = payload;
    },
    setLeadStatuses(payload){
      this.leadStatuses = payload;
    },
    setPipelines(payload){
      this.pipelines = payload;
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
      var {
        lead_statuses, 
        pipelines, 
        permissions, 
        company, 
        users
      } = {...appStorage.get(), ...payload??{}};
      if(payload){
        appStorage.remove();
        appStorage.set({lead_statuses, permissions, company, pipelines});
      }
      
      this.setUsers(users);
      this.setCompany(company);
      this.setPermssions(permissions);
      this.setLeadStatuses(lead_statuses);
      this.setPipelines(pipelines);

    },
  }

});
