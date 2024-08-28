<script>
    import { Modal } from "mdb-ui-kit";
    import {CreateNewRole} from '../../../../actions/RoleAction';
    export default{
      props:['fetchRoleDataHandler'],
      data() {
        return {
          errors:{},
          modalInstance:null,
          isSubmitCreateNewRole:false,
          role_name:null,
          role:{},
        }
      },
      mounted() {
        this.modalInstance = new Modal(this.$refs.CreateNewRoleModalRef);
      },
      methods: {
        showModalHandler(){
            this.role = this.errors = {};
            this.modalInstance.show();
        },
        hideModalHandler(){
            this.modalInstance.hide();
        },
        async createNewRoleHandler(){
            try{
                this.$toast.clear();
                this.isSubmitCreateNewRole = true;
                const data = {
                    role_name:this.role_name,
                };
                
                const res = await CreateNewRole(data);
                this.isSubmitCreateNewRole = false;
                try{
                    this.role = res.role;
                    this.fetchRoleDataHandler();
                    var message = res.message;
                    this.$toast[message.type](message.text);
                }catch(error){}

            }catch(error){

                try{
                    this.errors = error.response.data.errors;
                }catch(error){}

                try{
                    var message = error.response.data.message;
                    this.$toast[message.type](message.text);
                }catch(e){
                    this.$toast.error('Oops, something went wrong');
                }

            }finally{
                this.isSubmitCreateNewRole = false;
            }
        }
      },
    }
</script>
    
<template>
    
<div class="modal fade" ref="CreateNewRoleModalRef" id="CreateNewRoleModalRef" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-base">New Role</h5>
            </div>
            <div class="modal-body">
                <div class="settings-group-item">
                    <label class="form-label-title">Role Name:</label>
                    <input @click="delete errors?.role_name" v-model="role_name" class="form-control form-control-input" type="text">
                    <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.role_name?.length">{{ errors?.role_name[0] }}</span>
                </div>
            </div>
            <div class="modal-footer flex-between-center border-top-0">
                <button type="button" class="btn btn-danger fw-bold" data-mdb-dismiss="modal">Cancel</button>
                <router-link class="btn btn-success" v-if="role.id" :to="`/settings/roles/edit/${role.id}`">Edit Role</router-link>
                <button v-if="!role.id" :disabled="isSubmitCreateNewRole" @click="createNewRoleHandler" type="submit" class="ms-auto btn btn-primary submit px-3 d-flex justify-content-center align-items-center">
                    <div v-if="isSubmitCreateNewRole">
                        <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                            <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                        </svg>
                        <span>Submitting...</span>
                    </div>
                    <span v-if="!isSubmitCreateNewRole">Save Change</span>
                </button>
            </div>
        </div>
    </div>
</div>
    
</template>

    