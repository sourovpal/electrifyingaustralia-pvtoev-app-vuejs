import Storage from "../helpers/Storage";
import { defineStore } from "pinia";
import { CONFIG, $toast } from "@config";
import { useApiRequest } from "@actions";
import { nextTick } from "vue";
import { validateObject } from "@helpers";

const userStorage = new Storage(CONFIG.VITE_AUTH_USER);
const securityStorage = new Storage(CONFIG.VITE_AUTH_TOKEN);
const appStorage = new Storage(CONFIG.VITE_AUTH_APP);
const companyStorage = new Storage(CONFIG.VITE_AUTH_COMPANY);
const permissionsStorage = new Storage(CONFIG.VITE_AUTH_PERMISSIONS);
const statusesStorage = new Storage(CONFIG.VITE_AUTH_STATUSES);
const pipelinesStorage = new Storage(CONFIG.VITE_AUTH_PIPELINES);

export const isAuthorized = (path = null, state = false) => {
  var auth = !!securityStorage.get() && !!userStorage.get();

  if (auth === state && path) {
    window.location.replace(path);
  }

  return auth;
};

export const checkPermission = (permissions) => {
  return true;
};

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: userStorage.get() ?? {},
      access_token: securityStorage.get() ?? "",
      toggleConfirmModal: false,
    };
  },
  getters: {
    getUser(state) {
      return state.user ?? userStorage.get();
    },
    getAccessToken(state) {
      return state.access_token ?? "";
    },
    getConfirmLogout(state) {
      return state.toggleConfirmModal;
    },
  },
  actions: {
    logoutLocalSession() {
      userStorage.remove();
      securityStorage.remove();
      appStorage.remove();
      companyStorage.remove();
      permissionsStorage.remove();
      statusesStorage.remove();
      pipelinesStorage.remove();
    },
    setUser(payload) {
      if (validateObject(payload)) {
        this.user = payload;
        userStorage.set(payload);
      }
    },
    setAccessToken(payload = null) {
      if (payload) {
        securityStorage.remove();
        securityStorage.set(payload);
        this.access_token = payload;
      }
    },
    setConfirmLogout(payload) {
      this.toggleConfirmModal = payload;
    },
    callAuthLogout() {
      useApiRequest({
        url: "/users/logout",
        method: "post",
      })
        .then(async (res) => {
          await this.logoutLocalSession();
          await nextTick();
          window.location.reload();
        })
        .catch((error) => {
          $toast.error(error.message);
        });
    },
  },
});
