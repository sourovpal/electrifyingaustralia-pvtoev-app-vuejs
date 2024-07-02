<script>

    import SearchBar from '../../../components/SearchBar.vue';
    import ActionBar from '../../../components/ActionBar/ActionBar.vue';
    import LeftActionBar from '../../../components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '../../../components/ActionBar/RightActionBar.vue';
    import LeadQualifyModal from './components/LeadQualifyModal.vue';
    import LeadReCategoriseModal from './components/LeadReCategoriseModal.vue';
    import EditLeadModal from './components/EditLeadModal.vue';

    import CustomScrollbar from 'custom-vue-scrollbar';

    import { Skeletor } from 'vue-skeletor';
    import DropdownOwnerList from './components/DropdownOwnerList.vue';
    import DropdownSubscriberList from './components/DropdownSubscriberList.vue';
    import { icons } from '../../../asset/svgicon.js';
    import {
        FetchLeads,
        FetchLeadPipelineWithStage,
        UpdateMultipelLeadStatus,
        UpdateMultipelLeadOwner,
    } from '../../../actions/LeadAction';

    import TimelineHistory from './components/TimelineHistory.vue';
    import RightSidebarTimeline from './components/RightSidebarTimeline.vue';
    import { useLeadStore } from '../../../stores/lead';
    import { useAppStore } from '../../../stores/app';
    import { ref } from 'vue';
    import {
        MoveLeadStatusToPipeline
    } from '../../../actions/LeadAction';


    export default {
        components: {
            Skeletor,
            SearchBar,
            ActionBar,
            LeftActionBar,
            RightActionBar,
            CustomScrollbar,
            DropdownOwnerList,
            DropdownSubscriberList,
            LeadQualifyModal,
            LeadReCategoriseModal,
            EditLeadModal,
            TimelineHistory,
            RightSidebarTimeline,
        },
        setup(props) {
            const leadStore = useLeadStore();
            const appStore = useAppStore();
            const progressBar = ref([]);
            return { leadStore, appStore, progressBar };
        },
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
                icons: {},
                isLoading: false,
                isFirstLoading: false,
                toggleRightDetailsSidebar: false,
            }
        },
        computed: {
            isPipelineLead(){
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
                        this.$toast.error('Oops, something went wrong');
                    }
                }
            },
            toggleRightDetailsSidebarHandler() {
                this.toggleRightDetailsSidebar = !this.toggleRightDetailsSidebar;
            },
            async findLeadByIdHandler(payload = {}) {
                try {
                    this.isLoading = true;

                    var leadId = this.$route.params?.id ?? '';
                    
                    payload = {...payload, ...this.fetch};

                    if (!payload['lead_id']) {
                        payload['lead_id'] = leadId;
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
                        this.$toast.error('Oops, something went wrong');
                    }
                } finally {
                    this.isFirstLoading = false;
                    this.isLoading = false;
                }
            },
            async updateLeadStatusHandler(status) {
                try {
                    if (this.currentLead?.status && this.currentLead?.status?.id == status?.id) {
                        return;
                    }
                    var data = {
                        leads: [this.currentLead.id],
                        status: status.id,
                    };
                    const res = await UpdateMultipelLeadStatus(data);
                    this.currentLead['status'] = { ...status };

                } catch (error) {
                    try {
                        var message = error.response.data.message;
                        this.$toast[message.type](message.text);
                    } catch (e) {
                        this.$toast.error('Oops, something went wrong');
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
                    this.leadStore.setLeadOwner(owner)
                } catch (error) {
                    try {
                        var message = error.response.data.message;
                        this.$toast[message.type](message.text);
                    } catch (e) {
                        this.$toast.error('Oops, something went wrong');
                    }
                }
            },
        },
        mounted() {
            this.icons = icons;
            this.isFirstLoading = true;
            this.findLeadByIdHandler();
            this.fullpath = this.$route?.fullPath;
            this.leadStore.setLeadPrevUrl(null);
        },
        beforeUnmount() {
            this.leadStore.setLeadPrevUrl(this.fullpath);
        }
    }
</script>

