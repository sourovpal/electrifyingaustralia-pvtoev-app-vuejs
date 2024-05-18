<script>

    import SearchBar from '../../../components/SearchBar.vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import FilterRightSidebar from './FilterRightSidebar.vue';
    import PipelineStateLeadDetails from './components/PipelineStateLeadDetails.vue';
    import LoadingStateLeads from './components/LoadingStateLeads.vue';
    import PipelineSkeletor from './components/PipelineSkeletor.vue';
    import { Skeletor } from 'vue-skeletor';
    import './style.scss';

    import {FetchPipelineWithStagesWithLeads} from '../../../actions/PipelineAction';

    
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
                filterByAscDesc:true, // ASC True
                pipeline:{},
                stages:[],
                leadLastId:{},
                isLoadings:{},
                isMounted:false,
                components:{},
            }
        },
        created() {
            if(this.$route.query.view && this.$route.query.view === 'row'){
                this.dataShowTable = true;
            }else{
                this.dataShowTable = false;
            }
        },
        methods: {
            async fetchPipelineWithStages(){
                try{
                    const res = await FetchPipelineWithStagesWithLeads();
                    try{
                        const {pipeline, stages} = res;
                        this.pipeline = pipeline;
                        this.stages = stages;
                        if(stages){
                            this.stages.map(async({id, leads}, index)=>{
                                this.isLoadings[id] = false;
                                if(!this.components[id]){
                                    this.components[id] = [];
                                }
                                if(leads?.length){
                                    this.leadLastId[id] = leads.pop()?.id;
                                    this.components[id].push({
                                        data:leads,
                                    });
                                }
                            });
                        }
                        this.isMounted = false;
                    }catch(error){

                    }
                }catch(error){}
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
                if(!this.components[id]){
                    this.components[id] = [];
                }
                var position = (100 / event.target.scrollHeight) * (event.target.clientHeight + event.scrollTop);
                if(position > 75 && !this.isLoadings[id]){ // 80%

                    this.isLoadings[id] = true;
                    await new Promise((resolve)=>setTimeout(()=>resolve(true), 5000));
                    this.isLoadings[id] = false;
                    console.log('Hello')
                }
            }
        },
        watch:{
            "$route"(from, to){
                this.redirectFirstPipeline();
                if(from.query?.view && from.query?.view === 'row'){
                    this.dataShowTable = true;
                }else{
                    this.dataShowTable = false;
                }
            }
        },
        mounted() {
            this.isMounted = true;
            this.fetchPipelineWithStages();
        },
    }
