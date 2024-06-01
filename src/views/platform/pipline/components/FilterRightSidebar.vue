<script>
import {propertiesIconList} from '../../../../asset/svgicon.js';
import SlideUpDown from 'vue-slide-up-down';
export default {
    props:['owners', 'leadSources', 'toggleFilter'],
    data() {
        return {
            propertiesIconList:{},
            ownerIds:[],
            dropdownToggleItems:{},
            formData:{},
        }
    },
    components:{
        SlideUpDown,
    },
    methods: {
        toggleDropdownHandler(name, status=false){
            var checkKey = false;
            if(status){
                this.dropdownToggleItems[name] = status;
            }else{
                this.dropdownToggleItems[name] = !this.dropdownToggleItems[name];
            }

            if(name == 'owners' && !this.dropdownToggleItems[name]){
                this.ownerIds = [];
            }else if(name == 'source' && !this.dropdownToggleItems[name]){
                this.source_title = null;
            }else if(name == 'created_from_to' && !this.dropdownToggleItems[name]){
                if(Object.keys(this.formData).includes('created_from') || Object.keys(this.formData).includes('created_to')){
                    delete this.formData['created_from'];
                    delete this.formData['created_to'];
                    checkKey = true;
                }
            }else if(name == 'updated_from_to' && !this.dropdownToggleItems[name]){
                if(Object.keys(this.formData).includes('updated_from') || Object.keys(this.formData).includes('updated_to')){
                    delete this.formData['updated_from'];
                    delete this.formData['updated_to'];
                    checkKey = true;
                }
            }

            if(!checkKey){
                checkKey = Object.keys(this.formData).includes(name);
            }
            if(!this.dropdownToggleItems[name] && checkKey){
                delete this.formData[name];
                this.searchHandler();
            }

        },
        ownerFilterHandler(id){

            if(this.ownerIds.includes(id)){
                var index = this.ownerIds.indexOf(id);
                if(index > -1){
                    this.ownerIds.splice(index, 1);
                }
            }else{
                this.ownerIds.push(id);
            }

            if(this.ownerIds.length){
                this.formData['owners'] = this.ownerIds;
            }else{
                this.ownerIds = [];
                delete this.formData['owners'];
            }
            this.searchHandler();
        },
        filterLeadSources() {
            return this.leadSources?.filter((item) =>{
                if(this.formData['source'] && !this.leadSources?.find(item=>item?.title?.toLowerCase() === this.formData['source']?.toLowerCase())){
                    if(item?.title?.toLowerCase().search(this.formData['source']?.toLowerCase()) > -1){
                        return item;
                    }
                }else{
                    return item;
                }
            });
        },
        selectedSourceHandler(item){
            this.formData['source'] = item?.title;
            this.searchHandler();
        },
        searchHandler(item={}){
            this.$emit('filter-data-in-database', {...this.formData, ...item});
        },
        resetFilterHandler(){
            setTimeout(()=>{
                this.ownerIds = [];
                this.formData = {};
                this.dropdownToggleItems = {};
            }, 1000);
        }
    },
    mounted(){
        this.propertiesIconList = propertiesIconList;
    },
}

</script>

