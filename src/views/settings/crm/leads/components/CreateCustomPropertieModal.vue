<script>
    import { Modal } from "mdb-ui-kit";
    import CustomScrollbar from 'custom-vue-scrollbar';
    import { VueDraggableNext } from 'vue-draggable-next';
    import { CreateLeadPropertie, FindLeadPropertie, UpdateLeadPropertie } from '../../../../../actions/CrmLeads';
    import { datatypeList } from '../data.js';
    export default {
        props: ['pipeline_title', 'fetchPropertieDataHandler'],
        data() {
            return {
                errors: {},
                isEdit: false,
                pipelineId: 0,
                propertieId: 0,
                modalInstance: null,
                label: null,
                selectedPipelineTitle: null,
                default_value: null,
                data_type: null,
                unique_id: null,
                selectedDataTypeId: null,
                showSingleChoiceInput: false,
                options: [],
                datatypeList: [],
                pipelines: [],
                isCustomizeUniqueId: false,
                visibility: true,
                isSubmitProperties: false,
                isFetchLoading: false,
            }
        },
        components: {
            CustomScrollbar,
            VueDraggableNext
        },
        watch: {
            label: function (val) {
                if (!this.isCustomizeUniqueId && !this.isEdit) {
                    if (!val) {
                        this.unique_id = null;
                    } else {
                        this.unique_id = `${this.pipeline_title} ${val}`.trim()
                            .replace(/[^\w\s]/g, '')
                            .replace(/\s+/g, '_')
                            .toLowerCase();
                    }
                }
            },
        },
        methods: {
            showModalHandler(isEdit = false, pipelineId = 0, propertieId = 0) {
                this.isEdit = isEdit;
                this.pipelineId = pipelineId;
                this.label = null;
                this.data_type = null;
                this.unique_id = null;
                this.visibility = 1;
                this.isCustomizeUniqueId = false;
                this.propertieId = null;
                this.selectedDataTypeId = null;
                this.options = [];
                this.default_value = null;
                this.selectedPipelineTitle = null;
                if (propertieId) {
                    this.propertieId = propertieId;
                    this.fetchPropertieById(propertieId);
                }
                this.modalInstance.show();
            },
            hideModalHandler() {
                this.modalInstance.hide();
            },
            async fetchPropertieById(id) {
                try {
                    this.isFetchLoading = true;
                    const res = await FindLeadPropertie({ id: id });
                    try {
                        const { propertie, pipelines } = res;
                        if (propertie) {
                            const select = this.datatypeList.find(e => e.id == propertie.data_type_id);
                            if (select) {
                                this.selectedDataTypeId = propertie.data_type_id;
                                this.label = propertie.label;
                                this.data_type = propertie.data_type;
                                this.unique_id = propertie.unique_id;
                                this.visibility = propertie.visibility;
                                if (propertie.data_type_id === 'single_choice' || propertie.data_type_id === 'multiple_choice') {
                                    this.showSingleChoiceInput = true;
                                    if (propertie.options) {
                                        this.options = propertie.options;
                                    }
                                } else {
                                    this.showSingleChoiceInput = false;
                                    this.options = [];
                                }
                                if (pipelines) {
                                    this.pipelines = pipelines;
                                }
                            } else {
                                this.$toast.error('Invalid Data Type.');
                            }
                        }
                    } catch (error) { }
                } catch (error) {
                    try {
                        var message = error.response.data.message;
                        this.$toast[message.type](message.text);
                    } catch (e) {
                        this.$toast.error('Oops, something went wrong');
                    }
                } finally {
                    this.isFetchLoading = false;
                }
            },
            datatypeHandler(type) {
                const select = this.datatypeList.find(e => e.id == type);
                if (select) {
                    this.selectedDataTypeId = select.id;
                    this.data_type = select.data_type;

                    if (select.id === 'single_choice' || select.id === 'multiple_choice') {
                        this.showSingleChoiceInput = true;
                    } else {
                        this.showSingleChoiceInput = false;
                        this.options = [];
                    }

                }
            },
            async createNewPropertieHandler() {
                try {
                    this.$toast.clear();

                    if (this.selectedDataTypeId === 'single_choice' || this.selectedDataTypeId === 'multiple_choice') {
                        this.options = this.options.map((item, index) => {
                            return { ...item, id: index + 1 };
                        });
                    }

                    const data = {
                        data_type_id: this.selectedDataTypeId,
                        pipeline_id: this.pipelineId,
                        label: this.label,
                        data_type: this.data_type,
                        unique_id: this.unique_id,
                        visibility: this.visibility ? 1 : 0,
                        options: this.options,
                        default_value: this.default_value,
                    };
                    this.isSubmitProperties = true;
                    const res = await CreateLeadPropertie(data);

                    try {
                        const { message } = res;
                        this.$toast[message.type](message.text);
                        this.pipelineId = 0;
                        this.label = null;
                        this.data_type = null;
                        this.unique_id = null;
                        this.visibility = 1;
                        this.hideModalHandler();
                        this.fetchPropertieDataHandler();
                    } catch (error) { }

                } catch (error) {
                    console.log(error)
                    try {
                        var data = error.response.data;
                        this.errors = data.errors;
                    } catch (e) { }
                    try {
                        var message = error.response.data.message;
                        this.$toast[message.type](message.text);
                    } catch (e) {
                        this.$toast.error('Oops, something went wrong');
                    }
                } finally {
                    this.isSubmitProperties = false;
                }
            },
            async updatePropertieHandler() {
                try {
                    this.$toast.clear();

                    if (this.selectedDataTypeId === 'single_choice' || this.selectedDataTypeId === 'multiple_choice') {
                        this.options = this.options.map((item, index) => {
                            return { ...item, id: index + 1 };
                        });
                    }

                    const data = {
                        pipeline_id: this.pipelineId,
                        label: this.label,
                        visibility: this.visibility ? 1 : 0,
                        options: this.options,
                        default_value: this.default_value,
                    };

                    this.isSubmitProperties = true;
                    const res = await UpdateLeadPropertie(data, this.propertieId);
                    try {
                        const { message } = res;
                        this.$toast[message.type](message.text);
                        this.pipelineId = 0;
                        this.label = null;
                        this.data_type = null;
                        this.unique_id = null;
                        this.visibility = 1;
                        this.hideModalHandler();
                        this.fetchPropertieDataHandler();
                    } catch (error) { }

                } catch (error) {
                    try {
                        var data = error.response.data;
                        this.errors = data.errors;
                    } catch (e) { }
                    try {
                        var message = error.response.data.message;
                        this.$toast[message.type](message.text);
                    } catch (e) {
                        this.$toast.error('Oops, something went wrong');
                    }
                } finally {
                    this.isSubmitProperties = false;
                }
            },
            async movePropertieHandler(id) {
                try {
                    this.pipelineId = id;
                    if (id) {
                        this.pipelineId = id;
                        var pipeline = this.pipelines.find(e => e.id == id);
                        this.selectedPipelineTitle = pipeline.title;
                    } else {
                        this.pipelineId = 0;
                        this.selectedPipelineTitle = 'Lead';
                    }
                } catch (error) { }
            }
        },
        mounted() {
            this.datatypeList = datatypeList;
            this.selectedPipelineTitle = this.pipeline_title;
            this.modalInstance = new Modal(this.$refs.createPropertieModal);
        }
    }
