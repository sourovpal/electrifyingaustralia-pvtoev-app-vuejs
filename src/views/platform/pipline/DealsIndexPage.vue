<script>

    import SearchBar from '../../../components/SearchBar.vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import FilterRightSidebar from './components/FilterRightSidebar.vue';
    import PipelineStateLeadDetails from './components/PipelineStateLeadDetails.vue';
    import LoadingStateLeads from './components/LoadingStateLeads.vue';
    import PipelineSkeletor from './components/PipelineSkeletor.vue';
    import { Skeletor } from 'vue-skeletor';
    import './style.scss';

    import {
        FetchPipelineWithStagesWithLeads, 
        FetchLeadsByPipelineStageId
    } from '../../../actions/PipelineAction';

    
    export default {
        components: {
            SearchBar,
            CustomScrollbar,
            FilterRightSidebar,
            PipelineStateLeadDetails,
            LoadingStateLeads,
            PipelineSkeletor,
            Skeletor,
        },
        data() {
            return {
                filterRightSidebar:false,
                dataShowTable:false,
                filterByAscDesc:false, // ASC True
                pipeline:{},
                stages:[],
                leadLastId:{},
                isLoadings:{},
                isLoading:false,
                isMounted:false,
                components:{},
                payload:{},
                ascending:[
                    {field:'updated_at', sorted:'asc', title:'Least recently updated first'},
                    {field:'created_at', sorted:'asc', title:'Least recently created first'},
                    {field:'estimated_value', sorted:'asc', title:'Least valuable first'},
                    {field:'confidence', sorted:'asc', title:'Least stars first'},
                ],
                descending:[
                    {field:'updated_at', sorted:'desc', title:'Most recently updated first'},
                    {field:'created_at', sorted:'desc', title:'Most recently created first'},
                    {field:'estimated_value', sorted:'desc', title:'Most valuable first'},
                    {field:'confidence', sorted:'desc', title:'Most stars first'},
                ],
            }
        },
        created() {
            if(this.$route.query.view && this.$route.query.view === 'row'){
                this.dataShowTable = true;
            }else{
                this.dataShowTable = false;
            }
        },
        watch:{
            "$route"(){
                this.fetchPipelineWithStages();
            }
        },
        methods: {
            async urlQueryUpdate(payload={}){
                this.$route.push('/platform/deals', {...this.$route.query, ...payload});
                this.fetchPipelineWithStages();
            },
            async fetchPipelineWithStages(payload={}){
                try{
                    this.isLoading = true;
                    this.payload = {...this.$route.query, ...payload};
                    const res = await FetchPipelineWithStagesWithLeads(this.payload);
                    const {pipeline, stages, properties} = res;

                    this.stages = [];
                    this.pipeline = {};
                    this.components = {}; 
                    this.isLoadings = {};

                    this.pipeline = pipeline;
                    this.stages = stages;
                    if(stages){
                        this.stages.map(async({id, leads}, index)=>{
                            try{
                                this.isLoadings[id] = false;
                                if(!this.components[id]){
                                    this.components[id] = [];
                                }
                                if(leads?.length){
                                    this.components[id].push({
                                        data:leads,
                                    });
                                    var len = leads.length;
                                    if(len >= 20){
                                        this.leadLastId[id] = leads[len - 1]?.id;
                                    }
                                }
                            }catch(error){}
                        });
                    }
                    this.isMounted = this.isLoading = false;  
                }catch(error){}
                finally{
                    this.isMounted = this.isLoading = false;
                }
            },
            redirectFirstPipeline() {
                // try{
                //     var pipelines = this.$store.getters.getPipelines;
                //     if(!this.$route.query?.pipeline){
                //         var query = this.$route.query;
                //         var first = pipelines[0];
                //         query['pipeline'] = btoa(first.title);
                //         this.$router.push({ path: '/platform/deals', query });
                //     }
                // }catch(error){}
            },
            async infiniteLoadedLeads(event, id){
                this.isMounted = false;
                if(!this.leadLastId[id] || this.isLoadings[id]){
                    return;
                }

                if(!this.components[id]){
                    this.components[id] = [];
                }

                var position = (100 / event.target.scrollHeight) * (event.target.clientHeight + event.scrollTop);
                
                if(position >= 80 && !this.isLoadings[id]){ // 80%

                    this.isLoadings[id] = true;

                    var payload = {
                        stage_id:id,
                        last_id:this.leadLastId[id],
                        ...this.payload
                    }
                    const res = await FetchLeadsByPipelineStageId(payload);

                    try{

                        const {leads} = res;

                        if(leads?.length){

                            this.components[id].push({
                                data:leads,
                            });

                            var len = leads.length;

                            if(len >= 20){
                                this.leadLastId[id] = leads[len - 1]?.id;
                            }else{
                                delete this.leadLastId[id];
                            }
                        }else{
                            delete this.leadLastId[id];
                        }
                        this.isLoadings[id] = false;
                    }catch(error){}
                }
            },
            scrollbarAddClassHandler(e){
                var scrollbar = e.target.closest('.scrollbar__wrapper')
                if(scrollbar && scrollbar?.classList.contains('scroll')){
                    scrollbar.classList.remove('scroll');
                }else if(scrollbar){
                    scrollbar.classList.add('scroll');
                }
            }
        },
        mounted() {
            this.isMounted = true;
            this.fetchPipelineWithStages();
            this.$el.addEventListener('mousedown', this.scrollbarAddClassHandler);
            this.$el.addEventListener('mouseup',  this.scrollbarAddClassHandler);
        },
    }
