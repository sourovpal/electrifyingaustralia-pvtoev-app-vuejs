<template>
    <make-dropdown title="Source"
        @toggle="handleChange">

        <template #icon>
            <i class="pi pi-folder-plus fs-16px"></i>
        </template>

        <select-option filter
            v-model="selectedOption"
            :options="leadSources ?? []"
            :filterFields="['title']"
            :showClear="true"
            @change="handleChange"
            optionLabel="title"
            placeholder="Select Source"
            class="w-100 select-option-small"
            panel-class="panel-option-small">
        </select-option>

    </make-dropdown>
</template>

<script setup>
    import { ref, watch, computed, watchEffect } from 'vue';
    import MakeDropdown from "./MakeDropdown.vue";
    import { usePlatformStore, useLeadsStore } from "@stores";

    const leadsStore = useLeadsStore();
    const platformStore = usePlatformStore();

    const filterQuerys = computed(() => leadsStore.getFilterQuerys);
    const leadSources = computed(() => platformStore.getSources);

    const selectedOption = ref();

    function handleChange(toggle) {

        if (!selectedOption.value || !toggle) {
            selectedOption.value = null;
            return delete filterQuerys.value['source'];
        }

        filterQuerys.value['source'] = selectedOption.value.title;

    }

</script>