<script setup>
import { ref, onMounted } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import axios from '../../../../actions/api';
import { useToast } from 'vue-toast-notification';
import { CONFIG } from '../../../../config';
import moment from 'moment';
import ConfirmationModal from '../../../../components/Modals/ConfirmationModal.vue';

onMounted(() => {
    getWorkFlows();
});

const items = ref([]);
const $toast = useToast(CONFIG.TOAST);

async function getWorkFlows() {
    axios.get('workflows').then(res => {
        items.value = res.data;
    }).catch(() => {
        $toast.error('Something went wrong');
    });
}

const openWorkflowDeleteConfirmationModal = ref(false);
const workflowToDeleteId = ref(null);

function handleWorkflowDeleteConfirm() {
    axios.delete(`/workflows/delete/${workflowToDeleteId.value}`)
        .then((res) => {
            $toast.success(res.data.message);
            getWorkFlows();
        })
        .catch(e => {
            $toast.error('Something went wrong');
            console.log(e);
        })
        .finally(() => {
            openWorkflowDeleteConfirmationModal.value = false;
            handleWorkflowDeleteCancel(); // missnamed but fits the usage here
        })
}

const handleDeleteClick = (workflowId) => {
    workflowToDeleteId.value = workflowId;
    openWorkflowDeleteConfirmationModal.value = true;
}

const handleWorkflowDeleteCancel = () => {
    openWorkflowDeleteConfirmationModal.value = false;
    workflowToDeleteId.value = null;
}

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
                        <router-link class="text-white btn btn-primary fw-bold" to="/settings/crm/workflows/new">
                            <span>Create new workflow</span>
                        </router-link>
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
                                        <span class="time">{{ moment(item.created_at).format('LLL') }}</span>
                                    </div>
                                </div>
                                <div class="card-body px-3 position-relative">
                                    <!-- Task list -->
                                    <ul class="list-unstyled" v-if="item?.tasks?.length">
                                        <li class="d-flex gap-2 align-items-center" v-for="taskObj in item.tasks">
                                            <div><font-awesome-icon icon="fa-solid fa-arrow-right" style="transform: scale(0.75);"/></div>
                                            <p class="mb-0">{{taskObj.title}}</p>
                                        </li>
                                        <li class="d-flex gap-2 align-items-center mt-3">
                                            <font-awesome-icon class="text-primary" icon="fa-solid fa-chevron-right" style="transform: scale(0.75);"/>
                                            <router-link :to="`/settings/crm/workflows/${item.id}`">
                                                <span class="mb-0">See more tasks</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <span class="text-soft" v-else>No tasks assigned to this workflow</span>
                                    <div  
                                        @click="handleDeleteClick(item.id)"
                                        class="position-absolute workflow-delete-btn text-danger"
                                        style="right: 1rem; bottom: 0.75rem;"
                                    >
                                        <font-awesome-icon icon="fa-solid fa-trash" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </vue-draggable-next>

                </div>
            </div>

            <br><br><br>
        </section>
    </div>
    <!-- to get confirmation from the user before deleting a workflow -->
    <ConfirmationModal
	    v-if="openWorkflowDeleteConfirmationModal"
	    heading="Are you sure you want to delete this workflow?"
	    subtext="All tasks belonging to this workflow will be deleted"
	    confirmBtnText="Discard"
        cancelBtnText="Keep"
	    @cancel="handleWorkflowDeleteCancel"
        @confirm="handleWorkflowDeleteConfirm"
	/>
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
                opacity: 0.25;
                transition: 150ms;

                &:hover {
                    opacity: 1;
                    pointer-events: auto;
                    cursor: pointer;
                }
            }
        }
    }
}

</style>
