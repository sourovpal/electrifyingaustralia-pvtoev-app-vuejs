<script>

    import SearchBar from '../../../../components/SearchBar.vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import 'custom-vue-scrollbar/dist/style.css';

    import ActionBar from '../../../../components/ActionBar/ActionBar.vue';
    import LeftActionBar from '../../../../components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '../../../../components/ActionBar/RightActionBar.vue';
    import Datatable from '../../../../components/Datatable/Datatable.vue';
    import DatatableHeader from '../../../../components/Datatable/DatatableHeader.vue';
    import DatatableBody from '../../../../components/Datatable/DatatableBody.vue';



    export default {
        components: {
            SearchBar,
            CustomScrollbar,
            ActionBar,
            LeftActionBar,
            RightActionBar,
            Datatable,
            DatatableHeader,
            DatatableBody,
        },
        data() {
            return {
            }
        },
        created() {
        },
        methods: {
            scrollHanle(evt) {
            // console.log(evt)
            }
        },
        watch:{
            "$route":function(from, to){
            }
        }
    }
</script>
    
    <template>        
      

        <section class="content contacts-list">

            <search-bar></search-bar>
        
            <action-bar>
        
            <left-action-bar>
                <button class="toolbar-btn btn btn-light btn-floating ms-2">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                </button>
            </left-action-bar>
        
            <right-action-bar>
                <div class="fw-bold d-flex justify-content-center align-items-center wh-40" style="width: 4rem;">1-100</div>
                <button class="toolbar-btn btn btn-light btn-floating me-3">
                    <svg  class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                </button>
                <button class="toolbar-btn btn btn-light btn-floating me-3">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
                </button>
                
            </right-action-bar>
        
            </action-bar>
        
            <Datatable>
        
                <datatable-header class="">
                    <div class="tbl-th" style="width:20rem;">Contact</div>
                    <div class="tbl-th " style="width:20rem;">Phone Number</div>
                    <div class="tbl-th" style="width:15rem;flex-grow: 1;">Email Address</div>
                    <div class="tbl-th" style="width:10rem;">Last Update</div>
                    <div class="tbl-th" style="width:10rem;">Created At</div>
                </datatable-header>
        
                <datatable-body>
        
                    <div class="tbl-tr full-width" v-for="(item, index) in Array.from(Array(100).keys())" :key="index">
        
                        <div style="width:20rem;" class="tbl-td full-width">
                            <a class="text-overflow-ellipsis" href="" v-if="(index%2==0)"> New {{ (item?item:1) * 2155 }} South Wales</a>
                            <a class="text-overflow-ellipsis" href="" v-if="(index%2!==0)"> {{ (item?item:1) * 2155 }} Old South Powerman Local</a>
                        </div>
                
                        <div style="width:20rem;" class="tbl-td d-none d-lg-flex">
                            +88 {{item}}17123{{ (item?item:1) * 2155 }}
                        </div>
                
                        <div style="width:15rem;flex-grow: 1;" class="tbl-td d-none d-lg-flex">
                            <a class="text-overflow-ellipsis" href="">powermanlaocal@gmail.com</a>
                        </div>
        
                        <div style="width:10rem;" class="tbl-td d-none d-lg-flex">05/07/2023</div>
                
                        <div style="width:10rem;" class="tbl-td d-none d-lg-flex">25/07/2023</div>
                    </div>
                </datatable-body>
        
            </Datatable>
          </section>

    
    </template>
    
    <style scoped lang="scss">

    </style>
    <style>
        .contacts-list .tbl-body .tbl-tr .tbl-td{
            padding:12px 16px !important;
        }
        .contacts-list .scrollbar__wrapper,
        .contacts-list .scrollbar__scroller{
            height: 100%;
        }
    </style>