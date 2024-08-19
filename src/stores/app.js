import api from "../actions/api";
import Storage from "../helpers/Storage";
import { defineStore } from 'pinia';
import { CONFIG } from "../config";

var initialCompany = {};
var initialLeadStatuses = [];
var initialPipelines = [];
var initialPermissions = [];


const appStorage = new Storage(CONFIG.VITE_AUTH_APP);
const {
  lead_statuses,
  pipelines,
  permissions,
  company
} = appStorage.get();

if (typeof company == 'object') {
  initialCompany = company;
}

if (Array.isArray(lead_statuses)) {
  initialLeadStatuses = lead_statuses;
}

if (Array.isArray(pipelines)) {
  initialPipelines = pipelines;
}

if (Array.isArray(permissions)) {
  initialPermissions = permissions;
}

export const useAppStore = defineStore('app', {

  state: () => {
    return {
      company: initialCompany,
      leadStatuses: initialLeadStatuses,
      pipelines: initialPipelines,
      permissions: initialPermissions,
      users: [],
    }
  },

  getters: {
    getUsers(state) {
      return state.users;
    },
    getPermissions(state) {
      return state.permissions;
    },
    getCompany(state) {
      return state.company;
    },
    getLeadStatuses(state) {
      return state.leadStatuses;
    },
    getPipelines(state) {
      return state.pipelines;
    },
  },
  actions: {
    setUsers(payload) {
      this.users = payload;
    },
    setPermssions(payload) {
      this.permissions = payload;
    },
    setCompany(payload) {
      this.company = payload;
    },
    setLeadStatuses(payload) {
      this.leadStatuses = payload;
    },
    setPipelines(payload) {
      this.pipelines = payload;
    },
    async fetchAppData() {
      try {
        await api.get(`/app`).then((res) => {
          this.setLocalStorageData(res.data);
        }).catch((error) => {
          console.log(error);
        });
      } catch (error) { }
    },
    setLocalStorageData(payload = {}) {
      var {
        lead_statuses,
        pipelines,
        permissions,
        company,
        users
      } = payload ?? {};
      
      appStorage.remove();
      appStorage.set({ lead_statuses, permissions, company, pipelines });

      if (typeof lead_statuses != 'undefined') this.setLeadStatuses(lead_statuses);
      if (typeof pipelines != 'undefined') this.setPipelines(pipelines);
      if (typeof permissions != 'undefined') this.setPermssions(permissions);
      if (typeof company != 'undefined') this.setCompany(company);
      if (typeof users != 'undefined') this.setUsers(users);

    },
  }

});
