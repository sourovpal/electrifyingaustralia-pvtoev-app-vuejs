<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import { VueDraggableNext } from 'vue-draggable-next';
import {FindPipeline, UpdateOrCreatePipelines} from '../../../../actions/CrmLeads';
export default {
    name:'AccountIndex',
    data() {
        return{
        errors:{},
        stages:[
            {id:0, name:'New', color:'rgb(0, 126, 229)', status:0,},
            {id:0, name:'Lost', color:'rgb(66, 66, 66)', status:1,},
            {id:0, name:'Sold', color:'rgb(41, 153, 0)', status:2,},
        ],
        colors:[
            {name:'No colour', code:'white'},
            {name:'Sunflower Gold', code:'rgb(255, 204, 4)'},
            {name:'Sky Blue', code:'rgb(0, 126, 229)'},
            {name:'Ember Orange', code:'rgb(255, 87, 34)'},
            {name:'Natural Green', code:'rgb(41, 153, 0)'},
            {name:'Plasma Pink', code:'rgb(236, 64, 122)'},
            {name:'Hotspot Red', code:'rgb(207, 17, 36)'},
            {name:'Silicon Grey', code:'rgb(66, 66, 66)'},
        ],
        title:null,
        is_sales_pipeline:0,
        pipelineId:null,
        isSubmitPipelineStage:false,
        }
    },
    components:{
        CustomScrollbar,
        VueDraggableNext
    },
    methods: {
        async fetchPipelineDataById(){
            try{
                this.$toast.clear();
                const params = this.$route.params;
                if(params.id === 'new-pipelines'){
                    this.pipelineId = 'new-pipelines';
                    return;
                }
                if((params.id != null || params.id != '')){
                    const res = await FindPipeline({id:params.id});
                    try{
                        const {pipeline, stages} = res;
                        if(pipeline){
                            this.pipeline = pipeline;
                            this.title = pipeline.title;
                            this.pipelineId = pipeline.id;
                            this.is_sales_pipeline = pipeline.is_sales_pipeline;
                        }
                        if(stages.length){
                            this.stages = stages;
                        }
                    }catch(error){
                        throw new Error(error.message);
                    }
                }else{
                    this.$toast.error('Invalid installer details 404');
                }
            }catch(error){
                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }finally{
            }
        },
        async updateOrCreatePipelineHandler(){
            try{
                this.$toast.clear();

                if(this.title === '' || this.title === null){
                    this.errors = {
                        title:['The title field is required.']
                    };
                    return;
                }

                this.isSubmitPipelineStage = true;
                var data = {
                    title:this.title,
                    is_sales_pipeline:this.is_sales_pipeline,
                    stages: this.stages
                };
                const res = await UpdateOrCreatePipelines(data, this.pipelineId);

                try{
                    const {message} = res;
                    this.$toast[message.type](message.text);
                }catch(error){}

                try{
                    const {pipeline, stages} = res;
                    this.pipeline = pipeline;
                    this.stages = stages;
                    this.title = pipeline.title;
                    this.is_sales_pipeline = pipeline.is_sales_pipeline;
                    if(this.pipelineId == 'new-pipelines'){
                        this.$router.push({path:`/settings/crm/leads/${pipeline.id}`})
                    }else{
                        this.pipelineId = pipeline.id;
                    }

                }catch(error){
                    throw new Error(error.message);
                }

            }catch(error){
                try{
                    var data = error.response.data;
                    this.errors = data.errors;
                }catch(e){}
                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }finally{
                this.isSubmitPipelineStage = false;
            }
        }
    },
    mounted() {
        this.fetchPipelineDataById();
    },
    }
    
</script>

