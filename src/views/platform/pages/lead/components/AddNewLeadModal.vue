<script>
    import { Modal } from "mdb-ui-kit";
    import {CreateNewLead} from '../../../../../actions/LeadAction';
    export default {
        props:['leadSources', 'leadStatus'],
        data() {
        return {
            modalInstance:null,
            errors:{},
            name:null,
            address:null,
            phone_email:null,
            title:null,
            status:null,
            status_id:null,
            source:null,
            source_id:null,
            owner:null,
        }
        },
        watch: {
            "leadStatus"(status){
                if(status[0]){
                    this.status_id = status[0].id;
                    this.status = status[0].name;
                }
            }
        },
        methods: {
            showModalHandler(){
                this.modalInstance.show();
            },
            hideModalHandler(){
                this.modalInstance.hide();
            },
            selectLeadSource(source){
                this.source = source.title;
                this.source_id = source.id;
            },
            selectleadStatus(status){
                this.status = status.name;
                this.status_id = status.id;
            },
            async createNewLeadHandler(){
                try{
                    var data = {
                        name:this.name,
                        phone_or_email:this.phone_email,
                        address:this.address,
                        lead_title:this.title,
                        lead_source:this.source_id,
                        lead_status:this.status_id,
                        lead_owner:this.owner,
                        lead_tags:this.name,
                    };
                    const res = await CreateNewLead(data);
                }catch(error){
                    try{
                        this.errors = error.response.data.errors;
                    }catch(error){}

                    try{
                        var message = error.response.data.message;
                        this.$toast[message.type](message.text);
                    }catch(e){
                        this.$toast.error('Oops, something went wrong');
                    }
                }
            }
        },
        mounted() {
            this.modalInstance = new Modal(this.$refs.addNewLeadModal);
        },
    }
</script>

<template>

<div class="modal fade add-new-lead-modal" id="addNewLeadModal" ref="addNewLeadModal" aria-hidden="true" aria-labelledby="addNewLeadModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="row m-0">
                <div class="col-lg-8">
                    <div class="modal-header py-lg-2 border-0 px-0">
                        <div class="d-flex justify-content-center align-items-center">
                            <svg class="me-2 svg-5" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"></path></svg>
                            <span class="text-hard fw-bold fs-16px">New Lead</span>
                        </div>
                    </div>
                    <div class="modal-body p-0 pt-3">

                        <div class="mb-3">
                            <label class="form-label-title" for="">Contact person <span class="text-soft fs-12px ms-1">(Required)</span> </label>
                            <input @click="delete errors?.name" v-model="name" class="form-control" type="text" name="" id="">
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.name?.length">{{ errors?.name[0] }}</span>
                        </div>

                        <div class="mb-3">
                            <label class="form-label-title" for="">Address <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                            <input @click="delete errors?.address" v-model="address" class="form-control" type="text" name="" id="">
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.address?.length">{{ errors?.address[0] }}</span>
                        </div>

                        <div class="mb-3">
                            <label class="form-label-title" for="">Phone or email <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                            <input @click="delete errors?.phone_or_email" v-model="phone_email" class="form-control" type="text" name="" id="">
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.phone_or_email?.length">{{ errors?.phone_or_email[0] }}</span>
                        </div>

                        <div class="mb-3">
                            <label class="form-label-title" for="">Lead source <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                            <input @click="delete errors?.lead_source" class="form-control cursor-pointer" v-model="source" type="text" data-mdb-toggle="dropdown" readonly>
                            <div class="dropdown-menu fade custom-form-select overflow-auto" style="max-height:130px;">
                                <ul class="list-unstyled mb-0">
                                    <li 
                                    v-for="(item, index) in leadSources" 
                                    :key="index"
                                    @click="selectLeadSource(item)"
                                    :class="`dropdown-item text-hard fw-bold fs-14px py-1 ${source_id == item.id?'selected':''}`">
                                    {{ item.title }}
                                    </li>
                                </ul>
                            </div>
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.lead_source?.length">{{ errors?.lead_source[0] }}</span>
                        </div>

                        <div class="mb-3">
                            <label class="form-label-title" for="">Existing leads / deals</label>
                            <span class="fs-12px text-soft">No matching leads or deals found.</span>
                        </div>
                        <br><br><br>
                    </div>
                </div>
                <div class="col-lg-4 lead-details-right">
                    <div class="modal-header py-lg-2 border-0 px-0">
                        <div class="d-flex justify-content-center align-items-center">
                            <svg class="me-2 svg-5" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"></path></svg>
                            <span class="text-hard fw-bold fs-16px">Details</span>
                        </div>
                    </div>
                    <div class="modal-body p-0 pt-3">
                        <div class="mb-3">
                            <label class="form-label-title" for="">Lead title <span class="text-soft fs-12px ms-1">(Required)</span> </label>
                            <input @click="delete errors?.lead_title" v-model="title" class="form-control" type="text" name="" id="">
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.lead_title?.length">{{ errors?.lead_title[0] }}</span>
                        </div>
                        <div class="mb-3 position-relative">
                            <label class="form-label-title" for="">Lead Status <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                            <input @click="delete errors?.lead_status" class="form-control cursor-pointer" v-model="status" type="text" data-mdb-toggle="dropdown" readonly>
                            <div class="dropdown-menu fade custom-form-select overflow-auto" style="max-height:218px;">
                                <ul class="list-unstyled mb-0">
                                    <li 
                                    v-for="(item, index) in leadStatus" 
                                    :key="index"
                                    @click="selectleadStatus(item)"
                                    :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1 ${status_id == item.id?'selected':''}`">
                                    {{ item.name }}
                                    <svg v-if="item.is_lost" class="svg-5 ms-auto" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                                    </li>
                                </ul>
                            </div>
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.lead_status?.length">{{ errors?.lead_status[0] }}</span>
                        </div>
                        <div class="mb-3"><label class="form-label-title" for="">Owner <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                            <input @click="delete errors?.lead_owner" class="form-control" type="text" name="" id="">
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.lead_owner?.length">{{ errors?.lead_owner[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label-title" for="">Tags <span class="text-soft fs-12px ms-1">(Required)</span> </label>
                            <input @click="delete errors?.tags" class="form-control" type="text" name="" id="">
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.tags?.length">{{ errors?.tags[0] }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-lg-8  pb-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <button class="btn btn-danger">Close</button>
                        </div>
                        <div>
                            <button class="btn btn-primary" @click="createNewLeadHandler()">Submit</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 lead-details-right"></div>
            </div>
        </div>
    </div>
</div>

</template>


<style lang="scss" scoped>
    @media (min-width: 992px){
        .add-new-lead-modal .modal-lg {
            --mdb-modal-width: 880px !important;
        }
        .lead-details-right{
            background-color: #f5f7fa;
        }
    }
    .custom-form-select{
        width: 100%;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius:3px !important;
        border-top-left-radius:0px !important;
        border-top-right-radius:0px !important;
        overflow: auto;
    }
    .dropdown-item.selected{
        position: relative;
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 2px;
            width: 4px;
            height: 90%;
            background-color: rgb(44, 114, 226);
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }
    }
</style>