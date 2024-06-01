<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import axios from '../../../../actions/api';
import { useToast } from 'vue-toast-notification';
import { CONFIG } from '../../../../config';

const items = ref([]);
const $toast = useToast(CONFIG.TOAST);

async function getWorkFlows() {
    axios.get('workflows').then(res => {
        items.value = res.data;
    }).catch(() => {
        $toast.error('Something went wrong');
    });
}

function handleDeleteClick(workflowId) {
    axios.delete(`/workflows/delete/${workflowId}`)
        .then((res) => {
            $toast.success(res.data.message);
            getWorkFlows();
        })
        .catch(e => {
            $toast.error('Something went wrong');
        });
}

onMounted(() => {
    getWorkFlows();
});
</script>

<template>

  <div class="content content-y-100vh">
    
    <div class="content-header">
        <h1>Task workflows</h1>
    </div>

    <div class="content-body">
        <section class="">

            <div class="row">
                <div class="col-lg-7 col-12">
                    <div class="mb-4">
                        <router-link class="text-white btn btn-primary fw-bold" to="/settings/crm/workflows/new">+ Create new workflow</router-link>
                    </div>

                    <template v-if="!items.length">
                        <p class="text-soft">No workflows to show</p>
                    </template>

                    <vue-draggable-next class="lead-status-list" tag="div" :list="items" handle=".handle" v-else>
                        <div class="section-box d-flex justify-content-start align-items-start" v-for="(item, index) in items" :key="item.id">
                            <div class="card pipeline-card">
                                <div class="card-head d-flex justify-content-between align-items-center px-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="icon handle">
                                            <svg  xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path  d="M0 0h24v24H0z" fill="none"></path> <path  d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></svg>
                                        </div>
                                        <a href="" class="title">
                                                <h5 class="mb-0"><router-link :to="`/settings/crm/workflows/${item.id}`">{{ item.title }}</router-link></h5>
                                        </a>
                                    </div>
                                    <div>
                                        <span class="time">Created 5 months ago</span>
                                    </div>
                                </div>
                                <div class="card-body px-3 position-relative">
                                    <ul class="list-unstyled">
                                        <li>beans</li>
                                        <li>beans</li>
                                        <li>beans</li>
                                        <li class="mt-2">
                                            <router-link :to="`/settings/crm/workflows/${item.id}`">See more</router-link>
                                        </li>
                                    </ul>

                                    <svg 
                                        class="position-absolute workflow-delete-btn"
                                        style="right: 1rem; bottom: 0.75rem;"
                                        xmlns="http://www.w3.org/2000/svg" 
                                        height="18px" 
                                        viewBox="0 0 24 24" 
                                        width="18px" 
                                        fill="#000000">
                                        <path d="M0 0h24v24H0z" fill="none"></path> 
                                        <path  d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path>
                                    </svg>
                                </div>
                            </div>

                            <div class="workflow-control d-flex flex-column justify-content-start">
                                    <!-- temporary button -->
                                <button class="btn btn-danger" @click="handleDeleteClick(item.id)">Delete</button>
                            </div>
                        </div>
                    </vue-draggable-next>

                </div>
            </div>

            <br><br><br>
        </section>
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
            .workflow-delete-btn {
                opacity: 0;
                pointer-events: none;
                transition: 150ms;
            }

            &:hover .workflow-delete-btn {
                opacity: 1;
                pointer-events: auto;
                cursor: pointer;
            }
        }
    }
}

</style>
