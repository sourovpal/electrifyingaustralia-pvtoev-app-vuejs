<script>

    import SearchBar from '../../../components/SearchBar.vue';
    import ActionBar from '../../../components/ActionBar/ActionBar.vue';
    import LeftActionBar from '../../../components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '../../../components/ActionBar/RightActionBar.vue';
    import Datatable from '../../../components/Datatable/Datatable.vue';
    import DatatableHeader from '../../../components/Datatable/DatatableHeader.vue';
    import DatatableBody from '../../../components/Datatable/DatatableBody.vue';

    import {FetchContact} from '../../../actions/ContactAction';
    import DataTableSkeletor from './components/DataTableSkeletor.vue';
    import DataNotFound from '../../../components/DataNotFound.vue';
    import DataFetchError from '../../../components/DataFetchError.vue';

    export default {
        components: {
            SearchBar,
            ActionBar,
            LeftActionBar,
            RightActionBar,
            Datatable,
            DatatableHeader,
            DatatableBody,
            DataTableSkeletor,
            DataNotFound,
            DataFetchError,
        },
        data() {
            return {
                limit:30,
                contacts:[],
                isFirstLoading:false,
                isLoading:false,
                isError:false,
                pagination:{
                    total:0,
                    per_page:0,
                    current_page:1,
                    next_page:null,
                    prev_page:null,
                    last_page:0,
                    from:0,
                    to:0,
                },
            }
        },
        watch: {
            "$route"(){
                this.fetchContactsHandler();
            }
        },
        methods: {
            updateUrlQuery(query={}){
                var current = this.$route.query;
                this.$router.push({path:'/platform/contacts', query:{...current, ...query}});
            },
            async fetchContactsHandler(payload={}) {
                try{
                    this.isLoading = !this.isLoading;
                    var query = this.$route.query;
                    payload = {...payload, ...query};

                    if(!payload['page']){
                        payload['page'] = this.pagination?.current_page;
                    }

                    if(!payload['limit']){
                        payload['limit'] = this.limit;
                    }
                    const res = await FetchContact(payload);

                    const {contacts, pagination} = res;
                    this.contacts = contacts;
                    this.pagination = {...this.pagination, ...pagination};

                    this.isError = this.isLoading = this.isFirstLoading = false;
                }catch(error){
                    this.isError = true;
                }finally{
                    // this.isLoading = this.isFirstLoading = false;
                }
            }
        },
        mounted() {
            this.isFirstLoading = true;
            this.fetchContactsHandler();
        },
    }
</script>
    
    <template>        
      

        <section class="content contacts-list">

            <search-bar></search-bar>
        
            <action-bar>
        
                <left-action-bar>

                    <button :disabled="isLoading" @click="!isLoading && fetchContactsHandler()" class="toolbar-btn btn btn-light btn-floating ms-2">
                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                    </button>

                </left-action-bar>
            
                <right-action-bar>
                    
                    <div v-if="isLoading" class="me-3">
                        <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                            <circle style="stroke: rgb(59, 113, 202);" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                        </svg>
                    </div>

                    <div class="fw-bold d-flex justify-content-center align-items-center me-3" style="min-width: 4rem;">{{ pagination?.from }} - {{ pagination?.to }} of {{ pagination?.total }}</div>
                    
                    <button 
                        :disabled="!pagination?.prev_page"
                        @click="pagination?.prev_page && updateUrlQuery({page:pagination?.prev_page})"
                        class="toolbar-btn btn btn-light btn-floating me-3">
                        <svg  class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                    </button>

                    <button 
                        :disabled="!pagination?.next_page"
                        @click="pagination?.next_page && updateUrlQuery({page:pagination?.next_page})"
                        class="toolbar-btn btn btn-light btn-floating me-3">
                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
                    </button>
                    
                </right-action-bar>
        
            </action-bar>
        
            <Datatable>
        
                <datatable-header v-if="(isFirstLoading || contacts?.length) && !isError">
                    <div class="tbl-th" style="width:20rem;flex-grow: 1;">Contact</div>
                    <div class="tbl-th " style="width:20rem;flex-grow: 1;">Phone Number</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Email Address</div>
                    <div class="tbl-th" style="width:10rem;flex-grow: 1;">Last Update</div>
                    <div class="tbl-th" style="width:10rem;flex-grow: 1;">Created At</div>
                </datatable-header>
        
                <datatable-body>
                    <div 
                    class="tbl-tr full-width" 
                    v-if="contacts?.length && !isError"
                    v-for="(item, index) in contacts" :key="index">
        
                        <div style="width:20rem;flex-grow: 1;" class="tbl-td full-width cursor-pointer">
                            <div data-v-2b4956d4="" class="circle-avatar me-2">
                                <img data-v-2b4956d4="" class="rounded-circle border" alt="avatar1" :src="item?.avatar">
                            </div>
                            <a class="text-overflow-ellipsis">{{ item?.full_name }}</a>
                        </div>
                        
                        <div style="width:20rem;flex-grow: 1;" class="tbl-td">
                            <a class="text-overflow-ellipsis">{{ item?.phone_number }}</a>
                        </div>
                        
                        <div style="width:15rem;flex-grow: 1;" class="tbl-td">
                            <a class="text-overflow-ellipsis">{{ item?.email }}</a>
                        </div>
        
                        <div style="width:10rem;flex-grow: 1;" class="tbl-td">{{ item?.updated_at }}</div>
                        
                        <div style="width:10rem;flex-grow: 1;" class="tbl-td">{{ item?.created_at }}</div>
                    </div>

                    <DataTableSkeletor v-if="isFirstLoading" />
                    <DataNotFound v-if="!isFirstLoading && !contacts?.length && !isError" />
                    <DataFetchError v-if="isError" />

                </datatable-body>
        
            </Datatable>
          </section>

    
    </template>
    <style>
        .contacts-list .tbl-body .tbl-tr .tbl-td{
            padding:6px 16px !important;
        }
    </style>