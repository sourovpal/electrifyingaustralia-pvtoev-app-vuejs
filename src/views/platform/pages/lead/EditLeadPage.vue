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
                        <p class="px-3" v-for="(item, index) in 20" :key="index">
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
                <CustomScrollbar>
                    <div class="col-r-header d-flex justify-content-between align-items-center border-bottom">
                        <div class="left ps-3 py-1 d-flex justify-content-start align-items-center">
                            <div class="circle-avatar shadow-border">
                                <!-- <img class="rounded-circle" alt="avatar1" src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp" /> -->
                                MS
                            </div>
                        </div>
                        <div class="right pe-3 py-1 d-flex justify-content-end align-items-center">
                            <button v-tippy='{ content:"Add a contact", placement : "top" }' class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                <svg class="svg-3" height="24" fill="currentcolor" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                            </button>
                        </div>
                    </div>
                    <!--  -->
                    <div class="personal-info px-3 py-3 border-bottom">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h3 class="user-name fs-18px fw-bold text-head mb-0">Mae Adams</h3>
                            <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                <svg class="svg-3" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                            </button>
                        </div>
                        <div class="">
                            <table class="tbl-contact-info">
                                <tr>
                                    <td class="fs-16px" width="10%">
                                        <svg class="svg-5" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>
                                    </td>
                                    <td class="fs-16px"><a class="d-block text-primary user-email" href="">sourovpal35@gmail.com</a></td>
                                    <td class="hover" width="20%">
                                        <div class="d-flex justify-content-end align-items-center">
                                            <button class="btn btn-sm btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                                            </button>
                                            <button class="btn btn-sm btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="fs-16px" width="10%">
                                        <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path></svg>
                                    </td>
                                    <td class="fs-16px"><a class="d-block text-primary user-phone" href="">+88 01919-852044</a></td>
                                    <td class="hover" width="20%">
                                        <div class="d-flex justify-content-end align-items-center">
                                            <button class="btn btn-sm btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                                            </button>
                                            <button class="btn btn-sm btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div> <!-- end personal-info  -->
                    <div class="p-3 border-bottom">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <div class="fs-14px fw-bold text-head mb-0 text-uppercase">lead Properties</div>
                            <button class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                                <svg class="svg-3" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </button>
                        </div>
                        <div class="mb-1">
                            <div class="fs-12px text-soft mb-0">Address</div>
                            <div class="d-flex">
                                <div class="fs-14px fw-bold text-head mb-0">78 Wirrinda Road, Somersby New South Wales 2250</div>
                                <a href="" class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent ms-auto">
                                    <svg class="svg-3" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>
                                </a>
                            </div>
                        </div>
                        <div class="mb-1">
                            <div class="fs-12px text-soft mb-0">Value</div>
                            <div class="d-flex">
                                <div class="fs-14px fw-bold text-head mb-0">$10,245.00</div>
                            </div>
                        </div>
                        <div class="mb-1">
                            <div class="fs-12px text-soft mb-0">Source</div>
                            <div class="d-flex">
                                <div class="fs-14px fw-bold text-head mb-0">-</div>
                            </div>
                        </div>

                        <div class="mb-1">
                            <div class="fs-12px text-soft mb-0">Confidence</div>
                            <div class="d-flex">
                                <div class="fs-22px fw-bold text-head mb-0">
                                    *****
                                </div>
                            </div>
                        </div>

                        <form action="">
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Call Center Agent Name</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Recording Link</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Quarter Bill Amount</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Appointment Date & Time</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Level of the House</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Supply Phase</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Cash/Finance</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Electricity Retailer</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Electricity Distributor</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Panel Name & Number</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Inverter Brand & Size</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
    
                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">System Size</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Battery Brand & Size</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Types of Roof</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">NMI Number</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Optimizer</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Export Limit Device</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Extras</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Power phases </div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Roof material</div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Number of storeys </div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Energy distributor </div>
                                <input class="form-control form-control-sm " type="text">
                            </div>

                            <div class="mb-1">
                                <div class="fs-12px text-soft mb-1">Unsolicited contact </div>
                                <input class="form-control form-control-sm " type="text">
                            </div>
                            <div style="height:10rem;"></div>
                        </form>
                    </div>
                </CustomScrollbar>
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
            min-height: 12rem;
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
        width: 24rem;
        background-color: #f5f7fa;
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
    .circle-avatar{
        background-color: #0275d8;
        width:35px;
        height: 35px;
        border-radius:50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &.shadow-border::before{
            position: absolute;
            content: "";
            width: 35px;
            height: 2px;
            background-color: #0275d8;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
        }
        &,
        & > *{
            font-size:16px;
            font-weight: bold;
            color:#ffffff;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        & > img{
            width:100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .personal-info{
        .user-name{
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .tbl-contact-info{
        tr{
            td.hover{
                opacity:0;
                transition:opacity 0.3s ease-in-out;
            }
            td{
                a.user-email,
                a.user-phone{
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 250px;
                }
            }
        }
        tr:hover{
            td.hover{
                opacity:1;
            }
        }
    }
</style>
<style>
    .lead-edit .col-left .scrollbar__wrapper{
        height: calc(100% - 18.5rem);
    }
    .lead-edit .col-left .scrollbar__scroller{
        height: 100%;
    }
    .lead-edit .col-left .scrollbar__thumbPlaceholder{
        width:6px !important;
    }
    .lead-edit .col-right .scrollbar__wrapper{
        height: calc(100%);
    }
    .lead-edit .col-right .scrollbar__scroller{
        height: 100%;
    }
    .lead-edit .col-right .scrollbar__thumbPlaceholder{
        width:6px !important;
    }
</style>