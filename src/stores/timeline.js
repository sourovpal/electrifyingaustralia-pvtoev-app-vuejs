import { defineStore } from 'pinia';
import { useApiRequest } from '@actions';

export const useLeadStore = defineStore('timeline', {
  state: () => {
    return {
      isLoading: false,
      isFirstLoading: false,
      leadPrevUrl: null,
      editLead: {},
      editLeadId: null,
      prevLeadId: null,
      nextLeadId: null,
      leadOwner: {},
      leadPropertiesValues: {},
      leadPipeline: {},
      leadStage: {},
      primaryContact: {},
      isPipelineLead: false,
      leadSource: {},
      leadStatus: {},
      // 
      leadPipelineProperties: [],
      leadSubscribers: [],
      pipelineProperties: [],
      leadFiles: [],
      timelines: [],
      leadContacts: [],
      leadSources: [],
      leadProperties: [],
      leadStages: [],
      pipelines: [], // ok
      statuses: [],
      users: [],
    }
  },
  getters: {
    getIsLoading(stage) {
      return stage.isLoading;
    },
    getIsFirstLoading(stage) {
      return stage.isFirstLoading;
    },
    getLeadPrevUrl(state) {
      return state.leadPrevUrl;
    },
    getEditLead(state) {
      return state.editLead;
    },
    getEditLeadId(state) {
      return state.editLeadId;
    },
    getPrevLeadId(state) {
      return state.prevLeadId;
    },
    getNextLeadId(state) {
      return state.nextLeadId;
    },
    getLeadPropertiesValues(state) {
      return state.leadPropertiesValues;
    },
    getLeadSource(state) {
      return state.leadSource;
    },
    getLeadStatus(state) {
      return state.leadStatus;
    },
    getLeadOwner(state) {
      return state.leadOwner;
    },
    getPrimaryContact(state) {
      return state.primaryContact;
    },
    getLeadPipeline(state) {
      return state.leadPipeline;
    },
    getLeadStages(state) {
      return state.leadStages;
    },
    getLeadStage(state) {
      return state.leadStage;
    },
    getLeadSubscribers(stage) {
      return stage.leadSubscribers;
    },
    getIsPipelineLead(stage) {
      return stage.isPipelineLead;
    },
    getLeadContacts(state) {
      return state.leadContacts;
    },
    getLeadPipelineProperties(state) {
      return state.pipelineProperties;
    },
    getLeadProperties(state) {
      return state.leadProperties;
    },
    getTimelines(stage) {
      return stage.timelines;
    },
    getPipelines(state) {
      return state.pipelines;
    },
    getStatuses(stage) {
      return stage.statuses;
    },
    getPipelineStage(stage) {
      return stage.leadPipelineStage
    },
    getLeadFiles(stage) {
      return stage.leadFiles;
    },
    getUsers(stage) {
      return stage.users;
    }
  },
  actions: {
    setIsLoading(payload) {
      this.isLoading = !!payload;
    },
    setIsFirstLoading(payload) {
      this.isFirstLoading = payload;
    },
    setLeadPrevUrl(payload) {
      this.leadPrevUrl = payload ?? null;
    },
    setEditLeadId(payload) {
      this.editLeadId = payload;
    },
    setEditLead(payload) {
      if (typeof payload === 'object') {
        this.editLead = payload;
      }
    },
    setPrevLeadId(payload) {
      this.prevLeadId = payload;
    },
    setNextLeadId(payload) {
      this.nextLeadId = payload;
    },
    setLeadPropertiesValues(payload) {
      if (typeof payload === 'object') {
        this.leadPropertiesValues = payload;
      }
    },
    setLeadOwner(payload) {
      if (typeof payload === 'object') {
        this.leadOwner = payload;
      }
    },
    setPrimaryContact(payload) {
      if (typeof payload === 'object') {
        this.primaryContact = payload;
      }
    },
    setLeadSource(payload) {
      if (typeof payload === 'object') {
        this.leadSource = payload;
      }
    },
    setLeadStatus(payload) {
      if (typeof payload === 'object') {
        this.leadStatus = payload;
      }
    },
    setLeadStages(payload) {
      if (Array.isArray(payload)) {
        this.leadStages = payload;
      }
    },
    setLeadSubscribers(payload) {
      if (Array.isArray(payload)) {
        this.leadSubscribers = payload;
      }
    },
    setIsPipelineLead(payload) {
      this.isPipelineLead = payload;
    },
    setLeadPipeline(payload) {
      if (typeof payload === 'object') {
        this.leadPipeline = payload;
      }
    },
    setLeadStage(payload) {
      if (typeof payload === 'object') {
        this.leadStage = payload;
      }
    },
    setLeadContacts(payload) {
      if (Array.isArray(payload)) {
        this.leadContacts = payload;
      }
    },
    setPipelines(payload) {
      if (Array.isArray(payload)) {
        this.pipelines = payload;
      }
    },
    setStatuses(payload) {
      if (Array.isArray(payload)) {
        this.statuses = payload;
      }
    },
    setUsers(payload) {
      if (Array.isArray(payload)) {
        this.users = payload;
      }
    },


    resetLeadEditTimeline() {
      this.setEditLead({});
      this.setNextLeadId(null);
      this.setPrevLeadId(null);
      this.setPrimaryContact({});
      this.setLeadOwner({});
      this.setIsPipelineLead(false);
      this.setLeadPropertiesValues({});
      this.setLeadSource({});
      this.setLeadStatus({});
      this.setLeadPipeline({});
      this.setLeadStage({});
    },
    callFetchNewLead($leadId, $isNew = false) {
      this.setIsLoading($isNew);
      this.setEditLeadId($leadId);
      useApiRequest({
        url: `/timeline/leads/${$leadId}`,
      }).then(res => {
        const { success, lead, next_lead, prev_lead, is_pipeline } = res;
        if (success && lead) {
          const { primary_contact, owner, properties_values, source, status, pipeline, pipeline_stage, lead_subscribers } = lead;
          this.setEditLead(lead);
          this.setNextLeadId(next_lead);
          this.setPrevLeadId(prev_lead);
          this.setPrimaryContact(primary_contact);
          this.setLeadOwner(owner);
          this.setIsPipelineLead(is_pipeline);
          this.setLeadPropertiesValues(properties_values);
          this.setLeadSource(source);
          this.setLeadStatus(status);
          this.setLeadPipeline(pipeline);
          this.setLeadStage(pipeline_stage);
          this.setLeadSubscribers(lead_subscribers);
          // 
          this.setIsLoading(false);
          this.setIsFirstLoading(false);
          return;
        }
      }).catch(error => {
        this.setIsLoading(false);
        this.setIsFirstLoading(false);
      });
    },
    callFetchLeadContacts($leadId, $callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `timeline/${$leadId}/contacts`,
      }).then(res => {
        const { success, contacts } = res;
        if (success && contacts) {
          this.setLeadContacts(contacts);
          $callback({ loading: false, contacts });
        } else {
          $callback({ loading: false });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },
    callFetchLeadStages($leadId, $callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `timeline/leads/${$leadId}/stages`,
      }).then(res => {
        const { success, stages } = res;
        if (success && stages) {
          this.setLeadStages(stages);
          $callback({ loading: false, stages });
        } else {
          $callback({ loading: false });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },
    callFetchPipeline($callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `timeline/pipelines`,
      }).then(res => {
        const { success, pipelines } = res;
        if (success && pipelines) {
          this.setPipelines(pipelines);
          $callback({ loading: false, pipelines });
        } else {
          $callback({ loading: false });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },
    callFetchPipelineStages($pieplineId, $callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/timeline/${$pieplineId}/stages`,
      }).then(res => {
        const { success, stages, message } = res;
        if (success && stages) {
          $callback({ loading: false, stages });
        } else {
          $callback({ loading: false, message });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },
    callFetchStatuses($callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/timeline/statuses`,
      }).then(res => {
        const { success, statuses } = res;
        if (success && statuses) {
          this.setStatuses(statuses);
          $callback({ loading: false, statuses });
        } else {
          $callback({ loading: false });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },
    callFetchUsers($callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/timeline/users`,
      }).then(res => {
        const { success, users } = res;
        if (success && users) {
          this.setUsers(users);
          $callback({ loading: false, users });
        } else {
          $callback({ loading: false });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },

  }
});
