<script>
    import { Modal } from "mdb-ui-kit";
    import { DeleteMultipleLeads } from '../../../../actions/LeadAction';

    export default {
        props: ['fetchAllLeadsHandler', 'selectedRows'],
        data() {
            return {
                modalInstance: null,
                errors: {},
                isSubmitDeleteLead: false,
                totalDeleteLeads: null,
            }
        },
        methods: {
            showModalHandler() {
                this.totalDeleteLeads = null;
                this.modalInstance.show();
            },
            hideModalHandler() {
                this.modalInstance.hide();
            },
            async deleteMultipleLeadsHandler() {
                this.$toast.clear();

                if (this.totalDeleteLeads > 0) {
                    if (this.totalDeleteLeads != this.selectedRows.length) {
                        this.errors['lead_number'] = ['Please input valid lead number.'];
                        return;
                    }
                } else {
                    this.errors['lead_number'] = ['Please input total delete lead number.'];
                    return;
                }
                try {
                    this.isSubmitDeleteLead = true;
                    var data = {
                        leads: this.selectedRows,
                    };
                    const res = await DeleteMultipleLeads(data);
                    this.isSubmitDeleteLead = false;
                    try {
                        this.fetchAllLeadsHandler();
                        var { message } = res;
                        this.$toast[message.type](message.text);
                        this.hideModalHandler();
                    } catch (error) { }
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
            this.modalInstance = new Modal(this.$refs.deleteMultipleLeads);
        },
    }
</script>

<template>

    <div class="modal fade add-new-lead-modal"
        id="deleteMultipleLeads"
        ref="deleteMultipleLeads"
        aria-hidden="true"
        aria-labelledby="deleteMultipleLeads"
        tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content"
                style="border: 1px solid #dc4c64;">
                <div class="modal-header py-2">
                    <div class="d-flex justify-content-center align-items-center py-0">
                        <svg class="me-2 svg-5"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24">
                            <path
                                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>
                        <span class="text-hard fw-bold fs-16px">Delete</span>
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
                    <p class="text-center fs-14px">
                        Are you sure you want to delete this lead? This action cannot be undone! <br>
                        To confirm your intent, please type the number of leads <strong>({{ selectedRows.length
                            }})</strong> in the box below:
                    </p>
                    <div>
                        <input @click="delete errors?.lead_number"
                            class="form-control"
                            type="number"
                            v-model="totalDeleteLeads">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="errors?.lead_number?.length">{{ errors?.lead_number[0] }}</span>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between align-items-center border-0">
                    <div>
                        <button @click="hideModalHandler()"
                            class="btn btn-danger btn-sm">Cancel</button>
                    </div>
                    <div>
                        <button :disabled="isSubmitDeleteLead"
                            @click="deleteMultipleLeadsHandler()"
                            type="submit"
                            class="btn btn-primary px-3 btn-sm">
                            <div v-if="isSubmitDeleteLead">
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
                            <span v-if="!isSubmitDeleteLead">Delete Confirm</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<style lang="scss"
    scoped>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
    }
</style>