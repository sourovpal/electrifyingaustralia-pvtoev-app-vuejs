<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import { VueDraggableNext } from 'vue-draggable-next';

export default {
  name:'ProfileIndex',
    data() {
      return{
        items: [
            {"id": 0,"name":"Pipeline"},
            {"id": 1,"name":"Sales"},
            {"id": 2,"name":"NSW"},
            {"id": 3,"name":"ACT"},
            {"id": 4,"name":"Installations"},
        ],
        list: [
          { name: "New",  id: 0 },
          { name: "Leads Allocated",  id: 1 },
          { name: "Contacted & Appointed",  id: 3 },
          { name: "Proposal Sent",  id: 4 },
          { name: "Waiting for decision",  id: 5 },
          { name: "Follow Up",  id: 6 },
          { name: "Unreachable",  id: 7, lost:1 },
          { name: "Cancel after sign",  id: 8, lost:1 },
          { name: "Lost",  id: 9, lost:1 },
        ],
        dragging: false
      }
    },
    components:{
        vueCustomScrollbar,
        VueDraggableNext
    },
    methods:{
        sortedAction(action, index, item){
            if(action == 'up'){
                var i = index-1;
                var prev = this.items[i];
                if(typeof prev !== 'undefined'){
                    this.items[i] = item;
                    this.items[index] = prev;
                }
            }else{
                var i = index+1;
                var prev = this.items[i];
                if(typeof prev !== 'undefined'){
                    this.items[i] = item;
                    this.items[index] = prev;
                }
            }
        }
    }
  }
  
</script>

<template>

  <vue-custom-scrollbar :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" class="content">
    
    <div class="content-header">
        <h1>Pipelines & Statuses</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Deal Pipelines</h2>
                    </div>
                </div>
                <div class="col-lg-6 col-9">

                    <div class="section-box d-flex justify-content-start align-items-center" v-for="(item, index) in items" :key="item.id">
                        <div class="card pipeline-card">
                            <div class="card-head d-flex justify-content-between align-items-center px-3">
                                <div class="d-flex">
                                    <h5 class="mb-0">{{ item.name }}</h5>
                                    <svg v-if="item.id==0" fill="#838383" class="ms-1"   height="24px" viewBox="0 0 24 24" width="24px"><g ><rect  fill="none" height="24" width="24"></rect></g><g ><path  d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8 s8,3.59,8,8C20,16.41,16.41,20,12,20z M12.89,11.1c-1.78-0.59-2.64-0.96-2.64-1.9c0-1.02,1.11-1.39,1.81-1.39 c1.31,0,1.79,0.99,1.9,1.34l1.58-0.67c-0.15-0.44-0.82-1.91-2.66-2.23V5h-1.75v1.26c-2.6,0.56-2.62,2.85-2.62,2.96 c0,2.27,2.25,2.91,3.35,3.31c1.58,0.56,2.28,1.07,2.28,2.03c0,1.13-1.05,1.61-1.98,1.61c-1.82,0-2.34-1.87-2.4-2.09L8.1,14.75 c0.63,2.19,2.28,2.78,3.02,2.96V19h1.75v-1.24c0.52-0.09,3.02-0.59,3.02-3.22C15.9,13.15,15.29,11.93,12.89,11.1z"></path></g></svg>
                                </div>
                                <div>
                                    <button class="btn btn-outline-primary edit-pipeline-btn fw-bold btn-sm">Edit pipeline</button>
                                </div>
                            </div>
                            <div class="card-body d-flex justify-content-between align-items-center px-3">
                                <div>
                                    <span class="time">Created 3 months ago · 3 stages</span>
                                </div>
                                <div>
                                    <a class="edit-custom-pro-btn" href="">Edit 0 custom properties</a>
                                    <button class="drop-down-action">
                                        <svg fill="#838383"  height="18" viewBox="0 0 24 24" width="18" ><path  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path> <path  d="M0 0h24v24H0z" fill="none"></path></svg>
                                    </button>
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
                        <button class="btn btn-primary fw-bold">Connect your email</button>
                    </div>
                </div>
            </div>
            <hr class="mt-4 mb-5">
            <div class="row">
                <div class="col-lg-3 col-3">
                    <div class="settings-group-header">
                        <h2>Lead Statuses</h2>
                    </div>
                </div>
                <div class="col-lg-5 col-9">
                    <div class="settings-group-header">
                        <p class="mb-2 fw-bold">Change order or name of statuses</p>
                    </div>
                    <div class="list-group ">
                        <vue-draggable-next class="lead-status-list" tag="div" :list="list" handle=".handle">
                            <div class="list-group-item py-0" :class="item.lost?'is-lost':null" v-for="item in list" :key="item.name">
                                <div class="box-info">
                                    <div class="handle">
                                        <svg  width="24" height="24" viewBox="0 0 24 24"><path  d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                    </div>
                                    <input class="form-control form-control-lg" type="text" :value="item.name" @change="(input)=>{item.name=input.target.value}">
                                    
                                    <div class="lost-status" v-if="item.lost">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path  d="M0 0h24v24H0z" fill="none"></path><path  d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                                    </div>
    
                                    <div class="action">
                                        <svg  width="18" height="18" viewBox="0 0 24 24"><path  d="M0 0h24v24H0z" fill="none"></path><path  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </vue-draggable-next>
                        <div class="list-group-item py-3 border-top-0 bg-light text-center add-new-lead-status" @click="list.push({name:'New Lead Status..', id:new Date()})">Add New Status...</div>
                    </div>
                    <pre>
                    </pre>
                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Connect your email</button>
                    </div>
                </div>
            </div>


            <hr class="mt-4 mb-5">

            <br><br><br>
        </section>
    </div>

  </vue-custom-scrollbar>

</template>
<style>
.ql-container{
    height:250px;
}
</style>
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
.lead-status-list{
    .list-group-item:first-child{
        border-top-left-radius:3px;
        border-top-right-radius:3px;
    }
    .list-group-item:last-child{
        border-bottom-left-radius:0;
        border-bottom-right-radius:0;
    }
    .list-group-item{
        position: relative;
        transition: all 0s !important;
        &.is-lost{
            padding-right:50px;
        }
        .box-info{
            .handle{
                position: absolute;
                left: 5px;
                top: 50%;
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
        &:hover {
            .handle,
            .action{
                opacity: 1;
                visibility: visible;
            }
        }
    }
}


.content{
    .content-header{
        margin-top: 1.5rem;
        margin-bottom: 3rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        line-height: 1.1;
        h1{
            height: 2rem;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            font-size: 1.5rem;
            color: #1f2933;
            line-height: 1;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-weight: 600;
        }
    }
    .content-body{
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        .settings-group-header{
            h2{
                font-weight: 600;
                font-size: 1rem;
            }
            .sub-title{
                font-size: 13px;
                padding: 4px 0px;
                display: block;
                color: #616e7c;
                line-height: 1rem;
            }
        }
    }

}

</style>