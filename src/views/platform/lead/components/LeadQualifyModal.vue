<script>
    import { Modal } from "mdb-ui-kit";
    import DropdownOwnerList from './DropdownOwnerList.vue';
    import { icons } from '../../../../asset/svgicon';

    import {
        ConfirmQualify
    } from '../../../../actions/LeadAction';

    import { useLeadStore } from '../../../../stores/lead';
    import { useAppStore } from '../../../../stores/app';


    export default {
        components: {
            DropdownOwnerList
        },
        props: ['findLeadByIdHandler'],
        setup(props) {
            const leadStore = useLeadStore();
            const appStore = useAppStore();
            return { leadStore, appStore };
        },
        data() {
            return {
                icons: {},
                modalInstance: null,
                errors: {},
                owners: [],
                owner: {},
                pipelines: [],
                pipelineStages: [],
                selectedPipeline: null,
                selectedPipelineStage: null,
                currentOwner: null,
                commant: null,
                isSubmitConfirmQualifyForm: null,
            }
        },
        methods: {
            showModalHandler(owner = null) {
                this.errors = {};
                this.owners = this.leadStore.getOwners;
                this.pipelines = this.leadStore.getPipelinesWithStage;
                this.currentOwner = this.owner = owner || this.leadStore.getCurrentOwner;
                try {
                    if (this.pipelines.length > 0) {
                        this.selectPipelineHandler(this.pipelines[0]?.id);
                    }
                } catch (error) { }

                this.modalInstance.show();
            },
            hideModalHandler() {
                this.modalInstance.hide();
            },
            async selectPipelineHandler(id) {
                try {
                    var pipeline = this.pipelines.find(item => item.id === id);
                    this.selectedPipelineStage = null;
                    if (pipeline) {
                        this.selectedPipeline = pipeline;
                        if (pipeline.stages?.length) {
                            delete this.errors?.pipeline_stage;
                            this.pipelineStages = pipeline.stages;
                            try {
                                if (this.pipelineStages[0]) {
                                    this.selectedPipelineStage = this.pipelineStages[0];
                                }
                            } catch (error) { }
                        } else {
                            this.errors['pipeline_stage'] = ['Not found pipeline stage.'];
                            this.pipelineStages = [];
                        }
                    } else {
                        this.errors['pipeline'] = ['This pipeline is invalid.'];
                    }
                } catch (error) { }
            },
            selectPipelineStageHandler(id) {
                try {
                    var stage = this.pipelineStages.find(item => item.id === id);
                    if (stage) {
                        this.selectedPipelineStage = stage;
                    } else {
                        this.errors['pipeline_stage'] = ['This pipeline stage is invalid.'];
                    }
                } catch (error) { }
            },
            selectOwnerHandler(owner) {
                this.currentOwner = owner;
            },
            async confirmQualifyHandler() {
                try {
                    this.$toast.clear();
                    this.errors = {};
                    this.isSubmitConfirmQualifyForm = true;
                    var leadId = this.$route.params?.id ?? null;
                    var data = {
                        lead: leadId,
                        pipeline: this.selectedPipeline?.id ?? null,
                        pipeline_stage: this.selectedPipelineStage?.id ?? null,
                        commant: this.commant,
                    };
                    if (this.currentOwner) {
                        data['owner'] = this.currentOwner?.id;
                    } else {
                        data['owner'] = null;
                    }
                    const res = await ConfirmQualify(data);
                    this.isSubmitConfirmQualifyForm = false;
                    this.hideModalHandler();
                    this.findLeadByIdHandler();
                    try {
                        var { message } = res;
                        this.$toast[message.type](message.text);
                    } catch (error) {
                        throw new Error(error.message);
                    }
                } catch (error) {
                    try {
                        this.errors = error.response.data.errors;
                    } catch (error) { }

                    try {
                        var message = error.response.data.message;
                        this.$toast[message.type](message.text);
                    } catch (e) {
                        this.$toast.error('Oops, something went wrong');
                    }
                } finally {
                    this.isSubmitConfirmQualifyForm = false;
                }
            }
        },
        mounted() {
            this.modalInstance = new Modal(this.$refs.leadQualifyModalRef);
            this.icons = icons;
        },
    }
</script>

