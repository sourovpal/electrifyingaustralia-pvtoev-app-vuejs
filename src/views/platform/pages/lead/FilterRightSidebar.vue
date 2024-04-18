<script>
import {propertiesIconList} from '../../../../asset/svgicon.js';
export default {
    props:['leadProperties', 'owners', 'leadSources', 'filterQueryData'],
    data() {
        return {
            propertiesIconList:{},
            ownerIds:[],
            created_from:null,
            created_to:null,
            updated_from:null,
            updated_to:null,
            searchSource:null,
            source_title:null,
        }
    },
    components:{
    },
    methods: {
        optionToggle(event, field, ref=null, isCustom=false, item=null){
            try{
                var optionHeader = event.target.closest('.option-header');
                var optionBody   = optionHeader.nextSibling;
                if(optionHeader && optionBody){
                    optionHeader.classList.toggle('active');
                    optionBody.classList.toggle("active");
                }
            }catch(error){}

            try{
                if(ref){

                    if(isCustom){
                        if(this.filterQueryData[field]){
                            this.$emit('filter-data-in-database', field, null, true);
                        }else{
                            this.$emit('filter-data-in-database', field, null, false);
                        }
                        this.$refs[ref][0].value = '';
                    }else{
                        if(this.filterQueryData[field]){
                            this.$emit('filter-data-in-database', field, null, true);
                        }else{
                            this.$emit('filter-data-in-database', field, null, false);
                        }
                        this.$refs[ref].value = '';

                        if(field == 'source'){
                            this.searchSource = null;
                            this.source_title = null;
                        }
                    }
                }else{
                    if(field == 'owners'){
                        if(this.ownerIds.length){
                            this.ownerIds = [];
                            this.$emit('filter-data-in-database', field, null, true);
                        }
                    }else if(field == 'created'){
                        if((this.created_from != null && this.created_to != null) && (this.created_from != "" && this.created_to != "")){
                            this.created_from = null;
                            this.created_to = null;
                            this.$emit('filter-data-in-database', field, null, true);
                        }else{
                            this.created_from = null;
                            this.created_to = null;
                        }
                    }else if(field == 'updated'){
                        if((this.updated_from != null && this.updated_to != null) && (this.updated_from != "" && this.updated_to != "")){
                            this.updated_from = null;
                            this.updated_to = null;
                            this.$emit('filter-data-in-database', field, null, true);
                        }else{
                            this.updated_from = null;
                            this.updated_to = null;
                        }
                    }
                }
            }catch(error){
                this.yesOrNoHandler(item, true);
            }

        },
        yesOrNoHandler(item=null, toggle=false){
            try{
                if(item && !toggle){
                    if(item.attributes.value){
                        item.attributes.value=0;
                        this.$emit('filter-data-in-database', item.unique_id, 0, true);
                    }else{
                        item.attributes.value=1;
                        this.$emit('filter-data-in-database', item.unique_id, 1, true);
                    }
                }else{
                    if(item.attributes.value === null){
                        item.attributes.value = 0;
                        this.$emit('filter-data-in-database', item.unique_id, 0, true);
                    }else{
                        item.attributes.value = null;
                        this.$emit('filter-data-in-database', item.unique_id, null, true);
                    }
                }
            }catch(error){}
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
                this.$emit('filter-data-in-database', 'owners', this.ownerIds, true);
            }else{
                this.ownerIds = [];
                this.$emit('filter-data-in-database', 'owners', null, true);
            }
        },
        searchLeadSources() {
            return this.leadSources.filter((item) =>{
                if(this.searchSource){
                    if(item.title.toLowerCase().search(this.searchSource.toLowerCase()) > -1){
                        return item;
                    }
                }else{
                    return item;
                }
            });
        },
        leadSourceHandler(source){
            this.source_title  = source.title;
            this.$emit('filter-data-in-database', 'source', source.id, true);
            setTimeout(()=>{
                this.searchSource = null;
            },200);
        }
    },
    watch:{
        source_title(n){
            this.searchSource = n;
            if(n == '' && this.filterQueryData['source']){
                this.$emit('filter-data-in-database', 'source', null, true);
            }
        }
    },
    mounted(){
        this.propertiesIconList = propertiesIconList;

        this.$watch(()=>[this.created_from, this.created_to], function(n, o){
            if((this.created_from != null && this.created_to != null) && (this.created_from != "" && this.created_to != "")){
                this.$emit('filter-data-in-database', 'created', {start:this.created_from, end:this.created_to}, true);
            }else if((this.created_from != "" && this.created_to == "") || (this.created_from == "" && this.created_to != "")){
                this.$emit('filter-data-in-database', 'created', null, true);
            }
        });

        this.$watch(()=>[this.updated_from, this.updated_to], function(n, o){
            if((this.updated_from != null && this.updated_to != null) && (this.updated_from != "" && this.updated_to != "")){
                this.$emit('filter-data-in-database', 'updated', {start:this.updated_from, end:this.updated_to}, true);
            }else if((this.updated_from != "" && this.updated_to == "") || (this.updated_from == "" && this.updated_to != "")){
                this.$emit('filter-data-in-database', 'updated', null, true);
            }
        });

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
            <div class="close" @click="$emit('toggle-filter', false);">
                <svg class="svg-5"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
            </div>
        </div>
        <div class="filter slim-scrollbar">
            <div class="filter-options">
                <!-- Owner -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click.prevent="optionToggle($event, 'owners', )">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="icon">
                                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="26px" viewBox="0 0 24 24" width="26px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect></g> <g><g><circle cx="10" cy="8" r="4"></circle> <path d="M10.35,14.01C7.62,13.91,2,15.27,2,18v2h9.54C9.07,17.24,10.31,14.11,10.35,14.01z"></path> <path d="M19.43,18.02C19.79,17.43,20,16.74,20,16c0-2.21-1.79-4-4-4s-4,1.79-4,4c0,2.21,1.79,4,4,4c0.74,0,1.43-0.22,2.02-0.57 L20.59,22L22,20.59L19.43,18.02z M16,18c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C18,17.1,17.1,18,16,18z"></path></g></g></svg>
                            </div>
                            <div class="title fw-bold text-hard">Owner</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>
                    </div>
                    <div class="option-body">
                        <label 
                        @click="ownerFilterHandler('MA==')"
                        class="d-flex justify-content-start align-items-center py-2 check-label-propertis">
                            <span class="custom-form-checkbox btn btn-floating btn-light btn-sm">
                                <svg v-if="!ownerIds.includes('MA==')" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                <svg v-if="ownerIds.includes('MA==')" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            </span>
                            <span class="fs-14px ms-1">No Owner</span>
                        </label>
                        <label 
                        v-for="(owner, index) in owners" 
                        :key="index" 
                        @click="ownerFilterHandler(owner.id)"
                        class="d-flex justify-content-start align-items-center py-2 check-label-propertis">
                            <span class="custom-form-checkbox btn btn-floating btn-light btn-sm">
                                <svg v-if="!ownerIds.includes(owner.id)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                <svg v-if="ownerIds.includes(owner.id)" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            </span>
                            <span class="fs-14px ms-1">{{ owner.name }}</span>
                        </label>
                    </div>
                </div>
                <!-- Owner End -->

                <!-- Source -->
                <div class="filter-option">
                    <div class="option-header d-flex justify-content-between align-items-center" @click="optionToggle($event, 'source', 'leadSourceRef')">
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
                    <div class="option-body">
                        <div class="position-relative">
                            <input 
                            v-model="source_title"
                            ref="leadSourceRef" 
                            class="form-control" type="text" name="" id="" data-mdb-toggle="dropdown">
                            <div class="dropdown-menu custom-form-select roles overflow-auto" style="max-height:7.5rem;">
                                <ul class="list-unstyled mb-0">
                                    <li 
                                    v-for="(item, index) in searchLeadSources()" 
                                    :key="index"
                                    @click="leadSourceHandler(item)"
                                    :class="`dropdown-item`">
                                    {{ item.title }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Source End -->

                <!-- Source -->
                <div class="filter-option">
                    <div 
                    class="option-header d-flex justify-content-between align-items-center" 
                    @click="optionToggle($event, 'tags', 'tags', false)">
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
                    <div class="option-body">
                        <input 
                        ref="tags"  
                        @input="$emit('filter-data-in-database', 'tags', $event.target.value)" 
                        class="form-control" type="text" name="" id="">
                    </div>
                </div>
                <!-- Source End -->

                <!-- Created Date -->
                <div class="filter-option">
                    <div 
                    class="option-header d-flex justify-content-between align-items-center" 
                    @click="optionToggle($event, 'created')">
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
                    <div class="option-body">
                        <div class="mb-3">
                            <label for="">From</label>
                            <input v-model="created_from" class="form-control" type="date" name="" id="">
                        </div>
                        <div class="">
                            <label for="">To</label>
                            <input v-model="created_to" class="form-control" type="date" name="" id="">
                        </div>
                    </div>
                </div>
                <!-- Created Date End -->

                <!-- Updated Date -->
                <div class="filter-option">
                    <div 
                    class="option-header d-flex justify-content-between align-items-center" 
                    @click="optionToggle($event, 'updated')">
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
                    <div class="option-body">
                        <div class="mb-3">
                            <label for="">From</label>
                            <input v-model="updated_from" class="form-control" type="date" name="" id="">
                        </div>
                        <div class="">
                            <label for="">To</label>
                            <input v-model="updated_to" class="form-control" type="date" name="" id="">
                        </div>
                    </div>
                </div>
                <!-- Updated Date End -->


                <div>
                    <h6 class="fs-16px mb-0 py-3 px-3 fw-bold text-soft bg-light">Custom Properties</h6>
                </div>




                <!-- Custom Properties -->
                <div v-for="(item, index) in leadProperties" 
                :key="index" class="filter-option" 
                v-show="item.html_tag==='input'">
                    <div 
                    class="option-header d-flex justify-content-between align-items-center" 
                    @click="optionToggle($event, item.unique_id, item.unique_id, true, item)">

                        <div class="d-flex justify-content-start align-items-center">
                            <div v-html="propertiesIconList[item.data_type_id]" class="icon"></div>
                            <div class="title fw-bold text-hard">{{ item.label }}</div>
                        </div>
                        <div class="right-icon">
                            <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        </div>

                    </div>
                    <div class="option-body">

                        <!-- Yes Or No -->
                        <div v-if="item?.attributes?.type=='checkbox'">
                            <label 
                            @click="yesOrNoHandler(item)"
                            class="d-flex justify-content-start align-items-center check-label-propertis">
                                <span class="custom-form-checkbox btn btn-floating btn-light btn-sm">
                                    <svg v-if="!item?.attributes?.value" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                    <svg v-if="item?.attributes?.value" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                </span>
                                <span class="fs-14px fw-bold">{{ item?.attributes?.value?"Yes":"No" }}</span>
                            </label>
                        </div>

                        <!-- Type Text -->
                        <div v-if="item?.attributes?.type=='text'">
                            <input 
                            :ref="item.unique_id"  
                            @input="$emit('filter-data-in-database', item.unique_id, $event.target.value, true)" 
                            class="form-control" type="text" name="" id="">
                        </div>

                        <!-- Type Text -->
                        <div v-if="item?.attributes?.type=='number'">
                            <input 
                            :ref="item.unique_id" 
                            @input="$emit('filter-data-in-database', item.unique_id, $event.target.value, true)"
                            class="form-control" type="number" name="" id="">
                        </div>

                        <!-- Type Date -->
                        <div v-if="item?.attributes?.type=='date'">
                            <input 
                            :ref="item.unique_id" 
                            @input="$emit('filter-data-in-database', item.unique_id, $event.target.value, true)"
                            class="form-control" type="date" name="" id="">
                        </div>

                        <!-- Type date time -->
                        <div v-if="item?.attributes?.type=='datetime'">
                            <input 
                            :ref="item.unique_id" 
                            @input="$emit('filter-data-in-database', item.unique_id, $event.target.value, true)"
                            class="form-control" type="datetime-local" name="" id="">
                        </div>



                    </div>
                </div>
                <!-- Source End -->






                
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
    right: 0;
    z-index: 999;
    box-shadow: rgba(0, 0, 0, 0.15) -1.95px 1.95px 2.6px;
    user-select: none;
    .close{
        cursor: pointer;
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
                    display:none;
                    &.active{
                        display: block;
                    }
                }
            }
        }
    }
}
</style>