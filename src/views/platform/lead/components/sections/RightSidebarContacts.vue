<script setup>
    import { defineProps, computed, watchEffect, ref } from 'vue';
    import { Skeletor } from "vue-skeletor";
    import { useLeadStore } from "../../../../../stores/lead";
    import { useAppStore } from "../../../../../stores/app";
    import ContactEditModal from "../modals/ContactEditModal.vue";
    import CustomModal from '../../../../../components/modals/CustomModal.vue';
    import { useApiRequest } from '../../../../../actions/api';
    import { useClipboard } from '@vueuse/core';
    import { $toast } from '../../../../../config';

    const appStore = useAppStore();
    const leadStore = useLeadStore();

    const props = defineProps({
        isFirstLoading: {
            type: Boolean,
            default: true,
        },
    });

    const primaryContact = ref({});
    const contacts = ref([]);
    watchEffect(() => {
        primaryContact.value = leadStore.getPrimaryContact;
        contacts.value = leadStore.getLeadContacts;
    });

    async function deleteLeadContactHandler(id) {
        await useApiRequest({
            url: `/contacts/delete/${id}`,
        }).then(res => {

        }).catch(error => {

        });
    }

    function copyClipboardHandler(source = null) {
        if (!source) return;
        const { copy, copied } = useClipboard();
        copy(source);
        $toast.success(`${source} Copied to clipboard`);
    }



