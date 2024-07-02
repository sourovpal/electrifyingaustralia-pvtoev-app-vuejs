<script setup>
    import { ref, computed, onMounted, defineExpose, watch } from "vue";
    import RightSidebarProperties from './RightSidebarProperties.vue';
    import { Modal } from "mdb-ui-kit";
    import {
        ConfirmQualify,
        MoveLeadStatusToPipeline
    } from '../../../../actions/LeadAction';
    import { useLeadStore } from '../../../../stores/lead';
    import { useAppStore } from '../../../../stores/app';
    import MultipleSelectVue from "./forms/MultipleSelect.vue";
    // Assign Veriable
    const leadStore = useLeadStore();
    const appStore = useAppStore();
    const tabShowAll = ref('show-all');
    const tabLeadProperties = ref('lead-properties');
    const tabPipelineProperties = ref('pipeline-properties');
    const errors = ref({});
    const toggleTabName = ref('show-all');
    const showAll = ref('show-all');
    const modalInstance = ref(null);
    const isSubmitEditLead = ref(null);
    const leadEditModalRef = ref(null);

    const leadFormData = ref({});
    const customFormData = ref({});
    // Computed
    const currentLead = computed(() => leadStore.getCurrentLead);
    const leadProperties = computed(() => leadStore.getLeadProperties);
    const leadSources = computed(() => leadStore.getLeadSources);
    const isPipelineLead = computed(() => leadStore.getIsPipelineLead);

    // On Mounted
    onMounted(() => {
        modalInstance.value = new Modal(leadEditModalRef.value);
    });

    watch(leadFormData.value, (n, o) => {
        console.log(n)
    });

    // functions
    function showModalHandler() {
        errors.value = {};
        modalInstance.value.show();
        console.log(leadFormData.value)
    }

    function hideModalHandler() {
        modalInstance.value.hide();
    }
    function customLabelMake({ label, value }) {
        return `${label}`
    }
    function tags(n) {
        console.log('new', n);
    }
    defineExpose({ showModalHandler, hideModalHandler });
    const selected = ref('');
</script>