<template>
    <section class="content lead-edit">

        <search-bar></search-bar>

        <action-bar :class="{'border-0':isPipelineLead}">
            <left-action-bar class="left-hover-action ms-3 ps-1">
                <Skeletor v-if="isFirstLoading"
                    style="width:150px;" />
                <span @click="$refs['editLeadModalRef'].showModalHandler()"
                    v-if="!isFirstLoading"
                    class="text-head mb-0 fs-16px fw-bold lead-title-text">
                    {{ currentLead?.lead_title??currentLead?.primary_contact?.full_name }}
                </span>
                <button @click="$refs['editLeadModalRef'].showModalHandler()"
                    class="hover-effice toolbar-btn btn btn-light btn-sm btn-floating me-2 d-none d-md-inline"
                    style="margin-left: 14px;">
                    <svg class="svg-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24">
                        <path
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
                        </path>
                    </svg>
                </button>
                <EditLeadModal ref="editLeadModalRef" />
                <button class="hover-effice toolbar-btn btn btn-light btn-sm btn-floating me-3 d-none d-md-inline">
                    <svg class="svg-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z"
                            fill="none"></path>
                        <path
                            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z">
                        </path>
                    </svg>
                </button>
            </left-action-bar>

            <right-action-bar>

                <div v-if="isLoading"
                    class="me-3">
                    <svg class="spinner"
                        viewBox="0 0 50 50"
                        style="width:20px;height:20px;margin-left:0px;">
                        <circle style="stroke: rgb(59, 113, 202);"
                            class="path"
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke-width="5"></circle>
                    </svg>
                </div>

                <router-link v-if="!isPipelineLead && !isFirstLoading"
                    @click="findLeadByIdHandler({lead_id:prevLead})"
                    :to="`${prevLead?`/platform/leads/${prevLead}`:''}`">
                    <button v-tippy='{ content:"Previous Lead", placement : "top" }'
                        class="toolbar-btn btn btn-light btn-sm btn-floating me-3"
                        :disabled="!prevLead">
                        <svg class="svg-5"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px">
                            <path d="M0 0h24v24H0V0z"
                                fill="none"></path>
                            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"></path>
                        </svg>
                    </button>
                </router-link>

                <router-link v-if="!isPipelineLead && !isFirstLoading"
                    @click="findLeadByIdHandler({lead_id:nextLead})"
                    :to="`${nextLead?`/platform/leads/${nextLead}`:''}`">
                    <button v-tippy='{ content:"Next Lead", placement : "top" }'
                        class="toolbar-btn btn btn-light btn-sm btn-floating me-3"
                        :disabled="!nextLead">
                        <svg class="svg-5"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px">
                            <path d="M24 24H0V0h24v24z"
                                fill="none"
                                opacity=".87"></path>
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path>
                        </svg>
                    </button>
                </router-link>

                <button @click="toggleRightDetailsSidebarHandler()"
                    v-tippy='{ content:"Lead Details", placement : "top" }'
                    class="toolbar-btn btn btn-light btn-sm btn-floating me-3 d-inline d-lg-none">
                    <svg class="svg-5"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24">
                        <path
                            d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" />
                    </svg>
                </button>

                <button v-if="!isPipelineLead && !isFirstLoading"
                    @click="$refs['leadQualifyModalRef'].showModalHandler(owner)"
                    class="btn btn-sm btn-primary fw-bold me-3 d-none d-xl-flex justify-content-center align-items">
                    <svg class="me-1"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        fill="currentColor"
                        viewBox="0 -960 960 960"
                        width="24">
                        <path
                            d="M707-485 581-612l51-51 75 74 160-159 52 52-212 211Zm-352-2q-71.462 0-116.231-44.769Q194-576.537 194-648t44.769-116.231Q283.538-809 355-809q71.462 0 116.231 44.769Q516-719.463 516-648t-44.769 116.231Q426.462-487 355-487ZM20-130v-109q0-39.113 18.594-69.548Q57.187-338.982 92-354q77-35 138.292-49 61.293-14 124.5-14Q418-417 479-403t138 49q34.812 16.018 53.906 45.952Q690-278.113 690-239v109H20Zm73-73h524v-36q0-16-7.825-29.674T588-288q-72-33-123.5-44.5T355-344q-58 0-110 11.5T122-288q-13.8 5.652-21.4 19.326Q93-255 93-239v36Zm262-357q38 0 63-25t25-63q0-38-25-63t-63-25q-38 0-63 25t-25 63q0 38 25 63t63 25Zm0 286Zm0-374Z" />
                    </svg>
                    Qualify
                </button>

                <lead-qualify-modal v-if="!isPipelineLead"
                    ref="leadQualifyModalRef"
                    :findLeadByIdHandler="()=>findLeadByIdHandler()" />

                <!-- lead status -->
                <Skeletor class="me-3 d-none d-xl-inline"
                    v-if="isFirstLoading && !isPipelineLead"
                    style="width:150px;height:32px;border-radius:3px;" />

                <div v-if="!isFirstLoading && !isPipelineLead"
                    v-tippy='{ content:"Change Lead Status", placement : "top" }'
                    class="dropdown me-3 d-none d-xl-inline">
                    <button style="min-width:150px;max-width:150px;"
                        type="button"
                        class="btn btn-sm btn-outline-secondary fw-400 d-flex justify-content-between align-items-center curtom-dropdown-toggler-btn"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false">
                        <span class="fw-bold text-fs tbl-dropdown-title text-overflow-ellipsis text-head"
                            style="white-space: nowrap;">{{ currentLead?.status?.name??'Lead Status' }}</span>
                        <div class="dropdown--icon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"></path>
                                <path d="M0 0h24v24H0z"
                                    fill="none"></path>
                            </svg>
                        </div>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu"
                        aria-labelledby="dropdownMenuButton">
                        <span style="width:170px;"
                            v-for="(status, index) in leadStatus"
                            :key="index"
                            @click="updateLeadStatusHandler(status)"
                            :class="`${status.name == currentLead?.status?.name?'selected':''}`"
                            class="dropdown-item d-flex justify-content-between align-items-center cursor-pointer py-1">
                            <span class="text-overflow-ellipsis text-head">{{ status.name }}</span>
                            <svg v-if="status.is_lost"
                                class="svg-5"
                                xmlns="http://www.w3.org/2000/svg"
                                height="18"
                                viewBox="0 0 24 24"
                                width="18">
                                <path d="M0 0h24v24H0z"
                                    fill="none"></path>
                                <path
                                    d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z">
                                </path>
                            </svg>
                        </span>
                    </div>
                </div>


                <div class="settings-group-item owner-list-dropdown me-3  d-none d-lg-inline">
                    <button class="owner-dropdown-toggler"
                        data-mdb-toggle="dropdown"
                        v-tippy='{ content:"Select Subscribers", placement : "top" }'
                        aria-expanded="false">
                        <div class="icon">
                            <img v-if="owner?.id"
                                :src="owner?.profile_avatar"
                                alt="">
                            <img v-else
                                :src="icons?.avatar"
                                alt="">
                        </div>
                    </button>
                    <DropdownSubscriberList :owner="owner" :owners="owners" />
                </div>

                <div class="settings-group-item owner-list-dropdown me-3 position-relative  d-none d-lg-inline">
                    <button class="owner-dropdown-toggler"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                        v-tippy='{ content:"Change Owner", placement : "top" }'>
                        <div class="icon">
                            <img v-if="owner?.id"
                                :src="owner?.profile_avatar"
                                alt="">
                            <img v-else
                                :src="icons?.avatar"
                                alt="">
                        </div>
                    </button>
                    <DropdownOwnerList :owner="owner"
                        :owners="owners"
                        :selectOwnerHandler="(item)=>updateLeadOwnerHandler(item)" />
                </div>

                <button class="toolbar-btn btn btn-light btn-sm btn-floating me-3 d-none d-lg-inline">
                    <svg class="svg-5"
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 0 24 24"
                        width="20px"
                        fill="currentColor">
                        <path d="M0 0h24v24H0V0z"
                            fill="none"></path>
                        <path
                            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z">
                        </path>
                    </svg>
                </button>

                <button class="toolbar-btn btn btn-light btn-sm btn-floating me-3 d-none d-lg-inline">
                    <svg class="svg-5"
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 24 24"
                        height="20px"
                        viewBox="0 0 24 24"
                        width="20px">
                        <path d="M0 0h24v24H0V0z"
                            fill="none"></path>
                        <path
                            d="M6.41,21L5,19.59l4.83-4.83c0.75-0.75,1.17-1.77,1.17-2.83v-5.1L9.41,8.41L8,7l4-4l4,4l-1.41,1.41L13,6.83v5.1 c0,1.06,0.42,2.08,1.17,2.83L19,19.59L17.59,21L12,15.41L6.41,21z">
                        </path>
                    </svg>
                </button>

                <div class="me-3 position-relative">
                    <button class="toolbar-btn btn btn-light btn-sm btn-floating"
                        data-mdb-toggle="dropdown">
                        <svg class="svg-5"
                            height="20px"
                            viewBox="0 0 24 24"
                            width="20px"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                            </path>
                            <path d="M0 0h24v24H0z"
                                fill="none"></path>
                        </svg>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu three-dot"
                        aria-labelledby="dropdownMenuButton">
                        <span @click="$refs['leadQualifyModalRef'].showModalHandler()"
                            class="dropdown-item cursor-pointer text-head d-block d-lg-none py-1">Qualify</span>
                        <span @click="$refs['leadReCategoriseModalRef'].showModalHandler()"
                            class="dropdown-item cursor-pointer text-head py-1">Re-categorise lead</span>
                    </div>
                </div>

                <LeadReCategoriseModal ref="leadReCategoriseModalRef"
                    :findLeadByIdHandler="()=>findLeadByIdHandler()"
                    :is-pipeline-lead="isPipelineLead" />

            </right-action-bar>
        </action-bar>

        <Transition>
            <action-bar v-if="isPipelineLead"
                class="flex-column justify-content-start align-items-start px-3">
                <left-action-bar class="w-100">
                    <div class="pipeline-progress-bar w-100 d-flex justify-content-between align-items">
                        <div class="btn-group shadow-0 white-space-nowrap w-100 overflow-auto">
                            <button v-for="(stage, index) in leadStages"
                                :key="index"
                                ref="progressBar"
                                @click="updateLeadStageByProgressBar(currentLead?.pipeline_id, stage?.id)"
                                v-tippy='{ content:stage?.name, placement : "top" }'
                                class="btn btn-sm btn-stage flex-grow-1 py-0 fw-bold"
                                :class="{
                                    'complete':((stage?.lead_stage && currentLead?.pipeline_stage_id != stage?.id) && currentLead?.is_lost != 0),
                                    'active':((currentLead?.pipeline_stage_id == stage?.id) && currentLead?.is_lost != 0),
                                    'lost':(currentLead?.is_lost == 0),
                                    'normal-stage':(stage?.status == 0),
                                    'lost-stage':(stage?.status == 1),
                                    'won-stage':(stage?.status == 2),
                                }">
                                {{ stage?.lead_stage?.complete }}
                            </button>
                        </div>
                        <div class="btn-group ms-2 shadow-0">
                            <button class="btn btn-sm btn-danger btn-lost py-0 fw-bold me-1">Lost</button>
                            <button class="btn btn-sm btn-success btn-won py-0 fw-bold">Won</button>
                        </div>
                    </div>
                </left-action-bar>
                <div class="d-flex py-1 current-pipeline-stage">
                    <span class="mb-0 fs-16px text-soft fw-bold me-1">{{ currentLead?.pipeline?.title }}:</span>
                    <span class="mb-0 fs-16px text-soft">{{ currentLead?.pipeline_stage?.name }}</span>
                </div>
            </action-bar>
        </Transition>

        <section class="h-100">
            <div class="col-area">
                <timeline-history />
                <right-sidebar-timeline :isFirstLoading="isFirstLoading"
                    :findLeadByIdHandler="findLeadByIdHandler"
                    :toggleRightDetailsSidebar="toggleRightDetailsSidebar" />
            </div>
        </section>

    </section>