</script>
<template>
    <div
        class="col-r-header d-flex justify-content-between align-items-center border-bottom overflow-x-auto overflow-y-hidden">
        <div class="left ps-3 py-1 d-flex justify-content-start align-items-center">
            <div v-for="(item, index) in contacts"
                class="circle-avatar me-2 cursor-pointer"
                :class="`${primaryContact?.contact_id == item.contact_id ? 'shadow-border' : ''}`"
                @click="primaryContact = item"
                v-tippy="{ content: `${item.full_name}`, placement: 'top' }"
                :key="index">
                <img class="rounded-circle border"
                    alt="avatar1"
                    :src="item.avatar" />
            </div>

            <div v-if="isFirstLoading"
                class="circle-avatar me-2 cursor-pointer"
                v-for="(item, index) in 2"
                :key="index">
                <Skeletor style="width: 32px; height: 32px; border-radius: 50%" />
            </div>

        </div>

        <div class="right pe-3 py-1 d-flex justify-content-end align-items-center">
            <button @click="$refs['contactEditModalRef'].showModalHandler()"
                v-tippy="{ content: 'Add a contact', placement: 'top' }"
                class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                <font-awesome-icon icon="fas fa-plus"
                    class="text-soft fs-16px"></font-awesome-icon>
            </button>
        </div>

    </div>

    <div class="px-3 py-2 border-bottom">

        <div class="d-flex justify-content-between align-items-center mb-1 position-relative">
            <h3 class="user-name fs-18px fw-bold text-head mb-0"
                v-if="!isFirstLoading">
                {{ primaryContact?.full_name }}
            </h3>
            <Skeletor v-else
                width="70%" style="height:20px;" />
            <button data-mdb-toggle="dropdown"
                class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent">
                <font-awesome-icon icon="fas fa-ellipsis-vertical"
                    class="text-soft fs-18px"></font-awesome-icon>
            </button>
            <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu three-dot">
                <span @click="$refs['contactEditModalRef'].showModalHandler(primaryContact)"
                    class="dropdown-item cursor-pointer text-head py-1">Edit Contact</span>
                <span v-if="!primaryContact?.is_primary"
                    @click="$refs['deleteContactModalRef'].modalShow()"
                    class="dropdown-item py-1 cursor-pointer">Remove Contact</span>
            </div>
        </div>
        <div>
            <table v-if="isFirstLoading"
                class="tbl-contact-info w-100">
                <tr v-for="(item, index) in 3" :key="index">
                    <td class="d-flex justify-content-between align-items-center mb-2" width="100%">
                        <Skeletor width="65%" />
                        <div class="d-flex justify-content-end align-items-center" style="width:25%;">
                            <Skeletor width="5%" style="flex-grow:1;" class="me-2" />
                            <Skeletor width="5%" style="flex-grow:1;" class="me-2" />
                        </div>
                    </td>
                </tr>
            </table>
            <table v-if="!isFirstLoading"
                class="tbl-contact-info w-100">
                <tr v-if="primaryContact?.email">
                    <td class="fs-16px"
                        width="10%">
                        <font-awesome-icon icon="fas fa-envelope"
                            class="text-soft fs-16px"></font-awesome-icon>
                    </td>
                    <td class="fs-16px">
                        <a class="d-block user-email text-soft"
                            :href="`mailto:${primaryContact?.email}`">{{ primaryContact?.email }}</a>
                    </td>
                    <td class="hover"
                        width="20%">
                        <div class="d-flex justify-content-end align-items-center">
                            <button @click="copyClipboardHandler(primaryContact?.email)"
                                class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center">
                                <font-awesome-icon icon="fas fa-copy"
                                    class="text-soft fs-16px"></font-awesome-icon>
                            </button>
                            <a class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                                target="_blank"
                                :href="`mailto:${primaryContact?.email}`">
                                <font-awesome-icon icon="fas fa-arrow-up-right-from-square"
                                    class="text-soft fs-14px"></font-awesome-icon>
                            </a>
                        </div>
                    </td>
                </tr>
                <tr v-for="(item, index) in primaryContact?.another_emails ?? []"
                    :key="index">
                    <td class="fs-16px"
                        width="10%">
                        <font-awesome-icon icon="fas fa-envelope"
                            class="text-soft fs-16px"></font-awesome-icon>
                    </td>
                    <td class="fs-16px">
                        <a class="d-block user-email text-soft"
                            :href="`mailto:${item?.email}`">{{ item?.email }}</a>
                    </td>
                    <td class="hover"
                        width="20%">
                        <div class="d-flex justify-content-end align-items-center">
                            <button @click="copyClipboardHandler(item?.email)"
                                class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center">
                                <font-awesome-icon icon="fas fa-copy"
                                    class="text-soft fs-16px"></font-awesome-icon>
                            </button>
                            <a class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                                target="_blank"
                                :href="`mailto:${item?.email}`">
                                <font-awesome-icon icon="fas fa-arrow-up-right-from-square"
                                    class="text-soft fs-14px"></font-awesome-icon>
                            </a>
                        </div>
                    </td>
                </tr>
                <tr v-if="primaryContact?.phone_number">
                    <td class="fs-16px"
                        width="10%">
                        <font-awesome-icon icon="fas fa-phone"
                            class="text-soft fs-15px"></font-awesome-icon>
                    </td>
                    <td class="fs-16px">
                        <a class="d-block text-soft user-phone"
                            :href="`tel:${primaryContact?.phone_number}`">{{ primaryContact?.phone_number }}</a>
                        <Skeletor v-if="isFirstLoading"
                            width="70%" />
                    </td>
                    <td class="hover"
                        width="20%">
                        <div class="d-flex justify-content-end align-items-center">
                            <button @click="copyClipboardHandler(primaryContact?.phone_number)"
                                class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center">
                                <font-awesome-icon icon="fas fa-copy"
                                    class="text-soft fs-16px"></font-awesome-icon>
                            </button>
                            <a class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                                :href="`tel:${primaryContact?.phone_number}`">
                                <font-awesome-icon icon="fas fa-arrow-up-right-from-square"
                                    class="text-soft fs-14px"></font-awesome-icon>
                            </a>
                        </div>
                    </td>
                </tr>
                <tr v-for="(item, index) in primaryContact?.another_phones ?? []"
                    :key="index">
                    <td class="fs-16px"
                        width="10%">
                        <font-awesome-icon icon="fas fa-phone"
                            class="text-soft fs-15px"></font-awesome-icon>
                    </td>
                    <td class="fs-16px">
                        <a class="d-block text-soft user-phone"
                            :href="`tel:${item?.phone_number}`">{{ item?.phone_number }}</a>
                    </td>
                    <td class="hover"
                        width="20%">
                        <div class="d-flex justify-content-end align-items-center">
                            <button @click="copyClipboardHandler(item?.phone_number)"
                                class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center">
                                <font-awesome-icon icon="fas fa-copy"
                                    class="text-soft fs-16px"></font-awesome-icon>
                            </button>
                            <a class="btn btn-sm btn-light btn-floating bg-transparent d-flex justify-content-center align-items-center"
                                :href="`tel:${item?.phone_number}`">
                                <font-awesome-icon icon="fas fa-arrow-up-right-from-square"
                                    class="text-soft fs-14px"></font-awesome-icon>
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>


    <!-- Modal Area -->
    <ContactEditModal :findLeadByIdHandler="()=>{}"
        ref="contactEditModalRef" />
    <!-- Delete Contact Confirm Modal -->
    <CustomModal ref="deleteContactModalRef"
        size="sm">
        <h5 class="text-head text-center fw-bold">Delete Contact?</h5>
        <p class="fs-12px text-center text-danger">
            This action cannot be undone! To confirm your intent, please click
            delete button.
        </p>
        <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-primary btn-sm"
                data-mdb-dismiss="modal">
                Cancel
            </button>
            <button class="btn btn-danger btn-sm"
                data-mdb-dismiss="modal"
                @click="deleteLeadContactHandler(primaryContact.contact_id)">
                Delete
            </button>
        </div>
    </CustomModal>
</template>

<style scoped
    lang="scss">
    tr {
        td.hover {
            opacity: 0;
        }

        &:hover {
            td.hover {
                opacity: 1;
            }
        }
    }
</style>