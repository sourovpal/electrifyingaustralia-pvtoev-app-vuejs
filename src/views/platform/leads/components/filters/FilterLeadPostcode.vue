<template>
    <make-dropdown title="Post Code"
        @toggle="handleChange">
        <template #icon>
            <i class="pi pi-compass fs-16px me-3"></i>
        </template>
        <input-text class="w-100"
            size="small"
            v-model="inputPostcode"
            @input="handleChange"
            placeholder="Post Code"></input-text>

    </make-dropdown>
</template>
<script setup>
    import { ref, watch, computed, watchEffect } from 'vue';
    import MakeDropdown from "./MakeDropdown.vue";
    import { usePlatformStore, useLeadsStore } from "@stores";

    const leadsStore = useLeadsStore();
    const platformStore = usePlatformStore();

    const filterQuerys = computed(() => leadsStore.getFilterQuerys);

    const inputPostcode = ref();

    function handleChange(toggle) {

        if (!inputPostcode.value || !toggle) {
            inputPostcode.value = null;
            return delete filterQuerys.value['post_code'];
        }

        filterQuerys.value['post_code'] = inputPostcode.value;

    }

</script>