<template>
    <div id="right-filter-bar">
        <div class="header d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center">
                <div class="icon">
                    <svg class="svg-5"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
                </div>
                <h1 class="title fw-bold text-hard">Filter</h1>
            </div>
            <div class="close" @click="toggleFilter(false)">
                <svg class="svg-5"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
            </div>
        </div>
        <div class="filter slim-scrollbar">
                        
            <div class="filter-options">
                <!-- Search -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center"  :class="{active:dropdownToggleItems['any_search']}" @click="toggleDropdownHandler('any_search')">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5 size-22px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="#5f6368"><path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>
                            </div>
                            <div class="title fw-bold text-hard">Search</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <slide-up-down :active="dropdownToggleItems['any_search']" :duration="300">
                        <div class="option-body">
                            <div class="position-relative">
                                <input 
                                v-model="formData['any_search']"
                                @blur="searchHandler()"
                                class="form-control form-control-sm fw-bold text-head" 
                                type="text">
                                
                            </div>
                        </div>
                    </slide-up-down>
                </div>
                <!-- Search End -->
                <!-- Owner -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" :class="{active:dropdownToggleItems['owners']}" @click="toggleDropdownHandler('owners')">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5 size-22px" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="26px" viewBox="0 0 24 24" width="26px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect></g> <g><g><circle cx="10" cy="8" r="4"></circle> <path d="M10.35,14.01C7.62,13.91,2,15.27,2,18v2h9.54C9.07,17.24,10.31,14.11,10.35,14.01z"></path> <path d="M19.43,18.02C19.79,17.43,20,16.74,20,16c0-2.21-1.79-4-4-4s-4,1.79-4,4c0,2.21,1.79,4,4,4c0.74,0,1.43-0.22,2.02-0.57 L20.59,22L22,20.59L19.43,18.02z M16,18c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C18,17.1,17.1,18,16,18z"></path></g></g></svg>
                            </div>
                            <div class="title fw-bold text-hard">Owners</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <slide-up-down :active="dropdownToggleItems['owners']" :duration="300">

                        <div class="option-body">
                            <label @click="ownerFilterHandler(0)" class="d-flex justify-content-start align-items-center py-1 check-label-propertis">
                                <span class="custom-form-checkbox btn btn-floating btn-light btn-sm">
                                    <svg v-if="!ownerIds.includes(0)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                    <svg v-else class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                </span>
                                <span class="fs-14px ms-1">No Owner</span>
                            </label>

                            <label v-for="(owner, index) in owners" :key="index" @click="ownerFilterHandler(owner.id)" class="d-flex justify-content-start align-items-center py-1 check-label-propertis">
                                <span class="custom-form-checkbox btn btn-floating btn-light btn-sm">
                                    <svg v-if="!ownerIds.includes(owner.id)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                    <svg v-else="ownerIds.includes(owner.id)" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                </span>
                                <span class="fs-14px ms-1">{{ owner.name }}</span>
                            </label>
                        </div>

                    </slide-up-down>
                </div>
                <!-- Owner End -->
                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center"  :class="{active:dropdownToggleItems['source']}" @click="toggleDropdownHandler('source')">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect> <path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M14,16H6v-2h8V16z M18,12H6v-2h12V12z"></path></g></svg>
                            </div>
                            <div class="title fw-bold text-hard">Source</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <slide-up-down :active="dropdownToggleItems['source']" :duration="300">
                        <div class="option-body">
                            <div class="position-relative">
                                <input 
                                v-model="formData['source']"
                                ref="leadSourceRef" 
                                class="form-control form-control-sm fw-bold text-head" type="text" data-mdb-toggle="dropdown">
                                <div class="dropdown-menu custom-form-select roles overflow-auto" style="max-height:7.5rem;">
                                    <ul class="list-unstyled mb-0">
                                        <li 
                                        v-for="(item, index) in filterLeadSources()" 
                                        :key="index"
                                        @click="selectedSourceHandler(item)"
                                        :class="`dropdown-item py-1 fs-14 fw-bold ${(formData['source'] == item?.title)?'selected':''}`">
                                        {{ item.title }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </slide-up-down>
                </div>
                <!-- Source End -->

                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center"  :class="{active:dropdownToggleItems['tags']}" @click="toggleDropdownHandler('tags')">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"></path></svg>
                            </div>
                            <div class="title fw-bold text-hard">Tags</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <slide-up-down :active="dropdownToggleItems['tags']" :duration="300">
                        <div class="option-body">
                            <input ref="tags" @input="$emit('filter-data-in-database', 'tags', $event.target.value)" 
                            class="form-control form-control-sm fw-bold text-head" type="text" name="" id="">
                        </div>
                    </slide-up-down>
                </div>
                <!-- Source End -->

                <!-- Created Date -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" :class="{active:dropdownToggleItems['created_from_to']}" @click="toggleDropdownHandler('created_from_to')">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></svg>
                            </div>
                            <div class="title fw-bold text-hard">Created Date</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <slide-up-down :active="dropdownToggleItems['created_from_to']" :duration="300">
                        <div class="option-body">
                            <div class="mb-3">
                                <label class="fs-14px text-soft" for="">From</label>
                                <input  @input="searchHandler()" v-model="formData['created_from']" class="form-control form-control-sm fw-bold text-head" type="date" name="" id="">
                            </div>
                            <div class="">
                                <label class="fs-14px text-soft" for="">To</label>
                                <input @input="searchHandler()" v-model="formData['created_to']" class="form-control form-control-sm fw-bold text-head" type="date" name="" id="">
                            </div>
                        </div>
                    </slide-up-down>
                </div>
                <!-- Created Date End -->

                <!-- Updated Date -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" :class="{active:dropdownToggleItems['updated_from_to']}" @click="toggleDropdownHandler('updated_from_to')">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></svg>
                            </div>
                            <div class="title fw-bold text-hard">Updated Date</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <slide-up-down :active="dropdownToggleItems['updated_from_to']" :duration="300">
                        <div class="option-body">
                            <div class="mb-3">
                                <label class="fs-14px text-soft" for="">From</label>
                                <input @input="searchHandler()" v-model="formData['updated_from']" class="form-control form-control-sm fw-bold text-head" type="date" name="" id="">
                            </div>
                            <div class="">
                                <label class="fs-14px text-soft" for="">To</label>
                                <input @input="searchHandler()" v-model="formData['updated_to']" class="form-control form-control-sm fw-bold text-head" type="date" name="" id="">
                            </div>
                        </div>
                    </slide-up-down>
                </div>
                <!-- Updated Date End -->

            </div>
        </div>

    </div>
</template>
    
<style lang="scss" scoped>
    .custom-form-select{
      width:100%;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
      .dropdown-item{
        cursor: pointer;
      }
    }
    #right-filter-bar{
        position: fixed;
        width: 288px;
        height: 100%;
        background: #f5f5f5;
        right: -300px;
        z-index: 999;
        box-shadow: rgba(0, 0, 0, 0.15) -1.95px 1.95px 2.6px;
        user-select: none;
        transition: all 0.3s ease-in-out;
        .close{
            cursor: pointer;
        }
        &.show {
            right: 0px !important;
        }
        .header{
            padding: 15px 12px;
            border-bottom: 2px solid #007ee5;
            background-color: #ffffff;
            .icon{
                margin-right:10px;
            }
            .title{
                font-size:20px;
                font-weight: bold;
                margin-bottom:0px;
            }
        }
        .filter{
            height:calc(100vh - 160px);
            overflow: auto;
            .filter-options{
                padding-bottom:200px;
                .filter-option{
                    .option-header{
                        background: #f5f7fa;
                        border-bottom: 1px solid #e4e7eb;
                        padding: 15px 12px;
                        cursor: pointer;
                        &:hover{
                            background: #e6f0ff;
                        }
                        .icon{
                            margin-right:10px;
                            svg{
                                height: 18px;
                                width: 18px;
                            }
                        }
                        .title{
                            font-size: 14px;
                        }
                        .right-icon{
                            transition:transform 0.3s ;
                            svg{
                                height: 18px;
                                width: 18px;
                            }
                        }
                        &.active{
                            .right-icon{
                                transform: rotate(45deg);
                            }
                        }
                    }
                    .option-body{
                        background-color: #ffffff;
                        padding: 15px 12px;
                    }
                }
            }
        }
    }
</style>