</script>

<template>
    <div>
        <div ref="createPropertieModal"
            id="createPropertieModal"
            class="modal fade custom-modal"
            tabindex="-1">
            <div class="modal-dialog moda-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-base">{{ isEdit?'Edit':'New' }} Propertie</h5>
                    </div>
                    <div class="modal-body">

                        <div class="form-group mb-3">
                            <label class="form-label-title"
                                for="">Label</label>
                            <input @focus="delete errors?.label"
                                class="form-control"
                                v-model="label"
                                type="text">
                            <span class="fs-14px text-danger py-1 w-100 d-block"
                                v-if="errors?.label?.length">{{ errors?.label[0] }}</span>
                        </div>

                        <div class="form-group mb-3 position-relative">
                            <label class="form-label-title"
                                for="">Data Type</label>
                            <input @focus="delete errors?.data_type"
                                :class="isEdit?'no-drop':''"
                                class="form-control cursor-pointer"
                                readonly
                                type="text"
                                data-mdb-toggle="dropdown"
                                :value="`${data_type??'Select Data Type'}`">
                            <span class="fs-14px text-danger py-1 w-100 d-block"
                                v-if="errors?.data_type?.length">{{ errors?.data_type[0] }}</span>
                            <div v-show="!isEdit"
                                class="dropdown-menu custom-form-select data-type overflow-auto"
                                style="max-height:10rem;">
                                <ul class="list-unstyled mb-0">
                                    <li v-for="(item, index) in datatypeList"
                                        :key="index"
                                        :class="`dropdown-item ${selectedDataTypeId == item.id?'bg-primary text-white':''}`"
                                        @click="datatypeHandler(item.id)">
                                        {{ item.data_type }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div v-if="showSingleChoiceInput"
                            class="form-group mb-3">

                            <label class="form-label-title"
                                for="">Allowed values</label>
                            <div class="list-group ">

                                <vue-draggable-next class="lead-status-list"
                                    tag="div"
                                    :list="options"
                                    handle=".handle">

                                    <div class=""
                                        v-for="(item, index) in options"
                                        :key="item.id">
                                        <div class="list-group-item py-0 border-bottom-0 border-top">
                                            <div class="box-info d-flex justify-content-start align-items-center">
                                                <div class="handle">
                                                    <svg width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24">
                                                        <path
                                                            d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <input class="form-control form-control-sm ps-1 broder-right-1"
                                                    type="text"
                                                    :value="item.label"
                                                    @change="(input)=>{item.label=input.target.value}">
                                                <input class="form-control form-control-sm ps-1"
                                                    type="text"
                                                    :value="item.value"
                                                    @change="(input)=>{item.value=input.target.value}">
                                                <div class="action-dropdown">
                                                    <div @click="options.splice(index, 1)"
                                                        class="action"
                                                        data-mdb-toggle="dropdown"
                                                        aria-expanded="false">
                                                        <svg class="delete-item"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="24"
                                                            viewBox="0 -960 960 960"
                                                            width="24">
                                                            <path
                                                                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </vue-draggable-next>

                                <div class="list-group-item bg-light text-center add-new-lead-status"
                                    @click="options.push({id:options.length+1, label:`Label`, value:'Value'})">
                                    Add Value
                                </div>

                            </div>

                        </div>

                        <div class="form-group mb-3 position-relative">
                            <label class="form-label-title"
                                for="">Unique ID</label>
                            <div class="d-flex justify-content-start align-items-center position-relative">
                                <label v-if="!isEdit"
                                    @click="isCustomizeUniqueId=!isCustomizeUniqueId && delete errors?.unique_id"
                                    class="custom-form-checkbox btn btn-floating btn-light position-absolute">
                                    <svg v-if="!isCustomizeUniqueId"
                                        class="unchecked"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        width="24">
                                        <path
                                            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
                                    </svg>
                                    <svg v-else
                                        class="checked"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                        </path>
                                    </svg>
                                </label>
                                <input :style="`${!isEdit?'text-indent:25px;':''}`"
                                    @focuse="delete errors?.unique_id"
                                    :class="(isEdit || !isCustomizeUniqueId)?'no-drop':''"
                                    :readonly="!isCustomizeUniqueId || isEdit"
                                    v-model="unique_id"
                                    class="form-control"
                                    type="text">
                            </div>
                            <span class="fs-14px text-danger py-1 w-100 d-block"
                                v-if="errors?.unique_id?.length">{{ errors?.unique_id[0] }}</span>
                        </div>


                        <div v-if="isEdit"
                            class="form-group mb-3 position-relative">
                            <label class="form-label-title"
                                for="">Move Propertie</label>
                            <input @focus="delete errors?.pipeline_id"
                                class="form-control cursor-pointer"
                                readonly
                                type="text"
                                data-mdb-toggle="dropdown"
                                :value="`${selectedPipelineTitle??'Move Propertie'}`">
                            <span class="fs-14px text-danger py-1 w-100 d-block"
                                v-if="errors?.pipeline_id?.length">{{ errors?.pipeline_id[0] }}</span>
                            <div class="dropdown-menu custom-form-select data-type overflow-auto"
                                style="max-height:10rem;">
                                <ul class="list-unstyled mb-0">
                                    <li v-if="isEdit && pipelineId != 0"
                                        class="dropdown-item"
                                        @click="movePropertieHandler(0)"><strong>Lead</strong></li>
                                    <li v-for="(item, index) in pipelines"
                                        :key="index"
                                        v-show="item.id != pipelineId"
                                        :class="`dropdown-item py-1`"
                                        @click="movePropertieHandler(item.id)">
                                        {{ item.title }}
                                    </li>
                                </ul>
                            </div>
                        </div>




                        <div class="form-group">
                            <label class="form-label-title"
                                for="">Visibility</label>
                            <div class="d-flex justify-content-start align-items-center">
                                <label @click="visibility=!visibility"
                                    class="custom-form-checkbox btn btn-floating btn-light"
                                    style="margin-left: -8px;">
                                    <svg v-if="!visibility"
                                        class="unchecked"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        width="24">
                                        <path
                                            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
                                    </svg>
                                    <svg v-if="visibility"
                                        class="checked"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                                        </path>
                                    </svg>
                                </label>
                                <span class="fw-bold fs-14px">{{ visibility?'Visible':'Hidden' }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0 d-flex justify-content-between align-items-center">
                        <button type="button"
                            class="btn btn-danger"
                            @click="hideModalHandler">Cancel</button>

                        <button :disabled="isSubmitProperties"
                            @click="isEdit?updatePropertieHandler():createNewPropertieHandler()"
                            type="submit"
                            class=" btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                            <div v-if="isSubmitProperties">
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
                            <span v-if="!isSubmitProperties">Save changes</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped
    lang="scss">
    .custom-form-select {
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

        .dropdown-item {
            cursor: pointer;
        }
    }

    .broder-right-1 {
        border-right: 1px solid #dddddd !important;
    }

    .lead-status-list {
        .list-group-item:first-child {
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }

        .list-group-item {
            position: relative;
            transition: all 0s !important;
            transition: background-color 0.3s ease-in-out;

            &:hover {
                background-color: #f1f5f9;
            }

            .box-info {
                .handle {
                    position: absolute;
                    left: 5px;
                    top: 47%;
                    transform: translateY(-50%);
                    cursor: move;
                    opacity: 0;
                    visibility: hidden;

                    svg {
                        width: 18px;
                        height: 18px;
                        fill: #878787;
                    }
                }

                .form-control {
                    border: none;
                    background-color: transparent !important;
                    padding-top: 8px;
                    padding-bottom: 8px;
                    border-radius: 0px;
                    font-weight: bold;
                    font-size: 14px;
                    outline: none !important;
                }

                .action {
                    position: absolute;
                    right: 5px;
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 0;
                    visibility: hidden;
                    cursor: pointer;

                    svg {
                        width: 18px;
                        height: 18px;
                        fill: #878787;
                    }
                }
            }

            .action-dropdown {
                .delete-item {
                    &:hover {
                        fill: #ff1b46;
                    }
                }

                .dropdown-menu {
                    border-radius: 5px !important;
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

                    li {
                        .dropdown-item {
                            font-size: 14px;
                            padding-top: 7px;
                            padding-bottom: 7px;
                            cursor: pointer;

                            &.lost-item,
                            &.active-item {
                                border-top-left-radius: 5px !important;
                                border-top-right-radius: 5px !important;
                            }

                            &.delete-item {
                                border-bottom-left-radius: 5px !important;
                                border-bottom-right-radius: 5px !important;
                            }
                        }
                    }

                    &::before {
                        content: "";
                        position: absolute;
                        top: -7px;
                        left: 8px;
                        border: 7px solid #e6e6e6;
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
                        left: 8px;
                        border: 7px solid white;
                        border-right-color: white;
                        border-bottom-color: white;
                        transform: rotate(45deg);
                        border-bottom-color: transparent;
                        border-right-color: transparent;
                    }
                }
            }

            &:hover {

                .action-dropdown {
                    .dropdown-menu.show {
                        display: block;
                    }
                }

                .handle,
                .action {
                    opacity: 1;
                    visibility: visible;
                }
            }
        }
    }

    .add-new-lead-status {
        font-weight: bold;
        font-size: 14px;
        padding: 7px 8px;
        cursor: pointer;
        border-bottom-left-radius: 3px !important;
        border-bottom-right-radius: 3px !important;

        &:hover {
            color: #2563eb;
            border-color: #bfdbfe;
            background-color: rgba(239, 246, 255, 0.95) !important;
        }
    }

    input.no-drop {
        cursor: no-drop;
    }
</style>