</script>
    
    <template>        
      <section class="content pipline-list">
    
        <search-bar></search-bar>

        <section class="tools-bar">
            <div class="row border-bottom py-1 mx-0">
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-start align-items-center">
                        <h5 class="m-0 ps-1 fs-20px fw-bold title-dark">
                            <span v-if="!isMounted">{{ pipeline?.title }}</span>
                            <Skeletor v-else style="width:5rem;height:15px;" />
                        </h5>
                        <div class="ms-3">
                            <button :disabled="isLoading" @click="fetchPipelineWithStages()" type="button" class="toolbar-btn btn btn-light btn-lg btn-floating">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                            </button>
                        </div>
                        <div class="mx-2">
                            <router-link to="?view=row">
                                <button type="button" class="toolbar-btn btn btn-light btn-lg btn-floating">
                                    <svg :class="` ${dataShowTable?'active-svg-tbl':''} svg-5`" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></svg>
                                </button>
                            </router-link>
                        </div>
                        <div class="mx-2">
                            <router-link to="?view=column">
                                <button type="button" class="toolbar-btn btn btn-light btn-lg btn-floating">
                                    <svg :class="` ${!dataShowTable?'active-svg-tbl':''} svg-5`" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></svg>
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div> <!-- End Col -->
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-end align-items-center">
                        <div v-if="isLoading" class="me-3">
                            <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                <circle style="stroke: rgb(59, 113, 202);" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                            </svg>
                        </div>
                        <div class="dropdown-sorted">
                            <button 
                            data-mdb-toggle="dropdown" 
                            aria-expanded="false"
                            class="btn btn-secondary fs-14px text-head fw-bold btn-sm dropdown-toggle">
                                <span class="me-2">
                                    <svg  xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path  d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></svg>
                                </span>
                                Most recently updated first
                            </button>
                            <div class="dropdown-menu dropdown-menu-end dropdown-sorted-list" @click="(event)=>event.stopPropagation()">
                                <div class="d-flex justify-content-between align-items-center p-2">
                                    <button 
                                    @click="filterByAscDesc = false" 
                                    class="btn btn-sm" :class="!filterByAscDesc?'btn-primary':'btn-outline-primary'">
                                        <span class="me-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentcolor"><path  d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></svg>
                                        </span>
                                        Descending
                                    </button>
                                    <button 
                                    @click="filterByAscDesc = true" 
                                    class="btn btn-sm" 
                                    :class="filterByAscDesc?'btn-primary':'btn-outline-primary'">
                                        <span class="me-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentcolor"><path  d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></svg>
                                        </span>
                                        Ascending
                                    </button>
                                </div>
                                <div class="tab-content" id="ex1-content">
                                    <ul :class="filterByAscDesc?'fade show active':''" class="list-unstyled mb-0 ascending-menu tab-pane">
                                        <li 
                                        v-for="(item, index) in ascending"
                                        :key="index" :class="{active:(payload['field'] == item?.field &&  payload['sorted'] == item?.sorted)}"
                                        @click="fetchPipelineWithStages({field:item?.field, sorted:item?.sorted})"
                                        >
                                            <a class="dropdown-item cursor-pointer">{{ item?.title }}</a>
                                        </li>
                                        <li><hr class="dropdown-divider m-0" /></li>
                                        <li><a class="dropdown-item cursor-pointer">Manual</a></li>
                                    </ul>
                                    <ul :class="!filterByAscDesc?'fade show active':''" class="list-unstyled mb-0 descending-menu tab-pane">
                                        <li 
                                        v-for="(item, index) in descending"
                                        :key="index" :class="{active:(payload['field'] == item?.field &&  payload['sorted'] == item?.sorted)}"
                                        @click="fetchPipelineWithStages({field:item?.field, sorted:item?.sorted})"
                                        >
                                            <a class="dropdown-item cursor-pointer">{{ item?.title }}</a>
                                        </li>
                                        <li><hr class="dropdown-divider m-0" /></li>
                                        <li><a class="dropdown-item cursor-pointer">Manual</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="ms-2">
                            <button @click="filterRightSidebar = !filterRightSidebar" type="button" class="toolbar-btn btn btn-light btn-lg btn-floating">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div> <!-- End Col -->
            </div><!-- End Row -->
        </section>

        <!-- Card Pipline -->        
        <div v-if="!dataShowTable" class="pip-body-scrollbar" :style="{overflowY:'hidden' }">
            <section class="pipline d-table w-100">
                <div class="piplien-body d-flex flex-row">
                    
                    
                    <FilterRightSidebar 
                    :class="{show:filterRightSidebar}"
                    @toggle-filter="(e)=> filterRightSidebar = e" />

                    <pipeline-skeletor v-if="isMounted" />

                    <div 
                    class="piplien-state" :class="{own:stage?.status==2, lost:stage?.status==1}"
                    v-for="(stage, index) in stages" :key="index">
                        <div class="pip-header ps-3 pe-2 py-2 d-flex flex-column">
                            <h3 class="fs-18px text-head fw-bold mb-0 fw-bold text-overflow-ellipsis">{{ stage.name }}</h3>
                            <span class="fs-12px text-head fw-bold">{{ stage?.total_leads }} Deals</span>
                            <div class="pip-header-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" height="64" viewBox="0 0 8 56" width="8">
                                    <path d="M0 0h16v64H0z" fill="none"></path> 
                                    <path d="M0,0 1,0 8,28 1,56 0,56 7,28z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="py-1 value-bar">
                            <div class="px-3 d-flex justify-content-between align-items-center">
                                <span class="text-head fw-bold fs-12px">Value</span>
                                <span class="text-head fw-bold fs-12px">${{ stage?.total_estimated_value }}</span>
                            </div>
                        </div>

                        <CustomScrollbar :simulateScroll="true" thumbWidth="3.5" direction="horizontal"  @scroll="infiniteLoadedLeads($event, stage.id)">
                            <div class="pip-body px-2">
                                <component v-for="(component, index) in components[stage.id]??[]" 
                                :key="index" :is="`pipeline-state-lead-details`" :data="component.data" :index="index" />
                                <loading-state-leads :show="isLoadings[stage.id] && leadLastId[stage.id]" :size="1" />
                            </div>
                        </CustomScrollbar>

                    </div>

                    <!-- Empty State -->
                    <div class="piplien-state" style="flex-grow: 1;max-width: 100%;">
                        <div class="pip-header ps-3 pe-2 py-2 d-flex flex-column">
                            <h3 class="fs-18px text-head fw-bold mb-0" style="opacity: 0;">-</h3>
                            <span class="fs-12px text-head" style="opacity: 0;">-</span>
                        </div>
                        <div class="py-1 value-bar">
                            <div class="px-3 d-flex justify-content-between align-items-center">
                                <span class="text-head fw-bold fs-12px" style="opacity: 0;">-</span>
                                <span class="text-head fw-bold fs-12px" style="opacity: 0;">-</span>
                            </div>
                        </div>  
                    </div>
                    <!-- End Empty State Col -->

                </div>
            </section>
        </div>
        <!-- Card Pipline End -->

        <!-- Pipline Table Data -->
        <section v-else class="pipline__table">

            <FilterRightSidebar 
            :class="filterRightSidebar?'show':''"
            @toggle-filter="(e)=> filterRightSidebar = e" />

            <CustomScrollbar class="pip-body-scrollbar" thumbWidth="8">

                <div class="px-4 mt-5" v-for="(item, index) in Array.from(Array(10).keys())" :key="index">
                    <div class="row mb-2">
                        <div class="col-6 ps-0">
                            <button class="btn btn-sm btn-success">Newly qualified</button>
                        </div>
                        <div class="col-6 pe-0">
                            <div class="text-soft d-flex justify-content-end align-items-center">58 Deals worth $0.00</div>
                        </div>
                    </div>
                    <div class="row border">
                        <div class="col-4 text-head fs-14px fw-bold py-2">Deal</div>
                        <div class="col-2 text-head fs-14px fw-bold py-2">Value</div>
                        <div class="col-2 text-head fs-14px fw-bold py-2">Last Update</div>
                        <div class="col-2 text-head fs-14px fw-bold py-2">First Create</div>
                        <div class="col-2 text-head fs-14px fw-bold py-2">Owner</div>
                    </div>
    
                    <div class="row border border-top-0" v-for="(item, index) in Array.from(Array(15).keys())" :key="index">
                        <div class="col-4 text-head py-1">
                            <a href="">
                                <div class="fs-14px text-head fw-bold text-overflow-ellipsis line-height-15px">249 Prospect Highway, Seven Hills</div>
                                <p class="mb-0 fs-12px text-soft text-overflow-ellipsis">Mr. SHANE ALEXANDER	GROSMAN · Mr. SHANE ALEXANDER GROSMAN 2147 NSW 21/02/11:00 AM Phone(IN)</p>
                            </a>
                        </div>
                        <div class="col-2 text-head fs-14px fw-bold py-1 d-flex flex-column align-items-start justify-content-center"></div>
                        <div class="col-2 text-head fs-14px fw-bold py-1 d-flex flex-column align-items-start justify-content-center">Sat, Feb 17th</div>
                        <div class="col-2 text-head fs-14px fw-bold py-1 d-flex flex-column align-items-start justify-content-center">Sat, Feb 17th</div>
                        <div class="col-2 text-head fs-14px fw-bold py-1 d-flex flex-column align-items-start justify-content-center">

                            

                            <div class="settings-group-item owner-list-dropdown">
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
        
                                            <!-- <vue-custom-scrollbar 
                                            :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" 
                                            class="project-owner-team-members"> -->
                                            <CustomScrollbar class="project-owner-team-members" style="height:20rem;">
                                                <div class="dropdown-header">
                                                    Change owner
                                                </div>
        
                                                <div class="dropdown-item">
                                                    <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
        
                                                <div class="dropdown-item">
                                                    <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
        
                                                <div class="dropdown-item">
                                                    <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
        
                                                <div class="dropdown-item">
                                                    <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
        
                                                <div class="dropdown-item">
                                                    <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
        
                                                <div class="dropdown-item">
                                                    <img src="https://static.getpylon.com/images/users/t7bl698ONVEfNxwp126StFtPP5WkRxfxNJtXrS7U.jpg.png" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <img src="https://www.gravatar.com/avatar/96d6c58a2851261d2f86c302b4dfdfcd?s=64&amp;d=mm&amp;r=PG" draggable="false" alt="Susmita Chowdhury's avatar" class="project-owner__profile-photo" />
                                                    <span class="username fs-14px text-overflow-ellipsis">
                                                        Susmita Chowdhury
                                                        <div class="team-member-email text-muted fs-12px text-overflow-ellipsis">
                                                            admin@electrifyingaustralia.com.au
                                                        </div>
                                                    </span>
                                                </div>
                                            </CustomScrollbar>
                                            <!-- </vue-custom-scrollbar> -->
                                        </div>
                                    </div>
                                </div>
                            </div>





                        </div>
                    </div>
    
                    <div class="row border border-top-0">
                        <div class="col-12 text-head fs-14px fw-bold py-2 d-flex flex-column align-items-center justify-content-center bg-secondary cursor-pointer">Load More</div>
                    </div>
                </div>
                <br><br><br>
            </CustomScrollbar>
        </section>
        <!-- Pipline Table Data End -->

        
      </section>
    
    </template>
<style lang="scss">
    .pipline-list .piplien-body,
    .pipline-list .pip-body-scrollbar{
        height:calc(100vh - 102px) !important;        
    }
    .pipline-list .piplien-state .scrollbar__scroller{
        scroll-behavior: smooth !important;
        height: 100% !important;
    }
    .pipline-list .piplien-state .scroll .scrollbar__scroller{
        scroll-behavior: auto !important;
    }
    .pipline-list .piplien-state .scrollbar__wrapper{
        height: calc(79vh - 5px) !important;
    }
    .pipline-list .active-svg-tbl{
        fill:#3295ff !important;
    }
</style>