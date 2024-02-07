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
                            <button type="button" class="btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                            </button>
                        </div>
                        <div class="mx-2">
                            <button type="button" class="btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></svg>
                            </button>
                        </div>
                        <div class="mx-2">
                            <button type="button" class="btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div> <!-- End Col -->
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-end align-items-center">
                        <div class="">
                            <a class="btn btn-secondary btn-md fs-14px text-head fw-bold" href="#!" role="button">
                                <span class="me-2">
                                    <svg data-v-7f87cff1="" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path data-v-7f87cff1="" d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></svg>
                                </span>
                                Most recently updated first
                            </a>
                        </div>
                        <div class="ms-2">
                            <button type="button" class="btn btn-light btn-md btn-lg btn-floating" data-mdb-ripple-init>
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path data-v-63f5dadc="" d="M0 0h24v24H0z" fill="none"></path> <path data-v-63f5dadc="" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div> <!-- End Col -->
            </div><!-- End Row -->
        </section>
        <!-- <vue-custom-scrollbar class="pipline-scrollbar"  :settings="settings" @ps-scroll-y="scrollHanle"> -->
            <section class="pipline d-table">
                <div class="piplien-body d-flex flex-row">
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    <div class="piplien-state">
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
                        <div class="pip-body px-2">
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                            <div class="pip-item">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
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
                        <div class="pip-body px-2">
                            <div class="pip-item" style="opacity: 0;">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officiis, magnam voluptate nam exercitationem debitis autem unde, assumenda, sint molestiae tenetur reiciendis voluptates. Quae eum itaque fugiat commodi. Reiciendis, beatae.
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        <!-- </vue-custom-scrollbar> -->


        
      </section>
    
    </template>
    
    <style scoped lang="scss">
    .value-bar{
        background-color: #e5f4ff;
        border-bottom: 1px solid #80c6ff;
        border-top: 1px solid #80c6ff;
    }
    .piplien-body{
        background-color: #f5f7fa;
        width: 82vw;
        overflow-y: hidden;
        display: -webkit-inline-box !important;
        height: 87.8vh;
    }
    .pipline-scrollbar{
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    .piplien-state{
        width:272px;
        max-width:300px;
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
    .pip-item{
        background-color: #ffffff;
        border-radius: 4px;
        margin: 15px 0px;
        padding: 13px;
        height: 125px;
        overflow: hidden;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
    .pip-body{
        height: 80vh;
        overflow: scroll;
        padding-bottom:250px;
    }
    .pip-body::-webkit-scrollbar,
    .piplien-body::-webkit-scrollbar
    {
        width: 3px;
        height:8px;
        border-radius:50%;
        cursor: pointer;
    }
    .pip-body::-webkit-scrollbar-track,
    .piplien-body::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
        background-color:rgba(255, 0, 0, 0);
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
    
    .pip-body::-webkit-scrollbar-thumb,
    .piplien-body::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: rgba(32, 55, 71, 0.509);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    
    .pip-body::-webkit-scrollbar-thumb:window-inactive,
    .piplien-body::-webkit-scrollbar-thumb:window-inactive {
        background: rgb(12, 74, 110);
    }
    </style>