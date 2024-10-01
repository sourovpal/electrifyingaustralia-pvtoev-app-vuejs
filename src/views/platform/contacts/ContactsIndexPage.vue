<script setup>
    import { ref, onMounted } from 'vue';
    import SearchBar from '@components/SearchBar.vue';
    import Datatable from '@components/Datatable/Datatable.vue';
    import DatatableHeader from '@components/Datatable/DatatableHeader.vue';
    import DatatableBody from '@components/Datatable/DatatableBody.vue';
    import DataTableSkeletor from './components/DataTableSkeletor.vue';
    import ContactToolsBar from './components/ContactToolsBar.vue';
    import EmptyPage from '@errors/EmptyPage.vue';
    import ErrorPage from '@errors/ErrorPage.vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';
    import { useDebounceFn } from '@vueuse/core';
    import ContactEditModal from '../timeline/modals/ContactEditModal.vue'
    import { usePlatformStore } from '@stores';
    import { handleDateTimeFormat } from '@helpers';

    const platformStore = usePlatformStore();
    const contactEditModalRef = ref(null);
    const isFirstLoading = ref(true);
    const isLoading = ref(true);
    const isError = ref(true);
    const leadContacts = ref([]);
    const contactPagination = ref({
        prev_page: null,
        next_prev: null,
        total: 0,
        from: 0,
        to: 0,
        current_page: 1,
        limit: 30,
    });

    async function getContacts(payload = {}) {
        isLoading.value = true;
        isError.value = false;

        if (typeof payload['page'] == 'undefined') {
            payload['page'] = contactPagination.value?.current_page ?? 1;
        }

        if (typeof payload['limit'] == 'undefined' && contactPagination.value?.limit) {
            payload['limit'] = contactPagination.value?.limit;
        }

        await useApiRequest({
            url: '/contacts',
            payload
        }).then(res => {
            const { success, message, contacts, pagination } = res;
            if (success) {
                leadContacts.value = contacts;
                contactPagination.value = pagination;
                return;
            }
            $toast.error(message.text);
        }).catch(error => {
            isError.value = true;
            $toast.error("Oops, something went wrong");
        }).finally(() => {
            isFirstLoading.value = isLoading.value = false;
        });
    }

    const handleSearchContacts = useDebounceFn((search) => {
        var payload = { search, page: 1 };
        if (contactPagination.value?.current_page && contactPagination.value?.current_page > 1) {
            payload['page'] = contactPagination.value.current_page;
        }
        getContacts(payload);
    }, 2000);

    function selectEditContact(contact) {
        platformStore.setEditLead({});
        if (contact.lead) {
            platformStore.setEditLead(contact.lead);
            contactEditModalRef.value?.showModalHandler(contact);
        }
    }

    onMounted(() => {
        isFirstLoading.value = true;
        getContacts();
    });

</script>

<template>
    <section class="content contacts-list">
        <search-bar></search-bar>
        <contact-tools-bar :pagination="contactPagination"
            :is-loading="isLoading"
            @pagination:fetch="getContacts"
            @search:update="handleSearchContacts"></contact-tools-bar>
        <error-page v-if="isError"
            :css="{icon:{width:'30%'}}"></error-page>
        <empty-page v-else-if="!isLoading && !leadContacts.length"
            :css="{icon:{width:'30%'}}"></empty-page>
        <Datatable v-else>
            <datatable-header>
                <div class="tbl-th"
                    style="width:20rem;flex-grow: 1;">Contact</div>
                <div class="tbl-th "
                    style="width:20rem;flex-grow: 1;">Phone Number</div>
                <div class="tbl-th"
                    style="width:15rem;flex-grow: 1;">Email Address</div>
                <div class="tbl-th"
                    style="width:10rem;flex-grow: 1;">Last Update</div>
                <div class="tbl-th"
                    style="width:10rem;flex-grow: 1;">Created At</div>
            </datatable-header>
            <datatable-body>
                <DataTableSkeletor v-if="isFirstLoading" />
                <div v-else
                    class="tbl-tr full-width"
                    v-for="(item, index) in leadContacts"
                    :key="index">

                    <div @click="selectEditContact(item)"
                        style="width:20rem;flex-grow: 1;"
                        class="tbl-td full-width cursor-pointer">
                        <div data-v-2b4956d4=""
                            class="circle-avatar me-2">
                            <img data-v-2b4956d4=""
                                class="rounded-circle border"
                                alt="avatar1"
                                :src="item?.avatar">
                        </div>
                        <a class="text-overflow-ellipsis">{{ item?.full_name }}</a>
                    </div>

                    <div style="width:20rem;flex-grow: 1;"
                        class="tbl-td">
                        <a class="text-overflow-ellipsis">{{ item?.phone_number }}</a>
                    </div>

                    <div style="width:15rem;flex-grow: 1;"
                        class="tbl-td">
                        <a class="text-overflow-ellipsis">{{ item?.email }}</a>
                    </div>

                    <div style="width:10rem;flex-grow: 1;"
                        class="tbl-td">{{ handleDateTimeFormat(item?.updated_at) }}</div>

                    <div style="width:10rem;flex-grow: 1;"
                        class="tbl-td">{{ handleDateTimeFormat(item?.created_at) }}</div>
                </div>
            </datatable-body>
        </Datatable>
    </section>
    <ContactEditModal ref="contactEditModalRef"
        @update="getContacts({page:1})"
        show-lead />
</template>
<style>
    .contacts-list .tbl-body .tbl-tr .tbl-td {
        padding: 6px 16px !important;
    }
</style>