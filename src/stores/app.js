import api from "../actions/api";
import Storage from "../helpers/Storage";
import { defineStore } from 'pinia';
import { CONFIG } from "../config";

const appStorage = new Storage(CONFIG.VITE_AUTH_APP);

export const useAppStore = defineStore('app', {

  state: () => {
    return {
      company: {},
      leadStatuses: [],
      pipelines: [],
      permissions: [],
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
      this.setLocalStorageData();
      try {
        await api.get(`/app`).then((res) => {
          this.setLocalStorageData(res.data);
        }).catch((error) => {
          console.log(error);
        });
      } catch (error) { }
    },
    setLocalStorageData(payload = null) {
      var {
        lead_statuses,
        pipelines,
        permissions,
        company,
        users
      } = { ...appStorage.get(), ...payload ?? {} };
      if (payload) {
        this.setCompany(company ?? {});
        this.setUsers(users ?? []);
        appStorage.remove();
        appStorage.set({ lead_statuses, permissions, company, pipelines });
      }
      this.setPermssions(permissions);
      this.setLeadStatuses(lead_statuses);
      this.setPipelines(pipelines);

    },
  }

});
