import { defineStore } from 'pinia';
import { useAppStore } from "../stores/app";

export const useLeadStore = defineStore('lead', {
  state: () => {
    return {
      leadPrevUrl: null,
      currentLead: {},
      prev_lead: null,
      next_lead: null,
      leadProperties: [],
      leadPropertiesValues:{},
      leadSources: [],
      leadOwner: null,
      pipelines: [],
      leadPipeline: [],
      leadHasPipeline: [],
      primaryContact: null,
      leadContacts: [],
      primaryContact: null,
      leadStages: [],
      leadPipelineProperties: [],
      leadSubscribers: [],
      isPipelineLead:false,
    }
  },
  getters: {
    getLeadPrevUrl(state) {
      return state.leadPrevUrl;
    },
    getCurrentLead(state) {
      return state.currentLead;
    },
    getPrevLead(state) {
      return state.prev_lead;
    },
    getNextLead(state) {
      return state.next_lead;
    },
    getLeadProperties(state) {
      return state.leadProperties;
    },
    getLeadPropertiesValues(state) {
      return state.leadPropertiesValues;
    },
    getLeadSources(state) {
      return state.leadSources;
    },
    getLeadOwner(state) {
      return state.leadOwner;
    },
    getLeadContacts(state) {
      return state.leadContacts;
    },
    getPrimaryContact(state) {
      return state.primaryContact;
    },
    getCurrentOwner(state) {
      return state.leadOwner;
    },
    getPipelinesWithStage(state) {
      return state.pipelines;
    },
    getLeadPipeline(state) {
      return state.leadPipeline;
    },
    getLeadHasPipelines(state) {
      return state.leadHasPipelines;
    },
    getLeadStages(state) {
      return state.leadStages;
    },
    getLeadPipelineStage(stage) {
      return stage.leadPipelineStage
    },
    getLeadSubscribers(stage) {
      return stage.leadSubscribers;
    },
    getIsPipelineLead(stage){
      return stage.isPipelineLead;
    }
  },
  actions: {
    setLeadPrevUrl(payload) {
      this.leadPrevUrl = payload;
    },
    setCurrentLead(payload) {
      this.currentLead = payload;
    },
    setNextLead(payload) {
      this.next_lead = payload;
    },
    setPrevLead(payload) {
      this.prev_lead = payload;
    },
    setLeadProperties(payload) {
      this.leadProperties = payload;
    },
    setLeadPropertiesValues(payload) {
      this.leadPropertiesValues = payload;
    },
    setLeadSources(payload) {
      this.leadSources = payload;
    },
    setOwners(payload) {
      this.owners = payload;
    },
    setLeadOwner(payload) {
      this.leadOwner = payload;
    },
    setLeadContacts(payload) {
      this.leadContacts = payload;
    },
    setPrimaryContact(payload) {
      this.primaryContact = payload;
    },
    setPipelinesWithStage(payload) {
      this.pipelines = payload;
    },
    setLeadHasPipelines(payload) {
      this.leadHasPipelines = payload;
    },
    setLeadStages(payload) {
      this.leadStages = payload;
    },
    setLeadSubscribers(payload) {
      this.leadSubscribers = payload;
    },
    setIsPipelineLead(payload){
      return this.isPipelineLead = payload;
    },
    setLeadEditTimelineData(payload) {
      try {
        const {
          lead,
          next_lead,
          prev_lead,
          lead_properties,
          lead_sources,
          lead_stages,
        } = payload;

        this.setCurrentLead(lead);
        this.setIsPipelineLead(!!(lead?.pipeline_id && lead?.pipeline_stage_id));
        this.setLeadPropertiesValues(lead?.properties_values??{});
        this.setPrevLead(prev_lead);
        this.setNextLead(next_lead);
        this.setLeadSubscribers(lead?.lead_subscribers ?? []);
        this.setLeadProperties(lead_properties ?? []);
        this.setLeadSources(lead_sources ?? []);
        this.setLeadOwner(lead?.owner ?? {});
        this.setLeadStages(lead_stages);

        if (lead?.contacts?.length) {
          this.setLeadContacts(lead?.contacts??[]);
          if (lead?.primary_contact) {
            this.setPrimaryContact(lead.primary_contact??{})
          } else {
            this.setPrimaryContact(lead?.contacts[0]??{})
          }
        } else {
          this.leadContacts = [];
          this.primaryContact = {};
        }

      } catch (error) {
        console.log(error);
      }
    },
  }
});
