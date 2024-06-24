<script>
    import { Modal } from "mdb-ui-kit";

    import {
        ConfirmQualify,
        MoveLeadStatusToPipeline
    } from '../../../../actions/LeadAction';
    import { useLeadStore } from '../../../../stores/lead';
    import { useAppStore } from '../../../../stores/app';

    export default {
        setup(props) {
            const leadStore = useLeadStore();
            const appStore = useAppStore();
            return { leadStore, appStore };
        },
        props: ['isPipelineLead', 'findLeadByIdHandler'],
        data() {
            return {
                modalInstance: null,
                errors: {},
                leadStatus: [],
                pipelines: [],
                pipelineStages: [],
                selectedStatus: null,
                selectedPipeline: null,
                selectedPipelineStage: null,
                currentOwner: null,
                commant: null,
                isSubmitConfirmMoveForm: null,
            }
        },
        methods: {
            showModalHandler() {
                this.leadStatus = this.leadStore.getLeadStatus;
                this.pipelines = this.leadStore.getPipelinesWithStage;
                this.errors = {};
                this.selectedStatus = null;
                this.selectedPipeline = null;
                this.selectedPipelineStage = null;
                this.modalInstance.show();
            },
            hideModalHandler() {
                this.modalInstance.hide();
            },
            async selectPipelineHandler(id) {
                try {
                    this.errors = {};
                    this.selectedStatus = null;
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
                    this.errors = {};
                    this.selectedStatus = null;
                    var stage = this.pipelineStages.find(item => item.id === id);
                    if (stage) {
                        this.selectedPipelineStage = stage;
                    } else {
                        this.errors['pipeline_stage'] = ['This pipeline stage is invalid.'];
                    }
                } catch (error) { }
            },
            selectStatusHandler(id) {
                try {
                    this.errors = {};
                    this.selectedPipeline = null;
                    this.selectedPipelineStage = null;
                    var status = this.leadStatus.find(item => item.id === id);
                    if (status) {
                        this.selectedStatus = status;
                    } else {
                        this.errors['status'] = ['Status not found.'];
                    }
                } catch (error) { }
            },
            async confirmMoveLeadHandler() {
                try {
                    this.$toast.clear();
                    this.errors = {};
                    this.isSubmitConfirmMoveForm = true;
                    var leadId = this.$route.params?.id ?? null;
                    var data = {
                        lead: leadId,
                        status: this.selectedStatus?.id ?? null,
                        pipeline: this.selectedPipeline?.id ?? null,
                        pipeline_stage: this.selectedPipelineStage?.id ?? null,
                    };
                    const res = await MoveLeadStatusToPipeline(data);
                    this.isSubmitConfirmMoveForm = false;
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
                    this.isSubmitConfirmMoveForm = false;
                }
            }
        },
        mounted() {
            this.modalInstance = new Modal(this.$refs.leadQualifyModalRef);
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
        <div class="modal-dialog modal-dialog-centered- modal-md mx-auto"
            style="max-width: 420px;">
            <div class="modal-content">
                <div class="modal-header py-2">
                    <div class="d-flex justify-content-center align-items-center py-0">
                        <svg class="svg-5 me-2"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24">
                            <path
                                d="M480-40q-186 0-313-69.5T40-280q0-69 64-126.5T280-494v82q-73 23-116.5 59T120-280q0 64 108 112t252 48q144 0 252-48t108-112q0-37-43.5-73T680-412v-82q112 30 176 87.5T920-280q0 101-127 170.5T480-40ZM360-200v-440H160v-80h640v80H600v440h-80v-200h-80v200h-80Zm120-560q-33 0-56.5-23.5T400-840q0-33 23.5-56.5T480-920q33 0 56.5 23.5T560-840q0 33-23.5 56.5T480-760Z" />
                        </svg>
                        <span class="text-hard fw-bold fs-16px">Move lead</span>
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
                    <p class="fs-16px mb-4 text-center">
                        This operation will not count as a <strong>conversion</strong>. Use this functionality only to
                        fix mistakes or recategorise leads in a way that should not count towards your team's reporting
                        goals.
                    </p>
                    <div class="mb-4 position-relative">
                        <label class="form-label-title"
                            for="">Move {{ isPipelineLead?'back to lead status':'to another lead status' }}</label>
                        <input @click="delete errors?.status"
                            class="form-control cursor-pointer select-none"
                            :value="selectedStatus?.name??'Select lead status'"
                            type="text"
                            data-mdb-toggle="dropdown"
                            readonly>
                        <div class="dropdown-menu fade custom-form-select overflow-auto slim-scrollbar-"
                            style="max-height:125px;">
                            <ul class="list-unstyled mb-0">
                                <li v-for="(item, index) in leadStatus"
                                    :key="index"
                                    @click="selectStatusHandler(item.id)"
                                    :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1 ${selectedStatus?.id == item.id?'selected':''}`">
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                    </div>

                    <div class="mb-2 position-relative">
                        <label class="form-label-title"
                            for="">Move from {{ isPipelineLead?'another pipeline stage':'lead to pipeline stage'
                            }}</label>
                        <input @click="delete errors?.pipeline"
                            class="form-control cursor-pointer select-none"
                            :value="selectedPipeline?.title??'Select pipeline'"
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

                    <div class="mb-4 position-relative">
                        <input @click="delete errors?.pipeline_stage"
                            class="form-control select-none"
                            :class="`${pipelineStages.length?'cursor-pointer':'cursor-no-drop'}`"
                            :value="selectedPipelineStage?.name??'Select pipeline stage'"
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

                    <div class="d-flex justify-content-between align-items-center">
                        <button @click="hideModalHandler()"
                            class="btn btn-sm btn-danger">Close</button>
                        <button :disabled="isSubmitConfirmMoveForm"
                            @click="confirmMoveLeadHandler()"
                            type="submit"
                            class="btn btn-primary btn-sm px-3 d-flex justify-content-center align-items-center">
                            <div v-if="isSubmitConfirmMoveForm">
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
                            <span v-if="!isSubmitConfirmMoveForm">Confirm Move</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>