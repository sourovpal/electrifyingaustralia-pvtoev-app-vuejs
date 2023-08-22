<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
  name:'ProfileIndex',
    data() {
      return{
      }
    },
    components:{
        vueCustomScrollbar,
    }
  }
  
</script>

<template>

  <vue-custom-scrollbar :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" class="content">
    
    <div class="content-header">
        <h1 class="mb-3">Line item packages</h1>
        <p class="w-75 sub-title pe-5">
            When adding line items to a design, these packages will show up in the search dropdown. This is a convenient way to add commonly-used groups of items to your quote.
        </p>
    </div>

    <div class="content-body">
        <div class="row">
            <div class="col-12 col-lg-10">
                <table class="table table-sm table-striped- table-hover">
                    <thead>
                        <tr>
                            <th class="text-muted fw-bold" width="40%" scope="col">Package name</th>
                            <th class="text-muted fw-bold" width="40%" scope="col">Last updated</th>
                            <th class="text-muted fw-bold" width="20%" scope="col"><span class="d-none">Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tile</td>
                            <td class="text-right"><span>4 months ago</span></td>
                            <td class="text-end">
                                <a class="me-1 btn btn-info btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                </a>
                                <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>Tin </td>
                            <td class="text-right"><span>4 months ago</span></td>
                            <td class="text-end">
                                <a class="me-1 btn btn-info btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                </a>
                                <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>Double </td>
                            <td class="text-right"><span>4 months ago</span></td>
                            <td class="text-end">
                                <a class="me-1 btn btn-info btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                </a>
                                <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>3Phase</td>
                            <td class="text-right"><span>4 months ago</span></td>
                            <td class="text-end">
                                <a class="me-1 btn btn-info btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                </a>
                                <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>Klip Lock </td>
                            <td class="text-right"><span>4 months ago</span></td>
                            <td class="text-end">
                                <a class="me-1 btn btn-info btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                </a>
                                <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>Tilt Frames</td>
                            <td class="text-right"><span>4 months ago</span></td>
                            <td class="text-end">
                                <a class="me-1 btn btn-info btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                </a>
                                <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>panel Removal</td>
                            <td class="text-right"><span>4 months ago</span></td>
                            <td class="text-end">
                                <a class="me-1 btn btn-info btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M480-120v-71l216-216 71 71-216 216h-71ZM120-330v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120-495v-60h470v60H120Zm0-165v-60h470v60H120Z"/></svg>
                                </a>
                                <a class="ms-1 btn btn-danger btn-sm px-2" href="">
                                    <svg height="20" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-12 mt-3">
                <a class="btn btn-primary fw-bold" href="">Add new Packages</a>
            </div>
        </div>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
</style>