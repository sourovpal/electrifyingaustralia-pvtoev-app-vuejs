<script>

    import SearchBar from '../../../components/SearchBar.vue';
    import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import 'custom-vue-scrollbar/dist/style.css';
    export default {
        components: {
            SearchBar,
            vueCustomScrollbar,
            CustomScrollbar
        },
        data() {
            return {
                settings: {
                    suppressScrollY: true,
                    suppressScrollX: false,
                    wheelPropagation: false,
                    wheelSpeed:0.4,
                }
            }
        },
        methods: {
            scrollHanle(evt) {
            // console.log(evt)
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
                            <button type="button" class="toolbar-btn btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></svg>
                            </button>
                        </div>
                        <div class="mx-2">
                            <button type="button" class="toolbar-btn btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div> <!-- End Col -->
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-end align-items-center">
                        <div class="">
                            <a class="btn btn-secondary btn-md fs-14px text-head fw-bold btn-sm" href="#!" role="button">
                                <span class="me-2">
                                    <svg data-v-7f87cff1="" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path data-v-7f87cff1="" d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></svg>
                                </span>
                                Most recently updated first
                            </a>
                        </div>
                        <div class="ms-2">
                            <button type="button" class="toolbar-btn btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path data-v-63f5dadc="" d="M0 0h24v24H0z" fill="none"></path> <path data-v-63f5dadc="" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div> <!-- End Col -->
            </div><!-- End Row -->
        </section>
        <!-- <vue-custom-scrollbar class="pipline-scrollbar"  :settings="settings" @ps-scroll-y="scrollHanle"> -->
            <CustomScrollbar class="pip-body-scrollbar" thumbWidth="10" direction="horizontal" :style="{overflowY:'hidden' }">
                <section class="pipline d-table">
                    <div class="piplien-body d-flex flex-row">
                        
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
                                            <div class="pip-user">
                                                <img class="pip-user-avatar" src="https://www.gravatar.com/avatar/31abcedd82c87dd621142af7f4dbe722?s=64&d=mp&r=PG" alt="">
                                                <span class="pip-value">$-</span>
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
        <!-- </vue-custom-scrollbar> -->


        
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
    </style>