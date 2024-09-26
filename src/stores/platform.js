import { defineStore } from 'pinia';
import { useApiRequest } from '@actions';
import Storage from '@helpers/Storage';
const leadHasPipeline = new Storage('is_pipeline_lead');

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
      isPipelineLead: leadHasPipeline.get() ?? false,
      leadSource: {},
      leadStatus: {},
      leadTasks: [],
      // 
      leadPipelineProperties: [],
      leadSubscribers: [],
      pipelineProperties: [],
      leadFiles: [],
      leadContacts: [],
      leadSources: [],
      leadProperties: [],
      leadStages: [],
      pipelines: [],
      statuses: [],
      users: [],
      sources: [],
      // 
      leadEditModal: null,
      //
      timelinesRef: () => { },
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
    getLeadTasks(stage) {
      return stage.leadTasks;
    },
    getPipelineProperties(state) {
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
    },
    getSources(stage) {
      return stage.sources;
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
      if (typeof payload === 'object' && payload != null) {
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
      if (typeof payload === 'object' && payload != null) {
        this.leadPropertiesValues = payload;
      }
    },
    setLeadOwner(payload) {
      if (typeof payload === 'object' && payload != null) {
        this.leadOwner = payload;
      }
    },
    setPrimaryContact(payload) {
      if (typeof payload === 'object' && payload != null) {
        this.primaryContact = payload;
      }
    },
    setLeadSource(payload) {
      if (typeof payload === 'object' && payload != null) {
        this.leadSource = payload;
      }
    },
    setLeadStatus(payload) {
      if (typeof payload === 'object' && payload != null) {
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
      leadHasPipeline.set(payload);
      this.isPipelineLead = payload;
    },
    setLeadPipeline(payload) {
      if (typeof payload === 'object' && payload != null) {
        this.leadPipeline = payload;
      }
    },
    setLeadStage(payload) {
      if (typeof payload === 'object' && payload != null) {
        this.leadStage = payload;
      }
    },
    setLeadContacts(payload) {
      if (Array.isArray(payload)) {
        this.leadContacts = payload;
      }
    },
    setLeadFiles(payload) {
      if (Array.isArray(payload)) {
        this.leadFiles = payload;
      }
    },
    setLeadTasks(payload) {
      if (Array.isArray(payload)) {
        this.leadTasks = payload;
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
    setLeadProperties(payload) {
      if (Array.isArray(payload)) {
        this.leadProperties = payload;
      }
    },
    setPipelineProperties(payload) {
      if (Array.isArray(payload)) {
        this.pipelineProperties = payload;
      }
    },
    setSources(payload) {
      if (Array.isArray(payload)) {
        this.sources = payload;
      }
    },

    // 
    setLeadEditModal(payload) {
      this.leadEditModal = payload;
    },
    toggleLeadEditModal(status = false) {
      if (status) return this.leadEditModal?.showModalHandler();
      this.leadEditModal?.hideModalHandler();
    },

    resetLeadEditTimeline(all = false) {
      this.setEditLead({});
      this.setEditLeadId(null);
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
      this.setLeadContacts([]);
      this.setLeadStages([]);
      this.setLeadFiles([]);
      this.setLeadSubscribers([]);
      this.setLeadTasks([]);
      if (all) {
        this.setLeadProperties([]);
        this.setPipelines([]);
        this.setStatuses([]);
        this.setUsers([]);
        this.setSources([]);
      }
    },
    callFetchNewLead($leadId, $isNew = false) {
      this.setIsLoading($isNew);
      this.setEditLeadId($leadId);
      useApiRequest({
        url: `/platform/${$leadId}/leads`,
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
        url: `/platform/${$leadId}/contacts`,
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
        url: `/platform/leads/${$leadId}/stages`,
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
        url: `/platform/pipelines`,
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
        url: `/platform/${$pieplineId}/stages`,
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
        url: `/platform/statuses`,
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
        url: `/platform/users`,
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
    callFetchProperties($leadId, $callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/platform/leads/${$leadId}/properties`,
      }).then(res => {
        const { success, lead_properties, pipeline_properties } = res;
        if (success) {
          this.setLeadProperties(lead_properties);
          this.setPipelineProperties(pipeline_properties);
          $callback({ loading: false, lead_properties, pipeline_properties });
        } else {
          $callback({ loading: false });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },
    callFetchSources($callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/platform/sources`,
      }).then(res => {
        const { success, sources } = res;
        if (success) {
          this.setSources(sources);
          $callback({ loading: false, sources });
        } else {
          $callback({ loading: false });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },
    callFetchFiles($leadId, $callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/platform/${$leadId}/files`,
      }).then(res => {
        const { success, files } = res;
        if (success) {
          this.setLeadFiles(files);
          $callback({ loading: false, files });
        } else {
          $callback({ loading: false });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },
    callFetchLeadTasks($leadId, $callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/platform/${$leadId}/tasks`,
      }).then(res => {
        const { success, tasks } = res;
        if (success) {
          this.setLeadTasks(tasks);
          $callback({ loading: false, tasks });
        } else {
          $callback({ loading: false });
        }
      }).catch(error => {
        $callback({ loading: false });
      });
    },
    setFetchTimelineLogs(payload) {
      this.timelinesRef = payload;
    },
    callFetchTimelineLogs(...args) {
      this.timelinesRef(...args);
    },


  }
});
