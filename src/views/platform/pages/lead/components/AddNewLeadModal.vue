<script>
    import { Modal } from "mdb-ui-kit";
    import {CreateNewLead} from '../../../../../actions/LeadAction';
    import DropdownOwnerList from './DropdownOwnerList.vue';
    export default {
        props:['leadSources', 'leadStatus', 'owners', 'fetchAllLeadsHandler'],
        data() {
            return {
                modalInstance:null,
                errors:{},
                name:null,
                address:null,
                phone_email:null,
                title:null,
                status:null,
                source:null,
                source_title:null,
                owner:null,
                currentOwner:null,
                currentStatus:null,
                tags:[],
                isSubmitCreateLeadForm:false,
            }
        },
        components:{
            DropdownOwnerList
        },
        watch: {
            "leadStatus"(status){
                if(status[0]){
                    this.status = status[0];
                    this.currentStatus = status[0];
                }
            },
            "owners"(owners){
                const {user_id} = this.$cookies.get(import.meta.env.VITE_AUTH_USER);
                this.owner = owners.find((item)=>item.id == user_id);
                this.currentOwner = this.owner;
            }
        },
        methods: {
            resetLeadForm(){
                this.error = {};
                this.name = this.address = this.phone_email =
                this.title = this.source = null;
                this.status = this.currentStatus;
                this.owner = this.currentOwner;
            },
            showModalHandler(){
                this.resetLeadForm();
                this.modalInstance.show();
            },
            hideModalHandler(){
                this.resetLeadForm();
                this.modalInstance.hide();
            },
            selectLeadSource(source){
                this.source = source;
                this.source_title = source.title;
            },
            selectleadStatus(status){
                this.status = status;
            },
            selectOwnerHandler(owner){
                this.owner = owner;
            },
            addNewTagHandler(event){
                delete this.errors?.tags;
                event.preventDefault()
                let val = event.target.value.trim()
                if (val.length > 0) {
                    var index = this.tags.indexOf(val);
                    if(index > -1){
                        return this.errors['tags'] = [`${val} already added.`];
                    }else{
                        this.tags.push(val);
                    }
                }
                event.target.value = '';
            },
            removeTagHandler(tag=null){
                var index = -1;
                if(tag){
                    index = this.tags.indexOf(tag);
                }else if(this.tags.length > 0){
                    index = this.tags.length - 1;
                }
                if(index > -1){
                    this.deleteCountry = this.tags[index];
                    this.tags.splice(index, 1);
                }
            },
            filterLeadSource(){
                return this.leadSources.filter((item) =>{
                    if(this.source_title){
                        if((item.title).toLowerCase().search(this.source_title.toLowerCase()) > -1){
                            return item;
                        }
                    }else{
                        return item;
                    }
                });
            },
            async createNewLeadHandler(){
                try{
                    this.$toast.clear();
                    this.isSubmitCreateLeadForm = true;
                    var data = {
                        name:this.name,
                        phone_or_email:this.phone_email,
                        address:this.address,
                        lead_title:this.title,
                        lead_source:this.source_title,
                        lead_status:this.status?.id,
                        lead_owner:this.owner?.id,
                        lead_tags:this.tags,
                    };
                    const res = await CreateNewLead(data);
                    this.isSubmitCreateLeadForm = false;
                    try{
                        this.fetchAllLeadsHandler(1);
                        this.resetLeadForm();
                        var {message} = res;
                        this.$toast[message.type](message.text);
                    }catch(error){
                        throw new Error(error.message);
                    }

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
                }finally{
                    this.isSubmitCreateLeadForm = false;
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
                        <div>
                            <button class="btn btn-light btn-sm btn-floating d-lg-none" @click="hideModalHandler()">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                            </button>
                        </div>
                    </div>
                    <div class="modal-body p-0 pt-3">

                        <div class="mb-3">
                            <label class="form-label-title" for="">Contact person <span class="text-soft fs-12px ms-1">(Required)</span> </label>
                            <input @click="delete errors?.name" v-model="name" class="form-control" type="text" id="">
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
                            <input @click="delete errors?.lead_source" class="form-control" v-model="source_title" type="text" data-mdb-toggle="dropdown">
                            <div class="dropdown-menu fade custom-form-select overflow-auto" style="max-height:130px;">
                                <ul class="list-unstyled mb-0">
                                    <li 
                                    v-for="(item, index) in filterLeadSource()" 
                                    :key="index"
                                    @click="selectLeadSource(item)"
                                    :class="`dropdown-item text-hard fw-bold fs-14px py-1 ${source?.id == item.id?'selected':''}`">
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
                        <br>
                    </div>
                </div>
                <div class="col-lg-4 lead-details-right">
                    <div class="modal-header py-lg-2 border-0 px-0">
                        <div class="d-flex justify-content-center align-items-center">
                            <!-- <svg class="me-2 svg-5" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"></path></svg> -->
                            <svg class="me-2 svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            <span class="text-hard fw-bold fs-16px">Details</span>
                        </div>
                    </div>
                    <div class="modal-body p-0 pt-3">
                        <div class="mb-3">
                            <label class="form-label-title" for="">Lead title <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                            <input @click="delete errors?.lead_title" v-model="title" class="form-control" type="text" name="" id="">
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.lead_title?.length">{{ errors?.lead_title[0] }}</span>
                        </div>
                        <div class="mb-3 position-relative">
                            <label class="form-label-title" for="">Lead status <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                            <input @click="delete errors?.lead_status" class="form-control cursor-pointer" :value="status?.name" type="text" data-mdb-toggle="dropdown" readonly>
                            <div class="dropdown-menu fade custom-form-select overflow-auto" style="max-height:160px;">
                                <ul class="list-unstyled mb-0">
                                    <li 
                                    v-for="(item, index) in leadStatus" 
                                    :key="index"
                                    @click="selectleadStatus(item)"
                                    :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1 ${status?.id == item.id?'selected':''}`">
                                    {{ item.name }}
                                    <svg v-if="item.is_lost" class="svg-5 ms-auto" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                                    </li>
                                </ul>
                            </div>
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.lead_status?.length">{{ errors?.lead_status[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label-title" for="">Owner <span class="text-soft fs-12px ms-1">(Optional)</span></label>
                            <div @click="$refs['dropdownOwnerListRef']?.resetSearchOwner()" class="form-control cursor-pointer owner-form-control" data-mdb-toggle="dropdown" >
                                <div class="owner-info">
                                    <div class="circle-avatar me-2">
                                        <img class="avatar" :src="owner?.profile_avatar" alt="">
                                    </div>
                                    <div class="owner-name fs-16px fw--bold text-hard">{{ owner?.name }}</div>
                                </div>
                            </div>
                            <dropdown-owner-list 
                            ref="dropdownOwnerListRef" 
                            :select-owner-handler="selectOwnerHandler" 
                            :owners="owners" 
                            :owner="owner" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label-title" for="">Tags <span class="text-soft fs-12px ms-1">(Optional)</span> </label>
                            <div class="form-control tags-list-form-control">
                                <span v-for="(tag, index) in tags" :key="index" class="tag-item">
                                    <span class="text text-hard">{{ tag }}</span> 
                                    <span @click="removeTagHandler(tag)" class="close">&times;</span>
                                </span>
                                <input 
                                @click="delete errors?.tags"
                                @keydown.enter="addNewTagHandler"
                                @blur="addNewTagHandler"
                                @keydown.delete="(e)=>e.target.value.length === 0 && removeTagHandler(null)"
                                class="tags-form-control" type="text" placeholder="Type here" id="">
                            </div>
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.tags?.length">{{ errors?.tags[0] }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-lg-8  pb-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <button @click="hideModalHandler()" class="btn btn-danger">Cancel</button>
                        </div>
                        <div>
                            <button :disabled="isSubmitCreateLeadForm" @click="createNewLeadHandler()" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                                <div v-if="isSubmitCreateLeadForm">
                                    <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                        <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                    </svg>
                                    <span>Submitting...</span>
                                </div>
                                <span v-if="!isSubmitCreateLeadForm">Save Change</span>
                            </button>
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
    .owner-form-control{
        transition: all 0.2s ease-in-out;
        &:hover{
            border-color: #3b71ca;
            box-shadow: inset 0 0 0 1px #3b71ca;
        }
        .owner-info{
            display: flex;
            user-select: none !important;
            position: relative;
            top: -1px;
            .circle-avatar{
                width:25px;
                height: 25px;
                border-radius:50%;
                overflow: hidden;
                object-fit: cover;
                .avatar{
                    width:100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid #dddddd;
                }
            }
            .owner-name{
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 80%;
                overflow: hidden;
            }
        }
    }
    .tags-list-form-control{
        display: flex;
        flex-wrap: wrap;
        &:hover{
            border-color: #3b71ca;
            box-shadow: inset 0 0 0 1px #3b71ca;
        }
        .tag-item{
            border: 1px solid #b8b8b8;
            font-size: 14px;
            padding: 2px 0px 2px 6px;
            border-radius: 2px;
            background: #f8f8f8;
            letter-spacing: 0.5px;
            user-select: none;
            margin-right:4px;
            margin-bottom:2px;
            line-height: 15px;
            white-space: nowrap;
            overflow: hidden;
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .text{
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: inline-block;
                padding-right: 20px;
                width: 100%;
            }
            .close{
                position: absolute;
                right:0;
                top: 2px;
                padding: 0px 5px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                &:hover{
                    color:red;
                }
            }
        }
        .tags-form-control{
            border: none;
            outline: none;
            padding: 0px 0px 2px;
            height:25px;
            &::placeholder{
                font-size:16px;
            }
        }
    }
</style>