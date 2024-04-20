<script>

import SearchBar from '../../../../components/SearchBar.vue';
import ActionBar from '../../../../components/ActionBar/ActionBar.vue';
import LeftActionBar from '../../../../components/ActionBar/LeftActionBar.vue';
import RightActionBar from '../../../../components/ActionBar/RightActionBar.vue';
import LeadQualifyModal from './components/LeadQualifyModal.vue';

import CustomScrollbar from 'custom-vue-scrollbar';

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { Skeletor } from 'vue-skeletor';
import DropdownOwnerList from './components/DropdownOwnerList.vue';
import {icons} from '../../../../asset/svgicon.js';
import {
    FetchLeads,
    FetchLeadPipelineWithStage,
    UpdateMultipelLeadStatus,
    UpdateMultipelLeadOwner,
} from '../../../../actions/LeadAction';

export default {
  components: {
    SearchBar,
    ActionBar,
    LeftActionBar,
    RightActionBar,
    CustomScrollbar,
    QuillEditor,
    LeadQualifyModal,
    Skeletor,
    DropdownOwnerList,
},
  data() {
    return {
        fetch:"lead_properties,lead_sources,owners,pipelines",
        icons:{},
        findLead:null,
        nextLead:null,
        prevLead:null,
        leadStatus:[],
        leadSources:[],
        leadProperties:[],
        pipelines:[],
        owners:[],
        owner:null,
        currentOwner:null,
        isLoading:false,
        isFirstLoading:false,
    }
  },
  watch:{
    "$route"(){
        this.findLeadByIdHandler();
    }
  },
  methods: {
    selectAll(){
      if(this.selectAllIds.length > 0){
        this.selectAllIds = [];
      }else{
        this.selectAllIds = Array.from(Array(100).keys());
      }
    },

    toggleRightSidebarDropdownBox(e){
        e.stopPropagation();
        var dropdownHeader = e.target.closest('.dropdown-header');
        if(dropdownHeader){
            var dropdownBody = dropdownHeader.nextElementSibling;
            if(dropdownBody){
                var height = dropdownBody.scrollHeight;
                if(getComputedStyle(dropdownBody).height == '0px'){
                    dropdownHeader.classList.add('show');
                    dropdownBody.style.height = `${height}px`;
                }else{
                    dropdownHeader.classList.remove('show');
                    dropdownBody.style.height = `${height}px`;
                    this.$nextTick(()=>{
                        setTimeout(()=>{
                            dropdownBody.style.height = '0px';
                        }, 300);
                    })
                }
            }
        }
    },
    async findLeadByIdHandler(fetch=""){
        try{
            this.isLoading = true;
            var fetchArr = fetch.split(',');
            var leadId = this.$route.params?.id??'';
            var payload = {
                lead_id:leadId,
            };
            if(fetch != ""){
                payload['fetch'] = fetch;
            }
            const res = await FetchLeads(payload);
            // await new Promise((e)=>setTimeout(e, 5000));
            try{
                const {lead, next_lead, prev_lead, lead_properties, pipelines, owners, lead_sources} = res;
                this.isFirstLoading = false;
                this.findLead = lead;

                this.nextLead = next_lead;
                this.prevLead = prev_lead;

                if(this.findLead){
                    if(this.findLead?.owner){
                        this.owner = this.findLead.owner;
                        this.currentOwner = this.owner;
                    }
                }
                if(fetchArr.includes('lead_properties')){
                    this.leadProperties = lead_properties;
                }
                if(fetchArr.includes('owners')){
                    this.owners = owners;
                }
                if(fetchArr.includes('pipelines')){
                    this.pipelines = pipelines;
                }
                if(fetchArr.includes('lead_sources')){
                    this.leadSources = lead_sources;
                }
            }catch(error){
                throw new Error(error.message);
            }
        }catch(error){
            try{
                var message = error.response.data.message;
                this.$toast[message.type](message.text);
            }catch(e){
                this.$toast.error('Oops, something went wrong');
            }
        }finally{
            this.isFirstLoading = false;
            this.isLoading = false;
        }
    },
    async updateLeadStatusHandler(status){
        try{
            if(this.findLead?.status && this.findLead?.status?.id == atob(status.id)){
                return;
            }
            var data = {
                leads:[this.findLead.id],
                status:status.id,
            };
            const res = await UpdateMultipelLeadStatus(data);
            this.findLead['status'] = {...status};

        }catch(error){
            console.log(error);
            try{
                var message = error.response.data.message;
                this.$toast[message.type](message.text);
            }catch(e){
                this.$toast.error('Oops, something went wrong');
            }
        }
    },
    async updateLeadOwnerHandler(owner=null){
        try{
            var data = {
                owner:owner?.id,
                leads:[this.findLead?.id],
            };
            const res = await UpdateMultipelLeadOwner(data);
            this.owner = this.currentOwner = owner;
            this.findLead['owner'] = owner;
        }catch(error){
            try{
                var message = error.response.data.message;
                this.$toast[message.type](message.text);
            }catch(e){
                this.$toast.error('Oops, something went wrong');
            }
        }
    },
  },
  mounted() {
        this.icons = icons;
        this.isFirstLoading = true;
        this.findLeadByIdHandler(this.fetch);
        const {lead_statuses} = this.$cookies.get(import.meta.env.VITE_AUTH_APP);
        this.leadStatus = lead_statuses;
    },
}
</script>

