<script>

import SearchBar from '../SearchBar.vue';
import ActionBar from '../ActionBar/ActionBar.vue';
import LeftActionBar from '../ActionBar/LeftActionBar.vue';
import RightActionBar from '../ActionBar/RightActionBar.vue';
import Datatable from './Datatable.vue';
import DatatableHeader from './DatatableHeader.vue';
import DatatableBody from './DatatableBody.vue';

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
    }
  },
  methods: {
    
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
                <input class="checkbox__input" type="checkbox">
                <svg style="width:19px;height: 19px;" class="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#c6c6c6" rx="3" /><path class="tick" stroke="#1968ff" fill="none" stroke-linecap="round" stroke-width="4" d="M4 10l5 5 9-9" /></svg>
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
        <div class="item d-none d-lg-flex">
            <button class="btn btn-sm btn-primary fw-bold" data-mdb-toggle="modal" data-mdb-target="#myModal">
                <svg class="me-2" width="24" height="24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account-plus</title><path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" /></svg>
                New Lead
            </button>
        </div>
        <div class="item d-none d-lg-flex">
            <div class="dropdown import-dropdown">
                <button class="btn btn-sm btn-light fw-bold d-flex align-items-center" type="button" data-mdb-toggle="dropdown" aria-expanded="false">
                    <span class="pe-4">Import</span>
                    <div class="dropdown--icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                    </div>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#">Upload spreadsheet...</a></li>
                  <li><a class="dropdown-item" href="#">Connect to lead providers</a></li>
                </ul>
            </div>
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

      <datatable-header class="d-none d-md-block">

        <div class="tbl-th" style="width:3rem;"></div>
        <div class="tbl-th" style="width:18rem;">Lead</div>
        <div class="tbl-th">Source</div>
        <div class="tbl-th" style="width:5rem;">State</div>
        <div class="tbl-th" style="width:13.5rem;">Status</div>
        <div class="tbl-th">Name</div>
        <div class="tbl-th" style="width:9rem;">Phone Number</div>
        <div class="tbl-th" style="width:20rem;">Email Address</div>
        <div class="tbl-th" style="width:20rem;">Reocrd Link</div>
        <div class="tbl-th" style="width:20rem;">Note</div>
        <div class="tbl-th">Last Update</div>
        <div class="tbl-th">Created At</div>

      </datatable-header>

      <datatable-body>

        <div class="tbl-tr full-width" v-for="(item, index) in Array.from(Array(100).keys())" :key="index">

          <div style="width:3rem;" class="tbl-td">
            <label class="checkbox">
                <input class="checkbox__input" type="checkbox">
                <svg class="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#c6c6c6" rx="3" /><path class="tick" stroke="#1968ff" fill="none" stroke-linecap="round" stroke-width="4" d="M4 10l5 5 9-9" /></svg>
            </label>
          </div>

          <div style="width:18rem;" class="tbl-td full-width">
            <a class="text-decoration-none d-block w-100 py-1 text-overflow-ellipsis" href="" v-if="(index%2==0)"> New {{ (item?item:1) * 2155 }} South Wales</a>
            <a class="text-decoration-none d-block w-100 py-1 text-overflow-ellipsis" href="" v-if="(index%2!==0)"> {{ (item?item:1) * 2155 }} Old South Powerman Local</a>
          </div>

          <div class="tbl-td d-none d-md-flex">
            <span class="text-overflow-ellipsis">Powerman Local</span>
          </div>

          <div class="tbl-td d-none d-md-flex" style="width:5rem;"> {{ (item?item:1) * 2155 }}</div>

          <div class="tbl-td d-none d-md-flex" style="width:13.5rem;">
            <div class="dropdown w-100">
                <button class="btn btn-sm btn-light fw-400 w-100 d-flex justify-content-between align-items-center" type="button" data-mdb-toggle="dropdown" aria-expanded="false">
                    <span class="fw-bold text-fs tbl-dropdown-title">New</span>
                    <div class="dropdown--icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                    </div>
                </button>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item selected" href="#">New</a>
                    <a class="dropdown-item" href="#">Leads Allocated</a>
                    <a class="dropdown-item" href="#">Contacted & Appointed</a>
                    <a class="dropdown-item" href="#">Proposal Sent</a>
                    <a class="dropdown-item" href="#">Proposal Sent</a>
                    <a class="dropdown-item" href="#">Waiting for decision</a>
                    <a class="dropdown-item" href="#">Follow Up</a>
                    <a class="dropdown-item d-flex justify-content-between align-items-center" href="#">
                      Unreachable
                      <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                    </a>
                    <a class="dropdown-item d-flex justify-content-between align-items-center" href="#">
                      Cancel after sign
                      <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                    </a>
                    <a class="dropdown-item d-flex justify-content-between align-items-center" href="#">
                      Lost 
                      <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                    </a>
                </div>
            </div>
          </div>

          <div class="tbl-td d-none d-md-flex">
            <span class="text-overflow-ellipsis">Powernam.</span>
          </div>

          <div style="width:9rem;" class="tbl-td d-none d-md-flex">+88 {{item}}17123{{ (item?item:1) * 2155 }}</div>

          <div style="width:20rem;" class="tbl-td d-none d-md-flex">
            <a class="text-overflow-ellipsis" href="">powermanlaocal@gmail.com</a>
          </div>

          <div style="width:20rem;" class="tbl-td d-none d-md-flex">
            <a class="text-overflow-ellipsis link-hover" href="">https://powermanlaocal.com/link-audio.mp3</a>
          </div>

          <div style="width:20rem;" class="tbl-td d-none d-md-flex">
            <span class="text-overflow-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
          </div>

          <div class="tbl-td d-none d-md-flex">05/07/2023</div>

          <div class="tbl-td d-none d-md-flex">25/07/2023</div>

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
 
</style>
