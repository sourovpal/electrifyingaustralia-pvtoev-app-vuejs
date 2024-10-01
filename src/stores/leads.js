import { defineStore } from 'pinia';
import { useApiRequest } from '@actions';

function validateObject(payload) {
    if (typeof payload == 'object' && payload != null && !Array.isArray(payload)) {
        return true;
    }
    return false;
}


export const useLeadsStore = defineStore('leads', {
    state: () => {
        return {
            isError: false,
            fetchQuery: {},
            leads: [],
            leadPagination: {
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
            multipleDeleteModal: null,
            addNewLeadModal: null,
        }
    },
    getters: {
        getLeads(stage) {
            return stage.leads;
        },
        getLeadPagination(stage) {
            return stage.leadPagination;
        },
        getIsLoading(stage) {
            return stage.isLoading;
        },
        getIsLoading(stage) {
            return stage.isLoading;
        },
        getIsFirstLoading(stage) {
            return stage.isFirstLoading;
        },
        getSelectedLeads(stage) {
            return stage.selectedLeads;
        },
        getIsAllLeadSelected(stage) {
            return stage.isAllLeadsSelected;
        },
        getIsSomeLeadSelected(stage) {
            return stage.isSomeLeadsSelected;
        },
        getError(stage) {
            return stage.isError;
        },
        getMultipleDeleteModal(stage) {
            return stage.multipleDeleteModal;
        },
        getAddNewLeadModal(stage) {
            return stage.addNewLeadModal;
        }
    },
    actions: {
        setError(payload) {
            return this.isError = payload;
        },
        setFetchQuery(payload = {}, fetch = false) {
            if (validateObject(payload)) {
                this.fetchQuery = { ...this.fetchQuery, ...payload };
            } else {
                this.fetchQuery = {};
            }
            if (fetch) {
                this.callFetchLeads();
            }
        },
        setLeads(payload = []) {
            if (Array.isArray(payload)) {
                this.leads = payload;
            }
        },
        setLeadPagination(payload = {}) {
            if (validateObject(payload)) {
                this.leadPagination = payload;
            }
        },
        setIsLoading(payload) {
            this.isLoading = !!payload;
        },
        setIsFirstLoading(payload) {
            this.isFirstLoading = !!payload;
        },
        setTotalSelectedLeads() {
            this.isAllLeadsSelected = !!(this.selectedLeads.length && this.selectedLeads.length === this.leads.length);
            this.isSomeLeadsSelected = !!(this.selectedLeads.length && this.selectedLeads.length !== this.leads.length);
        },
        setSelectedLeads(payload) {
            if (Array.isArray(payload)) {
                this.selectedLeads = payload;
                this.setTotalSelectedLeads();
                return;
            } else if (!['string', 'number'].includes(typeof payload)) {
                this.setTotalSelectedLeads();
                return;
            }
            let index = this.selectedLeads.findIndex(id => id === payload);
            if (index > -1) {
                this.selectedLeads.splice(index, 1);
            } else {
                this.selectedLeads.push(payload);
            }
            this.setTotalSelectedLeads();
        },
        setHeaders(payload = []) {
            if (Array.isArray(payload)) {
                this.headers = payload;
            }
        },
        setProperties(payload = []) {
            if (Array.isArray(payload)) {
                this.headers = payload;
            }
        },
        setMultipleDeleteModal(payload) {
            this.multipleDeleteModal = payload;
        },
        setAddNewLeadModal(payload) {
            this.addNewLeadModal = payload;
        },
        // 
        callFetchLeads($callback = () => { }) {
            this.setSelectedLeads([]);
            this.setIsLoading(true);
            this.setError(false);
            useApiRequest({
                url: '/leads',
                payload: this.fetchQuery,
            }).then(res => {
                const { success, message, leads, pagination } = res;
                if (success) {
                    this.setLeads(leads);
                    this.setLeadPagination(pagination);
                } else {
                    this.setError(true);
                }
            }).catch(error => {
                this.setError(true);
            }).finally(() => {
                this.setIsFirstLoading(false);
                this.setIsLoading(false);
            });
        }
    }

});