<template>
  <section class="content lead-edit">

    <search-bar></search-bar>

    <action-bar>

        <left-action-bar style="flex-grow: 1;">
            <div class="ms-3 d-flex flex-row justify-content-start align-items-center left-hover-action" style="flex-grow: 1;">
                <div class="d-flex flex-row justify-content-start align-items-center cursor-pointer select-none">
                    <Skeletor  v-if="isFirstLoading" width="250px" />
                    <h5 v-if="!isFirstLoading" class="text-head mb-0 fs-16px fw-bold lead-title-text">{{ findLead?.lead_title??findLead?.contact?.full_name }}</h5>
                    <button class="hover-effice toolbar-btn btn btn-light btn-sm btn-floating me-2" style="margin-left: 14px;">
                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                    </button>
                    <button class="hover-effice toolbar-btn btn btn-light btn-sm btn-floating me-3">
                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                    </button>
                </div>
            </div>
        </left-action-bar>

        <right-action-bar>

            <div v-if="isLoading" class="me-3">
                <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                    <circle style="stroke: rgb(59, 113, 202);" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
            </div>

            <router-link :to="`${prevLead?`/platform/leads/${prevLead}`:''}`">
                <button v-tippy='{ content:"Prev Lead", placement : "top" }' class="toolbar-btn btn btn-light btn-sm btn-floating me-3" :disabled="!prevLead">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"></path></svg>
                </button>
                </router-link>
            <router-link :to="`${nextLead?`/platform/leads/${nextLead}`:''}`">
                <button v-tippy='{ content:"Next Lead", placement : "top" }' class="toolbar-btn btn btn-light btn-sm btn-floating me-3"  :disabled="!nextLead">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg>
                </button>
            </router-link>

            <button 
            @click="$refs['leadQualifyModalRef'].showModalHandler()"
            class="btn btn-sm btn-primary fw-bold me-3">
                <svg class="me-1" xmlns="http://www.w3.org/2000/svg" height="24" fill="currentColor" viewBox="0 -960 960 960" width="24"><path d="M707-485 581-612l51-51 75 74 160-159 52 52-212 211Zm-352-2q-71.462 0-116.231-44.769Q194-576.537 194-648t44.769-116.231Q283.538-809 355-809q71.462 0 116.231 44.769Q516-719.463 516-648t-44.769 116.231Q426.462-487 355-487ZM20-130v-109q0-39.113 18.594-69.548Q57.187-338.982 92-354q77-35 138.292-49 61.293-14 124.5-14Q418-417 479-403t138 49q34.812 16.018 53.906 45.952Q690-278.113 690-239v109H20Zm73-73h524v-36q0-16-7.825-29.674T588-288q-72-33-123.5-44.5T355-344q-58 0-110 11.5T122-288q-13.8 5.652-21.4 19.326Q93-255 93-239v36Zm262-357q38 0 63-25t25-63q0-38-25-63t-63-25q-38 0-63 25t-25 63q0 38 25 63t63 25Zm0 286Zm0-374Z"/></svg>
                Qualify
            </button>
            <lead-qualify-modal 
            :leadStatus="leadStatus"
            :pipelines="pipelines"
            :owners="owners"
            :owner="owner"
            ref="leadQualifyModalRef" />

            <!-- lead status -->
            <Skeletor class="me-3"  v-if="isFirstLoading" style="width:150px;height:32px;border-radius:3px;" />
            <div v-if="!isFirstLoading" v-tippy='{ content:"Change Lead Status", placement : "top" }'
            class="dropdown me-3">
                <button style="min-width:150px;max-width:150px;" type="button" 
                class="btn btn-sm btn-outline-secondary fw-400 d-flex justify-content-between align-items-center curtom-dropdown-toggler-btn" 
                data-mdb-toggle="dropdown" 
                aria-expanded="false">
                    <span class="fw-bold text-fs tbl-dropdown-title text-overflow-ellipsis text-head" style="white-space: nowrap;">{{ findLead?.status?.name??'Lead Status' }}</span>
                    <div class="dropdown--icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                    </div>
                </button>
                <div class="dropdown-menu dropdown-menu-end shadow-md multiple-lead-status-dropdown" aria-labelledby="dropdownMenuButton">
                    <span
                    style="width:170px;"
                    v-for="(status, index) in leadStatus"
                    :key="index" 
                    @click="updateLeadStatusHandler(status)"
                    :class="`${status.name == findLead?.status?.name?'selected':''}`"
                    class="dropdown-item d-flex justify-content-between align-items-center cursor-pointer py-1">
                        <span class="text-overflow-ellipsis text-head">{{ status.name }}</span>
                        <svg v-if="status.is_lost" class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                    </span>
                </div>
            </div>


            <div class="settings-group-item owner-list-dropdown me-3">
                <button class="owner-dropdown-toggler" data-mdb-toggle="dropdown" aria-expanded="false">
                    <div class="icon">
                        <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&d=mm&r=PG" alt="">
                    </div>
                </button>
                <div class="dropdown-menu dropdown-menu-end" @click="(e)=>{e.stopPropagation()}">
                    <!---->
                    <div>
                        <div class="dropdown-body">

                            <div class="dropdown-input">
                                <input type="text" placeholder="Filter for team members" class="project-owner-filter form-control" />
                            </div>

                            <div class="dropdown-header">
                                Owner
                            </div>

                            <div class="dropdown-item noselect">
                                <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="No Owner's avatar" class="project-owner__profile-photo" />
                                <span class="fs-14px fw-bold">
                                    No Owner
                                    <div class="project-owner-email text-muted fs-12px"></div>
                                </span>
                            </div>

                            <CustomScrollbar class="project-owner-team-members" style="height:20rem;">
                                <div class="dropdown-header">
                                    Change owner
                                </div>
                                
                                <div v-for="(item, index) in 10" :key="index" class="dropdown-item">
                                    <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                    <span class="username fs-14px text-overflow-ellipsis">
                                        Susmita Chowdhury
                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                            admin@electrifyingaustralia.com.au
                                        </div>
                                    </span>
                                </div>
                            </CustomScrollbar>
                        </div>
                    </div>
                </div>
            </div>

            <div         
            class="settings-group-item owner-list-dropdown me-3 position-relative">
                <button class="owner-dropdown-toggler" data-mdb-toggle="dropdown" aria-expanded="false" v-tippy='{ content:"Change Owner", placement : "top" }'>
                    <div class="icon">
                        <img v-if="owner" :src="owner?.profile_avatar" alt="">
                        <img v-if="!owner" :src="icons?.avatar" alt="">
                    </div>
                </button>
                <DropdownOwnerList
                :owner="owner"
                :owners="owners"
                :selectOwnerHandler="(item)=>updateLeadOwnerHandler(item)"
                />
            </div>


            <button class="toolbar-btn btn btn-light btn-sm btn-floating me-3">
                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"></path></svg>
            </button>

            <button class="toolbar-btn btn btn-light btn-sm btn-floating me-3">
                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px"><path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M6.41,21L5,19.59l4.83-4.83c0.75-0.75,1.17-1.77,1.17-2.83v-5.1L9.41,8.41L8,7l4-4l4,4l-1.41,1.41L13,6.83v5.1 c0,1.06,0.42,2.08,1.17,2.83L19,19.59L17.59,21L12,15.41L6.41,21z"></path></svg>
            </button>
            <button class="toolbar-btn btn btn-light btn-sm btn-floating me-3">
                <svg class="svg-5" height="20px" viewBox="0 0 24 24" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
            </button>
            
        </right-action-bar>

    </action-bar>

    <!-- <section class="h-100">
        <div class="col-area">
            <div class="col-left">
                <CustomScrollbar>
                    <div class="history-area">
                        <div class="text-center mb-1 mt-2">
                            <span class="text-soft">No older activity to display.</span>
                        </div>
                        <div class="history-row" v-for="(item, index) in 20" :key="index">

                            <div class="text-center mb-1 mt-2 feed-updated-date">
                                <span class="text-head updated-date"> {{ item%2 == 0?"Mon":"Sun" }} Nov, {{ Math.floor((Math.random()*100)+1) }} 2024</span>
                            </div>

                            <div class="lead-feed-row d-flex justify-content-between">
                                <div class="left-feed-col">
                                    <span class="fs-12px text-soft">You created the lead</span>
                                </div>
                                <div class="right-feed-col">
                                    <span class="feed-time fs-12px text-head">16:26 am</span>
                                </div>
                            </div>

                            <div class="lead-feed-row d-flex justify-content-between">
                                <div class="left-feed-col">
                                    <span class="fs-12px text-soft">You updated the deal's quarter bill amount, appointment date time</span>
                                </div>
                                <div class="right-feed-col">
                                    <span class="feed-time fs-12px text-head">16:26 am</span>
                                </div>
                            </div>

                            <div class="lead-feed-row d-flex justify-content-between">
                                <div class="left-feed-col">
                                    <span class="fs-12px text-soft">You updated the deal's notes</span>
                                </div>
                                <div class="right-feed-col">
                                    <span class="feed-time fs-12px text-head">16:26 am</span>
                                </div>
                            </div>

                            <div class="lead-feed-row d-flex justify-content-between">
                                <div class="left-feed-col">
                                    <span class="fs-12px text-soft">
                                        You converted the deal from <a class="feed-badge" href="">New</a> to <a class="feed-badge" href="">Newly qualified</a>
                                    </span>
                                </div>
                                <div class="right-feed-col">
                                    <span class="feed-time fs-12px text-head">16:26 am</span>
                                </div>
                            </div>

                            <div class="lead-feed-row d-flex justify-content-between py-1">
                                <div class="left-feed-col d-flex">
                                    <div class="me-2">
                                        <div class="circle-avatar">
                                            <img :src="`https://ui-avatars.com/api/?background=random&name=Bijoy+Chowdhury&bold=true&id=${Math.random()}`" alt="">
                                        </div>
                                    </div>
                                    <div class="">
                                        <span class="fs-14px fw-bold text-head">Bijoy Chowdhury <a class="feed-badge" href="">Screenshot_89.png</a> </span>
                                        <div class="fs-14px fw-bold">CALLED NO ANSWER, WILL TRY AAGAIN LATER</div>
                                    </div>
                                </div>
                                <div class="right-feed-col">
                                    <span class="feed-time fs-12px text-head">16:26 am</span>
                                </div>
                            </div>

                            <div class="lead-feed-row d-flex justify-content-between py-1">
                                <div class="left-feed-col d-flex">
                                    <div class="me-2">
                                        <div class="circle-avatar">
                                            <img :src="`https://ui-avatars.com/api/?background=random&name=Bijoy+Chowdhury&bold=true&id=${Math.random()}`" alt="">
                                        </div>
                                    </div>
                                    <div class="">
                                        <span class="fs-14px fw-bold text-head">Bijoy Chowdhury</span>
                                        <div>
                                            <a class="feed-badge fw-bold" href="">@Ali Hosan</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-feed-col">
                                    <span class="feed-time fs-12px text-head">16:26 am</span>
                                </div>
                            </div>

                            <div class="lead-feed-row d-flex justify-content-between py-1">
                                <div class="left-feed-col d-flex">
                                    <div class="me-2">
                                        <div class="circle-avatar">
                                            <img :src="`https://ui-avatars.com/api/?background=random&name=Bijoy+Chowdhury&bold=true&id=${Math.random()}`" alt="">
                                        </div>
                                    </div>
                                    <div class="">
                                        <span class="fs-14px fw-bold text-head">Bijoy Chowdhury</span>
                                        <div class="fs-14px fw-bold">
                                            <div>
                                                <strong>11/20/2023&nbsp;</strong>
                                            </div>
                                            <div>
                                                <strong>11:52:49</strong>
                                            </div>
                                            <div>
                                                <strong>Physical Appointment</strong>
                                            </div>
                                            <div>
                                                <strong>Ms Fennelly	</strong>
                                            </div>
                                            <div>
                                                <strong>61296044092</strong>
                                            </div>
                                            <div>
                                                <strong>11 Stromlo St 	Bossley Park 	NSW 	2176	</strong>
                                            </div>
                                            <div>
                                                <strong>83	</strong>
                                            </div>
                                            <div>
                                                <strong>$300</strong>
                                            </div>
                                            <div>
                                                <strong>Ms.Fennelly is the property owner and the decision-maker. She paid $300 for her last bill, and before that, she paid $400 per quarter. Now she is willing to go for a solar system at a good price.&nbsp;So she needs someone to give her a visit and explain her in detail.She has a fresh roof.	</strong>
                                            </div>
                                            <div>
                                                <strong>http://154.26.153.172/RECORDINGS/MP3/20231120-151925_61296044092-all.mp3 / http://154.26.153.172/RECORDINGS/MP3/20231120-151925_61296044092-all.mp3 	</strong>
                                            </div>
                                            <div>
                                                <strong>Eric Logan	</strong>
                                            </div>
                                            <div>
                                                <strong>21-11-2023	</strong>
                                            </div>
                                            <div>
                                                <strong>12:00:00 PM</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-feed-col">
                                    <span class="feed-time fs-12px text-head">16:26 am</span>
                                </div>
                            </div>


                        </div>
                    </div>
                </CustomScrollbar>
                <div class="message-box">
                    <div class="tab-area border h-100 rounded">
                        <div class="tab-menu px-2">
                            <ul class="nav nav-tabs mb-3" id="myTab0" role="tablist">
                                <li class="nav-item" role="presentation">
                                  <button class="nav-link fs-14px py-2 fw-bold text-capitalize active">Comment</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <button class="nav-link fs-14px fw-bold text-capitalize py-2">Send email</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <button class="nav-link fs-14px fw-bold text-capitalize py-2">Send SMS</button>
                                </li>
                              </ul>
                        </div>
                        <div class="tab-content">

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-right">
                <CustomScrollbar>
                    <div class="col-r-header d-flex justify-content-between align-items-center border-bottom">
                        <div class="left ps-3 py-1 d-flex justify-content-start align-items-center">
                            <div class="circle-avatar shadow-border">
                                <img class="rounded-circle" alt="avatar1" :src="`https://ui-avatars.com/api/?background=random&name=Sourov+Pal&bold=true&id=${Math.random()}`" />
                            </div>
                        </div>
                        <div class="right pe-3 py-1 d-flex justify-content-end align-items-center">
                            <button v-tippy='{ content:"Add a contact", placement : "top" }' class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                <svg class="svg-3" height="24" fill="currentcolor" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div class="personal-info px-3 py-3 border-bottom">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h3 class="user-name fs-18px fw-bold text-head mb-0">Mae Adams</h3>
                            <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                <svg class="svg-3" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                            </button>
                        </div>
                        <div class="">
                            <table class="tbl-contact-info">
                                <tr>
                                    <td class="fs-16px" width="10%">
                                        <svg class="svg-5" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>
                                    </td>
                                    <td class="fs-16px"><a class="d-block text-primary user-email" href="">sourovpal35@gmail.com</a></td>
                                    <td class="hover" width="20%">
                                        <div class="d-flex justify-content-end align-items-center">
                                            <button class="btn btn-sm btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                                            </button>
                                            <button class="btn btn-sm btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="fs-16px" width="10%">
                                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path></svg>
                                    </td>
                                    <td class="fs-16px"><a class="d-block text-primary user-phone" href="">+88 01919-852044</a></td>
                                    <td class="hover" width="20%">
                                        <div class="d-flex justify-content-end align-items-center">
                                            <button class="btn btn-sm btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                                            </button>
                                            <button class="btn btn-sm btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div> 


                    <div>
                        <div class="dropdown-box border-bottom">
                            <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center">
                                <span class="fw-bold fs-14px text-uppercase text-head d-block">Pinned activity</span>
                                <div class="">
                                    <button 
                                    class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
                                    @click="toggleRightSidebarDropdownBox"
                                    >
                                        <svg class="svg-3" height="18px" viewBox="0 0 24 24" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                                    </button>
                                </div>
                            </div>

                            <div class="dropdown-body" style="height:0px;">
                                <div class=" px-3 py-1 pb-2">
                                    <span class="text-head fs-14px">Nothing pinned</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 border-bottom">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <div class="fs-14px fw-bold text-head mb-0 text-uppercase">lead Properties</div>
                            <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                <svg class="svg-3" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </button>
                        </div>
                        <div class="mb-1">
                            <div class="fs-12px text-soft mb-0">Address</div>
                            <div class="d-flex">
                                <div class="fs-14px fw-bold text-head mb-0">78 Wirrinda Road, Somersby New South Wales 2250</div>
                                <a href="" class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent ms-auto">
                                    <svg class="svg-3" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
                                </a>
                            </div>
                        </div>
                        <div class="mb-1">
                            <div class="fs-12px text-soft mb-0">Value</div>
                            <div class="d-flex">
                                <div class="fs-14px fw-bold text-head mb-0">$10,245.00</div>
                            </div>
                        </div>
                        <div class="mb-1">
                            <div class="fs-12px text-soft mb-0">Source</div>
                            <div class="d-flex">
                                <div class="fs-14px fw-bold text-head mb-0">-</div>
                            </div>
                        </div>

                        <div class="mb-1">
                            <div class="fs-12px text-soft mb-0">Confidence</div>
                            <div class="d-flex">
                                <div class="fs-22px fw-bold text-head mb-0">
                                    *****
                                </div>
                            </div>
                        </div>

                        <form action="">
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Call Center Agent Name</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Recording Link</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Quarter Bill Amount</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Appointment Date & Time</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Level of the House</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Supply Phase</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Cash/Finance</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Electricity Retailer</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Electricity Distributor</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Panel Name & Number</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Inverter Brand & Size</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">System Size</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Battery Brand & Size</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Types of Roof</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">NMI Number</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Optimizer</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Export Limit Device</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Extras</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Power phases </div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Roof material</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Number of storeys </div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Energy distributor </div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Unsolicited contact </div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
                        </form>
                    </div>
                    
                    <div class="">
                        <div class="dropdown-box border-bottom">
                            <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center">
                                <span class="fw-bold fs-14px text-uppercase text-head d-block">Tasks</span>
                                <div class="">
                                    <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent" @click="toggleRightSidebarDropdownBox">
                                        <svg class="svg-3" height="18px" viewBox="0 0 24 24" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div class="dropdown-body" style="height:0px;">
                                <div class=" px-3 py-1 pb-2 fs-12px">
                                    <div class="lead-files">
                                        <div class="empty-state">
                                            <div class="icon icon--36">
                                                <svg data-v-562e52ff="" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="currentColor"><path data-v-562e52ff="" d="M0 0h24v24H0V0z" fill="none"></path><path data-v-562e52ff="" d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"></path></svg>
                                            </div> 
                                            <div class="empty-state__body">
                                                <strong>Start a new project</strong>
                                                <br>
                                                or link with an existing project
                                            </div>
                                            <button class="btn btn-sm btn-primary">Add Project</button>
                                        </div> 
                                        <input accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg" type="file" multiple="multiple" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-box border-bottom">
                            <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center">
                                <span class="fw-bold fs-14px text-uppercase text-head d-block">Tags</span>
                                <div class="">
                                    <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent" @click="toggleRightSidebarDropdownBox">
                                        <svg class="svg-3" height="18px" viewBox="0 0 24 24" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div class="dropdown-body" style="height: 0px;">
                                <div class=" px-3 py-1 pb-2 fs-12px">
                                    <div class="lead-files">
                                        <div class="empty-state">
                                            <div class="icon icon--36">
                                                <svg data-v-562e52ff="" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="currentColor"><path data-v-562e52ff="" d="M0 0h24v24H0V0z" fill="none"></path><path data-v-562e52ff="" d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"></path></svg>
                                            </div> 
                                            <div class="empty-state__body">
                                                <strong>Start a new project</strong>
                                                <br>
                                                or link with an existing project
                                            </div>
                                            <button class="btn btn-sm btn-primary">Add Project</button>
                                        </div> 
                                        <input accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg" type="file" multiple="multiple" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-box border-bottom">
                            <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center show">
                                <span class="fw-bold fs-14px text-uppercase text-head d-block">Project Designs</span>
                                <div class="">
                                    <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent" @click="toggleRightSidebarDropdownBox">
                                        <svg class="svg-3" height="18px" viewBox="0 0 24 24" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div class="dropdown-body">
                                <div class=" px-3 py-1 pb-2 fs-12px">
                                    <div class="lead-files">
                                        <div class="empty-state">
                                            <div class="icon icon--36">
                                                <svg data-v-562e52ff="" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="currentColor"><path data-v-562e52ff="" d="M0 0h24v24H0V0z" fill="none"></path><path data-v-562e52ff="" d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z"></path></svg>
                                            </div> 
                                            <div class="empty-state__body">
                                                <strong>Start a new project</strong>
                                                <br>
                                                or link with an existing project
                                            </div>
                                            <button class="btn btn-sm btn-primary">Add Project</button>
                                        </div> 
                                        <input accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg" type="file" multiple="multiple" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-box border-bottom">
                            <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center show">
                                <span class="fw-bold fs-14px text-uppercase text-head d-block">Notes</span>
                                <div class="">
                                    <button 
                                    class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
                                    @click="toggleRightSidebarDropdownBox"
                                    >
                                        <svg class="svg-3" height="18px" viewBox="0 0 24 24" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div class="dropdown-body">
                                <div class=" px-3 py-1 pb-2 fs-12px lead-timeline-notes">
                                    <QuillEditor theme="snow"  :toolbar="[]" />
                                    <div class="save-notes-btn">
                                        <button class="btn btn-sm btn-outline-primary">Save Notes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown-box border-bottom">
                            <div class="dropdown-header py-2 px-3 d-flex justify-content-between align-items-center show">
                                <span class="fw-bold fs-14px text-uppercase text-head d-block">Uploaded files</span>
                                <div class="">
                                    <button 
                                    class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent"
                                    @click="toggleRightSidebarDropdownBox"
                                    >
                                        <svg class="svg-3" height="18px" viewBox="0 0 24 24" width="18px" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div class="dropdown-body" style="height:100%;">
                                <div class=" px-3 py-1 pb-2 fs-12px">
                                    <div class="lead-files">
                                        <div class="empty-state">
                                            <div class="icon icon--36">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>
                                            </div> 
                                            <div class="empty-state__body">
                                                Attach files to store power bills,
                                                <br>
                                                site photos, and other information.
                                                <button class="btn-text">Browse files</button>
                                            </div>
                                        </div> 
                                        <input accept=".xlsx,.xls,.csv,.png,.jpeg,.jpg,.pdf,.doc,.docx,.pages,.svg" type="file" multiple="multiple" style="display: none;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="height:10rem;"></div>
                    </div>
                </CustomScrollbar>
            </div>
        </div>
    </section> -->

    
  </section>

