<script>
    import { encode, decode } from 'js-base64';
    import ActionBar from '../../../components/ActionBar/ActionBar.vue';
    import LeftActionBar from '../../../components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '../../../components/ActionBar/RightActionBar.vue';
    import Datatable from '../../../components/Datatable/Datatable.vue';
    import DatatableHeader from '../../../components/Datatable/DatatableHeader.vue';
    import DatatableBody from '../../../components/Datatable/DatatableBody.vue';
    import {FetchInstaller, CreateInstaller} from '../../../actions/InstallerAction';

    export default {
        components: {
            ActionBar,
            LeftActionBar,
            RightActionBar,
            Datatable,
            DatatableHeader,
            DatatableBody,
        },
        data() {
            return {
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
            }
        },
        mounted(){
            this.fetchInstallerDataHandler();
        },
        methods: {
            async fetchInstallerDataHandler(page=null, limit=50){
                try{
                    if(!page){
                        const query = this.$route.query;
                        if(query.page){
                            page = query.page;
                        }else{
                            page = 1;
                        }
                    }
                    this.$router.push('?page='+page);
                    this.isLoading = true;
                    const res = await FetchInstaller({page, limit});
                    try{
                        const {installers, pagination} = res;
                        if(installers.length > 0){
                            this.fetchInstallers = installers;
                            this.pagination = pagination;
                        }
                    }catch(error){}

                }catch(error){
                }finally{
                    this.isLoading = false;
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
                    <button :disabled="isLoading" @click="fetchInstallerDataHandler()" class="toolbar-btn btn btn-light btn-floating me-3 ms-2">
                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                    </button>
                </left-action-bar>
            
                <right-action-bar>
                    <div class="mx-3">
                        <router-link class="btn btn-primary fw-bold btn-sm" to="/settings/installers/new">Add new installer</router-link>
                    </div>
                    <div class="fw-bold d-flex justify-content-center align-items-center me-2 text-overflow-ellipsis" style="min-width: 8rem;">{{ pagination.from }} - {{ pagination.to }} of  {{ pagination.total }}</div>
                    <button 
                    :disabled="!pagination.prev_page" 
                    @click="pagination.prev_page && fetchInstallerDataHandler(pagination.prev_page)" 
                    class="toolbar-btn btn btn-light btn-floating me-2">
                        <svg  class="svg-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                    </button>
                    <button 
                    :disabled="!pagination.next_page" 
                    @click="pagination.next_page && fetchInstallerDataHandler(pagination.next_page)" 
                    class="toolbar-btn btn btn-light btn-floating me-3">
                        <svg class="svg-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
                    </button>
                </right-action-bar>
            </action-bar>
        
            <Datatable>
        
                <datatable-header class="">
                    <div class="tbl-th" style="width:15rem;">Installer Name</div>
                    <div class="tbl-th " style="width:10rem;">ABN</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Company Name</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Email</div>
                    <div class="tbl-th" style="width:10rem;flex-grow: 1;">Phone Number</div>
                    <div class="tbl-th" style="width:10rem;flex-grow: 1;">Hours Phone Number</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Tax Identifier Type</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Electrical Licence Number</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">CEC Accreditation Number</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Workmanship Warranty (years) </div>
                    <div class="tbl-th" style="width:10rem;">Last Update</div>
                    <div class="tbl-th" style="width:10rem;">Created At</div>
                </datatable-header>
                <datatable-body>
                    
                    <div class="tbl-tr full-width" v-for="(installer, index) in fetchInstallers" :key="index">
        
                        <div style="width:15rem;" class="tbl-td full-width">
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
                </datatable-body>
        
            </Datatable>
        </div>
    </section>
</template>
    
<style scoped lang="scss">

</style>
<style>
    .installer-list .scrollbar__wrapper{
        height:calc(100vh - 7rem + 3px);
    }
    .installer-list .scrollbar__scroller{
        height: 100%;
    }
</style>