<script>
import CustomScrollbar from 'custom-vue-scrollbar';
import {FindRoleById, UpdateRoleHasPermissions} from '@actions/RoleAction';
import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import '@he-tree/vue/style/material-design.css'
export default {
    name:'AccountIndex',
    components:{
        BaseTree,
        Draggable,
        pro,
        OpenIcon,
        CustomScrollbar,
    },
    data() {
        return{
            errors:{},
            role_name:null,
            roleId:null,
            role:{},
            permissions:[],
            allPermissions:[],
            roleHasPermissions:[],
            checkedAllPermissions:false,
            isSelectedAllRows:false,
            isSubmitRoleUpdate:false,
        }
    },
    methods: {
        async fetchRoleById(){
            try{
                this.$toast.clear();
                const params = this.$route.params;
                const res = await FindRoleById({id:params.id});
                try{
                    const {role, has_permissions, all_group_permissions, all_permissions} = res;
                    this.role = role;
                    this.role_name = role.name;
                    this.roleId = role.id;
                    this.roleHasPermissions = has_permissions;
                    this.allPermissions = all_permissions;
                    var tempArray = Object.keys(all_group_permissions).map((item)=>{
                        return {
                            name:item,
                            name_slug:item.toLocaleLowerCase(),
                            isGroup:true,
                            children:all_group_permissions[item],
                        };
                    });
                    this.permissions = [{name:'All Access', name_slug:'all-access', children:tempArray}];
                    this.checkedAllSelectedPermissionsHandler();
                }catch(error){
                    console.log(error);
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
            }
        },
        checkedAllSelectedPermissionsHandler(){
            if(this.allPermissions.length == this.roleHasPermissions.length){
                this.checkedAllPermissions = true;
            }else{
                this.checkedAllPermissions = false;
            }
        },
        selectAllPermissionHandler(){
            if(this.role.is_owner){
                this.$toast.clear();
                this.$toast.error('Owner role can\'t editable.');
                return;
            }
            if(this.checkedAllPermissions){
                this.roleHasPermissions = [];
                this.checkedAllPermissions = !this.checkedAllPermissions;
            }else{
                this.roleHasPermissions = this.allPermissions.map(item=>item.id);
                this.checkedAllPermissions = !this.checkedAllPermissions;
            }
        },
        singleSelectPermissionHandler(id){
            if(this.role.is_owner){
                this.$toast.clear();
                this.$toast.error('Owner role can\'t editable.');
                return;
            }
            var index = this.roleHasPermissions.indexOf(id);
            if(index > -1){
                this.roleHasPermissions.splice(index, 1);
            }else{
                this.roleHasPermissions.push(id);
            }
            this.checkedAllSelectedPermissionsHandler();
        },
        selectByGroupName(node){
            if(this.role.is_owner){
                this.$toast.clear();
                this.$toast.error('Owner role can\'t editable.');
                return;
            }
            const allChecked = this.checkGroupAllSelect(node);
            node.children?.map(item=>{
                var index = this.roleHasPermissions.indexOf(item.id);
                if(!allChecked){
                    if(index == -1){
                        this.roleHasPermissions.push(item.id);
                    }
                }else{
                    if(index > -1){
                        this.roleHasPermissions.splice(index, 1);
                    }
                }
            });
            this.checkedAllSelectedPermissionsHandler();
        },
        checkGroupAllSelect(node){
            var group = node.children??[];
            var status = true;
            for(var item in group){
                if(!this.roleHasPermissions.includes(group[item].id)){
                    status = false;
                    break;
                }
            }
            return status;
        },
        async updateRoleWithPermissionHandler(){
            this.$toast.clear();
            if(this.role.is_owner){
                this.$toast.error('Owner role can\'t editable.');
                return;
            }
            try{
                if(this.role_name === '' || this.role_name === null){
                    this.errors = {
                        role_name:['The role name field is required.']
                    };
                    return;
                }

                this.isSubmitRoleUpdate = true;
                var data = {
                    role_name:this.role_name,
                    permissions:this.roleHasPermissions,
                };
                const res = await UpdateRoleHasPermissions(data, this.roleId);

                try{
                    const {message, role} = res;
                    this.role = role;
                    this.$toast[message.type](message.text);
                }catch(error){}
            }catch(error){
                console.log(error)
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
                this.isSubmitRoleUpdate = false;
            }
        }
    },
    mounted() {
        this.fetchRoleById();
    },
}
</script>
    
<template>
    <div class="content add-custom-scrollbar">
        <CustomScrollbar thumbWidth="8">
            <div class="content-header d-flex justify-content-start align-stages-center">
                <router-link to="/settings/roles">
                    <h1 class="mb-0 text-base">Role & Access</h1>
                </router-link>
                <div class="mx-2 d-flex justify-content-center align-items-center">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>
                </div>
                <h1 class="mb-0 text-soft">{{ role?.name??'Role Name' }}</h1>
            </div>
        
            <div class="content-body">
                <section class="">
                    <div class="row">
                        <div class="col-lg-4">
        
                            <div class="settings-group-item mb-3">
                                <label class="form-label-title">Role Name <span class="ms-3 btn btn-sm btn-danger py-0 px-2 fs-10px">Required</span></label>
                                <input :readonly="role.is_owner" :class="role.is_owner?'cursor-no-drop':''" @focus="delete errors?.role_name" v-model="role_name" type="text" class="form-control form-control-input py-1">
                                <span class="fs-14px text-danger py-1 w-100 d-block" v-if="errors?.role_name?.length">{{ errors?.role_name[0] }}</span>
                            </div>

                            <div class="settings-group-item mb-3">
                                <!-- Checked All Permission Checkbox -->
                                <div class="py-0">
                                    <Draggable class="mtl-tree" v-model="permissions" treeLine ref="tree">
                                        <template #default="{ node, stat }">

                                            <OpenIcon
                                            v-if="stat.children.length"
                                            :open="stat.open"
                                            class="mtl-mr"
                                            @click.native="stat.open = !stat.open"
                                            />

                                            <label v-if="node.name_slug=='all-access'" @click="selectAllPermissionHandler()" class="custom-form-checkbox ms-1 cursor-pointer">
                                                <svg v-if="!checkedAllPermissions" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="22" viewBox="0 -960 960 960" width="22"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                                <svg v-if="checkedAllPermissions" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="22" height="22" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                            </label>
                                            <span 
                                            v-if="node.name_slug=='all-access'" 
                                            @click="selectAllPermissionHandler()" 
                                            class="mtl-ml fw-bold cursor-pointer">{{ node.name }}</span>
                                            


                                            <label v-if="node.isGroup" @click="selectByGroupName(node)" class="custom-form-checkbox ms-1 cursor-pointer">
                                                <svg v-if="!checkGroupAllSelect(node)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="22" viewBox="0 -960 960 960" width="22"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                                <svg v-if="checkGroupAllSelect(node)" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="22" height="22" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                            </label>
                                            <span 
                                            v-if="node.isGroup" 
                                            @click="selectByGroupName(node)" 
                                            class="mtl-ml fw-bold cursor-pointer">{{ node.name }}</span>




                                            <label v-if="(!node.isGroup && node.name_slug!='all-access')" @click="singleSelectPermissionHandler(node.id)" class="custom-form-checkbox ms-2 cursor-pointer">
                                                <svg v-if="!roleHasPermissions.includes(node.id)" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="22" viewBox="0 -960 960 960" width="22"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                                                <svg v-if="roleHasPermissions.includes(node.id)" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="22" height="22" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                            </label>
                                            <span 
                                            v-if="(!node.isGroup && node.name_slug!='all-access')" 
                                            @click="singleSelectPermissionHandler(node.id)" 
                                            class="mtl-ml cursor-pointer">{{ node.name }}</span>

                                        </template>
                                    </Draggable>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mt-3">
                            <button :disabled="isSubmitRoleUpdate" @click="updateRoleWithPermissionHandler()" type="submit" class="login-form-control btn btn-primary submit px-3 d-flex justify-content-center align-stages-center">
                                <div v-if="isSubmitRoleUpdate">
                                    <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;margin-left:0px;">
                                        <circle style="stroke: #ffffff;" class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                    </svg>
                                    <span>Submitting...</span>
                                </div>
                                <span v-if="!isSubmitRoleUpdate">Save Change</span>
                            </button>
                        </div>
                    </div>
        
                    <br><br><br>
                </section>
            </div>
        </CustomScrollbar>
    </div>
</template>
