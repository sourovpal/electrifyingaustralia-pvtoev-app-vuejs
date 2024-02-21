<script>

import SearchBar from '../../../../components/SearchBar.vue';
import ActionBar from '../../../../components/ActionBar/ActionBar.vue';
import LeftActionBar from '../../../../components/ActionBar/LeftActionBar.vue';
import RightActionBar from '../../../../components/ActionBar/RightActionBar.vue';

import CustomScrollbar from 'custom-vue-scrollbar';
import 'custom-vue-scrollbar/dist/style.css';

export default {
  components: {
    SearchBar,
    ActionBar,
    LeftActionBar,
    RightActionBar,
    CustomScrollbar
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
    },
  },
  watch:{
  }
}
</script>

<template>
  <section class="content lead-edit">

    <search-bar></search-bar>

    <action-bar>

        <left-action-bar>
            <div class="ms-3 d-flex flex-row justify-content-start align-items-center left-hover-action">
                <div class="d-flex flex-row justify-content-start align-items-center">
                    <h5 class="text-head mb-0 fs-18px fw-bold">Mae Adams</h5>
                    <div class="div-hover-effice d-flex justify-content-center align-item-start" style="margin-left: 14px;">
                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                    </div>
                </div>
                <div class="item wh-40 div-hover-effice">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                </div>
            </div>
        </left-action-bar>

        <right-action-bar>
            <div class="item wh-40">
                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"></path></svg>
            </div>
            <div class="item wh-40">
                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg>
            </div>
            <div class="item d-none d-lg-flex">
                <button class="btn btn-sm btn-primary fw-bold" data-mdb-toggle="modal" data-mdb-target="#addNewLeadModal">
                    <svg class="me-2" width="24" height="24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account-plus</title><path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" /></svg>
                    Qualify
                </button>
            </div>
            <div class="item d-none d-lg-flex">
                <div class="dropdown import-dropdown">
                    <button class="btn btn-sm btn-light fw-bold d-flex align-items-center" type="button" data-mdb-toggle="dropdown" aria-expanded="false">
                        <span class="pe-4">New</span>
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
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"></path></svg>
            </div>

            <div class="item wh-40">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path> <path d="M6.41,21L5,19.59l4.83-4.83c0.75-0.75,1.17-1.77,1.17-2.83v-5.1L9.41,8.41L8,7l4-4l4,4l-1.41,1.41L13,6.83v5.1 c0,1.06,0.42,2.08,1.17,2.83L19,19.59L17.59,21L12,15.41L6.41,21z"></path></svg>
            </div>
            <div class="item wh-40">
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
            </div>
            
        </right-action-bar>

    </action-bar>

    <section class="h-100">
        <div class="col-area">
            <div class="col-left">
                <CustomScrollbar>
                    <div class="history-area">
                        <p class="px-3" v-for="(item, index) in 2" :key="index">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus recusandae sed distinctio ducimus deserunt quam ab doloribus eos veritatis deleniti dolor possimus, dolorum saepe iste laboriosam nesciunt facere voluptatibus porro.
                        </p>
                    </div>
                </CustomScrollbar>
                <div class="message-box">
                    <div class="tab-area border h-100 rounded">
                        <div class="tab-menu px-2">
                            <ul class="nav nav-tabs mb-3" id="myTab0" role="tablist">
                                <li class="nav-item" role="presentation">
                                  <button class="nav-link fs-14px py-2 fw-bold text-capitalize active">Comment</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <button class="nav-link fs-14px fw-bold text-capitalize py-2">Send email</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <button class="nav-link fs-14px fw-bold text-capitalize py-2">Send SMS</button>
                                </li>
                              </ul>
                        </div>
                        <div class="tab-content">

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-right">

            </div>
        </div>
    </section>

    
  </section>

<!-- ============================ -->

</template>

<style scoped lang="scss">
    .col-area{
        display:flex;
        height: 100%;
    }
    .col-left{
        flex-grow: 1;
        border-right: 1px solid #dddddd;
        width: calc(100% - 24rem);
        position: relative;
        .message-box{
            position: absolute;
            width: 100%;
            min-height: 10.5rem;
            bottom: 105px;
            padding: 1rem;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            .tab-area{
                box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                border-color: #007ee5 !important;
                position: relative;
                flex-grow: 1;
            }
        }
    }
    .col-right{
        flex-grow: 1;
        min-width: 24rem;
    }
    .left-hover-action{
        .div-hover-effice{
            opacity: 0;
            transition:opacity 0.3s ease-in-out;
            cursor: pointer;
        }
        &:hover{
            .div-hover-effice{
                opacity: 1;
            }
        }
    }
</style>
<style>
    .lead-edit .scrollbar__wrapper{
        height: calc(100% - 17.5rem);
    }
    .lead-edit .scrollbar__scroller{
        height: 100%;
    }
    .lead-edit .col-left .scrollbar__thumbPlaceholder{
        width:6px !important;
    }
</style>