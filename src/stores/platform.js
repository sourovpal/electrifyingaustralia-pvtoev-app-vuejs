import { defineStore } from "pinia";
import { useApiRequest } from "@actions";
import { validateObject } from "@helpers";

import { $toast } from '@config';

export const usePlatformStore = defineStore("platform", {
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
      leadTasks: [],
      //
      leadPipelineProperties: [],
      leadSubscribers: [],
      pipelineProperties: [],
      leadFiles: [],
      leadContacts: [],
      leadSources: [],
      leadProperties: [],
      leadPrimaryStages: [],
      leadSuccessStages: [],
      leadLostStages: [],
      pipelines: [],
      pipelineStages: [],
      statuses: [],
      users: [],
      sources: [],
      workflows: [],
      //
      toggleLeadEditModal: false,
      //
      timelinesRef: () => { },
      toggleTimelineRightSidebar: false,
      certifyModalAction: false,
    };
  },
  getters: {
    getCertifyModalAction(stage) {
      return stage.certifyModalAction;
    },
    getToggleRightSidebar(stage) {
      return stage.toggleTimelineRightSidebar;
    },
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
      return stage.leadPipelineStage;
    },
    getLeadFiles(stage) {
      return stage.leadFiles;
    },
    getUsers(stage) {
      return stage.users;
    },
    getSources(stage) {
      return stage.sources;
    },
    getLeadPrimaryStages(stage) {
      return stage.leadPrimaryStages;
    },
    getLeadSuccessStages(stage) {
      return stage.leadSuccessStages;
    },
    getLeadLostStages(stage) {
      return stage.leadLostStages;
    },
    getPipelineStages(stage) {
      return stage.pipelineStages;
    },
    getLeadEditModal(stage) {
      return stage.toggleLeadEditModal;
    },
    getWorkflows(stage) {
      return stage.workflows;
    }
  },
  actions: {
    setCertifyModalAction(payload) {
      this.certifyModalAction = payload;
    },
    setToggleRightSidebar() {
      return (this.toggleTimelineRightSidebar =
        !this.toggleTimelineRightSidebar);
    },
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
      if (typeof payload === "object" && payload != null) {
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
      if (typeof payload === "object" && payload != null) {
        this.leadPropertiesValues = payload;
      }
    },
    setLeadOwner(payload) {
      if (typeof payload === "object" && payload != null) {
        this.leadOwner = payload;
      }
    },
    setPrimaryContact(payload) {
      if (typeof payload === "object" && payload != null) {
        this.primaryContact = payload;
      }
    },
    setLeadSource(payload) {
      if (typeof payload === "object" && payload != null) {
        this.leadSource = payload;
      }
    },
    setLeadStatus(payload) {
      if (typeof payload === "object" && payload != null) {
        this.leadStatus = payload;
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
      if (typeof payload === "object" && payload != null) {
        this.leadPipeline = payload;
      }
    },
    setLeadStage(payload) {
      if (typeof payload === "object" && payload != null) {
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
    appendLeadFile(payload, top = true) {
      if (validateObject(payload)) {
        if (top) this.leadFiles = [payload, ...this.leadFiles];
        if (!top) this.leadFiles = [...this.leadFiles, payload];
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
    setWorkflows(payload) {
      if (Array.isArray(payload)) {
        this.workflows = payload;
      }
    },
    setLeadPrimaryStages(payload) {
      if (Array.isArray(payload)) {
        this.leadPrimaryStages = payload;
      }
    },
    setLeadSuccessStages(payload) {
      if (Array.isArray(payload)) {
        this.leadSuccessStages = payload;
      }
    },
    setLeadLostStages(payload) {
      if (Array.isArray(payload)) {
        this.leadLostStages = payload;
      }
    },
    //
    setToggleLeadEditModal(status = false) {
      this.toggleLeadEditModal = status;
    },
    setPipelineStages(payload) {
      if (Array.isArray(payload)) {
        this.pipelineStages = payload;
      }
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
      this.setLeadPrimaryStages([]);
      this.setLeadSuccessStages([]);
      this.setLeadLostStages([]);
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
        url: `/platform/${$leadId}/deals`,
      })
        .then((res) => {
          const { success, lead, next_lead, prev_lead, is_pipeline } = res;
          if (success && lead) {
            const {
              primary_contact,
              owner,
              properties_values,
              source,
              status,
              pipeline,
              pipeline_stage,
              lead_subscribers,
            } = lead;
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
        })
        .catch((error) => {
          this.setIsLoading(false);
          this.setIsFirstLoading(false);
        });
    },
    callFetchLeadContacts($leadId, $callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/platform/${$leadId}/contacts`,
      })
        .then((contacts) => {
          if (contacts) {

            this.setLeadContacts(contacts);
            return $callback({ loading: false, contacts });

          }

          $callback({ loading: false });
        })
        .catch((error) => {
          $callback({ loading: false });
        });
    },
    callFetchLeadStages($leadId, $callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/platform/leads/${$leadId}/stages`,
      })
        .then((stages) => {

          if (stages) {

            const { primary_stages, success_stages, lost_stages } = stages;

            this.setLeadPrimaryStages(primary_stages);

            this.setLeadSuccessStages(success_stages);

            this.setLeadLostStages(lost_stages);

            $callback({ loading: false, stages });

          }

          $callback({ loading: false });
        })
        .catch((error) => {

          $callback({ loading: false });

        });
    },
    callFetchPipeline($callback = () => { }) {

      $callback({ loading: true });

      useApiRequest({
        url: `/platform/pipelines`,
      })
        .then((pipelines) => {

          if (pipelines) {
            this.setPipelines(pipelines);
            return $callback({ loading: false, pipelines: pipelines });
          }

          $callback({ loading: false });
        })
        .catch((error) => {
          $callback({ loading: false });
        });
    },
    callFetchPipelineStages($pieplineId, $callback = () => { }) {
      $callback({ loading: true });
      useApiRequest({
        url: `/platform/${$pieplineId}/stages`,
      })
        .then((stages) => {

          if (stages) {

            this.setPipelineStages(stages);
            return $callback({ loading: false, stages });
          }
          $callback({ loading: false, message });

        })
        .catch((error) => {
          $callback({ loading: false });
        });
    },
    callFetchStatuses($callback = () => { }) {

      $callback({ loading: true });

      useApiRequest({
        url: `/platform/statuses`,
      })
        .then((statuses) => {

          if (statuses) {
            this.setStatuses(statuses);
            return $callback({ loading: false, statuses });

          }

          $callback({ loading: false });
        })
        .catch((error) => {

          $callback({ loading: false });

        });
    },
    callFetchUsers($callback = () => { }) {

      $callback({ loading: true });

      useApiRequest({
        url: `/platform/users`,
      })
        .then((users) => {

          if (users) {

            this.setUsers(users);

            $callback({ loading: false, users });

          } else {

            $callback({ loading: false });

          }

        })
        .catch((error) => {

          $callback({ loading: false });

        });
    },
    callFetchProperties($leadId = null, $callback = () => { }) {

      $callback({ loading: true });

      useApiRequest({
        url: `/platform/leads/${$leadId ? $leadId + "/" : ""}properties`,
      })
        .then((properties) => {
          if (properties) {

            const { lead_properties, pipeline_properties } = properties;

            this.setLeadProperties(lead_properties);

            this.setPipelineProperties(pipeline_properties);

            $callback({ loading: false, lead_properties, pipeline_properties });

          } else {

            $callback({ loading: false });

          }

        })
        .catch((error) => {
          $callback({ loading: false });
        });
    },
    callFetchSources($callback = () => { }) {

      $callback({ loading: true });

      useApiRequest({
        url: `/platform/sources`,
      })
        .then((sources) => {
          if (sources) {

            this.setSources(sources);

            $callback({ loading: false, sources });

          } else {

            $callback({ loading: false });

          }
        })
        .catch((error) => {

          $callback({ loading: false });

        });
    },
    callFetchFiles($leadId, $callback = () => { }) {

      $callback({ loading: true });

      useApiRequest({
        url: `/platform/${$leadId}/attachments`,
      })
        .then((attachments) => {

          if (attachments) {

            this.setLeadFiles(attachments);

            $callback({ loading: false, files });

          } else {

            $callback({ loading: false });

          }
        })
        .catch((error) => {

          $callback({ loading: false });

        });
    },
    callFetchLeadTasks($leadId, $callback = () => { }) {

      $callback({ loading: true });

      useApiRequest({
        url: `/platform/${$leadId}/tasks`,
      })
        .then((tasks) => {

          if (tasks) {

            this.setLeadTasks(tasks);

            $callback({ loading: false, tasks });

          } else {

            $callback({ loading: false });

          }
        })
        .catch((error) => {

          $callback({ loading: false });

        });
    },
    setFetchTimelineLogs(payload) {
      this.timelinesRef = payload;
    },
    callFetchTimelineLogs(...args) {
      this.timelinesRef(...args);
    },
    callFetchWorkflows($leadId, $callback = () => { }) {

      $callback({ loading: true });

      useApiRequest({
        url: `/platform/${$leadId}/workflows`,
      })
        .then(async (workflows) => {

          $callback({ loading: false });

          if (workflows)
            return this.setWorkflows(workflows);

        })
        .catch((error) => {

          $toast.error(error.message);

        })
        .finally(() => {

          $callback({ loading: false });

        });
    }



  },
});
