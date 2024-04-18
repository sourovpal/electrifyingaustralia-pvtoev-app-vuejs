<script>

import {icons} from '../../../../asset/svgicon.js';
import SearchBar from '../../../../components/SearchBar.vue';
import ActionBar from '../../../../components/ActionBar/ActionBar.vue';
import LeftActionBar from '../../../../components/ActionBar/LeftActionBar.vue';
import RightActionBar from '../../../../components/ActionBar/RightActionBar.vue';
import Datatable from '../../../../components/Datatable/Datatable.vue';
import DatatableHeader from '../../../../components/Datatable/DatatableHeader.vue';
import DatatableBody from '../../../../components/Datatable/DatatableBody.vue';
import HeaderPropertiesDropdown from './components/HeaderPropertiesDropdown.vue';
import FilterRightSidebar from './components/FilterRightSidebar.vue';
import DataTableSkeletor from './components/DataTableSkeletor.vue';
import DataNotFound from './components/DataNotFound.vue';
import AddNewLeadModal from './components/AddNewLeadModal.vue';
import DeleteMultipleLeadWarningModal from './components/DeleteMultipleLeadWarningModal.vue';
import DropdownOwnerList from './components/DropdownOwnerList.vue';

import {
    FetchLeads, 
    UpdateLeadPropertieHeaders, 
    UpdateMultipelLeadStatus, 
    UpdateMultipelLeadOwner,
} from '../../../../actions/LeadAction';

