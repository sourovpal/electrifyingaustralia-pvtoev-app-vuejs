<script>

import SearchBar from '../../../components/SearchBar.vue';
import ActionBar from '../../../components/ActionBar/ActionBar.vue';
import LeftActionBar from '../../../components/ActionBar/LeftActionBar.vue';
import RightActionBar from '../../../components/ActionBar/RightActionBar.vue';
import Datatable from '../../../components/Datatable/Datatable.vue';
import DatatableHeader from '../../../components/Datatable/DatatableHeader.vue';
import DatatableBody from '../../../components/Datatable/DatatableBody.vue';

export default {
  components: {
    SearchBar,
    ActionBar,
    LeftActionBar,
    RightActionBar,
    Datatable,
    DatatableBody,
    DatatableHeader,
},
  data() {
    return {
      selectAllIds:[],
    }
  },
  methods: {
    selectAll(){
      if(this.selectAllIds.length > 0){
        this.selectAllIds = [];
      }else{
        this.selectAllIds = Array.from(Array(100).keys());
      }
    }
  },
  watch:{
  }
}
</script>

<template>

  <section class="content">

    <search-bar></search-bar>

    <action-bar>

      <left-action-bar>
        <div class="item d-flex justify-content-center align-item-start wh-40" style="margin-left: 10px;">
            <label class="checkbox">
                <input @click="selectAll" class="checkbox__input" type="checkbox">
                <svg style="width:19px;height: 19px;" class="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#c6c6c6" rx="3" /><path class="tick" stroke="#afafaf" fill="none" stroke-linecap="round" stroke-width="4" d="M4 10l5 5 9-9" /></svg>
            </label>
        </div>
        <div class="item wh-40">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
        </div>
      </left-action-bar>

      <right-action-bar>
        <div class="item wh-40">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path   d="M0 0h24v24H0z" fill="none"></path> <path   d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
        </div>
        <div class="item d-none d-lg-flex wh-40">
          <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M3,5H8.3V19H3zM17,10c1.5,0,2.9,0.5,4,1.3V5h-5.3v5.1C16.1,10,16.5,10,17,10zM10,17c0-3,2-5.6,4.7-6.6V5H9.3v14h1C10.1,18.4,10,17.7,10,17zM20.8,17c0-0.2,0-0.4-0.1-0.6l1.1-1l-1-1.7l-1.5,0.5c-0.3-0.3-0.7-0.5-1.1-0.6L18,12h-2l-0.3,1.5c-0.4,0.1-0.8,0.4-1.1,0.6l-1.4-0.5l-1,1.7l1.1,1c0,0.2-0.1,0.4-0.1,0.6s0,0.4,0.1,0.6l-1.1,1l1,1.7l1.4-0.5c0.3,0.3,0.7,0.5,1.1,0.6L16,22h2l0.3-1.5c0.4-0.1,0.8-0.4,1.1-0.6l1.5,0.5l1-1.7l-1.1-1C20.7,17.4,20.8,17.2,20.8,17z M17,19c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,19,17,19z"></path></svg>
        </div>
        <div class="fw-bold d-flex justify-content-center align-items-center wh-40" style="width: 4rem;">1-100</div>
        <div class="item wh-40">
            <svg  class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
        </div>
        <div class="item wh-40">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
        </div>
      </right-action-bar>

    </action-bar>

    <Datatable>

      <datatable-header class="d-none d-md-inline-block">

        <div class="tbl-th" style="width:3rem;"></div>
        <div class="d-flex flex-direction-row justify-content-between w-100">
            <div class="d-flex flex-direction-row">
                <div class="tbl-th" style="width:calc(28rem - 18px);">Project</div>
                <div class="tbl-th" style="width:12rem;"></div>
                <div class="tbl-th" style="width:12rem;"></div>
            </div>
            <div class="d-flex flex-direction-row">
                <div class="tbl-th">Last Update</div>
                <div class="tbl-th">Created At</div>
            </div>
        </div>

      </datatable-header>

      <datatable-body>

        <div class="tbl-tr full-width" v-for="(item, index) in Array.from(Array(100).keys())" :key="index">

          <div style="width:3rem;" class="tbl-td">
            <label class="checkbox">
                <input v-model="selectAllIds" :value="index" class="checkbox__input" type="checkbox">
                <svg class="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#c6c6c6" rx="3" /><path class="tick" stroke="#afafaf" fill="none" stroke-linecap="round" stroke-width="4" d="M4 10l5 5 9-9" /></svg>
            </label>
          </div>

          <div class="d-flex flex-direction-row w-100 justify-content-between">

              <div class="d-flex flex-direction-row">
                  <div style="width:calc(28rem - 18px);" class="tbl-td full-width">
                    <div class="browse__project-primary">
                        <div title="51 Dalmar St, Croydon New South Wales 2132" class="fw-bold">
                            <span class="browse__street">51 Dalmar St, Croydon</span> 
                            <span class="browse__state">New South Wales 2132</span>
                        </div>
                        <div class="browse__address" style="display: none;">
                            <span class="browse__state">Unknown address</span>
                        </div>
                        <div class="text-muted">
                            <span>Customer name</span> ·
                            <span>Contact number</span> ·
                            <span>Email</span>
                        </div>
                    </div>
                  </div>
        
                  <div style="width:12rem;" class="tbl-td full-width">
                    <data value="">
                        <span class="d-block fw-bold">$6,000.00</span>
                        <div class="d-block">
                            <span>5.92kW · Canadian</span>
                        </div>
                    </data>
                  </div>
        
                  <div style="width:12rem;" class="tbl-td full-width">
                    <div class="">
                        <div class="d-block">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path> 
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                        </div>
                        <span class="d-block text-muted">sent</span>
                    </div>
                  </div>
              </div>
    
              <div class="d-flex flex-direction-row">
                  <div class="tbl-td d-none d-md-flex">05/07/2023</div>
                  <div class="tbl-td d-none d-md-flex">25/07/2023</div>
              </div>

          </div>

        </div>

      </datatable-body>

    </Datatable>
  </section>
  
  <!-- ============================ -->

  <div class="modal fade" id="myModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel1" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <!-- <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel1">Modal 1</h5>
          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
        </div> -->
        <div class="modal-body">
          Show a second modal and hide this one with the button below.
        </div>
        <!-- <div class="modal-footer">
          <button class="btn btn-primary" data-mdb-target="#exampleModalToggle22" data-mdb-toggle="modal" data-mdb-dismiss="modal">
            Open second modal
          </button>
        </div> -->
      </div>
    </div>
  </div>




</template>

<style scoped>
 .tbl{
    height: calc(100vh - 100px) !important;
 }
</style>
