<script setup>
    import SettingsTopNavbar from '@components/SettingsTopNavbar.vue';
    import AddNewModal from './components/AddNewModal.vue';
    import PropertieDatatable from './components/PropertieDatatable.vue';
    import PropertieToolsBar from './components/PropertieToolsBar.vue';
    import { getCustomPropertieIcon, handleDateTimeFormat } from "@helpers";
    import { useApiRequest } from '@actions';
    import { ref, onMounted } from 'vue';


    const add_new_modal_toggle = ref(false);
    const properties = ref([]);
    const pagination = ref({
        total: 0,
        per_page: 0,
        current_page: 0,
        next_page: null,
        prev_page: null,
        last_page: 0,
        from: 0,
        to: 0
    });

    const selected_properties = ref([]);
    const is_first_loading = ref(false);
    const is_loading = ref(false);

    function handleFetchProperties(page = 1) {

        is_loading.value = true;

        useApiRequest({
            url: `/settings/properties`,
            payload: {
                page
            }
        }).then(res => {

            const { pagination: _pagination, properties: _properties } = res;

            pagination.value = _pagination;

            properties.value = _properties;

        }).catch(error => {

        }).finally(_ => {

            is_loading.value = false;

            is_first_loading.value = false;

        });

    }

    function handleSelectProperties(id) {

        let index = selected_properties.value.indexOf(id);

        if (index > -1) return selected_properties.value.splice(index, 1);

        selected_properties.value.push(id);

    }

    function handleSelectAllProperties() {

        if (selected_properties.value.length) return selected_properties.value = [];

        selected_properties.value = properties.value.map(item => item.propertie_id);
    }



    onMounted(() => {
        is_first_loading.value = true;
        handleFetchProperties();
    });

</script>

<template>

    <section class="content">

        <settings-top-navbar>
            <template #left>
                <div>
                    <router-link to="/settings/crm/propertie">
                        <h1 class="mb-0 text-head fs-22px fw-bold">Lead Properties</h1>
                    </router-link>
                    <!-- <div>
                        <i class="pi pi-arrow-right"></i>
                    </div> -->
                </div>
            </template>
        </settings-top-navbar>

        <propertie-tools-bar class="mt-n5"
            :is-loading="is_loading"
            :pagination="pagination"
            :selected-properties="selected_properties"
            @checked-all="handleSelectAllProperties"
            @fetch="handleFetchProperties"
            @toggle-add-new="()=>add_new_modal_toggle = true">
        </propertie-tools-bar>

        <propertie-datatable :properties="properties"
            :is-loading="is_loading"
            :selected-properties="selected_properties"
            :is-first-loading="is_first_loading"
            @checked="handleSelectProperties"></propertie-datatable>

        <add-new-modal v-if="add_new_modal_toggle"
            @close="()=>add_new_modal_toggle = false"
            v-model:visible="add_new_modal_toggle"></add-new-modal>



    </section>
</template>