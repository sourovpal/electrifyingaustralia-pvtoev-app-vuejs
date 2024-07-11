import { watch } from "vue";
import {
    FetchLeads,
    UpdateLeadPropertieHeaders,
    UpdateMultipelLeadStatus,
    UpdateMultipelLeadOwner,
} from "../../../../actions/LeadAction";

export default {
    data() {
        return {
            fullpath: null,
            isLoading: false,
            fetch: {
                headers: 1,
                lead_properties: 1,
                lead_sources: 1,
            },
            limit: 50,
            payload: {},
            customFilterFormData: {},
            toggleFilterSidebar: 'close',
            selectedRows: [],
            isSelectedAllRows: false,
            isSelectedAllRowsReset: false,
            fetchLeads: [],
            leadSources: [],
            disabledHeaderColumns: [],
            leadProperties: [],
            isFirstLoading: false,
            column: "updated_at",
            order: "desc",
            pagination: {
                total: 0,
                per_page: 0,
                current_page: 1,
                next_page: null,
                prev_page: null,
                last_page: 0,
                from: 0,
                to: 0,
            },
        };
    },
    watch: {
        "currentRoute"(to) {
            this.fullpath = to?.fullPath;
        },
    },
    methods: {
        paginationHandler(payload=null) {
            if(payload){
                this.$router.push({
                    path: '/platform/leads',
                    query: { ...this.$route.query, ...payload },
                });
            }else{
                this.$router.push({
                    path: '/platform/leads',
                    query:{page:1},
                });
            }
            this.fetchAllLeadsHandler();
        },
        toggleFilterSidebarHandler(stage = 'close') {
            if (stage == 'close') {
                this.toggleFilterSidebar = 'close';
                this.customFilterFormData = {};
                this.fetchAllLeadsHandler();
            } else if (stage == 'hide' && Object.keys(this.customFilterFormData).length <= 0) {
                this.toggleFilterSidebar = 'close';
                this.customFilterFormData = {};
            } else {
                this.toggleFilterSidebar = stage;
            }
        },
        leadSortedHandler(column) {
            if (this.column == column) {
                this.order = this.order == "desc" ? "asc" : "desc";
            } else {
                this.column = column;
                this.order = "desc";
            }
            this.paginationHandler({ column: this.column, order: this.order });
        },
        async fetchAllLeadsHandler(payload = {}) {
            try {
                this.isLoading = true;

                var query = this.$route.query;
                this.payload = { ...payload, ...query };

                if (Object.keys(this.customFilterFormData).length) {
                    var search = JSON.stringify(this.customFilterFormData);
                    if (search) {
                        this.payload["search"] = search;
                    }
                }

                if (!payload["page"]) {
                    this.payload["page"] = this.$route.query.page ?? this.pagination?.current_page ?? 1;
                }

                if (!payload["limit"]) {
                    this.payload["limit"] = this.limit;
                }

                if (!payload["column"]) {
                    this.payload["column"] = this.column;
                }

                if (!payload["order"]) {
                    this.payload["order"] = this.order;
                }

                const res = await FetchLeads(this.payload);

                try {
                    this.selectedRows = [];
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;

                    this.fetchLeads = res?.leads;
                    this.pagination = res?.pagination;

                    if (this.payload["lead_properties"]) {
                        this.leadProperties = res?.lead_properties;
                    }
                    if (this.payload["headers"]) {
                        this.disabledHeaderColumns = res?.headers;
                    }
                    if (this.payload["lead_sources"]) {
                        this.leadSources = res?.lead_sources;
                    }
                } catch (error) {
                    throw new Error(error.message);
                }
            } catch (error) {
                try {
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                } catch (e) {
                    this.$toast.error("Oops, something went wrong");
                }
            } finally {
                this.isFirstLoading = false;
                this.isLoading = false;
            }
        },
        fetchCustomProperties(leadProperties, propertie) {
            try {
                if (leadProperties) {
                    var current = leadProperties[propertie.unique_id];
                    if (current && current?.length) {
                        if (propertie.data_type_id == "yes_or_no") {
                            if (current.toLowerCase() == 'yes') {
                                return 'Yes';
                            } else if (current.toLowerCase() == 'no') {
                                return 'No';
                            }
                        }
                        if (propertie.data_type_id == "date" && current) {
                            return this.moment(current).format("DD/MM/YYYY");
                        }
                        if (propertie.data_type_id == "date_and_time" && current) {
                            return this.moment(current).format("DD/MM/YYYY hh:mm a");
                        } else if (Array.isArray(current)) {
                            return current?.join(", ");
                        } else {
                            return current;
                        }
                    }
                }
                return '—';
            } catch (error) { }
        },
        toggleHeaderProperties(key) {
            try {
                var index = this.disabledHeaderColumns.indexOf(key);
                if (index > -1) {
                    this.disabledHeaderColumns.splice(index, 1);
                } else {
                    this.disabledHeaderColumns.push(key);
                }
                this.updatePropertieHeadersHandler();
            } catch (error) { }
        },
        selectedAllRowsHandler() {
            try {
                if (this.isSelectedAllRowsReset) {
                    this.selectedRows = [];
                    this.isSelectedAllRowsReset = !this.isSelectedAllRowsReset;
                } else if (!this.isSelectedAllRows) {
                    this.isSelectedAllRows = !this.isSelectedAllRows;
                    this.fetchLeads.map((item) => {
                        this.selectedRows.push(item.id);
                    });
                } else {
                    this.selectedRows = [];
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                }
            } catch (error) { }
        },
        singleRowSelectedHandler(id) {
            try {
                var index = this.selectedRows.indexOf(id);
                if (index > -1) {
                    this.selectedRows.splice(index, 1);
                } else {
                    this.selectedRows.push(id);
                }

                if (this.selectedRows.length === this.fetchLeads.length) {
                    this.isSelectedAllRows = true;
                    this.isSelectedAllRowsReset = false;
                } else if (this.selectedRows.length > 0) {
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = true;
                } else {
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                }
            } catch (error) { }
        },
        async updatePropertieHeadersHandler() {
            try {
                const res = await UpdateLeadPropertieHeaders({
                    properties: this.disabledHeaderColumns,
                });
            } catch (error) {
                this.$toast.error("Oops, something went wrong");
            } finally {
            }
        },
        async updateLeadStatusHandler(leads, status, lead = null) {
            try {
                if (lead) {
                    if (lead?.status?.id == status.id) {
                        return;
                    }
                }
                var data = {
                    leads: leads,
                    status: status.id,
                };
                const res = await UpdateMultipelLeadStatus(data);
                if (lead) {
                    lead["status"] = status;
                } else {
                    this.fetchAllLeadsHandler();
                }
            } catch (error) {
                try {
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                } catch (e) {
                    this.$toast.error("Oops, something went wrong");
                }
            }
        },
        async updateLeadOwnerHandler(owner = null, lead = null) {
            try {
                var data = {};

                if (owner) {
                    data["owner"] = owner?.id;
                }

                if (lead) {
                    data["leads"] = [lead?.id];
                } else {
                    data["leads"] = this.selectedRows;
                }

                const res = await UpdateMultipelLeadOwner(data);

                if (lead) {
                    lead["owner"] = owner;
                } else {
                    this.fetchAllLeadsHandler();
                }
            } catch (error) {
                try {
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                } catch (e) {
                    this.$toast.error("Oops, something went wrong");
                }
            }
        },
        copyPhoneNumberHandler(lead) {
            var phone = lead.contact?.phone_number;
            if (phone) {
                navigator.clipboard.writeText(phone);
                this.$toast.success(`${phone} Copied to Clipboard`);
                return phone;
            }
            this.$toast.error("Oops, Empty phone number.");
        },
    },
    mounted() {
        this.isFirstLoading = true;
        this.fetchAllLeadsHandler(this.fetch);
        this.fullpath = this.$route?.fullPath;
        this.leadStore.setLeadPrevUrl(null);
        watch(() => this.customFilterFormData, (newValue, oldValue) => {
            if (this.toggleFilterSidebar == 'show') {
                this.fetchAllLeadsHandler();
            }
        }, { deep: true });
    },
    computed: {
        currentRoute() {
            return this.$route;
        },
        leadStatus() {
            return this.appStore.getLeadStatuses;
        },
        owners() {
            return this.appStore.getUsers;
        },
    },
    beforeUnmount() {
        this.leadStore.setLeadPrevUrl(this.fullpath);
    },
}