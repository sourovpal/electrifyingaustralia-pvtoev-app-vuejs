<script setup>
    import { ref, onMounted } from 'vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import { FindRoleById, UpdateRoleHasPermissions } from '../../../actions/RoleAction';
    import { BaseTree, Draggable, pro, OpenIcon } from '@he-tree/vue';
    import '@he-tree/vue/style/default.css';
    import '@he-tree/vue/style/material-design.css';
    import { useRouter, useRoute } from 'vue-router';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';

    const errors = ref({});
    const role_name = ref(null);
    const roleId = ref(null);

    const permissions = ref([]);

    const exampleTrees = [{
        "name": "Example Permissions",
        "name_slug": "admin",
        "isGroup": true,
        "children": [
            { "name": "Example.View" },
            { "name": "Example.Create" },
            { "name": "Example.Update" },
            { "name": "Example.Delete" }
        ]
    }];


    const permissionsTrees = ref([
        {
            "name": "All Access",
            "name_slug": "all-access",
            "children": [...exampleTrees, ...exampleTrees, ...exampleTrees]
        }]);
    const permissionsGroups = ref([]);
    const roleHasPermissions = ref([]);

    const isSubmitRoleUpdate = ref(false);
    const route = useRoute();

    const fetchRoleById = () => {
        useApiRequest({
            url: `/roles/${route.params.id}`,
            method: 'GET',
        }).then(res => {
            const { success, message, name, role_id, has_permissions } = res;
            role_name.value = name;
            roleId.value = role_id;
            roleHasPermissions.value = has_permissions;
        }).catch(error => {
            $toast.error('Oops, something went wrong.');
        });
    };

    const fetchPermissions = () => {
        useApiRequest({
            url: `/roles/permissions?group=true`,
            method: 'GET',
        }).then(res => {
            const { success, message, permissions: permissionsData, group_permissions } = res;
            if (success) {
                permissions.value = permissionsData;
                permissionsGroups.value = group_permissions;
                const tempArray = Object.keys(group_permissions).map(item => ({
                    name: item,
                    name_slug: item.toLowerCase(),
                    isGroup: true,
                    children: group_permissions[item],
                }));
                permissionsTrees.value = [{ name: 'All Access', name_slug: 'all-access', children: tempArray }];
            } else {

            }
        }).catch(error => {
            $toast.error('Oops, something went wrong');
        });
    };

    const selectAllPermissionHandler = () => {
        var totalPermission = permissions.value.length;
        var totalHasPermission = roleHasPermissions.value.length;
        if ((totalPermission === totalHasPermission) || (totalPermission != totalHasPermission && totalHasPermission)) {
            roleHasPermissions.value = [];
        } else {
            roleHasPermissions.value = permissions.value.map(item => item.permission_id);
        }
    };

    const singleSelectPermission = id => {
        const index = roleHasPermissions.value.indexOf(id);
        if (index > -1) {
            roleHasPermissions.value.splice(index, 1);
        } else {
            roleHasPermissions.value.push(id);
        }
    };

    const selectByGroupName = node => {
        const allChecked = checkGroupAllSelect(node);
        const someChecked = checkGroupAnySelect(node);
        node.children?.forEach(item => {
            const index = roleHasPermissions.value.indexOf(item.permission_id);
            if ((someChecked || allChecked) && index > -1) {
                if (index > -1) roleHasPermissions.value.splice(index, 1);
            } else {
                roleHasPermissions.value.push(item.permission_id);
            }
        });
    };

    const checkGroupAllSelect = node => {
        const group = node.children ?? [];
        return group.every(item => roleHasPermissions.value.includes(item.permission_id));
    };

    const checkGroupAnySelect = node => {
        const group = node.children ?? [];
        return group.some(item => roleHasPermissions.value.includes(item.permission_id));
    };

    const updateRoleAndPermisssion = () => {
        $toast.clear();
        isSubmitRoleUpdate.value = true;
        const payload = {
            role_name: role_name.value,
            permissions: roleHasPermissions.value,
        };
        useApiRequest({
            url: `/roles/${roleId.value}/update`,
            method: 'POST',
            payload,
        }).then(res => {
            const { success, message, errors: apiErrors } = res;
            if (!success && errors) {
                errors.value = apiErrors;
                return;
            }
            $toast[message.type](message.text);
        }).catch(error => {
            $toast.error('Oops, something went wrong');
        }).finally(() => {
            isSubmitRoleUpdate.value = false;
        });
    };

    onMounted(() => {
        fetchRoleById();
        fetchPermissions();
    });
</script>

<template>
    <div class="content content-y-100vh">
        <div class="content-header d-flex justify-content-start align-stages-center my-3">
            <router-link to="/settings/roles">
                <h1 class="mb-0 text-base">Role & Access</h1>
            </router-link>
            <div class="mx-2 d-flex justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                    <path fill="none"
                        d="M0 0h24v24H0V0z"></path>
                </svg>
            </div>
            <h1 class="mb-0 text-soft">{{ role_name??'Role Name' }}</h1>
        </div>

        <div class="content-body">
            <section class="">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="settings-group-item mb-3">
                            <label class="form-label-title">Role Name <span
                                    class="ms-3 btn btn-sm btn-danger py-0 px-2 fs-10px">Required</span></label>
                            <input @focus="delete errors?.role_name"
                                v-model="role_name"
                                type="text"
                                class="form-control py-1">
                            <span class="fs-14px text-danger py-1 w-100 d-block"
                                v-if="errors?.role_name?.length">{{ errors?.role_name[0] }}</span>
                        </div>
                        <div class="settings-group-item mb-3">
                            <div class="py-0">
                                <Draggable class="mtl-tree"
                                    v-model="permissionsTrees"
                                    treeLine
                                    ref="tree">
                                    <template #default="{ node, stat }">

                                        <OpenIcon v-if="stat.children.length"
                                            :open="stat.open"
                                            class="mtl-mr"
                                            @click.native="stat.open = !stat.open" />

                                        <custom-checkbox v-if="node.name_slug=='all-access'"
                                            :checked="!!(permissions.length === roleHasPermissions.length && roleHasPermissions.length)"
                                            :reset="!!(permissions.length !== roleHasPermissions.length && roleHasPermissions.length)"
                                            @click="selectAllPermissionHandler()">
                                        </custom-checkbox>

                                        <custom-checkbox v-if="node.isGroup"
                                            :checked="checkGroupAllSelect(node)"
                                            :reset="checkGroupAnySelect(node)"
                                            @click="selectByGroupName(node)">
                                        </custom-checkbox>

                                        <custom-checkbox v-if="(!node.isGroup && node.name_slug!='all-access')"
                                            :checked="roleHasPermissions.includes(node.permission_id)"
                                            @click="singleSelectPermission(node.permission_id)">
                                        </custom-checkbox>

                                        <span class="mtl-ml cursor-pointer">
                                            {{ node.name?.replace('.', ' ') }}
                                        </span>

                                    </template>
                                </Draggable>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <loading-button :is-loading="isSubmitRoleUpdate"
                        :disabled="!role_name"
                        @click="updateRoleAndPermisssion">Save Change</loading-button>
                </div>
                <br><br><br>
            </section>
        </div>
    </div>
</template>