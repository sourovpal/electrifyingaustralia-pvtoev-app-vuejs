<script>
import vueCustomScrollbar from 'vue-custom-scrollbar/src/vue-scrollbar.vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import { VueDraggableNext } from 'vue-draggable-next';

export default {
  name:'ProfileIndex',
    data() {
      return{
        items: [
            {"id": 0,"name":"Operations Task"},
            {"id": 1,"name":"Post-install tasks"},
            {"id": 2,"name":"NSW"},
        ],
      }
    },
    components:{
        vueCustomScrollbar,
        VueDraggableNext
    },
    methods:{
    }
  }
  
</script>

<template>

  <vue-custom-scrollbar :settings="{ suppressScrollY: false, suppressScrollX: false, wheelPropagation: false, wheelSpeed:0.5 }" class="content">
    
    <div class="content-header">
        <h1>Task workflows</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-9 col-9">

                    <vue-draggable-next class="lead-status-list" tag="div" :list="items" handle=".handle">
                        <div class="section-box d-flex justify-content-start align-items-center" v-for="(item, index) in items" :key="item.id">
                            <div class="card pipeline-card">
                                <div class="card-head d-flex justify-content-between align-items-center px-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="icon handle">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></svg>
                                        </div>
                                        <a href="" class="title">
                                            <h5 class="mb-0">{{ item.name }}</h5>
                                        </a>
                                    </div>
                                    <div>
                                        <span class="time">Created 5 months ago</span>
                                    </div>
                                </div>
                                <div class="card-body d-flex justify-content-between align-items-center px-3">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, in iste. 
                                    Dolorem impedit consequuntur illo expedita. Distinctio, aperiam, recusandae quas laboriosam ipsum reprehenderit. 
                                    veniam magnam qui blanditiis dignissimos ad fugit?
                                </div>
                            </div>
                        </div>
                    </vue-draggable-next>

                    <div class="mt-3">
                        <button class="btn btn-primary fw-bold">Create new workflow</button>
                    </div>
                </div>
            </div>

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
            .title{
                text-decoration: none;
                color:#4c5054;
                h5{
                    font-size:14px;
                }
            }
            .time{
                font-size:14px;
                color:#929292;
            }
            .icon{
                margin-right:5px;
                display: flex;
                justify-content: center;
                align-content: center;
                cursor: move;
                svg{
                    width:18px;
                    height:18px;
                    fill:#878787;
                }
            }
        }
        .card-body{
            background-color: whitesmoke;
            padding-top: 13px;
            padding-bottom: 13px;
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