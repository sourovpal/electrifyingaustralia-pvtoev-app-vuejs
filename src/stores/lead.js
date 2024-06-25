import { defineStore } from 'pinia';
import {useAppStore} from "../stores/app";

export const useLeadStore = defineStore('lead', {
  state: () => {
    return {
      leadPrevUrl:null,
      currentLead:{},
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
      leadStages:[],
      leadPipelineStage:{},
      leadPipelineProperties:[],
      leadPipelineStagePropertiesValue:{},
      leadSubscribers:[],
    }
  },
  getters:{
    getLeadPrevUrl(state){
      return state.leadPrevUrl;
    },
    getCurrentLead(state){
      return state.currentLead;
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
    getLeadPipeline(state){
        return state.leadPipeline;
    },
    getLeadHasPipelines(state){
        return state.leadHasPipelines;
    },
    getLeadStages(state){
        return state.leadStages;
    },
    getLeadPipelineStage(stage){
      return stage.leadPipelineStage
    },
    getLeadSubscribers(stage){
      return stage.leadSubscribers;
    }
    // getLeadPipelineProperties(stage){
    //   return stage.leadPipelineProperties;
    // },
    // getLeadPipelinePropertiesValue(stage){
    //   return stage.leadPipelineStagePropertiesValue;
    // }
  },
  actions:{
    setOwner(payload){
      this.currentOwner = payload;
    },
    setLeadPrevUrl(payload){
      this.leadPrevUrl = payload;
    },
    setPrimaryContact(payload){
      this.primaryContact = payload;
    },
    setLeadSubscribers(payload){
      return this.leadSubscribers = payload;
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
          lead_sources,
          lead_stages,
          pipeline_stage,
        } = payload;

        console.log(owners)

        this.currentLead  = lead;
        this.leadCustomProperties = lead?.custom_properties;
        this.prev_lead = prev_lead;
        this.next_lead = next_lead;
        this.leadSubscribers = lead?.lead_subscribers??[];
        this.leadPipelineStage = pipeline_stage??{};
        this.owners = owners??[];
        this.pipelines = pipelines??[];
        this.leadProperties = lead_properties??[];
        this.leadSources = lead_sources??[];
        this.leadStages = lead_stages??[];
        this.currentOwner = lead?.owner??{};

        if(lead?.contacts?.length){
            this.leadContacts = lead?.contacts;
            if(lead?.contact){
                this.primaryContact = lead.contact;
            }else{
                this.primaryContact = lead?.contacts[0];
            }
        }else{
          this.leadContacts = [];
          this.primaryContact = {};
        }

      }catch(error){
        console.log(error);
      }
    },
  }
});
