<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import Datatable from '../../../components/Datatable/Datatable.vue';
import DatatableHeader from '../../../components/Datatable/DatatableHeader.vue';
import DatatableBody from '../../../components/Datatable/DatatableBody.vue';



export default {
  name:'AccountIndex',
    data() {
      return{
      }
    },
    components:{
        vueCustomScrollbar,
        Datatable,
        DatatableHeader,
        DatatableBody,
    }
  }
  
</script>

<template>

<section class="content">
    
    <div class="content-header">
        <div class="d-flex justify-content-start align-items-center">
            <router-link to="/settings/api">
                <h1 class="mb-0">API settings</h1>
            </router-link>
            <div class="mx-2">
                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
            </div>
            <h1 class="mb-0">API Logs</h1>
        </div>
        <span class="sub-title fs-14px mt-2 d-block">
            Logs of events that occur in your account are retained for up to 14 days.<br>
            <span class="mt-1 d-block">If a request fails because of incorrect or missing authentication information, it will not appear here.</span>
        </span>
    </div>


    <Datatable>

        <datatable-header class="d-none d-md-inline-block tbl-header-custom-style">

            <div class="tbl-th" style="width:2rem;"></div>
            <div class="d-flex flex-direction-row w-100">

                <div class="d-flex flex-direction-row">
                    <div class="tbl-th" style="width:18rem;">Status</div>
                </div>

                <div class="d-flex flex-direction-row">
                    <div class="tbl-th" style="width:30rem;">Description</div>
                </div>

                <div class="tbl-th space"></div>
                <div class="d-flex flex-direction-row">
                    <div class="tbl-th">Timestamp</div>
                    <div class="tbl-th"><span style="opacity:0;">Action</span></div>
                </div>

            </div>

        </datatable-header>

        <datatable-body class="tbl-body-custom-style">

            <div class="tbl-tr full-width" v-for="(item, index) in Array.from(Array(20).keys())" :key="index">

                <div style="width:2rem;" class="tbl-td"></div>

                <div class="d-flex flex-direction-row justify-content-between w-100">

                    <div class="d-flex flex-direction-row">

                        <div style="width:18rem;" class="tbl-td full-width">
                            <span class="btn btn-success btn-sm px-2 py-1 fs-12px" v-if="index%2==0">200</span>
                            <span class="btn btn-danger btn-sm px-2 py-1 fs-12px" v-if="index%2!=0">500</span>
                        </div>
                        <div style="width:30rem;" class="tbl-td full-width">
                            <span class="text-decoration-none d-block w-100 text-overflow-ellipsis">Design updated by Ekansh for project at 21 Samarai Rd, Whalan Design updated by Ekansh for project at 21 Samarai Rd, WhalanDesign updated by Ekansh for project at 21 Samarai Rd, WhalanDesign updated by Ekansh for project at 21 Samarai Rd, WhalanDesign updated by Ekansh for project at 21 Samarai Rd, Whalan</span>
                        </div>
                
                    </div>
                    <div class="d-flex flex-direction-row">
            
                        <div class="tbl-td d-none d-md-flex">3 hours ago</div>
                
                        <div class="tbl-td d-none d-md-flex">
                            <router-link to="/settings/api/event-logs/details/fsldkfsdfsd4sdf" class="event-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

        </datatable-body>

    </Datatable>


</section>


</template>

<style lang="scss" scoped>
.tbl-header-custom-style{
    width:100% !important;
}
.tbl-body-custom-style{
    width:100% !important;
}
.tbl-body{
    margin-top: 0px !important;
}
.event-btn{
    visibility: hidden;
    opacity: 0;
    transition:opacity 0.1s;
    svg{
        fill:#1b8de7;
    }
    &:hover{
        svg{
            fill:#045da3;
        }
    }
}
.tbl-tr{
    &:hover .event-btn{
        opacity: 1;
        visibility: visible;
    }
}
</style>