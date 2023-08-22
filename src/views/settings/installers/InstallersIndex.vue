<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";

export default {
  name:'AccountIndex',
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
        <h1>Installers list</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-10">
                    <table class="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th class="fw-bold" width="15%" scope="col">Installer Name</th>
                                <th class="fw-bold" width="15%" scope="col">Email</th>
                                <th class="fw-bold" width="10%" scope="col">Phone</th>
                                <th class="fw-bold" width="10%" scope="col">License no.</th>
                                <th class="fw-bold" width="15%" scope="col">CEC accr. no.</th>
                                <th class="fw-bold" width="15%" scope="col"><span class="d-none">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                                <td>Ibrahim Saleh</td>
                                <td>Ibrahim.sal300@gmail.com</td>
                                <td>0474 265 201</td>
                                <td>353420c</td>
                                <td>A1486311</td>
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
                    <a class="btn btn-primary" href="">Add new installer</a>
                </div>
            </div>

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>

<style lang="scss" scoped>
</style>