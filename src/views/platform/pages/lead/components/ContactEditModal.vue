<script>
    import { Modal } from "mdb-ui-kit";
    import {icons} from '../../../../../asset/svgicon';
    import {
        CreateLeadContact, 
        UpdateLeadContact, 
        SearchLeadContact,
    } from '../../../../../actions/LeadAction'

    export default {
        props:['findLeadByIdHandler'],
        components:{
        },
        data(){
            return {
                icons:{},
                modalInstance:null,
                errors:{},
                id:null,
                contacts:[],
                contact:null,
                title:null,
                first_name:null,
                last_name:null,
                email:null,
                phone_number:null,
                notes:null,
                another_phones:[],
                another_emails:[],
                email_use:null,
                phone_use:null,
                intendedUse:['Home', 'Office', 'Work', 'Personal', 'Mobile'],
                searchContacts:[],
                isCreateNewContact:false,
                isSubmitCreateNewContact:false,
            }
        },
        watch:{
            "first_name"(val){
                this.searchLeadContactHandler(val, ['first_name', 'last_name']);
            },
            "last_name"(val){
                this.searchLeadContactHandler(val, ['first_name', 'last_name']);
            },
            "email"(val){
                this.searchLeadContactHandler(val, ['email', 'another_emails']);
            },
            "phone_number"(val){
                this.searchLeadContactHandler(val, ['phone_number', 'another_phones']);
            },
            "$store.state.leadEdit.leadContacts"(payload){
                this.contacts = payload;
            },
        },
        methods: {
            showModalHandler(contact=null){
                this.errors = {};
                this.contacts = this.$store.getters.getLeadContacts;
                this.searchContacts = [];
                if(contact){
                    this.isCreateNewContact = false;
                    Object.keys(contact).forEach(item=>{
                        this.$data[item] = contact[item];
                    });
                    this.contact = contact;
                }else{
                    this.isCreateNewContact = true;
                    this.contact = null;
                }
                this.modalInstance.show();
            },
            hideModalHandler(){
                this.modalInstance.hide();
            },
            selectContactHandler(contact=null){
                this.errors = {};
                this.searchContacts = [];
                if(contact){
                    this.isCreateNewContact = false;
                    Object.keys(contact).forEach(item=>{
                        this.$data[item] = contact[item];
                    });
                    this.contact = contact;
                }else{
                    Object.keys(this.contact).forEach(item=>{
                        this.$data[item] = null;
                    });
                    this.contact = null;
                    setTimeout(()=>{
                        this.isCreateNewContact = true;
                    },200);
                }
            },
            addedAnatherPhoneHandler(){
                if(this.phone_number == null || this.phone_number == ""){
                    this.errors['phone_number'] = ['This phone number field is required.'];
                    return;
                }
                if(this.another_phones?.length > 0){
                    var last = this.another_phones[this.another_phones.length - 1];
                    if(last){
                        if(last.phone_number == null || last.phone_number == ""){
                            this.errors['phone_number'] = ['This phone number field is required.'];
                            return;
                        }
                    }
                }
                delete this.errors['phone_number'];
                if(!this.another_phones){this.another_phones = []}
                this.another_phones.push({phone_number:'', phone_use:''});
            },
            addedAnatherEmailHandler(){
                if(this.email == null || this.email == ""){
                    this.errors['email'] = ['This email address field is required.'];
                    return;
                }
                if(this.another_emails?.length > 0){
                    var last = this.another_emails[this.another_emails.length - 1];
                    if(last){
                        if(last.email == null || last.email == ""){
                            this.errors['email'] = ['This email address field is required.'];
                            return;
                        }
                    }
                }
                delete this.errors['email'];
                if(!this.another_emails){this.another_emails = []}
                this.another_emails.push({email:'', email_use:''});
            },
            async searchLeadContactHandler(search, fields){
                if(!this.isCreateNewContact){return;}
                if(search==''){
                    this.searchContacts = [];
                    return;
                }
                try{
                    var leadId = this.$route.params?.id??null;
                    var payload = {lead_id:leadId, search:search, fields:fields};

                    const res = await SearchLeadContact(payload);
                    try{
                        const {contacts} = res;
                        this.searchContacts = contacts;
                    }catch(error){}
                }catch(error){}
            },
            async createLeadContactHandler(currentContact=null){
                try{
                    this.$toast.clear();
                    this.isSubmitCreateNewContact = true;
                    var res = {};
                    var leadId = this.$route.params?.id??null;
                    if(currentContact){
                        var payload = {
                            lead_id:leadId,
                            contact_id:currentContact.id,
                        };
                        res = await CreateLeadContact(payload);
                    }else{
                        var phones = [];
                        this.another_phones?.map((item)=>{
                            if(item.phone_number != ''){
                                phones.push(item);
                            }
                        });
                        var emails = [];
                        this.another_emails?.map((item)=>{
                            if(item.email != ''){
                                emails.push(item);
                            }
                        });
                        var payload = {
                            contact_id:this.id,
                            lead_id:leadId,
                            title:this.title,
                            first_name:this.first_name,
                            last_name:this.last_name,
                            email:this.email,
                            phone_number:this.phone_number,
                            notes:this.notes,
                            another_phones:phones,
                            another_emails:emails,
                            email_use:this.email_use,
                            phone_use:this.phone_use,
                        };
                        if(this.contact){
                            res = await UpdateLeadContact(payload);
                        }else{
                            res = await CreateLeadContact(payload);
                        }
                    }

                    this.isSubmitCreateNewContact = false;
                    this.findLeadByIdHandler();

                    if(!currentContact){
                        this.hideModalHandler();
                    }

                    try{
                        var {message, contact} = res;
                        if(!currentContact){
                            this.$toast[message.type](message.text);
                        }
                        this.selectContactHandler(contact);
                    }catch(error){}
                    
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
                    this.isSubmitCreateNewContact = false;
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

<div class="modal fade add-new-lead-modal" id="leadQualifyModalRef" ref="leadQualifyModalRef" aria-hidden="true" aria-labelledby="leadQualifyModalRef" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered- modal-lg mx-auto">
        <div class="modal-content">
            <div class="row mx-0">
                <div class="col-lg-4 bg-col-left">
                    <div class="modal-header py-2 px-0">
                        <div class="d-flex justify-content-center align-items-center py-0">
                            <svg class="svg-5 me-2" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="M480-40q-33 0-56.5-23.5T400-120q0-33 23.5-56.5T480-200q33 0 56.5 23.5T560-120q0 33-23.5 56.5T480-40ZM240-760q-33 0-56.5-23.5T160-840q0-33 23.5-56.5T240-920q33 0 56.5 23.5T320-840q0 33-23.5 56.5T240-760Zm0 240q-33 0-56.5-23.5T160-600q0-33 23.5-56.5T240-680q33 0 56.5 23.5T320-600q0 33-23.5 56.5T240-520Zm0 240q-33 0-56.5-23.5T160-360q0-33 23.5-56.5T240-440q33 0 56.5 23.5T320-360q0 33-23.5 56.5T240-280Zm480-480q-33 0-56.5-23.5T640-840q0-33 23.5-56.5T720-920q33 0 56.5 23.5T800-840q0 33-23.5 56.5T720-760ZM480-280q-33 0-56.5-23.5T400-360q0-33 23.5-56.5T480-440q33 0 56.5 23.5T560-360q0 33-23.5 56.5T480-280Zm240 0q-33 0-56.5-23.5T640-360q0-33 23.5-56.5T720-440q33 0 56.5 23.5T800-360q0 33-23.5 56.5T720-280Zm0-240q-33 0-56.5-23.5T640-600q0-33 23.5-56.5T720-680q33 0 56.5 23.5T800-600q0 33-23.5 56.5T720-520Zm-240 0q-33 0-56.5-23.5T400-600q0-33 23.5-56.5T480-680q33 0 56.5 23.5T560-600q0 33-23.5 56.5T480-520Zm0-240q-33 0-56.5-23.5T400-840q0-33 23.5-56.5T480-920q33 0 56.5 23.5T560-840q0 33-23.5 56.5T480-760Z"/></svg>
                            <span class="text-hard fw-bold fs-16px">Contacts</span>
                        </div>
                        <div>
                            <button class="btn btn-light btn-sm btn-floating d-lg-none" @click="hideModalHandler()">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                            </button>
                        </div>
                    </div>
                    <div class="modal-body px-0">
                        <ul class="contacts-list list-unstyled">
                            <li 
                            v-for="(item, index) in contacts" :key="index"
                            @click="selectContactHandler(item)"
                            :class="(item.id == contact?.id)?'active':''"
                            class="list-item d-flex justify-content-start align-items-center">
                                <div class="circle-avatar me-2 cursor-pointer" style="width: 40px; height: 40px;min-width:40px;">
                                    <img class="rounded-circle border" alt="avatar1" :src="item.avatar" />
                                </div>
                                <div class="contact-details">
                                    <span class="details-text text-head fs-16px d-block fw-bold">{{ item.full_name }}</span>
                                    <span class="details-text text-soft fs-14px d-block">{{ item.email??item.phone_number??'example@gmail.com' }}</span>
                                </div>
                            </li>
                        </ul>
                        <button v-if="contact" @click="selectContactHandler()" class="btn btn-primary w-100">Add New</button>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="modal-header py-2 px-0">
                        <div class="d-flex justify-content-center align-items-center py-0">
                            <svg class="svg-5 me-2" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M185-80q-17 0-29.5-12.5T143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z"/></svg>
                            <span v-if="contact" class="text-hard fw-bold fs-16px">Edit Contact</span>
                            <span v-if="!contact" class="text-hard fw-bold fs-16px">Add Contact</span>
                            <svg v-if="contact?.is_primary" :class="`ms-2 text-success `" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>
                        </div>                        
                    </div>
                    <div class="modal-body px-0">
                        <div class="mb-3">
                            <label class="form-label-title">Title</label>
                            <input @click="delete errors?.title" v-model="title" type="text" class="form-control">
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.title?.length">{{ errors?.title[0] }}</span>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label class="form-label-title">First name</label>
                                    <input @click="delete errors?.first_name" v-model="first_name" type="text" class="form-control">
                                    <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.first_name?.length">{{ errors?.first_name[0] }}</span>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label class="form-label-title">Last name</label>
                                    <input @click="delete errors?.last_name" v-model="last_name" type="text" class="form-control">
                                    <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.last_name?.length">{{ errors?.last_name[0] }}</span>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-lg-8 mb-3 mb-lg-0">
                                <div class="">
                                    <label class="form-label-title">Phone number</label>
                                    <input 
                                    @click="delete errors?.phone_number"
                                    :class="{'border-error':(errors?.phone_number && !phone_number)}" 
                                    v-model="phone_number" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3 mb-lg-0">
                                <div class="">
                                    <label class="form-label-title">Intended use</label>
                                    <select v-model="phone_use" class="form-control">
                                        <option value=""></option>
                                        <option v-for="(item, index) in intendedUse" :key="index" :selected="phone_use==item" :value="item">{{ item }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-lg-2" v-for="(item, index) in another_phones" :key="index">
                            <div class="col-lg-8 mb-3 mb-lg-0">
                                <div class="">
                                    <label class="form-label-title d-block d-lg-none">Phone number</label>
                                    <input 
                                    @click="delete errors?.phone_number" 
                                    :class="{'border-error':(errors?.phone_number && !item.phone_number)}" 
                                    :value="item.phone_number"
                                    @input="item.phone_number=$event.target.value" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3 mb-lg-0">
                                <div class="">
                                    <label class="form-label-title d-block d-lg-none">Intended use</label>
                                    <select @change="item.phone_use=$event.target.value" class="form-control">
                                        <option value=""></option>
                                        <option v-for="(intended, index) in intendedUse" :key="index" :selected="item.phone_use==intended" :value="intended">{{ intended }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="col-lg-8"><span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.phone_number?.length">{{ errors?.phone_number[0] }}</span></div>
                            <div class="col-lg-4"><div @click="addedAnatherPhoneHandler()" class="fs-14px text-primary cursor-pointer py-1 select-none">Add another phone</div></div>
                        </div>



                        <div class="row">
                            <div class="col-lg-8 mb-3 mb-lg-0">
                                <div class="">
                                    <label class="form-label-title">Email address</label>
                                    <input 
                                    @click="delete errors?.email" 
                                    :class="{'border-error':(errors?.email && !email)}" 
                                    v-model="email" type="email" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3 mb-lg-0">
                                <div class="">
                                    <label class="form-label-title">Intended use</label>
                                    <select v-model="email_use" class="form-control">
                                        <option value=""></option>
                                        <option v-for="(item, index) in intendedUse" :key="index" :selected="email_use==item" :value="item">{{ item }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-lg-2" v-for="(item, index) in another_emails" :key="index">
                            <div class="col-lg-8 mb-3 mb-lg-0">
                                <div class="">
                                    <label class="form-label-title d-block d-lg-none">Email address</label>
                                    <input 
                                    type="email"
                                    @click="delete errors?.email" 
                                    :class="{'border-error':(errors?.email && !item.email)}" 
                                    :value="item.email"
                                    @input="item.email=$event.target.value" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3 mb-lg-0">
                                <div class="">
                                    <label class="form-label-title d-block d-lg-none">Intended use</label>
                                    <select @change="item.email_use=$event.target.value" class="form-control">
                                        <option value=""></option>
                                        <option v-for="(intended, index) in intendedUse" :key="index" :selected="item.email_use==intended" :value="intended">{{ intended }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="col-lg-8"><span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.email?.length">{{ errors?.email[0] }}</span></div>
                            <div class="col-lg-4"><div @click="addedAnatherEmailHandler()" class="fs-14px text-primary cursor-pointer py-1 select-none">Add another email</div></div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label-title">Notes <span class="text-soft fs-12px ms-1">(Optional)</span></label>
                            <textarea @click="delete errors?.notes" v-model="notes" type="text" class="form-control" rows="3"></textarea>
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.notes?.length">{{ errors?.notes[0] }}</span>
                        </div>
                        <div class="mb-3" v-if="searchContacts.length">
                            <label class="form-label-title">Existing Contacts</label>
                            <div class="">
                                <ul class="list-unstyled mb-0 search-contacts">
                                    <li @click="createLeadContactHandler(item)" v-for="(item, index) in searchContacts" :key="index" class="list-item cursor-pointer" style="line-height: 18px;">
                                        <span class="d-block fs-14px text-head fw-bold">
                                            {{ item.title }} <span v-if="item.title && item.full_name"> - </span> {{ item.full_name }}
                                        </span>
                                        <span class="d-block fs-12px text-soft">
                                            {{ item.phone_number }} <span v-if="item.email && item.phone_number"> - </span> {{ item.email }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center pt-2">
                            <button @click="hideModalHandler()" class="btn btn-danger btn-sm">Close</button>
                            <button :disabled="isSubmitCreateNewContact" @click="createLeadContactHandler()" type="submit" class="btn btn-primary btn-sm px-3 d-flex justify-content-center align-items-center">
                                <div v-if="isSubmitCreateNewContact">
                                    <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                        <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                    </svg>
                                    <span>Submitting...</span>
                                </div>
                                <span v-if="!isSubmitCreateNewContact">Save Change</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<style lang="scss" scoped>
    .search-contacts{
        .list-item{
            padding:6px 15px;
            background-color: #ffffff;
            transition: all 0.3s ease-in-out;
            border-radius:3px;
            &:hover{
                background-color: #f0f3f6;
            }
        }
    }
    .border-error{
        border-color:rgb(220 76 100);
    }
    .bg-col-left{
        background-color: #f5f7fa;
    }
    .contacts-list{
        .list-item{
            padding:8px 5px;
            border-radius:5px;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            margin-bottom:8px;
            border-left:3px solid transparent;
            background: #ffffff;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
            &:hover,
            &.active{
                border-left-color: #3b71ca;
            }
            .contact-details{
                line-height:18px;
                overflow: hidden;
                .details-text{
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
</style>