export default {
    components: {
        SearchBar,
        ActionBar,
        LeftActionBar,
        RightActionBar,
        Datatable,
        DatatableBody,
        DatatableHeader,
        AddNewLeadModal,
        HeaderPropertiesDropdown,
        FilterRightSidebar,
        DataTableSkeletor,
        DataNotFound,
        DeleteMultipleLeadWarningModal,
        DropdownOwnerList,
    },
    data() {
        return {
            icons:{},
            isLoading:false,
            fetch:"headers,lead_properties,lead_sources,owners",
            limit:50,
            toggleFilterSidebar:false,
            selectedRows:[],
            isSelectedAllRows:false,
            isSelectedAllRowsReset:false,
            fetchLeads:[],
            leadStatus:[],
            leadSources:[],
            owners:[],
            disabledHeaderColumns:[],
            leadProperties:[],
            isFirstLoading:false,
            filterQueryData:{},
            filterFetchInterval:null,
            pagination: {
                total:0,
                per_page:0,
                current_page:1,
                next_page:null,
                prev_page:null,
                last_page:0,
                from:0,
                to:0,
            }
        }
    },
    watch:{
        "$route"(){
            this.fetchAllLeadsHandler(this.pagination.current_page, this.limit);
        }
    },
    methods: {
        resetFilterSidebar(show){
            try{
                if(show){
                    this.toggleFilterSidebar = true;
                }else{
                    this.toggleFilterSidebar = false;
                    if(Object.keys(this.filterQueryData).length){
                        this.filterQueryData = {};
                        this.fetchAllLeadsHandler(1);
                    }
                }
            }catch(error){}
        },
        filterDataInDatabase(key, value=null, isFetch=false){
            try{
                if((value != null && value != "") || value === 0){
                    this.filterQueryData = {...this.filterQueryData, [key]:value};
                    clearInterval(this. filterFetchInterval);
                }else{
                    delete this.filterQueryData[key];
                    clearInterval(this. filterFetchInterval);
                }
                if(isFetch){
                    this.filterFetchInterval = setTimeout(()=>{
                        this.fetchAllLeadsHandler();
                    },1000);
                }
            }catch(error){}
        },
        async fetchAllLeadsHandler(page=this.pagination?.current_page, limit=this.limit, fetch=""){
            try{
                this.isLoading = true;
                var status = this.$route.query?.status??'';
                var fetchArr = fetch.split(',');
                var search = '';
                var payload = {
                    page, 
                    limit
                };

                if(Object.keys(this.filterQueryData).length){
                    search = btoa(JSON.stringify(this.filterQueryData));
                }
                if(fetch != ""){
                    payload['fetch'] = fetch;
                }
                if(status != ''){
                    payload['status'] = status;
                }
                if(search != ''){
                    payload['search'] = search;
                }
                const res = await FetchLeads(payload);
                try{
                    this.selectedRows = [];
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                    const {leads, pagination, lead_properties, headers, owners, lead_sources} = res;
                    this.fetchLeads = leads;
                    this.pagination = pagination;
                    if(fetchArr.includes('lead_properties')){
                        this.leadProperties = lead_properties;
                    }
                    if(fetchArr.includes('headers')){
                        this.disabledHeaderColumns = headers;
                    }
                    if(fetchArr.includes('owners')){
                        this.owners = owners;
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
        fetchCustomProperties(leadProperties, propertie){
            try{
                if(leadProperties){
                    var current = leadProperties.find(item=>item.unique_id === propertie.unique_id);
                    if(current){
                        var value = current?.value;
                        if(propertie.data_type_id == 'yes_or_no'){
                            if(value == '1' || value == 1){
                                return 'Yes';
                            }else{
                                return "No";
                            }
                        }
                        return value;
                    }
                }
                return null;
            }catch(error){}
        },
        toggleHeaderProperties(key){
            try{
                var index = this.disabledHeaderColumns.indexOf(key);
                if(index > -1){
                    this.disabledHeaderColumns.splice(index, 1);
                }else{
                    this.disabledHeaderColumns.push(key);
                }
                this.updatePropertieHeadersHandler();
            }catch(error){}
        },
        selectedAllRowsHandler(){
            try{
                if(this.isSelectedAllRowsReset){
                    this.selectedRows = [];
                    this.isSelectedAllRowsReset = !this.isSelectedAllRowsReset;
                }else if(!this.isSelectedAllRows){
                    this.isSelectedAllRows = !this.isSelectedAllRows;
                    this.fetchLeads.map((item)=>{
                        this.selectedRows.push(item.id);
                    });
                }else{
                    this.selectedRows = [];
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                }
            }catch(error){}

        },
        singleRowSelectedHandler(id){
            try{
                var index = this.selectedRows.indexOf(id);
                if(index > -1){
                    this.selectedRows.splice(index, 1);
                }else{
                    this.selectedRows.push(id);
                }
        
                if(this.selectedRows.length === this.fetchLeads.length){
                    this.isSelectedAllRows = true;
                    this.isSelectedAllRowsReset = false;
                }else if(this.selectedRows.length > 0){
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = true;
                }else{
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                }
            }catch(error){}
        },
        async updatePropertieHeadersHandler(){
            try{
                const res = await UpdateLeadPropertieHeaders({properties:this.disabledHeaderColumns});
            }catch(error){
                this.$toast.error('Oops, something went wrong');
            }finally{
                
            }
        },
        async updateLeadStatusHandler(leads, status, lead=null){
            try{
                if(lead){
                    if(lead.status?.id == atob(status.id)){
                        return;
                    }
                }
                var data = {
                    leads:leads,
                    status:status.id,
                };
                const res = await UpdateMultipelLeadStatus(data);
                if(lead){
                    lead['status'] = status;
                }else{
                    this.fetchAllLeadsHandler();
                }
            }catch(error){
                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }
        },        
        async updateLeadOwnerHandler(owner=null, lead=null){
            try{
                var data = {};

                if(owner){
                    data['owner'] = owner.id;
                }else{
                    data['owner'] = "MA==";
                }

                if(lead){
                    data['leads'] = [lead.id];
                }else{
                    data['leads'] = this.selectedRows;
                }

                const res = await UpdateMultipelLeadOwner(data);

                if(lead){
                    lead['owner'] = owner;
                }else{
                    this.fetchAllLeadsHandler();
                }

            }catch(error){
                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }
        },        
        copyPhoneNumberHandler(lead){
            var phone = lead.contact?.phone_number;
            if(phone){
                navigator.clipboard.writeText(phone)
                this.$toast.success(`${phone} Copied to Clipboard`);
                return phone;
            }
            this.$toast.error('Oops, Empty phone number.');
        }
    },
    mounted() {
        this.icons = icons;
        this.isFirstLoading = true;
        this.fetchAllLeadsHandler(this.pagination.current_page, this.limit, this.fetch);
        const {lead_statuses} = this.$cookies.get(import.meta.env.VITE_AUTH_APP);
        this.leadStatus = lead_statuses;
    },
}
</script>

<template>
  <section class="content lead-list">

    <search-bar></search-bar>

    <action-bar>

    <left-action-bar>
        <div class=" d-flex justify-content-center align-item-start" style="margin-left: 8px;">
            <label class="custom-form-checkbox btn btn-floating btn-light" @click="selectedAllRowsHandler">
                <svg v-if="!isSelectedAllRows && !isSelectedAllRowsReset" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                <svg v-if="isSelectedAllRows && !isSelectedAllRowsReset" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                <svg v-if="isSelectedAllRowsReset" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="a" d="M0 0h24v24H0z"></path></defs> <clipPath id="b"><use xlink:href="#a" overflow="visible"></use></clipPath> <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" clip-path="url(#b)"></path></svg>
            </label>
        </div>
        <button class="btn btn-light btn-floating ms-2" :disabled="isLoading" @click="fetchAllLeadsHandler()">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
        </button>

        <button 
        @click="$refs['DeleteMultipleLeadModalRef'].showModalHandler()" 
        class="toolbar-btn btn btn-danger btn-sm me-3 ms-3" 
        v-tippy='{ content:"Delete Leads", placement : "top" }'
        v-if="selectedRows.length">
            <span class="fs-14px">{{ selectedRows.length }} selected</span>
            <span class="ms-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" width="20px" height="20px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
            </span>
        </button>
        <!-- Leas Status -->
        <div 
        v-if="selectedRows.length" 
        v-tippy='{ content:"Change Lead Status", placement : "top" }'
        class="dropdown ms-2">
            <button 
            style="width:130px;"
            class="btn btn-sm btn-outline-secondary fw-400 d-flex justify-content-between align-items-center curtom-dropdown-toggler-btn" 
            type="button" 
            data-mdb-toggle="dropdown" 
            aria-expanded="false">
                <span class="fw-bold text-fs tbl-dropdown-title text-overflow-ellipsis text-head">Lead Status</span>
                <div class="dropdown--icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                </div>
            </button>
            <div class="dropdown-menu dropdown-menu-end shadow-md multiple-lead-status-dropdown" aria-labelledby="dropdownMenuButton">
                <span
                style="width:170px;"
                v-for="(status, index) in leadStatus" 
                :key="index" 
                @click="updateLeadStatusHandler(selectedRows, status)"
                class="dropdown-item d-flex justify-content-between align-items-center cursor-pointer py-1">
                    <span class="text-overflow-ellipsis text-head">{{ status.name }}</span>
                    <svg v-if="status.is_lost" class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                </span>
            </div>
        </div>

        <!-- Owner list -->
        <div 
        v-if="selectedRows.length"         
        class="settings-group-item owner-list-dropdown ms-3 ps-2 position-relative">
            <button class="owner-dropdown-toggler" data-mdb-toggle="dropdown" aria-expanded="false" v-tippy='{ content:"Change Owner", placement : "top" }'>
                <div class="icon">
                    <img :src="icons.avatar" alt="">
                </div>
            </button>
            <DropdownOwnerList
            :owners="owners"
            :selectOwnerHandler="(item)=>updateLeadOwnerHandler(item, null)"
            />
        </div>

    </left-action-bar>

    <right-action-bar>
        
        <div v-if="isLoading" class="me-3">
            <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                <circle style="stroke: rgb(59, 113, 202);" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        </div>
        <div class="btn-group  me-3" v-if="Object.keys(filterQueryData).length">
            <button class="btn btn-success btn-sm">{{ Object.keys(filterQueryData).length }} active filter</button>
            <button @click="resetFilterSidebar(false)" class="btn btn-success btn-sm px-2 active">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
            </button>
        </div>

        <button 
        v-if="!Object.keys(filterQueryData).length" 
        class="toolbar-btn btn btn-light btn-floating me-3" 
        v-tippy='{ content:"Filter Leads", placement : "top" }'
        @click="toggleFilterSidebar=!toggleFilterSidebar">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path   d="M0 0h24v24H0z" fill="none"></path> <path   d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
        </button>



        <div class="me-3">
            <button 
            class="btn btn-sm btn-primary fw-bold" 
            @click="$refs['AddNewLeadModalRef'].showModalHandler()">
                <svg class="me-2" width="24" height="24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account-plus</title><path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" /></svg>
                New Lead
            </button>
        </div>

        <div class="me-3">
            <div class="dropdown import-dropdown">
                <button 
                class="btn btn-sm btn-outline-secondary curtom-dropdown-toggler-btn fw-bold d-flex align-items-center" 
                v-tippy='{ content:"Import File or Connect", placement : "top" }'
                type="button" data-mdb-toggle="dropdown" aria-expanded="false">
                    <span class="pe-4 text-head">Import</span>
                    <div class="dropdown--icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                    </div>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Upload spreadsheet...</a></li>
                <li><a class="dropdown-item" href="#">Connect to lead providers</a></li>
                </ul>
            </div>
        </div>
        <button 
        class="toolbar-btn btn btn-light btn-floating me-3" 
        v-tippy='{ content:"Show/Hide Properties", placement : "top" }'
        data-mdb-toggle="dropdown">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M3,5H8.3V19H3zM17,10c1.5,0,2.9,0.5,4,1.3V5h-5.3v5.1C16.1,10,16.5,10,17,10zM10,17c0-3,2-5.6,4.7-6.6V5H9.3v14h1C10.1,18.4,10,17.7,10,17zM20.8,17c0-0.2,0-0.4-0.1-0.6l1.1-1l-1-1.7l-1.5,0.5c-0.3-0.3-0.7-0.5-1.1-0.6L18,12h-2l-0.3,1.5c-0.4,0.1-0.8,0.4-1.1,0.6l-1.4-0.5l-1,1.7l1.1,1c0,0.2-0.1,0.4-0.1,0.6s0,0.4,0.1,0.6l-1.1,1l1,1.7l1.4-0.5c0.3,0.3,0.7,0.5,1.1,0.6L16,22h2l0.3-1.5c0.4-0.1,0.8-0.4,1.1-0.6l1.5,0.5l1-1.7l-1.1-1C20.7,17.4,20.8,17.2,20.8,17z M17,19c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,19,17,19z"></path></svg>
        </button>
        <HeaderPropertiesDropdown 
        :customHeaderColumns="leadProperties"
        :disabledHeaderColumns="disabledHeaderColumns" 
        :toggleHeaderProperties="toggleHeaderProperties" 
        />

        <div class="fw-bold d-flex justify-content-center align-items-center me-3 text-overflow-ellipsis fs-16px" style="min-width: 2rem;">
            {{ pagination.from??0 }} - {{ pagination.to??0 }} of  {{ pagination.total }}
        </div>
        <button 
        :disabled="!pagination.prev_page" 
        @click="pagination.prev_page && fetchAllLeadsHandler(pagination.prev_page)" 
        v-tippy='{ content:"Previous", placement : "top" }'
        class="toolbar-btn btn btn-light btn-floating me-3">
        <svg  class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
    </button>
    
    <button 
    :disabled="!pagination.next_page" 
    v-tippy='{ content:"Next", placement : "top" }'
    @click="pagination.next_page && fetchAllLeadsHandler(pagination.next_page)" 
    class="toolbar-btn btn btn-light btn-floating me-3">
        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
    </button>
        
    </right-action-bar>

    </action-bar>
    <Datatable>

        <FilterRightSidebar 
        v-if="toggleFilterSidebar" 
        @toggle-filter="(e)=> resetFilterSidebar(e)"
        @filter-data-in-database="(key, value, isFetch)=> filterDataInDatabase(key, value, isFetch)"
        :lead-properties="leadProperties"
        :lead-sources="leadSources"
        :filter-query-data="filterQueryData"
        :owners="owners"
         />

        <datatable-header class="" v-if="isFirstLoading || fetchLeads.length">
            <div class="tbl-th" style="width:3.6rem;flex-grow: 1;"></div>

            <div v-show="!disabledHeaderColumns.includes('lead')" class="tbl-th" style="width:20rem;flex-grow: 1;">Lead</div>

            <div v-show="!disabledHeaderColumns.includes('source')" class="tbl-th" style="width:10rem;flex-grow: 1;">Source</div>
            
            <div v-show="!disabledHeaderColumns.includes('status')" class="tbl-th" style="width:12rem;flex-grow: 1;">Status</div>
            
            <div v-show="!disabledHeaderColumns.includes('phone_number')" class="tbl-th text-end" style="width:12rem;flex-grow: 1;">Phone Number</div>
            
            <div v-show="!disabledHeaderColumns.includes('email_address')" class="tbl-th" style="width:15rem;flex-grow: 1;">Email Address</div>
            
            <div v-show="!disabledHeaderColumns.includes('address_line_one')" class="tbl-th" style="width:10rem;flex-grow: 1;">Address One</div>
            
            <div v-show="!disabledHeaderColumns.includes('address_line_two')" class="tbl-th" style="width:10rem;flex-grow: 1;">Address Two</div>

            <div v-show="!disabledHeaderColumns.includes('city')" class="tbl-th" style="width:10rem;flex-grow: 1;">City</div>

            <div v-show="!disabledHeaderColumns.includes('state')" class="tbl-th" style="width:10rem;flex-grow: 1;">State</div>

            <div v-show="!disabledHeaderColumns.includes('post_code')" class="tbl-th" style="width:10rem;flex-grow: 1;">Postcode</div>

            <div v-show="!disabledHeaderColumns.includes('country')" class="tbl-th" style="width:10rem;flex-grow: 1;">Country</div>
            
            <!-- Custom Propertys -->
            
            <div 
            v-for="(propertie, index) in leadProperties" 
            :key="index"
            class="tbl-th"
            v-show="!disabledHeaderColumns.includes(propertie.unique_id)"
            style="width:12rem;flex-grow: 1;">
                <span class="text-overflow-ellipsis w-100">{{ propertie.label }}</span>
            </div>


            <div v-show="!disabledHeaderColumns.includes('last_update')" class="tbl-th" style="width:10rem;flex-grow: 1;">Last Update</div>
            <div v-show="!disabledHeaderColumns.includes('first_create')" class="tbl-th" style="width:10rem;flex-grow: 1;">Created At</div>

            <div v-show="!disabledHeaderColumns.includes('owner')" class="tbl-th" style="width:10rem;flex-grow: 1;">Owner</div>

        </datatable-header>

        <datatable-body>

            <div
            :class="selectedRows.includes(lead.id)?'active':''"
            v-if="!isFirstLoading || fetchLeads.length" 
            class="tbl-tr full-width" 
            v-for="(lead, index) in fetchLeads" 
            :key="index">

                <div style="width:4rem;margin-left: -7px;flex-grow: 1;" class="tbl-td full-width">
                    <label @click="singleRowSelectedHandler(lead.id)" class="custom-form-checkbox btn btn-floating btn-light">
                        <svg v-if="!selectedRows.includes(lead.id)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                        <svg v-if="selectedRows.includes(lead.id)" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                    </label>
                </div>

                <div v-show="!disabledHeaderColumns.includes('lead')" style="width:20rem;flex-grow: 1;" class="tbl-td full-width">
                    <router-link class="text-overflow-ellipsis" :to="`/platform/leads/${lead.id}`"> {{ lead.lead_title??lead.contact?.full_name }} </router-link>
                </div>
        
                <div v-show="!disabledHeaderColumns.includes('source')" style="width:10rem;flex-grow: 1;" class="tbl-td">
                    <span class="text-overflow-ellipsis">{{ lead.source?.title }}</span>
                </div>
                
                <div v-show="!disabledHeaderColumns.includes('status')" style="width:12rem;flex-grow: 1;" class="tbl-td">
                    <div class="dropdown w-100">
                        <button class="btn btn-sm btn-outline-secondary fw-400 w-100 d-flex justify-content-between align-items-center" type="button" data-mdb-toggle="dropdown" aria-expanded="false">
                            <span class="fw-bold text-fs tbl-dropdown-title text-overflow-ellipsis text-head">{{ lead.status?.name??'Lead Status' }}</span>
                            <div class="dropdown--icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                            </div>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            
                            <span
                            style="width:170px;"
                            v-for="(status, index) in leadStatus" 
                            :key="index" 
                            class="dropdown-item d-flex justify-content-between align-items-center cursor-pointer py-1"
                            :class="`${status.name == lead.status?.name?'selected':''}`"
                            @click="updateLeadStatusHandler([lead.id], status, lead)"
                            >
                                <span class="text-overflow-ellipsis text-head">{{ status.name }}</span>
                                <svg v-if="status.is_lost" class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                            </span>

                        </div>
                    </div>
                </div>
        
                <div v-show="!disabledHeaderColumns.includes('phone_number')" style="width:12rem;flex-grow: 1;" class="tbl-td">
                    <div class="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <button v-show="lead.contact?.phone_number" @click="copyPhoneNumberHandler(lead)" class="copy-phone-number">
                               <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                            </button>
                            <a v-show="lead.contact?.phone_number" :href="`tel:${lead.contact?.phone_number}`" target="_blank" title="Call phone number" class="call-btn">
                               <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path></svg>
                            </a>
                        </div>
                        <div>
                            {{ lead.contact?.phone_number }}
                        </div>
                     </div>
                </div>
        
                <div v-show="!disabledHeaderColumns.includes('email_address')" style="width:15rem;flex-grow: 1;" class="tbl-td">
                    <a class="text-overflow-ellipsis" href="">{{ lead.contact?.email }}</a>
                </div>
        
                <div v-show="!disabledHeaderColumns.includes('address_line_one')" style="width:10rem;flex-grow: 1;" class="tbl-td">
                    <span class="text-overflow-ellipsis">{{ lead.address_line_one }}</span>
                </div>
        
                <div v-show="!disabledHeaderColumns.includes('address_line_two')" style="width:10rem;flex-grow: 1;" class="tbl-td">
                    <span class="text-overflow-ellipsis">{{ lead.address_line_two }}</span>
                </div>
        
                
                <div v-show="!disabledHeaderColumns.includes('city')" style="width:10rem;flex-grow: 1;" class="tbl-td"> {{ lead.city }}</div>

                <div v-show="!disabledHeaderColumns.includes('state')" style="width:10rem;flex-grow: 1;" class="tbl-td"> {{ lead.state }}</div>

                <div v-show="!disabledHeaderColumns.includes('post_code')" style="width:10rem;flex-grow: 1;" class="tbl-td"> {{ lead.post_code }}</div>

                <div v-show="!disabledHeaderColumns.includes('country')" style="width:10rem;flex-grow: 1;" class="tbl-td"> {{ lead.country }}</div>

                <!-- Custom Properties -->

                <div 
                v-for="(propertie, index) in leadProperties" 
                :key="index" :id="propertie?.unique_id"
                v-show="!disabledHeaderColumns.includes(propertie.unique_id)"
                class="tbl-td" style="width:12rem;flex-grow: 1;">
                    <span 
                    :class="fetchCustomProperties(lead.custom_properties, propertie)?.length > 25?'hover-scroll':''"
                    class="text-overflow-ellipsis w-100">
                        {{ fetchCustomProperties(lead.custom_properties, propertie) }}
                    </span>
                </div>


                <div v-show="!disabledHeaderColumns.includes('last_update')" style="width:10rem;flex-grow: 1;" class="tbl-td">{{ lead.updated_at }}</div>
        
                <div v-show="!disabledHeaderColumns.includes('first_create')" style="width:10rem;flex-grow: 1;" class="tbl-td">{{ lead.created_at }}</div>

                <div v-show="!disabledHeaderColumns.includes('owner')" style="width:10rem;flex-grow: 1;" class="tbl-td">
                    <div class="settings-group-item owner-list-dropdown position-relative">
                        <button class="owner-dropdown-toggler" data-mdb-toggle="dropdown" aria-expanded="false" v-tippy='{ content:"Change Owner", placement : "top" }'>
                            <div class="icon">
                                <img v-if="lead.owner?.profile_avatar" :src="lead.owner?.profile_avatar" alt="">
                                <img v-if="!lead.owner?.profile_avatar" :src="icons.avatar" alt="">
                            </div>
                        </button>
                        <DropdownOwnerList
                        :owners="owners"
                        :owner="lead.owner"
                        :selectOwnerHandler="(item)=>updateLeadOwnerHandler(item, lead)"
                        />
                    </div>
                </div>

            </div>

            <DataTableSkeletor v-if="isFirstLoading" />

            <DataNotFound v-if="!isFirstLoading && !fetchLeads.length" />

        </datatable-body>

    </Datatable>
  </section>

<!-- ============================ -->
    <add-new-lead-modal
    :fetchAllLeadsHandler="fetchAllLeadsHandler"
    ref="AddNewLeadModalRef"
    :lead-sources="leadSources"
    :lead-status="leadStatus"
    :owners="owners"
    />
    <delete-multiple-lead-warning-modal
    ref="DeleteMultipleLeadModalRef"
    :selectedRows="selectedRows"
    :fetchAllLeadsHandler="fetchAllLeadsHandler"
    />

</template>

<style scoped lang="scss">
.copy-phone-number{
    border: none;
    outline: none;
    background: transparent;
    width: 35px;
    height: auto;
    opacity: 0;
    transition:opacity 0.2s;
}
.call-btn{
    border: none;
    outline: none;
    background: transparent;
    width: 35px;
    height: auto;
    opacity: 0;
    transition:opacity 0.2s;
    svg{
        width:18px;
    }
}
.tbl-tr:hover{
    .call-btn,
    .copy-phone-number{
        opacity: 1;
    }
}
.text-overflow-ellipsis{
    max-width: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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


</style>