</script>
    
    <template>        
      <section class="content pipline-list">
    
        <search-bar></search-bar>

        <section class="tools-bar">
            <div class="row border-bottom px-3 py-1">
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-start align-items-center">
                        <h5 class="m-0 ps-1 fs-20px fw-bold title-dark">
                            <span v-if="!isMounted">Sales</span>
                            <Skeletor v-else style="width:5rem;height:15px;" />
                        </h5>
                        <div class="ms-3">
                            <button type="button" class="toolbar-btn btn btn-light btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                            </button>
                        </div>
                        <div class="mx-2">
                            <router-link to="?view=row">
                                <button type="button" class="toolbar-btn btn btn-light btn-lg btn-floating" data-mdb-ripple-init>
                                    <svg :class="` ${dataShowTable?'active-svg-tbl':''} svg-5`" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></svg>
                                </button>
                            </router-link>
                        </div>
                        <div class="mx-2">
                            <router-link to="?view=column">
                                <button type="button" class="toolbar-btn btn btn-light btn-lg btn-floating" data-mdb-ripple-init>
                                    <svg :class="` ${!dataShowTable?'active-svg-tbl':''} svg-5`" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></svg>
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div> <!-- End Col -->
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-end align-items-center">
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
                                    @click="filterByAscDesc = true" 
                                    class="btn btn-sm" 
                                    :class="filterByAscDesc?'btn-primary':'btn-outline-secondary'">
                                        <span class="me-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentcolor"><path  d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></svg>
                                        </span>
                                        Ascending
                                    </button>
                                    <button @click="filterByAscDesc = false" class="btn btn-sm" :class="!filterByAscDesc?'btn-primary':'btn-outline-secondary'">
                                        <span class="me-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentcolor"><path  d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></svg>
                                        </span>
                                        Descending
                                    </button>
                                </div>
                                <div class="tab-content" id="ex1-content">
                                    <ul :class="filterByAscDesc?'fade show active':''" class="list-unstyled mb-0 ascending-menu tab-pane">
                                        <li class="active"><a class="dropdown-item" href="#">Least recently updated first</a></li>
                                        <li><a class="dropdown-item" href="#">Least recently created first</a></li>
                                        <li><a class="dropdown-item" href="#">Least valuable first</a></li>
                                        <li><a class="dropdown-item" href="#">Least stars first</a></li>
                                        <li><hr class="dropdown-divider m-0" /></li>
                                        <li><a class="dropdown-item" href="#">Manual</a></li>
                                    </ul>
                                    <ul :class="!filterByAscDesc?'fade show active':''" class="list-unstyled mb-0 descending-menu tab-pane">
                                        <li><a class="dropdown-item" href="#">Most recently updated first</a></li>
                                        <li><a class="dropdown-item" href="#">Most recently created first</a></li>
                                        <li><a class="dropdown-item" href="#">Most valuable first</a></li>
                                        <li><a class="dropdown-item" href="#">Most stars first</a></li>
                                        <li><hr class="dropdown-divider m-0" /></li>
                                        <li><a class="dropdown-item" href="#">Manual</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="ms-2">
                            <button @click="filterRightSidebar = !filterRightSidebar" type="button" class="toolbar-btn btn btn-light btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div> <!-- End Col -->
            </div><!-- End Row -->
        </section>

        <!-- Card Pipline -->        
        <div v-if="!dataShowTable" class="pip-body-scrollbar" :style="{overflowY:'hidden' }">
            <section class="pipline d-table">
                <div class="piplien-body d-flex flex-row">
                    
                    
                    <FilterRightSidebar 
                    :class="{show:filterRightSidebar}"
                    @toggle-filter="(e)=> filterRightSidebar = e" />

                    <pipeline-skeletor v-if="isMounted" />

                    <div class="piplien-state" v-for="(stage, index) in stages" :key="index">
                        <div class="pip-header px-3 py-2 d-flex flex-column">
                            <h3 class="fs-18px text-head fw-bold mb-1">{{ stage.name }}</h3>
                            <span class="fs-12px text-head">{{ stage?.leads?.length }} Deals</span>
                        </div>
                        <div class="py-1 value-bar">
                            <div class="px-3 d-flex justify-content-between align-items-center">
                                <span class="text-head fw-bold fs-12px">Value</span>
                                <span class="text-head fw-bold fs-12px">$0.00</span>
                            </div>
                        </div>

                        <CustomScrollbar :simulateScroll="true" thumbWidth="3.5" direction="horizontal"  @scroll="infiniteLoadedLeads($event, stage.id)">
                            <div class="pip-body px-2">
                                <component v-for="(component, index) in components[stage.id]??[]" :key="index" is="pipeline-state-lead-details" :data="component.data" :index="index"></component>
                                <loading-state-leads :show="isLoadings[stage.id]" :size="1" />
                            </div>
                        </CustomScrollbar>

                    </div>

                    <!-- Empty State -->
                    <div class="piplien-state">
                        <div class="pip-header px-3 py-2 d-flex flex-column">
                            <h3 class="fs-18px text-head fw-bold mb-1" style="opacity: 0;">Newly qualified</h3>
                            <span class="fs-12px text-head" style="opacity: 0;">71 Deals</span>
                        </div>
                        <div class="py-1 value-bar">
                            <div class="px-3 d-flex justify-content-between align-items-center">
                                <span class="text-head fw-bold fs-12px" style="opacity: 0;">Value</span>
                                <span class="text-head fw-bold fs-12px" style="opacity: 0;">$0.00</span>
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
<style>
    .pipline-list .piplien-body,
    .pipline-list .pip-body-scrollbar{
        height:calc(100vh - 102px) !important;        
    }
    .pipline-list .piplien-state .scrollbar__scroller{
        scroll-behavior: smooth !important;
        height: 100% !important;
    }
    .pipline-list .piplien-state .scrollbar__wrapper{
        height: calc(79vh - 5px) !important;
    }
    .pipline-list .active-svg-tbl{
        fill:#3295ff !important;
    }
</style>