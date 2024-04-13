<script>
    import ActionBar from '../../../../components/ActionBar/ActionBar.vue';
    import LeftActionBar from '../../../../components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '../../../../components/ActionBar/RightActionBar.vue';
    import Datatable from '../../../../components/Datatable/Datatable.vue';
    import DatatableHeader from '../../../../components/Datatable/DatatableHeader.vue';
    import DatatableBody from '../../../../components/Datatable/DatatableBody.vue';
    import PropetiesSkeletor from './PropetiesSkeletor.vue';
    import DataNotFound from './DataNotFound.vue';
    import {FetchLeadProperties} from '../../../../actions/CrmLeads';
    import CreateCustomPropertieModal from './components/CreateCustomPropertieModal.vue';
    import {propertiesIconList} from '../../../../asset/svgicon.js';
    export default {
        components: {
            ActionBar,
            LeftActionBar,
            RightActionBar,
            Datatable,
            DatatableHeader,
            DatatableBody,
            PropetiesSkeletor,
            DataNotFound,
            CreateCustomPropertieModal,
        },
        data() {
            return {
                isFirstLoading:false,
                isLoading:false,
                fetchProperties:[],
                pagination:{
                    total:0,
                    per_page:0,
                    current_page:1,
                    next_page:null,
                    prev_page:null,
                    last_page:null,
                    from:0,
                    to:0
                },
                selectedRows:[],
                isSelectedAllRows:false,
                isSelectedAllRowsReset:false,
                iconList:{},
                pipeline_id:0,
                pipeline_title:null,
            }
        },
        mounted(){
            this.iconList = propertiesIconList;
            this.isFirstLoading = true;
            this.fetchPropertieDataHandler();
        },
        methods: {
            async fetchPropertieDataHandler(page=1, limit=25){
                try{
                    if(this.isLoading){return;}
                    this.isLoading = true;
                    const querys = this.$route.query;
                    if(querys && querys.pipeline){
                        this.pipeline_id = querys.pipeline;
                        this.pipeline_title = querys.title;
                    }

                    const res = await FetchLeadProperties({page, limit, pipeline_id:this.pipeline_id});
                    try{
                        const {properties, pagination} = res;
                        this.isFirstLoading = false;
                        if(properties && properties.length > 0){
                            this.isSelectedAllRows = false;
                            this.isSelectedAllRowsReset = false;
                            this.selectedRows = [];
                            this.fetchProperties = properties;
                            this.pagination = pagination;
                        }else{
                            this.fetchProperties = [];
                        }
                    }catch(error){
                        this.$toast.error('Oops, something went wrong');
                    }

                }catch(error){
                    try{
                        var message = error.response.data.message;
                        this.$toast[message.type](message.text);
                    }catch(e){
                        this.$toast.error('Oops, something went wrong');
                    }
                }finally{
                    this.isLoading = false;
                    this.isFirstLoading = false;
                }
            },
            selectedAllRowsHandler(){

                if(this.isSelectedAllRowsReset){
                    this.selectedRows = [];
                    this.isSelectedAllRowsReset = !this.isSelectedAllRowsReset;
                }else if(!this.isSelectedAllRows){
                    this.isSelectedAllRows = !this.isSelectedAllRows;
                    this.fetchProperties.map((item)=>{
                        this.selectedRows.push(item.id);
                    });
                }else{
                    this.selectedRows = [];
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                }

            },
            singleRowSelectedHandler(id){
                var index = this.selectedRows.indexOf(id);
                if(index > -1){
                    this.selectedRows.splice(index, 1);
                }else{
                    this.selectedRows.push(id);
                }

                if(this.selectedRows.length === this.fetchProperties.length){
                    this.isSelectedAllRows = true;
                    this.isSelectedAllRowsReset = false;
                }else if(this.selectedRows.length > 0){
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = true;
                }else{
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                }
            },
            showCreatePropertieModal(){
                this.$refs['createPropertieModal'].showModalHandler(false, this.pipeline_id, 0);
            }
        },
    }
</script>
    
