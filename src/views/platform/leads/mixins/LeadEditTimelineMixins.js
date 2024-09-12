import {
    FetchLeads,
    UpdateMultipelLeadStatus,
    UpdateMultipelLeadOwner,
    MoveLeadStatusToPipeline,
    GetLeadDependencies
} from "../../../../actions/LeadAction";

export default {
    data() {
        return {
            fullPath: null,
            isLoading: false,
            isFirstLoading: false,
            toggleRightDetailsSidebar: false,
        };
    },
    computed: {
        isPipelineLead() {
            return this.leadStore.getIsPipelineLead;
        },
        currentLead() {
            return this.leadStore.getCurrentLead;
        },
        leadStages: {
            get() {
                return this.leadStore.getLeadStages;
            },
        },
        leadStatus() {
            return this.appStore.getLeadStatuses;
        },
        prevLead() {
            return this.leadStore.getPrevLead;
        },
        nextLead() {
            return this.leadStore.getNextLead;
        },
        owners() {
            return this.appStore.getUsers;
        },
        owner() {
            return this.leadStore.getLeadOwner;
        },
    },
    methods: {
        async fetchLeadDependencies(payload = {}) {
            try {
                var leadId = this.$route.params?.id ?? "";
                payload = {
                    ...payload,
                    lead_id: leadId,
                };
                const res = await GetLeadDependencies(payload);
                const { success, sources, properties, lead_stages, files } = res;
                if (success) {
                    if (typeof properties != 'undefined') {
                        this.leadStore.setLeadProperties(properties ?? []);
                    }
                    if (typeof sources != 'undefined') {
                        this.leadStore.setLeadSources(sources ?? []);
                    }
                    if (typeof lead_stages != 'undefined') {
                        this.leadStore.setLeadStages(lead_stages ?? []);
                    }
                    if (typeof files != 'undefined') {
                        this.leadStore.setLeadFiles(files ?? []);
                    }
                } else {
                    throw new Exception('Please refresh the page.');
                }
            } catch (error) {
                console.log(error)
                this.$toast.error("Please refresh the page.");
            }
        },
        async updateLeadStageByProgressBar(pipeline, stage) {
            try {
                if (this.currentLead.pipeline_stage?.stage_id == stage) {
                    return;
                }
                var data = {
                    lead: this.currentLead.lead_id,
                    pipeline: pipeline,
                    pipeline_stage: stage,
                };
                const res = await MoveLeadStatusToPipeline(data);
                this.findLeadByIdHandler();
                this.fetchLeadDependencies({
                    lead_stages: true,
                });
            } catch (error) {
                try {
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                } catch (e) {
                    this.$toast.error("Oops, something went wrong");
                }
            }
        },
        toggleRightDetailsSidebarHandler() {
            this.toggleRightDetailsSidebar = !this.toggleRightDetailsSidebar;
        },
        fetchNewLeadByLeadId(payload = {}) {
            this.leadStore.callFetchTimelineLogs(true, payload['lead_id']);
            this.findLeadByIdHandler(payload);
        },
        async findLeadByIdHandler(payload = {}) {
            try {
                this.isLoading = true;
                var leadId = this.$route.params?.id ?? "";

                payload = { ...payload };

                if (!payload["lead_id"]) {
                    payload["lead_id"] = leadId;
                }

                const res = await FetchLeads(payload);
                const {
                    success,
                    lead,
                    next_lead,
                    prev_lead,
                    pipeline_properties,
                } = res;
                if (success) {
                    this.leadStore.setPrevLead(prev_lead);
                    this.leadStore.setNextLead(next_lead);
                    this.leadStore.setPipelineProperties(pipeline_properties ?? []);

                    if (lead) {
                        const {
                            pipeline_id,
                            pipeline_stage_id,
                            properties_values,
                            lead_subscribers,
                            owner,
                            contacts,
                            primary_contact
                        } = lead;
                        this.leadStore.setCurrentLead(lead);
                        // 
                        var isPipelineLead = !!(pipeline_id && pipeline_stage_id);
                        this.leadStore.setIsPipelineLead(isPipelineLead);
                        // 
                        this.leadStore.setLeadPropertiesValues(properties_values ?? {});
                        // 
                        this.leadStore.setLeadSubscribers(lead_subscribers ?? []);
                        this.leadStore.setLeadOwner(owner ?? {});
                        if (contacts?.length) {
                            this.leadStore.setLeadContacts(lead?.contacts ?? []);
                            if (primary_contact) {
                                this.leadStore.setPrimaryContact(primary_contact ?? {})
                            } else {
                                this.leadStore.setPrimaryContact(lead?.contacts[0] ?? {})
                            }
                        }
                    }
                } else {
                    this.$toast.error("Refresh again required.");
                }
                this.isFirstLoading = false;

            } catch (error) {
                this.$toast.error("Refresh again required.");
            } finally {
                this.isFirstLoading = false;
                this.isLoading = false;
            }
        },
        async updateLeadStatusHandler(status) {
            try {
                if (
                    this.currentLead?.status &&
                    this.currentLead?.status?.status_id == status?.status_id
                ) {
                    return;
                }
                var data = {
                    leads: this.currentLead.lead_id,
                    status: status.status_id,
                };
                const res = await UpdateMultipelLeadStatus(data);
                const { success, message } = res;
                if (success) {
                    this.currentLead["status"] = { ...status };
                    this.leadStore.callFetchTimelineLogs({}, false, true);
                }
            } catch (error) {
                this.$toast.error("Oops, something went wrong");
            }
        },
        async updateLeadOwnerHandler(owner = null) {
            try {
                this.$toast.clear();
                var data = {
                    owner: owner?.user_id,
                    leads: this.currentLead?.lead_id,
                };
                const res = await UpdateMultipelLeadOwner(data);
                const { success, message } = res;
                if (success) {
                    this.leadStore.setLeadOwner(owner);
                    this.leadStore.callFetchTimelineLogs({}, false, true);
                } else {
                    this.$toast[message.type](message.text);
                }
            } catch (error) {
                this.$toast.error("Oops, something went wrong");
            }
        },
    },
    mounted() {
        this.fetchLeadDependencies({
            sources: true,
            properties: true,
            lead_stages: true,
            files: true,
        });
        this.isFirstLoading = true;
        this.findLeadByIdHandler();
        this.leadStore.setFetchLeadsById(this.findLeadByIdHandler);
        this.leadStore.setFetchLeadsDependencies(this.fetchLeadDependencies);
        this.fullpath = this.$route?.fullPath;
        this.leadStore.setLeadPrevUrl(null);
    },
    beforeUnmount() {
        this.leadStore.setLeadPrevUrl(this.fullpath);
    },
}