</template>

<style scoped
    lang="scss">
    .current-pipeline-stage {
        line-height: 15px;
    }

    .pipeline-progress-bar {

        .btn-group {
            .btn-stage {
                background-color: #e4e7eb;
                height: 25px;
                margin-right: 3px;
                min-width: 8rem;

                &.normal-stage {
                    background-color: #e4e7eb;
                }

                &.lost-stage {
                    background-color: #ff8ea1;
                }

                &.complete:not(.lost-stage) {
                    background-color: #8eedc7;
                    color: #091e43;
                }

                &.active:not(.lost-stage) {
                    background-color: #27ab83;
                    color: #ffffff;
                }

                &.lost,
                &.lost-stage.active {
                    background-color: #d1485f !important;
                    color: #ffffff;
                }
            }

            .btn-won,
            .btn-lost {
                height: 25px;
            }
        }
    }

    .left-hover-action {
        .hover-effice {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            cursor: pointer;
        }

        &:hover {
            .hover-effice {
                opacity: 1;
            }
        }
    }

    .lead-title-text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        max-width: 100px;

        @media only screen and (min-width: 992px) {
            max-width: 150px;
        }

        @media only screen and (min-width: 1400px) {
            max-width: 350px;
        }
    }

    .col-area {
        display: flex;
        height: 100%;
        position: relative;
    }

    .owner-dropdown-toggler {
        cursor: pointer;
        width: auto !important;
        border: none;
        outline: none;
        padding: 3px 25px 3px 0px;
        background-color: transparent;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
            content: '';
            position: absolute;
            right: 5px;
            top: 45%;
            transform: translateY(-50%) rotate(45deg);
            border: 0.25rem solid transparent;
            border-bottom-color: rgb(164, 164, 164);
            border-right-color: rgb(164, 164, 164);
        }

        .icon {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                border-radius: 50%;
                width: 100%;
                height: 100%;

            }
        }
    }

    .owner-list-dropdown {
        .dropdown-menu {
            z-index: 1000;
            max-width: 19rem;
            width: 16rem;
            padding: 0.5rem 0;
            margin: 0.125rem 0 0;
            font-size: 1rem;
            color: #292b2c;
            text-align: left;
            background-color: #fff;
            background-clip: padding-box;
            border-radius: 0.25rem;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

            &::before {
                content: "";
                position: absolute;
                top: -7px;
                right: 30px;
                border: 7px solid #f1f0f0;
                border-right-color: white;
                border-bottom-color: white;
                transform: rotate(45deg);
                border-bottom-color: transparent;
                border-right-color: transparent;
            }

            &::after {
                content: "";
                position: absolute;
                top: -6px;
                right: 30px;
                border: 7px solid white;
                border-right-color: white;
                border-bottom-color: white;
                transform: rotate(45deg);
                border-bottom-color: transparent;
                border-right-color: transparent;
            }

            @media screen and (max-width: 766px) {

                &::after,
                &::before {
                    left: 30px;
                    right: auto !important;
                }
            }

            .dropdown-header {
                font-size: .75rem;
                padding: 0 0.5rem;
                font-weight: 700;
                line-height: 1.5rem;
                margin-bottom: 0;
                padding-top: 0.5rem;
            }

            .dropdown-item.noselect {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-right: 10px;
                user-select: none;
                border-bottom: 1px solid #dddddd;

                img {
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    margin-right: 10px;
                }

                span {
                    display: inline-block;
                    line-height: 18px;
                }
            }

            .project-owner-team-members {
                max-width: 19rem;
                max-height: 350px;

                .dropdown-item {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;

                    img {
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 50%;
                        margin-right: 10px;
                    }

                    span {
                        display: inline-block;
                        line-height: 18px;
                    }
                }
            }
        }

        .dropdown-body {
            .dropdown-input {
                .project-owner-filter {
                    background: #f5f7fa;
                    font-size: .875rem;
                    padding: 0.5rem 1rem;
                    border: 0;
                    width: 100%;
                }
            }
        }
    }

    .curtom-dropdown-toggler-btn {
        border: 1px solid rgba(0, 0, 0, 0.09);

        &:hover {
            background-color: #f7f7f9 !important;
            border: 1px solid #007ee5 !important;
            box-shadow: 0 1px 3px rgba(0, 126, 229, 0.34) !important;
        }
    }
</style>
<style>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 1s linear;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .lead-timeline-notes .ql-container.ql-snow {
        border: none !important;
        height: 10rem !important;
        background-color: #fff3c4 !important;
        color: #8d2b0b !important;
        font-weight: 600 !important;
        font-size: 14px !important;
    }

    .lead-timeline-notes .ql-toolbar.ql-snow {
        display: none !important;
    }

    .lead-edit .col-left .scrollbar__wrapper {
        height: calc(100vh - 18rem);
    }

    .lead-edit .col-left .scrollbar__scroller {
        height: 100%;
    }

    .lead-edit .col-left .scrollbar__thumbPlaceholder {
        width: 6px !important;
    }

    .lead-edit .col-right .scrollbar__wrapper {
        height: 100vh;
    }

    .lead-edit .col-right .scrollbar__scroller {
        height: 100%;
    }

    .lead-edit .col-right .scrollbar__thumbPlaceholder {
        width: 6px !important;
    }
</style>