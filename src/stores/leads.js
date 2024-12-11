import Http from '@http';
import { defineStore } from "pinia";
import Storage from "@utils/storage";
import { validateObject } from "@helpers";

const leadHeaderStore = new Storage("header_properties");

export const useLeadsStore = defineStore("leads", {
  state: () => {

    return {
      isError: false,
      fetchQuery: {},
      filterQuerys: {},
      leads: [],
      pagination: {
        prev_page: null,
        next_prev: null,
        total: 0,
        from: 0,
        to: 0,
        current_page: 1,
      },
      isLoading: false,
      isFirstLoading: false,
      headers: [],
      properties: [],
      selectedLeads: [],
      isAllLeadsSelected: false,
      isSomeLeadsSelected: false,
      addNewLeadModal: null,
      uploadSpreadsheetModal: null,
      headers: leadHeaderStore.get() ?? [],
      toggleFilter: false,
    };

  },
  getters: {
    getLeads(stage) { return stage.leads },

    getLeadPagination(stage) { return stage.pagination },

    getIsLoading(stage) { return stage.isLoading },

    getIsLoading(stage) { return stage.isLoading },

    getIsFirstLoading(stage) { return stage.isFirstLoading },

    getSelectedLeads(stage) { return stage.selectedLeads },

    getIsAllLeadSelected(stage) { return stage.isAllLeadsSelected },

    getIsSomeLeadSelected(stage) { return stage.isSomeLeadsSelected },

    getError(stage) { return stage.isError },

    getAddNewLeadModal(stage) { return stage.addNewLeadModal },

    getUploadSpreadsheetModal(stage) { return stage.uploadSpreadsheetModal },

    getHeaders(stage) { return stage.headers },

    getToggleFilter(stage) { return stage.toggleFilter },

    getFilterQuerys(stage) { return stage.filterQuerys },

  },
  actions: {
    setError(payload) { this.isError = payload },

    setFetchQuery(payload = {}, isFetch = false) {

      if (validateObject(payload)) this.fetchQuery = { ...this.fetchQuery, ...payload };

      else this.fetchQuery = {};

      if (Object.keys(this.filterQuerys).length) this.fetchQuery["filters"] = JSON.stringify(this.filterQuerys);

      else delete this.fetchQuery["filters"];

      if (isFetch) this.callFetchLeads();

    },
    setFilterQuerys(payload = {}, isNew = false, isReset = false) {

      if (validateObject(payload) && !isNew && !isReset) this.filterQuerys = { ...this.filterQuerys, payload };

      if (validateObject(payload) && isNew && !isReset) this.filterQuerys = payload;

      if (isReset) this.filterQuerys = {};

    },
    setLeads(payload = []) { if (Array.isArray(payload)) this.leads = payload },

    setLeadPagination(payload = {}) { if (validateObject(payload)) this.pagination = payload },

    setIsLoading(payload) { this.isLoading = !!payload },

    setIsFirstLoading(payload) { this.isFirstLoading = !!payload },

    setTotalSelectedLeads() {
      this.isAllLeadsSelected = !!(this.selectedLeads.length && this.selectedLeads.length === this.leads.length);
      this.isSomeLeadsSelected = !!(this.selectedLeads.length && this.selectedLeads.length !== this.leads.length);
    },
    setSelectedLeads(payload) {

      if (Array.isArray(payload)) {

        this.selectedLeads = payload;

        return this.setTotalSelectedLeads();

      } else if (!["string", "number"].includes(typeof payload)) {

        return this.setTotalSelectedLeads();

      }

      let index = this.selectedLeads.findIndex((id) => id === payload);

      if (index > -1) this.selectedLeads.splice(index, 1);

      else this.selectedLeads.push(payload);

      this.setTotalSelectedLeads();

    },

    setHeaders(payload = []) { if (Array.isArray(payload)) this.headers = payload },

    setProperties(payload = []) { if (Array.isArray(payload)) this.headers = payload },

    setAddNewLeadModal(payload) { this.addNewLeadModal = payload },

    setUploadSpreadsheetModal(payload) { this.uploadSpreadsheetModal = payload },
    
    setHeaders(payload) {

      if (!Array.isArray(payload)) return;

      this.headers = payload;

      leadHeaderStore.set(payload);

    },
    setToggleFilter(payload) { this.toggleFilter = payload },
    //
    callFetchLeads() {

      this.setSelectedLeads([]);

      this.setIsLoading(true);

      this.setError(false);

      Http
        .leads
        .all(this.fetchQuery)
        .then(({ data: { leads, pagination } }) => {

          this.setLeads(leads);

          this.setLeadPagination(pagination);

        })
        .catch(_ => this.setError(true))
        .finally(_ => {
          this.setIsFirstLoading(false);
          this.setIsLoading(false);
        });
    },
  },
});
