<script>
import DealPipelinesSkeletor from './DealPipelinesSkeletor.vue';
import {UpdatePipelines} from '../../../../actions/CrmLeads';
export default {
    name:'ProfileIndex',
    props:{
        pipelines:{
            default:[],
        },
        isFirstLoading:{
            default:false,
        },
    },
    data() {
        return{
            items: [],
            isSubmitPipelineUpdate:false,
        }
    },
    components:{
        DealPipelinesSkeletor
    },
    methods:{
        sortedAction(action, index, item){
            if(action == 'up'){
                var i = index-1;
                var prev = this.items[i];
                if(typeof prev !== 'undefined'){
                    this.items[i] = item;
                    this.items[index] = prev;
                    this.updateOrCreatePipelines();
                }
            }else{
                var i = index+1;
                var prev = this.items[i];
                if(typeof prev !== 'undefined'){
                    this.items[i] = item;
                    this.items[index] = prev;
                    this.updateOrCreatePipelines();
                }
            }
        },
        async updateOrCreatePipelines(){
            try{
                this.$toast.clear();
                const data = {
                    pipelines:this.items,
                }
                this.isSubmitPipelineUpdate = true;
                const res = await UpdatePipelines(data);
                try{

                    const {message} = res;
                    this.$toast[message.type](message.text);

                }catch(error){}

                try{
                    const {pipelines} = res;
                    if(pipelines.length > 0){
                        this.items = pipelines;
                    }
                }catch(error){
                    throw new Error(error.message);
                }

            }catch(error){
                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }
            }finally{
                this.isSubmitPipelineUpdate = false;
            }
        }
    },
    watch:{
        pipelines:function(v){
            this.items = v;
        }
    }
}
</script>

<template>

<div class="row">
    <div class="col-lg-2 col-12 mb-3 mb-lg-0">
        <div class="settings-group-header">
            <h2>Deal Pipelines</h2>
        </div>
    </div>

    <div v-if="!isFirstLoading" class="col-lg-8 col-xl-5 col-12">
        
        <div class="section-box d-flex justify-content-start align-items-center" v-for="(item, index) in items" :key="item.id">
            <div class="card pipeline-card">
                <div class="card-head d-flex justify-content-between align-items-center px-3">
                    <div class="d-flex">
                        <h5 class="mb-0">{{ item.title }}</h5>
                        <svg v-if="item.is_sales_pipeline==1" fill="#838383" class="ms-1"   height="24px" viewBox="0 0 24 24" width="24px"><g ><rect  fill="none" height="24" width="24"></rect></g><g ><path  d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8 s8,3.59,8,8C20,16.41,16.41,20,12,20z M12.89,11.1c-1.78-0.59-2.64-0.96-2.64-1.9c0-1.02,1.11-1.39,1.81-1.39 c1.31,0,1.79,0.99,1.9,1.34l1.58-0.67c-0.15-0.44-0.82-1.91-2.66-2.23V5h-1.75v1.26c-2.6,0.56-2.62,2.85-2.62,2.96 c0,2.27,2.25,2.91,3.35,3.31c1.58,0.56,2.28,1.07,2.28,2.03c0,1.13-1.05,1.61-1.98,1.61c-1.82,0-2.34-1.87-2.4-2.09L8.1,14.75 c0.63,2.19,2.28,2.78,3.02,2.96V19h1.75v-1.24c0.52-0.09,3.02-0.59,3.02-3.22C15.9,13.15,15.29,11.93,12.89,11.1z"></path></g></svg>
                    </div>
                    <div>
                        <router-link :to="`/settings/crm/leads/${item.id}`" class="btn btn-outline-primary edit-pipeline-btn fw-bold btn-sm">Edit pipeline</router-link>
                    </div>
                </div>
                <div class="card-body flex-wrap d-flex justify-content-between align-items-center px-3">
                    <div class="">
                        <span class="time">Created {{ item.created_ago }} · {{ item.stages }} stages</span>
                    </div>
                    <div class="d-flex align-items-center flex-grow-1 justify-content-end">
                        <div>
                            <a class="edit-custom-pro-btn" href="">Edit 0 custom properties</a>
                        </div>
                        <div class="ms-auto ms-sm-0">
                            <button class="drop-down-action">
                                <svg fill="#838383"  height="18" viewBox="0 0 24 24" width="18" ><path  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sorted-arrow">
                <button class="up" @click="sortedAction('up', index, item)" :disabled="index==0">
                    <svg  fill="#838383" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><rect  fill="none" height="24" width="24"></rect><path  d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z"></path></svg>
                </button>
                <button class="down" @click="sortedAction('down', index, item)" :disabled="index==items.length - 1">
                    <svg  fill="#838383" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><rect  fill="none" height="24" width="24"></rect><path  d="M19,15l-1.41-1.41L13,18.17V2H11v16.17l-4.59-4.59L5,15l7,7L19,15z"></path></svg>
                </button>
            </div>
        </div>



        <div class="mt-3">
            <button class="btn btn-primary fw-bold">Add new pipeline</button>
        </div>
    </div>

    <div v-if="isFirstLoading" class="col-lg-8 col-xl-5 col-12">
        <DealPipelinesSkeletor/>
    </div>
</div>

</template>


<style lang="scss" scoped>
.section-box{
    margin-bottom:20px;
    .pipeline-card{
        width:90%;
        border-radius:3px;
        box-shadow: rgb(9 30 66 / 7%) 0px 1px 1px, rgb(5 21 48 / 9%) 0px 0px 1px 1px;
        .card-head {
            padding-top: 13px;
            padding-bottom: 13px;
            .edit-pipeline-btn{
                font-size:10px;
                border-width:1px;
            }
        }
        .card-body{
            background-color: whitesmoke;
            padding-top: 13px;
            padding-bottom: 13px;
            .time{
                font-size:14px;
                color:#929292;
            }
            .edit-custom-pro-btn{
                font-size:14px;
                text-decoration: underline;
                color:#838383;
            }
            .drop-down-action{
                outline: none;
                background:none;
                border:none;
                cursor: pointer;
                margin-left:10px;
            }
        }
    }

    .sorted-arrow{
        display: flex;
        flex-direction: column;
        button{
            border:none;
            outline:none;
            background-color: transparent;
            margin-bottom:12px;
            padding: 0px 10px;
            svg{
                width:18px;
                height:18px;
            }
            &[disabled]{
                opacity:.4!important;
                cursor: no-drop;
            }
        }
    }
}

.list-group{
    .add-new-lead-status{
        border-bottom-left-radius:3px;
        border-bottom-right-radius:3px;
        border-top-left-radius:0;
        border-top-right-radius:0;
        cursor: pointer;
        font-size:14px;
        background-color: #f2f2f2 !important;
    }
}
</style>