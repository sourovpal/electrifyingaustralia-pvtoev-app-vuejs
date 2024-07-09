import {
    FetchLeads,
    UpdateMultipelLeadStatus,
    UpdateMultipelLeadOwner,
    MoveLeadStatusToPipeline
} from "../../../../actions/LeadAction";

export default {
    data() {
        return {
            fullPath: null,
            fetch: {
                lead_properties: 1,
                lead_sources: 1,
                owners: 1,
                pipelines: 1,
                contacts: 1,
            },
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
        leadStages() {
            return this.leadStore.getLeadStages;
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
        async updateLeadStageByProgressBar(pipeline, stage) {
            try {
                var data = {
                    lead: this.currentLead.id,
                    pipeline: pipeline,
                    pipeline_stage: stage,
                };
                const res = await MoveLeadStatusToPipeline(data);
                this.findLeadByIdHandler();
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
        async findLeadByIdHandler(payload = {}) {
            try {
                this.isLoading = true;

                var leadId = this.$route.params?.id ?? "";

                payload = { ...payload, ...this.fetch };

                if (!payload["lead_id"]) {
                    payload["lead_id"] = leadId;
                }
                const res = await FetchLeads(payload);
                try {
                    this.leadStore.setLeadEditTimelineData(res);
                    this.isFirstLoading = false;
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
        async updateLeadStatusHandler(status) {
            try {
                if (
                    this.currentLead?.status &&
                    this.currentLead?.status?.id == status?.id
                ) {
                    return;
                }
                var data = {
                    leads: [this.currentLead.id],
                    status: status.id,
                };
                const res = await UpdateMultipelLeadStatus(data);
                this.currentLead["status"] = { ...status };
            } catch (error) {
                try {
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                } catch (e) {
                    this.$toast.error("Oops, something went wrong");
                }
            }
        },
        async updateLeadOwnerHandler(owner = null) {
            try {
                var data = {
                    owner: owner?.id,
                    leads: [this.currentLead?.id],
                };
                const res = await UpdateMultipelLeadOwner(data);
                this.leadStore.setLeadOwner(owner);
            } catch (error) {
                try {
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                } catch (e) {
                    this.$toast.error("Oops, something went wrong");
                }
            }
        },
    },
    mounted() {
        this.isFirstLoading = true;
        this.findLeadByIdHandler();
        this.fullpath = this.$route?.fullPath;
        this.leadStore.setLeadPrevUrl(null);
    },
    beforeUnmount() {
        this.leadStore.setLeadPrevUrl(this.fullpath);
    },
}