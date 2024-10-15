import { useApiRequest } from "@actions";
import Storage from "@helpers/Storage";
import { defineStore } from "pinia";
import { CONFIG } from "@config";
import { useAuthStore } from "./auth";
import { validateObject } from "@helpers";

const appStorage = new Storage(CONFIG.VITE_AUTH_APP);
const userStorage = new Storage(CONFIG.VITE_AUTH_USER);
const companyStorage = new Storage(CONFIG.VITE_AUTH_COMPANY);
const permissionsStorage = new Storage(CONFIG.VITE_AUTH_PERMISSIONS);
const statusesStorage = new Storage(CONFIG.VITE_AUTH_STATUSES);
const pipelinesStorage = new Storage(CONFIG.VITE_AUTH_PIPELINES);

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      app: appStorage.get() ?? {},
      company: companyStorage.get() ?? {},
      leadStatuses: statusesStorage.get() ?? [],
      pipelines: pipelinesStorage.get() ?? [],
      permissions: permissionsStorage.get() ?? {},
      user: userStorage.get() ?? {},
    };
  },

  getters: {
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
    getUser(state) {
      return state.user;
    }
  },
  actions: {
    setUser(payload) {
      if (validateObject(payload)) {
        this.user = payload;
        userStorage.set(payload);
        useAuthStore().setUser(payload);
      }
    },
    setPermssions(payload) {
      if (Array.isArray(payload)) {
        this.permissions = payload;
        permissionsStorage.set(payload);
      }
    },
    setCompany(payload) {
      if (validateObject(payload)) {
        this.company = payload;
        companyStorage.set(payload);
      }
    },
    setLeadStatuses(payload) {
      if (Array.isArray(payload)) {
        this.leadStatuses = payload;
        statusesStorage.set(payload);
      }
    },
    setPipelines(payload) {
      if (Array.isArray(payload)) {
        this.pipelines = payload;
        pipelinesStorage.set(payload);
      }
    },
    callFetchAppData() {
      useApiRequest({
        url: "/app",
      })
        .then((res) => {
          const {
            success,
            user,
            company,
            lead_statuses,
            pipelines,
            permissions,
          } = res;
          if (success) {
            this.setUser(user);
            this.setCompany(company);
            this.setLeadStatuses(lead_statuses);
            this.setPipelines(pipelines);
            this.setPermssions(permissions);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
