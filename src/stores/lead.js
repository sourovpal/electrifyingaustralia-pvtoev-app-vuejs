import { defineStore } from 'pinia';
import {useAppStore} from "../stores/app";

export const useLeadStore = defineStore('lead', {
  state: () => {
    return {
      leadPrevUrl:null,
      findLead:{},
      prev_lead:null,
      next_lead:null,
      leadProperties:[],
      leadCustomProperties:[],
      leadSources:[],
      owners:[],
      currentOwner:null,
      pipelines:[],
      leadPipeline:[],
      leadHasPipeline:[],
      primaryContact:null,
      leadContacts:[],
      primaryContact:null,
      leadStatus:[],
    }
  },
  getters:{
    getLeadPrevUrl(state){
      return state.leadPrevUrl;
    },
    getFindLead(state){
      return state.findLead;
    },
    getNextLead(state){
      return state.next_lead;
    },
    getPrevLead(state){
      return state.prev_lead;
    },
    getLeadStatus(state){
      return state.leadStatus;
    },
    getLeadProperties(state){
      return state.leadProperties;
    },
    getLeadCustomProperties(state){
      return state.leadCustomProperties;
    },
    getLeadSources(state){
      return state.leadSources;
    },
    getOwners(state){
      return state.owners;
    },
    getLeadContacts(state){
      return state.leadContacts;
    },
    getPrimaryContact(state){
      return state.primaryContact;
    },
    getCurrentOwner(state){
      return state.currentOwner;
    },
    getPipelinesWithStage(state){
        return state.pipelines;
    },
    getLeadPipeline(){
        return state.leadPipeline;
    },
    getLeadHasPipelines(){
        return state.leadHasPipelines;
    },
  },
  actions:{
    setLeadPrevUrl(payload){
      this.leadPrevUrl = payload;
    },
    setLeadEditTimelineData(payload) {
      try{
        const appStore = useAppStore();
        this.leadStatus = appStore.getLeadStatuses;
  
        const {
          lead, 
          next_lead, 
          prev_lead, 
          lead_properties, 
          pipelines, 
          owners, 
          lead_sources
        } = payload;
  
        this.findLead  = lead;
        this.leadCustomProperties = lead?.custom_properties;
        this.prev_lead = prev_lead;
        this.next_lead = next_lead;
  
        if(owners){
          this.owners = owners;
        }
        if(pipelines){
          this.pipelines = pipelines;
        }
  
        if(lead_properties){
          this.leadProperties = lead_properties;
        }
  
        if(lead_sources){
          this.leadSources = lead_sources;
        }
        
        if(lead?.contacts?.length){
            this.leadContacts = lead?.contacts;
            if(lead?.contact){
                this.primaryContact = lead.contact;
            }else{
                this.primaryContact = lead?.contacts[0];
            }
        }
        if(lead?.owner){
            this.currentOwner = lead?.owner;
        }
      }catch(error){
        console.log(error);
      }
    },
  }
});
