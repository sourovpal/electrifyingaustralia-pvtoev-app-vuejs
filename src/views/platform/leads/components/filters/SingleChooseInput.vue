<template>

    <make-dropdown :title="label"
        @toggle="handleChange">

        <template #icon>
            <i class="fs-16px me-3"
                :class="getCustomPropertieIcon(dataType)"></i>
        </template>

        <select-option filter
            v-model="selectedOption"
            :options="options ?? []"
            :filterFields="['value', 'label']"
            :showClear="true"
            @change="handleChange"
            optionLabel="value"
            :placeholder="`Select ${label}`"
            class="w-100 select-option-small"
            panel-class="panel-option-small">
        </select-option>

    </make-dropdown>

</template>

<script setup>
    import { ref, watch, computed, watchEffect } from 'vue';
    import MakeDropdown from "./MakeDropdown.vue";
    import { usePlatformStore, useLeadsStore } from "@stores";
    import { getCustomPropertieIcon } from "@helpers";

    const props = defineProps({
        uniqueId: {
            required: true,
            type: String,
            default: "free_text",
        },
        label: {
            required: true,
            type: String,
            default: "free_text",
        },
        modelValue: {
            default: '',
        },
        dataType: {
            type: String,
            default: "text",
        },
        options: { type: Array, default: [] }
    });

    const leadsStore = useLeadsStore();
    const platformStore = usePlatformStore();

    const filterQuerys = computed(() => leadsStore.getFilterQuerys);

    const selectedOption = ref();

    function handleChange(toggle) {

        if (!selectedOption.value || !toggle) {

            selectedOption.value = null;

            return delete filterQuerys.value[props.uniqueId];

        }

        filterQuerys.value[props.uniqueId] = selectedOption.value;

    }

</script>