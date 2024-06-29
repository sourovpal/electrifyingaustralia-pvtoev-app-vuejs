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
        data() {
            return {
                errors: {},
                toggleTabs: 1,
                modalInstance: null,
                formData: {},
                isSubmitConfirmMoveForm: null,
            }
        },
        watch: {
        },
        computed: {
            currentLead(){
                return this.leadStore.getCurrentLead;
            },
            leadProperties(){
                return this.leadStore.getLeadProperties;
            },
            leadSources(){
                return this.leadStore.getLeadSources;
            },
        },
        methods: {
            showModalHandler() {
                this.errors = {};
                this.modalInstance.show();
            },
            hideModalHandler() {
                this.modalInstance.hide();
            },
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
                            :class="toggleTabs==1?'active':''"
                            @click="toggleTabs=1">Show All</li>
                        <li class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
                            :class="toggleTabs==2?'active':''"
                            @click="toggleTabs=2">Lead Properties</li>
                        <li class="nav-item nav-link text-capitalize cursor-pointer fs-14px fw-bold text-hard"
                            :class="toggleTabs==3?'active':''"
                            @click="toggleTabs=3">Custom Properties</li>
                    </ul>
                    <div v-show="toggleTabs != 3">
                        <div class="mb-3 position-relative">
                            <label class="form-label-title"
                                for="">Lead title</label>
                            <input @click="delete errors?.status"
                                @input="formDataHandler($event, 'lead_title')"
                                :value="currentLead?.lead_title??formData['lead_title']"
                                class="form-control"
                                type="text">
                            <span class="fs-14px text-danger py-1 w-100 d-block"
                                v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                        </div>

                        <div class="mb-3 position-relative">
                            <label class="form-label-title"
                                for="">Estimated value</label>
                            <input @click="delete errors?.status"
                                :value="currentLead?.estimated_value??formData['estimated_value']"
                                @blur="estimatedValueHandler($event, 'estimated_value')"
                                class="form-control"
                                type="text">
                            <span class="fs-14px text-danger py-1 w-100 d-block"
                                v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                        </div>

                        <div class="row">
                            <div class="col-lg-9">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">Lead source</label>
                                    <input @click="delete errors?.status"
                                        v-model="source_title"
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
                            <div class="col-lg-3">
                                <div class="mb-3 position-relative">
                                    <label class="form-label-title"
                                        for="">Source ID</label>
                                    <input @click="delete errors?.status"
                                        :value="currentLead?.lead_source_id??formData['lead_source_id']"
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
                                        :value="currentLead?.address_line_one??formData['address_line_one']"
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
                                        :value="currentLead?.city??formData['city']"
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
                                        :value="currentLead?.address_line_two??formData['address_line_two']"
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
                                        :value="currentLead?.state??formData['state']"
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
                                        :value="currentLead?.post_code??formData['post_code']"
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
                                        :value="currentLead?.country??formData['country']"
                                        @input="formDataHandler($event, 'country')"
                                        class="form-control"
                                        type="text">
                                    <span class="fs-14px text-danger py-1 w-100 d-block"
                                        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
                                </div>
                            </div>
                        </div>
                    </div><!-- Lead Properties -->

                    <div v-show="toggleTabs != 2">
                        <div class="py-3"
                            v-if="toggleTabs==1">
                            <h6 class="fs-16px fw-bold text-soft">Custom properties</h6>
                        </div>

                        <div class="mb-3 position-relative"
                            v-for="(propertie, index) in []"
                            :key="index">

                            <label class="form-label-title"
                                for="">{{ propertie.label }}</label>

                            <!-- type text and input tag -->
                            <input
                                v-if="propertie?.data_type_id == 'free_text' || propertie?.data_type_id == 'read_only'"
                                @input="($event, propertie?.unique_id, true)"
                                class="form-control"
                                type="text"
                                :value="leadCustomProperties[propertie?.unique_id]">

                            <!-- type number and input tag -->
                            <input v-if="propertie?.data_type_id == 'real_number'"
                                @input="formDataHandler($event, propertie?.unique_id, true)"
                                class="form-control"
                                type="number"
                                min="0"
                                :value="leadCustomProperties[propertie?.unique_id]">

                            <!-- type text and textarea tag -->
                            <textarea v-if="propertie?.data_type_id == 'multiline_free_text'"
                                @input="formDataHandler($event, propertie?.unique_id, true)"
                                class="form-control"
                                type="text"
                                rows="4"
                                :value="leadCustomProperties[propertie?.unique_id]"></textarea>

                            <!-- type data and input tag -->
                            <input v-if="propertie?.data_type_id == 'date'"
                                @input="formDataHandler($event, propertie?.unique_id, true)"
                                class="form-control"
                                type="date"
                                :value="leadCustomProperties[propertie?.unique_id]">

                            <!-- type data and input tag -->
                            <input v-if="propertie?.data_type_id == 'date_and_time'"
                                @input="formDataHandler($event, propertie?.unique_id, true)"
                                class="form-control"
                                type="datetime-local"
                                :value="leadCustomProperties[propertie?.unique_id]">

                            <!-- type checkbox and input tag -->
                            <div v-if="propertie?.data_type_id == 'yes_or_no'"
                                class="btn-group">
                                <button @click="yesOrNoHandler('1', propertie?.unique_id)"
                                    class="btn btn-sm"
                                    :class="`${(formData[propertie?.unique_id]??leadCustomProperties[propertie?.unique_id]) == '1'?'btn-primary':'btn-warning'}`">Yes</button>
                                <button @click="yesOrNoHandler('0', propertie?.unique_id)"
                                    class="btn btn-sm"
                                    :class="`${(formData[propertie?.unique_id]??leadCustomProperties[propertie?.unique_id]) == '0'?'btn-primary':'btn-warning'}`">No</button>
                            </div>

                            <!-- Single Chose and select tag  -->
                            <input v-if="propertie?.data_type_id == 'single_choice'"
                                class="form-control cursor-pointer"
                                type="text"
                                data-mdb-toggle="dropdown"
                                readonly
                                :value="formData[propertie?.unique_id]??leadCustomProperties[propertie?.unique_id]??`Select ${propertie.label}`">
                            <div class="dropdown-menu fade custom-form-select overflow-auto"
                                style="max-height:125px;">
                                <ul class="list-unstyled mb-0">
                                    <li class="dropdown-item text-hard fw-bold fs-14px py-1"
                                        @click="formData[propertie?.unique_id] && singleChoiceHandler(null, propertie?.unique_id)">
                                        <i>Select {{ propertie.label }}</i></li>
                                    <li v-for="(item, index) in  propertie?.attributes?.values??[]"
                                        :key="index"
                                        @click="singleChoiceHandler(item, propertie?.unique_id)"
                                        :class="`dropdown-item text-hard fw-bold fs-14px py-1 ${(formData[propertie?.unique_id] == item?.value)?'active':''}`">
                                        {{ item.label }}
                                    </li>
                                </ul>
                            </div>

                            <!-- Single Chose and select tag  -->
                            <input v-if="propertie?.data_type_id == 'multiple_choice'"
                                class="form-control cursor-pointer"
                                type="text"
                                data-mdb-toggle="dropdown"
                                readonly
                                :value="formData[propertie?.unique_id]??leadCustomProperties[propertie?.unique_id]??`Select ${propertie.label}`">
                            <div class="dropdown-menu fade custom-form-select overflow-auto"
                                style="max-height:125px;">
                                <ul class="list-unstyled mb-0">
                                    <li class="dropdown-item text-hard fw-bold fs-14px py-1"
                                        @click="formData[propertie?.unique_id] && multipleChoiceHandler(null, propertie?.unique_id)">
                                        <i>Select {{ propertie.label }}</i></li>
                                    <li v-for="(item, index) in  propertie?.attributes?.values??[]"
                                        :key="index"
                                        @click="multipleChoiceHandler(item, propertie?.unique_id)"
                                        :class="`dropdown-item text-hard fw-bold fs-14px py-1 ${formData[propertie?.unique_id]?.split(', ')?.includes(item?.value)?'active':''} ${leadCustomProperties[propertie?.unique_id]?.split(', ')?.includes(item?.value)?'active':''}`">
                                        {{ item.label }}
                                    </li>
                                </ul>
                            </div>

                        </div>
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