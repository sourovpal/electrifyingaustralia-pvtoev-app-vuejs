<script>
    import { encode, decode } from 'js-base64';
    import ActionBar from '../../../components/ActionBar/ActionBar.vue';
    import LeftActionBar from '../../../components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '../../../components/ActionBar/RightActionBar.vue';
    import Datatable from '../../../components/Datatable/Datatable.vue';
    import DatatableHeader from '../../../components/Datatable/DatatableHeader.vue';
    import DatatableBody from '../../../components/Datatable/DatatableBody.vue';
    import {FetchInstaller, CreateInstaller} from '../../../actions/InstallerAction';
    import DataTableSkeletor from './DataTableSkeletor.vue';
    import DataNotFound from './DataNotFound.vue';

    export default {
        components: {
            ActionBar,
            LeftActionBar,
            RightActionBar,
            Datatable,
            DatatableHeader,
            DatatableBody,
            DataTableSkeletor,
            DataNotFound,
        },
        data() {
            return {
                isFirstLoading:false,
                isLoading:false,
                fetchInstallers:{},
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
            }
        },
        mounted(){
            this.isFirstLoading = true;
            this.fetchInstallerDataHandler();
        },
        methods: {
            async fetchInstallerDataHandler(page=1, limit=50){
                try{
                    if(this.isLoading){return;}
                    this.isLoading = true;
                    const res = await FetchInstaller({page, limit});
                    // await new Promise((e)=>setTimeout(e, 5000));
                    try{
                        const {installers, pagination} = res;
                        this.isFirstLoading = false;
                        if(installers.length > 0){
                            this.isSelectedAllRows = false;
                            this.isSelectedAllRowsReset = false;
                            this.selectedRows = [];
                            this.fetchInstallers = installers;
                            this.pagination = pagination;
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
                    this.fetchInstallers.map((item)=>{
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

                if(this.selectedRows.length === this.fetchInstallers.length){
                    this.isSelectedAllRows = true;
                    this.isSelectedAllRowsReset = false;
                }else if(this.selectedRows.length > 0){
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = true;
                }else{
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                }
            }
        },
    }
</script>
    
<template>        
    <section class="content installer-list">
        <div class="content-header my-3">
            <h1 class="text-base">Installers list</h1>
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

                        <button :disabled="isLoading" @click="fetchInstallerDataHandler()" class="toolbar-btn btn btn-light btn-floating me-3 ms-3">
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
                        <router-link class="btn btn-primary fw-bold btn-sm" to="/settings/installers/new">
                            <span><svg data-v-3254ee1f="" class="me-2" width="24" height="24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title data-v-3254ee1f="">account-plus</title><path data-v-3254ee1f="" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"></path></svg></span>
                            Add New
                        </router-link>
                    </div>

                    <div class="fw-bold d-flex justify-content-center align-items-center me-3 text-overflow-ellipsis fs-16px" style="min-width: 8rem;">{{ pagination.from }} - {{ pagination.to }} of  {{ pagination.total }}</div>
                    
                    <button 
                    :disabled="!pagination.prev_page" 
                    @click="pagination.prev_page && fetchInstallerDataHandler(pagination.prev_page)" 
                    class="toolbar-btn btn btn-light btn-floating me-3">
                        <svg  class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                    </button>

                    <button 
                    :disabled="!pagination.next_page" 
                    @click="pagination.next_page && fetchInstallerDataHandler(pagination.next_page)" 
                    class="toolbar-btn btn btn-light btn-floating me-3">
                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
                    </button>

                </right-action-bar>
            </action-bar>
        
            <Datatable>
        
                <datatable-header v-if="isFirstLoading || fetchInstallers.length">
                    <div class="tbl-th" style="width:3.46rem;"></div>
                    <div class="tbl-th" style="width:10rem;">Installer Name</div>
                    <div class="tbl-th " style="width:10rem;">ABN</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Company Name</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Email Address</div>
                    <div class="tbl-th" style="width:10rem;flex-grow: 1;">Phone Number</div>
                    <div class="tbl-th" style="width:10rem;flex-grow: 1;">Hours Phone Number</div>
                    <div class="tbl-th" style="width:20rem;flex-grow: 1;">Address</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Tax Identifier Type</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Electrical Licence Number</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">CEC Accreditation Number</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Workmanship Warranty (years) </div>
                    <div class="tbl-th" style="width:10rem;">Last Update</div>
                    <div class="tbl-th" style="width:10rem;">Created At</div>
                </datatable-header>
                <datatable-body>
                    
                    
                    <div v-if="!isFirstLoading || fetchInstallers.length" :class="selectedRows.includes(installer.id)?'active':''" class="tbl-tr full-width" v-for="(installer, index) in fetchInstallers" :key="index">

                        <div style="width:4rem;margin-left: -7px;" class="tbl-td full-width">

                            <label @click="singleRowSelectedHandler(installer.id)" class="custom-form-checkbox btn btn-floating btn-light">
                                <svg v-if="!selectedRows.includes(installer.id)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                <svg v-if="selectedRows.includes(installer.id)" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            </label>

                        </div>

                        <div style="width:10rem;" class="tbl-td full-width">
                            <router-link class="text-overflow-ellipsis" :to="`/settings/installers/edit/${installer.id}`"> {{ installer.full_name }}</router-link>
                        </div>
        
                        <div style="width:10rem;" class="tbl-td full-width">
                            <span class="text-overflow-ellipsis">{{ installer.abn }}</span>
                        </div>
        
                        <div style="width:15rem;" class="tbl-td full-width">
                            <span class="text-overflow-ellipsis">{{ installer.company_name }}</span>
                        </div>
                
                        <div style="width:15rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis">{{ installer.email }}</span>
                        </div>

                        <div style="width:10rem;" class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis">{{ installer.phone_number }}</span>
                        </div>
                        
                        <div style="width:10rem;" class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis">{{ installer.house_phone_number }}</span>
                        </div>
                        
                        <div style="width:20rem;" class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis">{{ installer.address }}</span>
                        </div>

                        <div style="width:15rem;" class="tbl-td full-width">
                            <span class="text-overflow-ellipsis">{{ installer.tax_identifier_type }}</span>
                        </div>

                        <div style="width:15rem;" class="tbl-td full-width">
                            <span class="text-overflow-ellipsis"> {{ installer.electrical_licence_number }}</span>
                        </div>

                        <div style="width:15rem;" class="tbl-td full-width">
                            <span class="text-overflow-ellipsis"> {{ installer.cec_accreditation_number }}</span>
                        </div>

                        <div style="width:15rem;" class="tbl-td full-width">
                            <span class="text-overflow-ellipsis"> {{ installer.workmanship_warranty }}</span>
                        </div>
        
                        <div style="width:10rem;" class="tbl-td d-none d-lg-flex">{{ installer.updated_at }}</div>
                
                        <div style="width:10rem;" class="tbl-td d-none d-lg-flex">{{ installer.created_at }}</div>
                    </div>
                    
                    <DataTableSkeletor v-if="isFirstLoading" />

                    <DataNotFound v-if="!isFirstLoading && !fetchInstallers.length" />

                    

                </datatable-body>
        
            </Datatable>
        </div>
    </section>
</template>
    
<style scoped lang="scss">

</style>
<style>
    .installer-list .tbl-body .tbl-tr .tbl-td{
        padding-top:2px !important;
        padding-bottom: 2px !important;
    }
    .installer-list .scrollbar__wrapper{
        height:calc(100vh - 7rem + 3px);
    }
    .installer-list .scrollbar__scroller{
        height: 100%;
    }
</style>