<template>        
    <section class="content properties">
        <div v-if="pipeline_id || pipeline_title" class="content-header d-flex justify-content-start align-stages-center my-3">
            <router-link to="/settings/crm/leads">
                <h1 class="mb-0 text-soft">Pipelines</h1>
            </router-link>
            <div class="mx-2 d-flex justify-content-center align-items-center">
                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
            </div>
            <router-link :to="`/settings/crm/leads/${pipeline_id}`">
                <h1 class="mb-0 text-soft">{{ pipeline_title }}</h1>
            </router-link>
            <div class="mx-2 d-flex justify-content-center align-items-center">
                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
            </div>
            <h1 class="mb-0 text-base">Custom Properties</h1>
        </div>

        <div v-if="!pipeline_id && !pipeline_title" class="content-header d-flex justify-content-start align-stages-center my-3">
            <router-link to="/settings/crm/leads">
                <h1 class="mb-0 text-soft">Leads</h1>
            </router-link>
            <div class="mx-2 d-flex justify-content-center align-items-center">
                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
            </div>
            <h1 class="mb-0 text-base">Custom Properties</h1>
        </div>

    
        <div class="content-body- border-top">
            <action-bar>
                <left-action-bar>
                    <div class="ps-2">

                        <label class="custom-form-checkbox btn btn-floating btn-light" @click="selectedAllRowsHandler">
                            <svg v-if="!isSelectedAllRows && !isSelectedAllRowsReset" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                            <svg v-if="isSelectedAllRows && !isSelectedAllRowsReset" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            <svg v-if="isSelectedAllRowsReset" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="a" d="M0 0h24v24H0z"></path></defs> <clipPath id="b"><use xlink:href="#a" overflow="visible"></use></clipPath> <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" clip-path="url(#b)"></path></svg>
                        </label>

                    </div>
                    <div>

                        <button :disabled="isLoading" @click="fetchPropertieDataHandler()" class="toolbar-btn btn btn-light btn-floating me-3 ms-3">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                        </button>

                    </div>
                    <div>

                        <button class="toolbar-btn btn btn-danger btn-sm me-3 ms-3" v-if="selectedRows.length">
                            <span class="fs-12px">{{ selectedRows.length }} selected</span>
                            <span class="ms-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" width="20px" height="20px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
                            </span>
                        </button>

                    </div>
                    
                </left-action-bar>
            
                <right-action-bar>

                    <div v-if="isLoading" class="me-3">
                        <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                            <circle style="stroke: rgb(59, 113, 202);" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                        </svg>
                    </div>

                    <div class="me-3">
                        <button @click="showCreatePropertieModal" class="btn btn-primary fw-bold btn-sm">
                            <span><svg class="me-2" width="24" height="24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account-plus</title><path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"></path></svg></span>
                            Add New
                        </button>
                    </div>

                    <div class="fw-bold d-flex justify-content-center align-items-center me-3 text-overflow-ellipsis fs-16px" style="min-width: 8rem;">{{ pagination.from }} - {{ pagination.to }} of  {{ pagination.total }}</div>
                    
                    <button 
                    :disabled="!pagination.prev_page" 
                    @click="pagination.prev_page && fetchPropertieDataHandler(pagination.prev_page)" 
                    class="toolbar-btn btn btn-light btn-floating me-3">
                        <svg  class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                    </button>

                    <button 
                    :disabled="!pagination.next_page" 
                    @click="pagination.next_page && fetchPropertieDataHandler(pagination.next_page)" 
                    class="toolbar-btn btn btn-light btn-floating me-3">
                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
                    </button>

                </right-action-bar>
            </action-bar>
        
            <Datatable>
        
                <datatable-header v-if="isFirstLoading || fetchProperties.length">
                    <div class="tbl-th" style="width:3.46rem;"></div>
                    <div class="tbl-th" style="width:15rem;">Propertie Name</div>
                    <div class="tbl-th " style="width:15rem;">Unique ID</div>
                    <div class="tbl-th" style="width:10rem;flex-grow: 1;">Data Type</div>
                    <div class="tbl-th" style="width:10rem;flex-grow: 1;">Visibility</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Use Case</div>
                    <div class="tbl-th" style="width:10rem;">Last Update</div>
                    <div class="tbl-th" style="width:10rem;">Created At</div>
                </datatable-header>
                <datatable-body>
                    
                    
                    <div v-if="!isFirstLoading || fetchProperties.length" :class="selectedRows.includes(propertie.id)?'active':''" class="tbl-tr full-width" v-for="(propertie, index) in fetchProperties" :key="index">

                        <div style="width:4rem;margin-left: -7px;" class="tbl-td full-width">

                            <label @click="singleRowSelectedHandler(propertie.id)" class="custom-form-checkbox btn btn-floating btn-light">
                                <svg v-if="!selectedRows.includes(propertie.id)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                <svg v-if="selectedRows.includes(propertie.id)" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            </label>

                        </div>

                        <div style="width:15rem;" class="tbl-td">
                            <a href="#" @click="$refs['createPropertieModal'].showModalHandler(true, pipeline_id, propertie.id)" class="text-overflow-ellipsis"> {{ propertie.label }}</a>
                        </div>
        
                        <div style="width:15rem;" class="tbl-td">
                            <span class="text-overflow-ellipsis">{{ propertie.unique_id }}</span>
                        </div>
        
                        <div style="width:10rem;flex-grow: 1;" class="tbl-td">
                            <span class="me-2" v-if="iconList[propertie.data_type_id]" v-html="iconList[propertie.data_type_id]"></span>
                            <span class="text-overflow-ellipsis">{{ propertie.data_type }}</span>
                        </div>
                
                        <div style="width:10rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis">
                                <svg v-if="propertie.visibility" class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                                <svg v-if="!propertie.visibility" class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                            </span>
                        </div>

                        <div style="width:15rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis btn btn-sm btn-success py-0 px-2">{{ propertie.use_case }}</span>
                        </div>
        
                        <div style="width:10rem;" class="tbl-td d-none d-lg-flex">{{ propertie.updated_at }}</div>
                
                        <div style="width:10rem;" class="tbl-td d-none d-lg-flex">{{ propertie.created_at }}</div>
                    </div>
                    
                    <PropetiesSkeletor v-if="isFirstLoading" />

                    <DataNotFound v-if="!isFirstLoading && !fetchProperties.length" />

                </datatable-body>
        
            </Datatable>
        </div>

        <create-custom-propertie-modal 
        :fetchPropertieDataHandler="fetchPropertieDataHandler"
        ref="createPropertieModal" 
        :pipeline_title="pipeline_title??'lead'"
        />



    </section>
</template>
    
<style>
    .properties .tbl-body .tbl-tr .tbl-td{
        padding-top:2px !important;
        padding-bottom: 2px !important;
    }
    .properties .scrollbar__wrapper{
        height:calc(100vh - 7rem + 3px);
    }
    .properties .scrollbar__scroller{
        height: 100%;
    }
</style>