<!-- ============================ -->

</template>

<style scoped lang="scss">
    .lead-title-text{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width:280px;
    }
    .col-area{
        display:flex;
        height: 100%;
    }
    .col-left{
        flex-grow: 1;
        border-right: 1px solid #dddddd;
        width: calc(100% - 24rem);
        position: relative;
        .message-box{
            position: absolute;
            width: 100%;
            min-height: 12rem;
            bottom: 105px;
            padding: 1rem;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            .tab-area{
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                border-color: #007ee5 !important;
                position: relative;
                flex-grow: 1;
            }
        }
    }
    .col-right{
        flex-grow: 1;
        width: 24rem;
        background-color: #f5f7fa;
        .dropdown-box{
            .dropdown-header{
                &.show{
                    button{
                        transform:rotate(-180deg);
                    }
                }
                button{
                    transition: transform 0.3s ease-in-out;
                }
            }
            .dropdown-body{
                overflow: hidden;
                transition: height 0.3s ease-in-out;
                position: relative;

                .lead-files{
                    .empty-state{
                        -webkit-box-align: center;
                        align-items: center;
                        background-color: #e5f4ff;
                        border: 2px solid #b3ddff;
                        -webkit-border-radius: .25rem;
                        border-radius: .25rem;
                        color: #0062b3;
                        display: flex;
                        flex-direction: column;
                        font-size: .875rem;
                        gap: .25rem;
                        justify-content: center;
                        line-height: 1.25;
                        min-height: 9.25rem;
                        padding: 1rem;
                        text-align: center;
                        user-select: none;
                        width: 100%;
                        .btn-text {
                            background: transparent;
                            border: 0;
                            color: #007ee5;
                            padding: 0;
                            text-decoration: underline;
                        }
                    }
                }


                .save-notes-btn{
                    position: absolute;
                    bottom: 18px;
                    right: 25px;
                    z-index: 999999;
                    button{
                        font-weight: bold;
                        padding: 3px 6px;
                        background-color: #fff3c4 !important;
                    }
                }
            }
        }
    }
    .left-hover-action{
        .hover-effice{
            opacity: 0;
            transition:opacity 0.3s ease-in-out;
            cursor: pointer;
        }
        &:hover{
            .hover-effice{
                opacity: 1;
            }
        }
    }
    .circle-avatar{
        background-color:transparent;
        width:32px;
        height: 32px;
        border-radius:50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &.shadow-border::before{
            position: absolute;
            content: "";
            width: 35px;
            height: 2px;
            background-color: #0275d8;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
        }
        &,
        & > *{
            font-size:16px;
            font-weight: bold;
            color:#ffffff;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        & > img{
            width:100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }
    .personal-info{
        .user-name{
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .tbl-contact-info{
        tr{
            td.hover{
                opacity:0;
                transition:opacity 0.3s ease-in-out;
            }
            td{
                a.user-email,
                a.user-phone{
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 250px;
                }
            }
        }
        tr:hover{
            td.hover{
                opacity:1;
            }
        }
    }
    .history-area{
        .feed-updated-date{
            position: sticky;
            top:2px;
            .updated-date{
                background: #f5f7fa;
                border: 1px solid #e4e7eb;
                -webkit-border-radius: .75rem;
                border-radius: .75rem;
                font-size: .8125rem;
                font-weight: 600;
                padding: .125rem .5rem;
                pointer-events: all;
            }
        }
        .lead-feed-row{
            margin-bottom:3px;
            &:hover{
                background-color: whitesmoke;
            }
            .feed-badge{
                background-color: #e5f4ff;
                -webkit-border-radius: .25rem;
                border-radius: .25rem;
                padding: .125rem .375rem;
                transition: background-color .2s ease,color .2s ease;
                will-change: background-color;
                color:#0275d8;
                margin:0px 5px;
                letter-spacing: 0.5px;
                font-size: 12px;
                &:hover{
                    color:#003299;
                    background-color: #b3ddff;
                }
            }
            .left-feed-col{
                padding:0px 0px 0px 14px;
                width:calc(100% - 6rem);
            }
            .right-feed-col{
                padding:0px 14px 0px 0px;
                width: 6rem;
                text-align: right;
                .feed-time{
                    
                }
            }
        }
    }
    .owner-dropdown-toggler{
        cursor: pointer;
        width: auto!important;
        border:none;
        outline: none;
        padding:3px 25px 3px 0px;
        background-color: transparent;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before{
            content: '';
            position: absolute;
            right:5px;
            top:45%;
            transform: translateY(-50%) rotate(45deg);
            border:0.25rem solid transparent;
            border-bottom-color: rgb(164, 164, 164);
            border-right-color: rgb(164, 164, 164);
        }
        .icon{
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                border-radius: 50%;
                width:100%;
                height:100%;

            }
        }
    }
    .owner-list-dropdown{
        .dropdown-menu{
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
            &::before{
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
            &::after{
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
                &::before{
                    left:30px;
                    right:auto !important;
                }
            }
            .dropdown-header{
                font-size: .75rem;
                padding: 0 0.5rem;
                font-weight: 700;
                line-height: 1.5rem;
                margin-bottom: 0;
                padding-top: 0.5rem;
            }
            .dropdown-item.noselect{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-right: 10px;
                user-select: none;
                border-bottom: 1px solid #dddddd;
                img{
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    margin-right:10px;
                }
                span{
                    display: inline-block;
                    line-height: 18px;
                }
            }
            .project-owner-team-members{
                max-width:19rem;
                max-height:350px;
                .dropdown-item{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: pointer;
                    user-select: none;
                    img{
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 50%;
                        margin-right:10px;
                    }
                    span{
                        display: inline-block;
                        line-height: 18px;
                    }
                }
            }
        }
        .dropdown-body{
            .dropdown-input{
                .project-owner-filter{
                    background: #f5f7fa;
                    font-size: .875rem;
                    padding: 0.5rem 1rem;
                    border: 0;
                    width: 100%;
                }
            }
        }
    }
    .curtom-dropdown-toggler-btn{
        border: 1px solid rgba(0, 0, 0, 0.09);
        &:hover{
            background-color: #f7f7f9 !important;
            border: 1px solid #007ee5 !important;
            box-shadow: 0 1px 3px rgba(0, 126, 229, 0.34) !important;
        }
    }
    .multiple-lead-status-dropdown{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius:3px;
        ::after {
            content: "";
            position: absolute;
            top: -6px;
            right: 20px;
            border: 7px solid white;
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;
        }
    }
</style>
<style>
    .lead-timeline-notes .ql-container.ql-snow{
        border: none !important; 
        height: 10rem !important;
        background-color: #fff3c4 !important;
        color:#8d2b0b !important;
        font-weight: 600 !important;
        font-size: 14px !important;
    }
    .lead-timeline-notes .ql-toolbar.ql-snow{
        display: none !important;
    }
    .lead-edit .col-left .scrollbar__wrapper{
        height: calc(100% - 18.5rem);
    }
    .lead-edit .col-left .scrollbar__scroller{
        height: 100%;
    }
    .lead-edit .col-left .scrollbar__thumbPlaceholder{
        width:6px !important;
    }
    .lead-edit .col-right .scrollbar__wrapper{
        height: calc(100%);
    }
    .lead-edit .col-right .scrollbar__scroller{
        height: 100%;
    }
    .lead-edit .col-right .scrollbar__thumbPlaceholder{
        width:6px !important;
    }
</style>