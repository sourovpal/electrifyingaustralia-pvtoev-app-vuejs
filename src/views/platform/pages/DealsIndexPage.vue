<script>

    import SearchBar from '../../../components/SearchBar.vue';
    import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import 'custom-vue-scrollbar/dist/style.css';
    import FilterRightSidebar from './pipline/FilterRightSidebar.vue';
    import Datatable from '../../../components/Datatable/Datatable.vue';
    import DatatableHeader from '../../../components/Datatable/DatatableHeader.vue';
    import DatatableBody from '../../../components/Datatable/DatatableBody.vue';

    export default {
        components: {
            SearchBar,
            vueCustomScrollbar,
            CustomScrollbar,
            FilterRightSidebar,
            Datatable,
            DatatableHeader,
            DatatableBody
        },
        data() {
            return {
                filterRightSidebar:false,
                dataShowTable:false,
                filterByAscDesc:true, // ASC True
                settings: {
                    suppressScrollY: true,
                    suppressScrollX: false,
                    wheelPropagation: false,
                    wheelSpeed:0.4,
                }
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
            scrollHanle(evt) {
            // console.log(evt)
            }
        },
        watch:{
            "$route":function(from, to){
                if(from.query.view && from.query.view === 'row'){
                    this.dataShowTable = true;
                }else{
                    this.dataShowTable = false;
                }
            }
        }
    }
</script>
    
    <template>        
      <section class="content">
    
        <search-bar></search-bar>

        <section class="tools-bar">
            <div class="row border-bottom px-3 py-1">
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-start align-items-center">
                        <h5 class="m-0 ps-1 fs-20px fw-bold title-dark">Selas</h5>
                        <div class="ms-5">
                            <button type="button" class="toolbar-btn btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                            </button>
                        </div>
                        <div class="mx-2">
                            <router-link to="?view=row">
                                <button type="button" class="toolbar-btn btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                    <svg :class="` ${dataShowTable?'active-svg-tbl':''} svg-5`" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></svg>
                                </button>
                            </router-link>
                        </div>
                        <div class="mx-2">
                            <router-link to="?view=column">
                                <button type="button" class="toolbar-btn btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
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
                            class="btn btn-secondary btn-md fs-14px text-head fw-bold btn-sm dropdown-toggle">
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
                            <button @click="filterRightSidebar = !filterRightSidebar" type="button" class="toolbar-btn btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div> <!-- End Col -->
            </div><!-- End Row -->
        </section>

        <!-- Card Pipline -->        
        <CustomScrollbar v-if="!dataShowTable" class="pip-body-scrollbar" thumbWidth="10" direction="horizontal" :style="{overflowY:'hidden' }">
            <section class="pipline d-table">
                <div class="piplien-body d-flex flex-row">
                    
                    
                    <FilterRightSidebar 
                    :class="filterRightSidebar?'show':''"
                    @toggle-filter="(e)=> filterRightSidebar = e" />

                    <div class="piplien-state" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index">
                        <div class="pip-header px-3 py-2 d-flex flex-column">
                            <h3 class="fs-18px text-head fw-bold mb-1">Newly qualified</h3>
                            <span class="fs-12px text-head">71 Deals</span>
                        </div>
                        <div class="py-1 value-bar">
                            <div class="px-3 d-flex justify-content-between align-items-center">
                                <span class="text-head fw-bold fs-12px">Value</span>
                                <span class="text-head fw-bold fs-12px">$0.00</span>
                            </div>
                        </div>  
                        <CustomScrollbar thumbWidth="10" direction="horizontal" :style="{height: '100%' }">
                            <div class="pip-body px-2">
                                <a v-for="(item, index) in 10" :key="index" class="" href="">
                                    <div class="pip-item">
                                        <h5 class="pip-title">2 Muriel Street, Maryborough</h5>
                                        <p class="pip-sub-title">Mrs. CHERYL · Mrs. CHERYL 4650 QLD 21/02/12:00 PM Phone</p>
                                        <div class="pip-user d-flex justify-content-between align-items-center">
                                            <div>
                                                <img class="pip-user-avatar" src="https://www.gravatar.com/avatar/31abcedd82c87dd621142af7f4dbe722?s=64&d=mp&r=PG" alt="">
                                                <span class="pip-value">$-</span>
                                            </div>
                                            <div class="fs-16px star-value d-flex justify-content-start align-items-center">
                                                <span class="me-1">1</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#de911d" class="icon icon--star icon--inline"><path d="M0 0h24v24H0z" fill="none"></path><path d="M0 0h24v24H0z" fill="none"></path> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                                            </div>
                                        </div>
                                        <div class="pip-source">EA call center</div>
                                    </div>
                                </a>
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
        </CustomScrollbar>
        <!-- Card Pipline End -->

        <!-- Pipline Table Data -->
        <section v-if="dataShowTable" class="pipline__table">

            <FilterRightSidebar 
            :class="filterRightSidebar?'show':''"
            @toggle-filter="(e)=> filterRightSidebar = e" />

            <CustomScrollbar class="pip-body-scrollbar" thumbWidth="10">

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
                        <div class="col-4 text-head fs-12px fw-bold py-1">Deal</div>
                        <div class="col-2 text-head fs-12px fw-bold py-1">Value</div>
                        <div class="col-2 text-head fs-12px fw-bold py-1">Last Update</div>
                        <div class="col-2 text-head fs-12px fw-bold py-1">First Create</div>
                        <div class="col-2 text-head fs-12px fw-bold py-1">Owner</div>
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
    
    <style scoped lang="scss">
    .toolbar-btn{
        width:35px !important;
        height: 35px !important;
    }
    .value-bar{
        background-color: #e5f4ff;
        border-bottom: 1px solid #80c6ff;
        border-top: 1px solid #80c6ff;
    }
    .piplien-body{
        background-color: #f5f7fa;
    }
    .pipline-scrollbar{
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    .piplien-state{
        width:272px;
        max-width:300px;
        &:last-child{
            .pip-header{
                padding-right:20px;
                &::before,
                &::after{
                    display: none;
                }
            }
        }
    }
    .pip-header{
        background-color: #ffffff;
        position: relative;
        &::before{
            content: "";
            position: absolute;
            top:-1px;
            right: 0;
            width: 1px;
            height: 53%;
            background-color: #dddddd;
            transform: rotate(-15deg);
            z-index: 1;
        }
        &::after{
            content: "";
            position: absolute;
            bottom:-1px;
            right: 0;
            width: 1px;
            height:53%;
            background-color: #dddddd;
            transform: rotate(15deg);
            z-index: 1;
        }
    }
    .pip-body{
        width:100%;
        height:100%;
        padding-bottom: 200px;
        .pip-item{
            background-color: #ffffff;
            border-radius: 4px;
            margin: 15px 0px;
            padding: 13px;
            height: 125px;
            overflow: hidden;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
            .pip-title{
                font-size: 16px;
                font-weight: 700;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                width: 225px;
                margin-bottom: 5px;
                color:#007ee5;
            }
            .pip-sub-title{
                font-size: 14px;
                line-height: 18px;
                margin-bottom: 3px;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical; 
            }
            .pip-user{
                line-height:18px;
                .pip-user-avatar{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #f1f1f1;
                    object-fit: cover;
                }
                .pip-value{
                    color: #1f2933;
                    font-size: .875rem;
                    font-weight: 700;
                    line-height: 1.5rem;
                    margin-left: .5rem;
                }
                .star-value{
                    color: #de911d;
                }
            }
            .pip-source{
                font-size: 14px;
                font-weight: 500;
                color: #696767;
                line-height: 20px;   
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                width: 225px;
            }
        }        
    } 
    .text-overflow-ellipsis{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .line-height-15px{
        line-height: 15px;
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
    .dropdown-sorted{
        position: relative;
        .dropdown-sorted-list{
            width:calc(100% + 2rem);
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
            border-radius: 4px;

            &::before {
                content: "";
                position: absolute;
                top: -7px;
                right: 18px;
                border: 7px solid #f1f0f0;
                border-right-color: white;
                border-bottom-color: white;
                transform: rotate(45deg);
                border-bottom-color: transparent;
                border-right-color: transparent;
            }
            &::after {
                content: "";
                position: absolute;
                top: -6px;
                right: 18px;
                border: 7px solid white;
                border-right-color: white;
                border-bottom-color: white;
                transform: rotate(45deg);
                border-bottom-color: transparent;
                border-right-color: transparent;
            }
            .ascending-menu, 
            .descending-menu{
                li.active{
                    position: relative;
                    &::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 0px;
                        width: 4px;
                        height: 30px;
                        background: #3b71ca;
                        border-top-right-radius: 5px;
                        border-bottom-right-radius: 5px;
                    }
                }
            }
        }
    }


    </style>
    <style>
        .piplien-body,
        .pip-body-scrollbar{
            height:calc(88vh + 5px) !important;        
        }
        .piplien-state .scrollbar__wrapper{
            height: 100% !important;
        }
        .piplien-state .scrollbar__thumbPlaceholder{
            width:3px !important;
        }
        .piplien-state .scrollbar__content.scrollbar__content--horizontal{
            min-height: 75vh;
            width: 100% !important;
        }
        .content > .scrollbar__wrapper > .scrollbar__thumbPlaceholder--vertical{
            display: none !important;
        }

        .content > .pipline__table > .scrollbar__wrapper > .scrollbar__thumbPlaceholder--vertical{
            display: block !important;
        }
        .active-svg-tbl{
            fill:#3295ff !important;
        }
    </style>