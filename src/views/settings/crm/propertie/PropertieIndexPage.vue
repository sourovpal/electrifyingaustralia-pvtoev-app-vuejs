<script setup>
    import SettingsTopNavbar from '@components/SettingsTopNavbar.vue';
    import AddNewModal from './components/AddNewModal.vue';
    import PropertieDatatable from './components/PropertieDatatable.vue';
    import PropertieToolsBar from './components/PropertieToolsBar.vue';
    import EmptyPage from '@components/Errors/EmptyPage.vue';
    import { getCustomPropertieIcon, handleDateTimeFormat } from "@helpers";
    import { useApiRequest } from '@actions';
    import { ref, onMounted, watch, reactive } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const add_new_modal_toggle = ref(false);

    const properties = ref([]);

    const pagination = reactive({
        total: 0,
        per_page: 0,
        current_page: 1,
        next_page: null,
        prev_page: null,
        last_page: 0,
        from: 0,
        to: 0
    });

    const attributes = reactive({
        pipeline_id: null,
        title: null,
    });

    const selected_properties = ref([]);
    const is_first_loading = ref(false);
    const is_loading = ref(false);

    const edit_propertie = ref(null);

    function handleFetchProperties() {

        is_loading.value = true;

        let payload = { page: pagination.current_page };

        if (attributes.pipeline_id) payload.pipeline_id = attributes.pipeline_id;

        useApiRequest({
            url: `/settings/properties`,
            payload
        }).then(res => {

            const { pagination: _pagination, properties: _properties } = res;

            Object.assign(pagination, _pagination);

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

    function handleEditPropertie(propertie) {
        edit_propertie.value = propertie;
        add_new_modal_toggle.value = true;
    }

    watch(route, () => {
        Object.assign(attributes, { pipeline_id: null, title: null });
        handleFetchProperties();
    });

    watch(
        add_new_modal_toggle,
        (status) => {
            if (!status) edit_propertie.value = null;
        });

    onMounted(() => {

        is_first_loading.value = true;

        const { pipeline_id, title } = route.query;

        attributes.pipeline_id = pipeline_id;
        attributes.title = title;

        handleFetchProperties();

    });

</script>

<template>

    <section class="content">

        <settings-top-navbar>
            <template #left>
                <div class="d-flex justify-content-start align-items-center">

                    <router-link to="/settings/crm/propertie">
                        <h1 class="mb-0 text-head fs-22px fw-bold">
                            {{ attributes.title ? " Pipeline ":" Lead " }}
                            Properties
                        </h1>
                    </router-link>

                    <i v-if="attributes.title"
                        class="pi pi-angle-right fs-22px px-2 mt-1"></i>

                    <h1 v-if="attributes.title"
                        class="mb-0 text-head fs-22px fw-bold">
                        {{ attributes.title }}
                    </h1>

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

        <propertie-datatable v-if="is_loading || properties.length"
            :properties="properties"
            :is-loading="is_loading"
            :selected-properties="selected_properties"
            :is-first-loading="is_first_loading"
            @edit-propertie="handleEditPropertie"
            @checked="handleSelectProperties"></propertie-datatable>

        <empty-page v-if="!is_loading && !properties.length"
            :css="{icon:{width:'30%'}}"
            class="border-top"></empty-page>

        <add-new-modal v-if="add_new_modal_toggle"
            :edit-propertie="edit_propertie"
            @refresh="handleFetchProperties()"
            @close="()=>add_new_modal_toggle = false"
            v-model:visible="add_new_modal_toggle"></add-new-modal>


    </section>
</template>