<template>

    <div class="modal fade add-new-lead-modal"
        id="leadQualifyModalRef"
        ref="leadQualifyModalRef"
        aria-hidden="true"
        aria-labelledby="leadQualifyModalRef"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered- modal-sm mx-auto"
            style="max-width: 350px;">
            <div class="modal-content">
                <div class="modal-header py-2">
                    <div class="d-flex justify-content-center align-items-center py-0">
                        <svg class="svg-5 me-1"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            fill="#000000">
                            <path d="M0 0h24v24H0V0z"
                                fill="none"></path>
                            <circle cx="15.5"
                                cy="9.5"
                                r="1.5"></circle>
                            <circle cx="8.5"
                                cy="9.5"
                                r="1.5"></circle>
                            <path
                                d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-2.5c2.33 0 4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2s-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5z">
                            </path>
                        </svg>
                        <span class="text-hard fw-bold fs-16px">Congratulations!</span>
                    </div>
                    <div>
                        <button class="btn btn-light btn-sm btn-floating d-lg-none"
                            @click="hideModalHandler()">
                            <svg class="svg-5"
                                xmlns="http://www.w3.org/2000/svg"
                                height="22"
                                viewBox="0 -960 960 960"
                                width="22">
                                <path
                                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="modal-body">

                    <div class="mb-3 position-relative">
                        <label class="form-label-title"
                            for="">Select a pipeline <span class="text-soft fs-12px ms-1">(Required)</span> </label>
                        <input @click="delete errors?.pipeline"
                            class="form-control cursor-pointer select-none"
                            :value="selectedPipeline?.title"
                            type="text"
                            data-mdb-toggle="dropdown"
                            readonly>
                        <div class="dropdown-menu fade custom-form-select overflow-auto slim-scrollbar-"
                            style="max-height:125px;">
                            <ul class="list-unstyled mb-0">
                                <li v-for="(item, index) in pipelines"
                                    :key="index"
                                    @click="selectPipelineHandler(item.id)"
                                    :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1 ${selectedPipeline?.id == item.id?'selected':''}`">
                                    {{ item.title }}
                                </li>
                            </ul>
                        </div>
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="errors?.pipeline?.length">{{ errors?.pipeline[0] }}</span>
                    </div>

                    <div class="mb-3 position-relative">
                        <label class="form-label-title"
                            for="">Select a stage <span class="text-soft fs-12px ms-1">(Required)</span> </label>
                        <input @click="delete errors?.pipeline_stage"
                            class="form-control select-none"
                            :class="`${pipelineStages.length?'cursor-pointer':'cursor-no-drop'}`"
                            :value="selectedPipelineStage?.name"
                            type="text"
                            data-mdb-toggle="dropdown"
                            readonly>
                        <div class="dropdown-menu fade custom-form-select overflow-auto slim-scrollbar-"
                            style="max-height:125px;">
                            <ul v-if="pipelineStages.length"
                                class="list-unstyled mb-0">
                                <li v-for="(item, index) in pipelineStages"
                                    :key="index"
                                    @click="selectPipelineStageHandler(item.id)"
                                    :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1 ${selectedPipelineStage?.id == item.id?'selected':''}`">
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="errors?.pipeline_stage?.length">{{ errors?.pipeline_stage[0] }}</span>
                    </div>

                    <div class="mb-3 position-relative">
                        <label class="form-label-title"
                            for="">Start a workflow <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                        <input @click="delete errors?.lead_status"
                            class="form-control cursor-pointer select-none"
                            type="text"
                            data-mdb-toggle="dropdown"
                            readonly>
                        <div class="dropdown-menu fade custom-form-select overflow-auto slim-scrollbar-"
                            style="max-height:125px;">
                            <ul class="list-unstyled mb-0">
                                <li v-for="(item, index) in []"
                                    :key="index"
                                    @click="selectleadStatus(item)"
                                    :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1 ${status?.id == item.id?'selected':''}`">
                                    {{ item.name }}
                                    <svg v-if="item.is_lost"
                                        class="svg-5 ms-auto"
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
                                </li>
                            </ul>
                        </div>
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="errors?.lead_status?.length">{{ errors?.lead_status[0] }}</span>
                    </div>

                    <div class="mb-3 add-new-lead-owner-list-dropdown position-relative">
                        <label class="form-label-title"
                            for="">Owner <span class="text-soft fs-12px ms-1">(Optional)</span></label>
                        <div class="form-control cursor-pointer owner-form-control select-none"
                            data-mdb-toggle="dropdown"
                            @click="delete errors?.owner">
                            <div class="owner-info">
                                <div class="circle-avatar me-2">
                                    <img v-if="currentOwner"
                                        class="avatar"
                                        :src="currentOwner?.profile_avatar"
                                        alt="">
                                    <img v-else
                                        class="avatar"
                                        :src="icons?.avatar"
                                        alt="">
                                </div>
                                <div class="owner-name fs-16px fw--bold text-hard">{{ currentOwner?.name??'No Owner' }}
                                </div>
                            </div>
                        </div>
                        <dropdown-owner-list ref="dropdownOwnerListRef"
                            :select-owner-handler="selectOwnerHandler"
                            :owners="owners"
                            :owner="currentOwner" />
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="errors?.owner?.length">{{ errors?.owner[0] }}</span>
                    </div>

                    <div class="mb-3 position-relative">
                        <label class="form-label-title"
                            for="">Leave a comment <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                        <textarea v-model="commant"
                            class="form-control"
                            rows="3"
                            @click="delete errors?.owner"></textarea>
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="errors?.commant?.length">{{ errors?.commant[0] }}</span>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <button @click="hideModalHandler()"
                            class="btn btn-sm btn-danger">Close</button>
                        <button :disabled="isSubmitConfirmQualifyForm"
                            @click="confirmQualifyHandler()"
                            type="submit"
                            class="btn btn-primary btn-sm px-3 d-flex justify-content-center align-items-center">
                            <div v-if="isSubmitConfirmQualifyForm">
                                <svg class="spinner"
                                    viewBox="0 0 50 50"
                                    style="width:20px;height:20px;margin-left:0px;">
                                    <circle style="stroke: #ffffff;"
                                        class="path"
                                        cx="25"
                                        cy="25"
                                        r="20"
                                        fill="none"
                                        stroke-width="5"></circle>
                                </svg>
                                <span>Submitting...</span>
                            </div>
                            <span v-if="!isSubmitConfirmQualifyForm">Confirm Qualify</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>