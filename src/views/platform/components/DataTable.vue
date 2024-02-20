<script>

import SearchBar from '../../../components/SearchBar.vue';
import ActionBar from '../../../components/ActionBar/ActionBar.vue';
import LeftActionBar from '../../../components/ActionBar/LeftActionBar.vue';
import RightActionBar from '../../../components/ActionBar/RightActionBar.vue';
import Datatable from '../../../components/Datatable/Datatable.vue';
import DatatableHeader from '../../../components/Datatable/DatatableHeader.vue';
import DatatableBody from '../../../components/Datatable/DatatableBody.vue';
import AddNewLeadModal from './AddNewLeadModal.vue';
import HeaderPropertiesDropdown from './HeaderPropertiesDropdown.vue';
import FilterRightSidebar from './FilterRightSidebar.vue';

export default {
  components: {
    SearchBar,
    ActionBar,
    LeftActionBar,
    RightActionBar,
    Datatable,
    DatatableBody,
    DatatableHeader,
    AddNewLeadModal,
    HeaderPropertiesDropdown,
    FilterRightSidebar
},
  data() {
    return {
      selectAllIds:[],
      filterRightSidebar:false,
    }
  },
  methods: {
    selectAll(){
      if(this.selectAllIds.length > 0){
        this.selectAllIds = [];
      }else{
        this.selectAllIds = Array.from(Array(100).keys());
      }
    },
  },
  watch:{
  }
}
</script>

<template>
  <section class="content lead-list">

    <search-bar></search-bar>

    <action-bar>

    <left-action-bar>
        <div class=" d-flex justify-content-center align-item-start" style="margin-left: 14px;">
            <input class="form-check-input rounded-0" type="checkbox"  value="" aria-label="..." />
        </div>
        <div class="item wh-40">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
        </div>
    </left-action-bar>

    <right-action-bar>
        <div class="item wh-40" @click="filterRightSidebar=!filterRightSidebar">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path   d="M0 0h24v24H0z" fill="none"></path> <path   d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
        </div>
        <div class="item d-none d-lg-flex">
            <button class="btn btn-sm btn-primary fw-bold" data-mdb-toggle="modal" data-mdb-target="#addNewLeadModal">
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
        <div class="item d-none d-lg-flex wh-40" data-mdb-toggle="dropdown">
            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M3,5H8.3V19H3zM17,10c1.5,0,2.9,0.5,4,1.3V5h-5.3v5.1C16.1,10,16.5,10,17,10zM10,17c0-3,2-5.6,4.7-6.6V5H9.3v14h1C10.1,18.4,10,17.7,10,17zM20.8,17c0-0.2,0-0.4-0.1-0.6l1.1-1l-1-1.7l-1.5,0.5c-0.3-0.3-0.7-0.5-1.1-0.6L18,12h-2l-0.3,1.5c-0.4,0.1-0.8,0.4-1.1,0.6l-1.4-0.5l-1,1.7l1.1,1c0,0.2-0.1,0.4-0.1,0.6s0,0.4,0.1,0.6l-1.1,1l1,1.7l1.4-0.5c0.3,0.3,0.7,0.5,1.1,0.6L16,22h2l0.3-1.5c0.4-0.1,0.8-0.4,1.1-0.6l1.5,0.5l1-1.7l-1.1-1C20.7,17.4,20.8,17.2,20.8,17z M17,19c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,19,17,19z"></path></svg>
        </div>
        <HeaderPropertiesDropdown/>

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

        <FilterRightSidebar v-if="filterRightSidebar" @toggle-filter="(e)=> filterRightSidebar = e" />

        <datatable-header class="">
            <div class="tbl-th" style="width:4rem;"></div>
            <div class="tbl-th" style="width:20rem;">Lead</div>
            <div class="tbl-th" style="width:10rem;">Source</div>
            <div class="tbl-th" style="width:5rem;">State</div>
            <div class="tbl-th" style="width:12rem;">Status</div>
            <div class="tbl-th text-end" style="width:12rem;">Phone Number</div>
            <div class="tbl-th" style="width:15rem;">Email Address</div>
            <div class="tbl-th" style="width:15rem;">Reocrd Link</div>
            <div class="tbl-th" style="width:20rem;">Note</div>
            <div class="tbl-th" style="width:10rem;">Last Update</div>
            <div class="tbl-th" style="width:10rem;">Created At</div>
        </datatable-header>

        <datatable-body>

            <div class="tbl-tr full-width" v-for="(item, index) in Array.from(Array(100).keys())" :key="index">

                <div style="width:4rem;" class="tbl-td">
                    <input class="form-check-input rounded-0" type="checkbox"  value="" aria-label="..." />
                </div>

                <div style="width:20rem;" class="tbl-td full-width">
                    <a class="text-overflow-ellipsis" href="" v-if="(index%2==0)"> New {{ (item?item:1) * 2155 }} South Wales</a>
                    <a class="text-overflow-ellipsis" href="" v-if="(index%2!==0)"> {{ (item?item:1) * 2155 }} Old South Powerman Local</a>
                </div>
        
                <div style="width:10rem;" class="tbl-td d-none d-lg-flex">
                    <span class="text-overflow-ellipsis">Powerman Local</span>
                </div>
        
                <div style="width:5rem;" class="tbl-td d-none d-lg-flex"> {{ (item?item:1) * 2155 }}</div>
        
                <div style="width:12rem;" class="tbl-td d-none d-lg-flex">
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
        
                <div style="width:12rem;" class="tbl-td d-none d-lg-flex">
                    <div class="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <button title="Copy phone number" class="copy-phone-number" @click="navigator.clipboard.writeText(index)">
                               <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                            </button>
                            <a href="tel:+61421147267" target="_blank" title="Call phone number" class="call-btn">
                               <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path></svg>
                            </a>
                        </div>
                        <div>
                            +88 {{item}}17123{{ (item?item:1) * 2155 }}
                        </div>
                     </div>
                </div>
        
                <div style="width:15rem;" class="tbl-td d-none d-lg-flex">
                    <a class="text-overflow-ellipsis" href="">powermanlaocal@gmail.com</a>
                </div>
        
                <div style="width:15rem;" class="tbl-td d-none d-lg-flex">
                    <a class="text-overflow-ellipsis link-hover" href="">https://powermanlaocal.com/link-audio.mp3</a>
                </div>
        
                <div style="width:20rem;" class="tbl-td d-none d-lg-flex">
                    <span class="text-overflow-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </div>

                <div style="width:10rem;" class="tbl-td d-none d-lg-flex">05/07/2023</div>
        
                <div style="width:10rem;" class="tbl-td d-none d-lg-flex">25/07/2023</div>
            </div>
        </datatable-body>

    </Datatable>
  </section>

<!-- ============================ -->
    <add-new-lead-modal/>

</template>

<style scoped lang="scss">
.copy-phone-number{
    border: none;
    outline: none;
    background: transparent;
    width: 35px;
    height: auto;
    opacity: 0;
    transition:opacity 0.2s;
}
.call-btn{
    border: none;
    outline: none;
    background: transparent;
    width: 35px;
    height: auto;
    opacity: 0;
    transition:opacity 0.2s;
    svg{
        width:18px;
    }
}
.tbl-tr:hover{
    .call-btn,
    .copy-phone-number{
        opacity: 1;
    }
}
</style>
<style>
    .lead-list .scrollbar__wrapper,
    .lead-list .scrollbar__scroller{
        height: 100%;
    }
</style>