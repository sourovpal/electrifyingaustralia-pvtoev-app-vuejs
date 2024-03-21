<script>
import { VueDraggableNext } from 'vue-draggable-next';
export default {
    props:{
        lead_statuses:{
            default:[],
        }
    },
    components:{
        VueDraggableNext
    },
    data() {
        return {
            leadStatuses:this.$props.lead_statuses,
        }
    },
}
</script>

<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Lead Statuses</h2>
            </div>
        </div>
        <div class="col-lg-4 col-12">
            <p class="mb-2 fw-bold fs-14px">Change order or name of statuses</p>
            <div class="list-group ">
                <vue-draggable-next class="lead-status-list" tag="div" :list="leadStatuses" handle=".handle">
                    <div class="list-group-item py-0" :class="item.status == 0?'is-lost':null" v-for="(item, index) in leadStatuses" :key="item.id">
                        <div class="box-info">
                            <div class="handle">
                                <svg  width="24" height="24" viewBox="0 0 24 24"><path  d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                            </div>
                            <input class="form-control form-control-lg" type="text" :value="item.name" @change="(input)=>{item.name=input.target.value}">
                            
                            <div class="lost-status" v-if="item.status==0">
                                <svg  xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path  d="M0 0h24v24H0z" fill="none"></path><path  d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                            </div>

                            <div class="action-dropdown">
                                <div class="action" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <svg  width="18" height="18" viewBox="0 0 24 24"><path  d="M0 0h24v24H0z" fill="none"></path><path  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                                </div>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a 
                                        class="dropdown-item lost-item" 
                                        v-if="item.status == 1"
                                        @click="item.status = 0"
                                        >Make a lost</a>
                                    </li>
                                    <li>
                                        <a 
                                        class="dropdown-item active-item" 
                                        v-if="item.status == 0"
                                        @click="item.status = 1"
                                        >Make a active</a>
                                    </li>
                                    <li>
                                        <a 
                                        class="dropdown-item delete-item"
                                        @click="leadStatuses.splice(index, 1)"
                                        >Delete item</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </vue-draggable-next>
                <div class="list-group-item border-top-0 bg-light text-center add-new-lead-status" @click="leadStatuses.push({name:`Lead Status`, id:leadStatuses.length+1, status:1})">Add New Status</div>
            </div>
            <div class="mt-3">
                <button class="btn btn-primary fw-bold">Save settings</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
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
                font-weight: bold;
                font-size:14px;
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
            .dropdown-menu{
                border-radius:5px !important;
                transform: translate3d(-5.6px, 40px, 0px) !important;
                display: none;
                box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
                li{
                    .delete-item{
                        color:#ff1b46;
                        &:hover{
                            color:#ff1b46 !important;
                        }
                    }
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
                    right: 15px;
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
                    right: 15px;
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
    &:hover{
        color: #2563eb;
        border-color:#bfdbfe;
        background-color: rgba(239, 246, 255, 0.95) !important;
    }
}
</style>