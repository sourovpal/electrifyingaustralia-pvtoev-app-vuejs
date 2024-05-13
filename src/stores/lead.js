import api from "../actions/api";
import VueCookies from "vue-cookies";

var leadTimelineHistory = {};
try{
    leadTimelineHistory = {
      state:{
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
      },
      getters:{
        getFindLead(state){
          return {...state.findLead};
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
      mutations: {
        setLeadEditTimelineData(state, payload) {
          var app = window.localStorage.getItem(import.meta.env.VITE_AUTH_APP);
          if(app){
            app = JSON.parse(app);
            const {lead_statuses} = app;
            if(lead_statuses){
              state.leadStatus = lead_statuses;
            }
          }

          const {lead, next_lead, prev_lead, lead_properties, pipelines, owners, lead_sources} = payload;
          state.findLead  = lead;

          state.leadCustomProperties = lead?.custom_properties;

          state.prev_lead = prev_lead;
          state.next_lead = next_lead;

          if(owners){
            state.owners = owners;
          }

          if(pipelines){
            state.pipelines = pipelines;
          }

          if(lead_properties){
            state.leadProperties = lead_properties;
          }

          if(lead_sources){
            state.leadSources = lead_sources;
          }
          
          if(lead?.contacts?.length){
              state.leadContacts = lead?.contacts;
              if(lead?.contact){
                  state.primaryContact = lead.contact;
              }else{
                  state.primaryContact = lead?.contacts[0];
              }
          }

          if(lead?.owner){
              state.currentOwner = lead?.owner;
          }
        }
      },
      actions: {
          
      },
  };
  
}catch(error){
  
}

export default leadTimelineHistory;