<template>
    <div class="content content-y-100vh">
        <div class="content-header d-flex justify-content-start align-stages-center">
            <router-link to="/settings/crm/leads">
                <h1 class="mb-0 text-soft">Pipelines</h1>
            </router-link>
            <div class="mx-2 d-flex justify-content-center align-items-center">
                <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
            </div>
            <h1 class="mb-0 text-base">{{pipelineId=='new-pipelines'?'Add New':'Edit'}}</h1>
        </div>
    
        <div class="content-body">
            <section class="">
    
                <div class="row">
                    <div class="col-lg-4">
    
                        <div class="settings-group-item mb-3">
                            <label class="form-label-title">Title <span class="ms-3 btn btn-sm btn-danger py-0 px-2 fs-10px">Required</span></label>
                            <input @focus="delete errors?.title" v-model="title" type="text" class="form-control form-control-input py-1">
                            <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.title?.length">{{ errors?.title[0] }}</span>
                        </div>

                        <div class="settings-group-item mb-3">
                            <div @click="is_sales_pipeline=!is_sales_pipeline" class="d-flex justify-content-start align-stages-center">
                                <label class="custom-form-checkbox btn btn-floating btn-light" style="margin-left:-10px;">
                                    <svg v-if="!is_sales_pipeline" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                    <svg v-if="is_sales_pipeline" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                </label>
                                <label class="form-label-title mb-0">Sales pipeline</label>
                            </div>
                            <span class="form-input-commant w-75">Sales pipelines are used to track sales opportunities. When an opportunity exits the pipeline, it will be considered sold. </span>
                            <div class="py-3">
                                <router-link class="d-flex justify-content-start align-items-center" :to="`/settings/crm/leads/properties?pipeline=${pipelineId}&title=${title}`">
                                    Add New Propertie
                                    <span class="icon ms-2">
                                        <svg  fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
                                            <path  d="M0 0h24v24H0z" fill="none"></path>
                                            <path  d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                                        </svg>
                                    </span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- ================================================================================ -->
                <!-- ======================================= Active Stages ========================== -->
                <!-- ================================================================================ -->

                <div class="row mb-3">
                    <div class="col-lg-12 col-12 mb-3 mb-lg-0">
                        <div class="settings-group-header">
                            <h2>Active stages</h2>
                        </div>
                    </div>
                    <div class="col-lg-4 col-12">
                        <p class="mb-3 fs-14px">Active stages represent the part of the pipeline that is "in progress". This will probably be most of the pipeline.</p>
                        <div class="list-group ">
                            <vue-draggable-next class="lead-status-list" tag="div" :list="stages" handle=".handle">
                                <div class="" v-for="(item, index) in stages" :key="item.id">
                                    <div class="list-group-item py-0 border-bottom-0 border-top" v-if="item.status === 0">
                                        <div class="box-info d-flex justify-content-start align-items-center">
                                            <div class="handle">
                                                <svg  width="24" height="24" viewBox="0 0 24 24"><path  d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                            </div>
                                            <div class="action-dropdown">
                                                <div data-mdb-toggle="dropdown" aria-expanded="false">
                                                    <span class="color-show me-2 ms-2" :style="`background:${item.color};border-color:${item.color==='white'?'#000000':item.color};`"></span>
                                                </div>
                                                <ul class="dropdown-menu dropdown-menu-start">
                                                    <li v-for="(color, index) in colors" :key="index">
                                                        <a @click="item.color=color.code" class="dropdown-item delete-item d-flex justify-content-start align-items-center">
                                                            <span class="color-show me-2" :style="`background:${color.code};border-color:${color.code==='white'?'#000000':color.code};`"></span>
                                                            <span>{{ color.name }}</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <input class="form-control form-control-lg ps-1" type="text" :value="item.name" @change="(input)=>{item.name=input.target.value}">
                                            <div class="action-dropdown">
                                                <div class="action" data-mdb-toggle="dropdown" aria-expanded="false">
                                                    <svg class="delete-item" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </vue-draggable-next>
                            <div class="list-group-item bg-light text-center add-new-lead-status" 
                            @click="stages.push({name:`New Stage`, id:stages.length+1, status:0, color:'white'})">
                            Add New Stage
                            </div>
                        </div>
                    </div>
                </div>




                <!-- ================================================================================ -->
                <!-- ======================================= Successful stages ========================== -->
                <!-- ================================================================================ -->

                <div class="row mb-3">
                    <div class="col-lg-12 col-12 mb-3 mb-lg-0">
                        <div class="settings-group-header">
                            <h2>Unsuccessful stages</h2>
                        </div>
                    </div>
                    <div class="col-lg-4 col-12">
                        <p class="mb-3 fs-14px">Unsuccessful stages are ways that things might fail or go wrong. While you might only have one failure type, you can add multiple unsuccessful stages to track different types of failure. </p>
                        <div class="list-group ">
                            <vue-draggable-next class="lead-status-list" tag="div" :list="stages" handle=".handle">
                                <div class="" v-for="(item, index) in stages" :key="item.id">
                                    <div class="list-group-item py-0 border-bottom-0 border-top" v-if="item.status === 1">
                                        <div class="box-info d-flex justify-content-start align-items-center">
                                            <div class="handle">
                                                <svg  width="24" height="24" viewBox="0 0 24 24"><path  d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                            </div>
                                            <div class="action-dropdown">
                                                <div data-mdb-toggle="dropdown" aria-expanded="false">
                                                    <span class="color-show me-2 ms-2" :style="`background:${item.color};border-color:${item.color==='white'?'#000000':item.color};`"></span>
                                                </div>
                                                <ul class="dropdown-menu dropdown-menu-start">
                                                    <li v-for="(color, index) in colors" :key="index">
                                                        <a @click="item.color=color.code" class="dropdown-item delete-item d-flex justify-content-start align-items-center">
                                                            <span class="color-show me-2" :style="`background:${color.code};border-color:${color.code==='white'?'#000000':color.code};`"></span>
                                                            <span>{{ color.name }}</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <input class="form-control form-control-lg ps-1" type="text" :value="item.name" @change="(input)=>{item.name=input.target.value}">
                                            <div class="action-dropdown">
                                                <div class="action" data-mdb-toggle="dropdown" aria-expanded="false">
                                                    <svg class="delete-item" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </vue-draggable-next>
                            <div class="list-group-item bg-light text-center add-new-lead-status" 
                            @click="stages.push({name:`New Stage`, id:stages.length+1, status:1, color:'white'})">
                            Add New Stage
                            </div>
                        </div>
                    </div>
                </div>




                <!-- ================================================================================ -->
                <!-- ======================================= Active Stages ========================== -->
                <!-- ================================================================================ -->

                <div class="row">
                    <div class="col-lg-12 col-12 mb-3 mb-lg-0">
                        <div class="settings-group-header">
                            <h2>Unsuccessful stages</h2>
                        </div>
                    </div>
                    <div class="col-lg-4 col-12">
                        <p class="mb-3 fs-14px">Items in your pipeline which succeed may go on to other pipelines for further work.</p>
                        <div class="list-group ">
                            <vue-draggable-next class="lead-status-list" tag="div" :list="stages" handle=".handle">
                                <div class="" v-for="(item, index) in stages" :key="item.id">
                                    <div class="list-group-item py-0 border-bottom-0 border-top" v-if="item.status === 2">
                                        <div class="box-info d-flex justify-content-start align-items-center">
                                            <div class="handle">
                                                <svg  width="24" height="24" viewBox="0 0 24 24"><path  d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                            </div>
                                            <div class="action-dropdown">
                                                <div data-mdb-toggle="dropdown" aria-expanded="false">
                                                    <span class="color-show me-2 ms-2" :style="`background:${item.color};border-color:${item.color==='white'?'#000000':item.color};`"></span>
                                                </div>
                                                <ul class="dropdown-menu dropdown-menu-start">
                                                    <li v-for="(color, index) in colors" :key="index">
                                                        <a @click="item.color=color.code" class="dropdown-item delete-item d-flex justify-content-start align-items-center">
                                                            <span class="color-show me-2" :style="`background:${color.code};border-color:${color.code==='white'?'#000000':color.code};`"></span>
                                                            <span>{{ color.name }}</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <input class="form-control form-control-lg ps-1" type="text" :value="item.name" @change="(input)=>{item.name=input.target.value}">
                                            <div class="action-dropdown">
                                                <div class="action" data-mdb-toggle="dropdown" aria-expanded="false">
                                                    <svg class="delete-item" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </vue-draggable-next>
                            <div class="list-group-item bg-light text-center add-new-lead-status" 
                            @click="stages.push({name:`New Stage`, id:stages.length+1, status:2, color:'white'})">
                            Add New Stage
                            </div>
                        </div>
                    </div>
                </div>




                <div class="row">
                    <div class="col-lg-12 mt-3">
                        <button :disabled="isSubmitPipelineStage" @click="updateOrCreatePipelineHandler()" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-stages-center">
                            <div v-if="isSubmitPipelineStage">
                                <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                    <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                                <span>Submitting...</span>
                            </div>
                            <span v-if="!isSubmitPipelineStage">Save Settings</span>
                        </button>
                    </div>
                </div>
    
                <br><br><br>
            </section>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.color-show{
    width: 1rem;
    height: 1rem;
    border-radius:2px;
    display: block;
    background-color: #ffffff;
    border:1px solid transparent;
}
.form-label-title{
    span{
        padding-bottom: 2px !important;
    }
}
.lead-status-list{
    .list-group-item:first-child{
        border-top-left-radius:3px;
        border-top-right-radius:3px;
    }
    .list-group-item{
        position: relative;
        transition: all 0s !important;
        transition: background-color 0.3s ease-in-out;
        &:hover{
            background-color: #f1f5f9;
        }
        &.is-lost{
            padding-right:50px;
        }
        .box-info{
            .handle{
                position: absolute;
                left: 5px;
                top: 47%;
                transform: translateY(-50%);
                cursor:move;
                opacity:0;
                visibility: hidden;
                svg{
                    width:18px;
                    height:18px;
                    fill:#878787;
                }
            }
            .form-control{
                border:none;
                background-color: transparent !important;
                padding-top: 8px;
                padding-bottom: 8px;
                border-radius: 0px;
                font-weight: bold;
                font-size:14px;
                outline: none !important;
                box-shadow: none !important;
            }
            .lost-status{
                position: absolute;
                right: 30px;
                top: 50%;
                transform: translateY(-50%);
                svg{
                    width:18px;
                    height:18px;
                    fill:#878787;
                }
            }
            .action{
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translateY(-50%);
                opacity:0;
                visibility: hidden;
                cursor: pointer;
                svg{
                    width:18px;
                    height:18px;
                    fill:#878787;
                }
            }
        }
        .action-dropdown{
            .delete-item{
                &:hover{
                    fill:#ff1b46;
                }
            }
            .dropdown-menu{
                border-radius:5px !important;
                /* transform: translate3d(-5.6px, 40px, 0px) !important; */
                /* display: none; */
                box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
                li{
                    .dropdown-item{
                        font-size:14px;
                        padding-top:7px;
                        padding-bottom:7px;
                        cursor: pointer;
                        &.lost-item,
                        &.active-item{
                            border-top-left-radius: 5px !important;
                            border-top-right-radius: 5px !important;
                        }
                        &.delete-item{
                            border-bottom-left-radius: 5px !important;
                            border-bottom-right-radius: 5px !important;
                        }
                    }
                }
                &::before{
                    content: "";
                    position: absolute;
                    top: -7px;
                    left: 8px;
                    border: 7px solid #e6e6e6;
                    border-right-color: white;
                    border-bottom-color: white;
                    transform: rotate(45deg);
                    border-bottom-color: transparent;
                    border-right-color: transparent;
                }
                &::after{
                    content: "";
                    position: absolute;
                    top: -6px;
                    left: 8px;
                    border: 7px solid white;
                    border-right-color: white;
                    border-bottom-color: white;
                    transform: rotate(45deg);
                    border-bottom-color: transparent;
                    border-right-color: transparent;
                }
            }
        }
        &:hover {

            .action-dropdown{
                .dropdown-menu.show{
                    display: block;
                }
            }

            .handle,
            .action{
                opacity: 1;
                visibility: visible;
            }
        }
    }
}
.add-new-lead-status{
    font-weight: bold;
    font-size: 14px;
    padding: 12px 8px;
    cursor: pointer;
    border-bottom-left-radius:3px !important;
    border-bottom-right-radius:3px !important;
    &:hover{
        color: #2563eb;
        border-color:#bfdbfe;
        background-color: rgba(239, 246, 255, 0.95) !important;
    }
}
</style>