<template>

    <div class="modal fade add-new-lead-modal"
        id="leadEditModalRef"
        ref="leadEditModalRef"
        aria-hidden="true"
        aria-labelledby="leadEditModalRef"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content mb-5">
                <div class="modal-header py-2">
                    <div class="d-flex justify-content-center align-items-center py-0">
                        <svg class="svg-5 me-2"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24">
                            <path
                                d="M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q37 0 73 4.5t72 14.5l-67 68q-20-3-39-5t-39-2q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h240v80H160Zm400 40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-340L683-120H560Zm300-263-37-37 37 37ZM620-180h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Z" />
                        </svg>
                        <span class="text-hard fw-bold fs-16px">Edit properties </span>
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
                <div class="modal-body pt-lg-0">
                    <ul class="nav nav-tabs nav-justified mb-3 d-none d-lg-flex"
                        id="ex1"
                        role="tablist">

                        <li class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
                            :class="{active:(toggleTabName==tabShowAll)}"
                            @click="toggleTabName=tabShowAll">Show All</li>
                        <li class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
                            :class="{active:(toggleTabName==tabLeadProperties)}"
                            @click="toggleTabName=tabLeadProperties">Lead Properties</li>
                        <li class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
                            v-if="isPipelineLead"
                            :class="{active:(toggleTabName==tabPipelineProperties)}"
                            @click="toggleTabName=tabPipelineProperties">Pipeline Properties</li>
                    </ul>

                    <div v-show="(toggleTabName == tabShowAll)">
                        <div class="mb-3 position-relative">

                            <label class="form-label-title"
                                for="">Lead title</label>
                            <input @click="delete errors?.status"
                                v-model="leadFormData['lead_title']"
                                @blur="showModalHandler()"
                                class="form-control"
                                type="text">
                            <span class="fs-14px text-danger py-1 w-100 d-block"
                                v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                        </div>

                        <div class="mb-3 position-relative">
                            <label class="form-label-title"
                                for="">Estimated value</label>
                            <input @click="delete errors?.status"
                                class="form-control"
                                type="text">
                            <span class="fs-14px text-danger py-1 w-100 d-block"
                                v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                        </div>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">Lead source</label>
                                    <input @click="delete errors?.status"
                                        class="form-control"
                                        type="text"
                                        data-mdb-toggle="dropdown">
                                    <div class="dropdown-menu fade custom-form-select overflow-auto"
                                        style="max-height:125px;">
                                        <ul class="list-unstyled mb-0">
                                            <li v-for="(item, index) in []"
                                                :key="index"
                                                @click="selectLeadSource(item)"
                                                :class="`dropdown-item text-hard fw-bold fs-14px py-1 ${lead_source?.id == item.id?'selected':''}`">
                                                {{ item.title }}
                                            </li>
                                        </ul>
                                    </div>
                                    <span class="fs-14px text-danger py-1 w-100 d-block"
                                        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">Source ID</label>
                                    <input @click="delete errors?.status"
                                        :value="currentLead?.lead_source_id??leadFormData['lead_source_id']"
                                        @input="formDataHandler($event, 'lead_source_id')"
                                        class="form-control"
                                        type="text">
                                    <span class="fs-14px text-danger py-1 w-100 d-block"
                                        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">Address one</label>
                                    <input @click="delete errors?.status"
                                        :value="currentLead?.address_line_one??leadFormData['address_line_one']"
                                        @input="formDataHandler($event, 'address_line_one')"
                                        class="form-control"
                                        type="text">
                                    <span class="fs-14px text-danger py-1 w-100 d-block"
                                        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">City</label>
                                    <input @click="delete errors?.status"
                                        :value="currentLead?.city??leadFormData['city']"
                                        @input="formDataHandler($event, 'city')"
                                        class="form-control"
                                        type="text">
                                    <span class="fs-14px text-danger py-1 w-100 d-block"
                                        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">Address two</label>
                                    <input @click="delete errors?.status"
                                        :value="currentLead?.address_line_two??leadFormData['address_line_two']"
                                        @input="formDataHandler($event, 'address_line_two')"
                                        class="form-control"
                                        type="text">
                                    <span class="fs-14px text-danger py-1 w-100 d-block"
                                        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">State</label>
                                    <input @click="delete errors?.status"
                                        :value="currentLead?.state??leadFormData['state']"
                                        @input="formDataHandler($event, 'state')"
                                        class="form-control"
                                        type="text">
                                    <span class="fs-14px text-danger py-1 w-100 d-block"
                                        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">Postcode</label>
                                    <input @click="delete errors?.status"
                                        :value="currentLead?.post_code??leadFormData['post_code']"
                                        @input="formDataHandler($event, 'post_code')"
                                        class="form-control"
                                        type="text">
                                    <span class="fs-14px text-danger py-1 w-100 d-block"
                                        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">Country</label>
                                    <input @click="delete errors?.status"
                                        :value="currentLead?.country??leadFormData['country']"
                                        @input="formDataHandler($event, 'country')"
                                        class="form-control"
                                        type="text">
                                    <span class="fs-14px text-danger py-1 w-100 d-block"
                                        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                                </div>
                            </div>
                        </div>
                    </div><!-- Lead Properties -->

                    <div v-show="(toggleTabName == tabShowAll || toggleTabName == tabLeadProperties)">
                        <div class="py-3"
                            v-if="(toggleTabName==tabShowAll)">
                            <h6 class="fs-16px fw-bold text-hard">Custom properties</h6>
                        </div>

                        <div class="mb-2 lead-propertie-input"
                            v-for="(field, index) in leadProperties"
                            :key="index">

                            <label class="form-label-title"
                                :for="field?.unique_id">{{ field?.label }}</label>

                            <div v-if="field?.data_type_id === 'free_text' || field?.data_type_id === 'read_only'">
                                <input class="form-control"
                                    type="text"
                                    :name="field?.unique_id"
                                    v-model="customFormData[field.unique_id]" />
                            </div>

                            <div v-else-if="field?.data_type_id === 'real_number'">
                                <input class="form-control"
                                    type="number"
                                    :name="field?.unique_id"
                                    v-model="customFormData[field.unique_id]" />
                            </div>

                            <div v-else-if="field?.data_type_id === 'date'">
                                <input class="form-control"
                                    type="date"
                                    :name="field?.unique_id"
                                    v-model="customFormData[field.unique_id]" />
                            </div>

                            <div v-else-if="field?.data_type_id === 'date_and_time'">
                                <input class="form-control"
                                    type="datetime-local"
                                    :name="field?.unique_id"
                                    v-model="customFormData[field.unique_id]" />
                            </div>

                            <div v-else-if="field?.data_type_id === 'multiline_free_text'">
                                <textarea class="form-control"
                                    :name="field?.unique_id"
                                    rows="1"
                                    v-model="customFormData[field.unique_id]"></textarea>
                            </div>



                            <div v-else-if="field?.data_type_id === 'yes_or_no'"
                                class="tri-state-toggle">
                                <button @click="manageYesOrNoHandler('yes', field.unique_id)"
                                    :class="{'active':customFormData[field.unique_id]==1}"
                                    class="tri-state-toggle-button text-head fw-bold fs-12px">
                                    Yes
                                </button>
                                <button @click="manageYesOrNoHandler('', field.unique_id)"
                                    :class="{'active':customFormData[field.unique_id] != -1 && customFormData[field.unique_id]!= 1}"
                                    class="tri-state-toggle-button fs-16px text-head fw-bold">
                                    &times;
                                </button>
                                <button @click="manageYesOrNoHandler('no', field.unique_id)"
                                    :class="{'active':customFormData[field.unique_id] == -1}"
                                    class="tri-state-toggle-button text-head fw-bold fs-12px">
                                    No
                                </button>
                            </div>
                                    
                            <MultipleSelectVue v-else-if="field?.data_type_id === 'multiple_choice'"
                            :name="field?.unique_id"
                            :options="field?.options??[]"
                            :value="leadFormData[field?.unique_id]"
                            v-model="leadFormData[field.unique_id]"
                            :usebg="true" />
                            
                            
                            
                            <!-- 
                            <SingleSelect v-else-if="field?.data_type_id === 'single_choice'"
                                :name="field?.unique_id"
                                :options="field?.options??[]"
                                :value="leadFormData[field?.unique_id]"
                                v-model="leadFormData[field.unique_id]"
                                :usebg="true" /> -->


                        </div>
                    </div>


                    <div class="d-flex justify-content-between align-items-center">
                        <button @click="hideModalHandler()"
                            class="btn btn-sm btn-danger">Close</button>
                        <button :disabled="isSubmitEditLead"
                            @click="confirmMoveLeadHandler()"
                            type="submit"
                            class="btn btn-primary btn-sm px-3 d-flex justify-content-center align-items-center">
                            <div v-if="isSubmitEditLead">
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
                            <span v-if="!isSubmitEditLead">Save Change</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>