<template>
    <div class="dropdown dropup text-end p-0">
        <small
            class="fw-bold cursor-pointer"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
        >
			<span class="me-3" v-if="selectedRebateType">{{ selectedRebateType }}</span>
			<span class="me-3 text-secondary" v-else>Select rebate type</span>

			<font-awesome-icon icon="fas fa-caret-down" />
		</small>
        <ul class="dropdown-menu overflow-hidden" aria-labelledby="dropdownMenuLink">
            <li
                class="py-2 px-3 dropdown-item cursor-pointer" 
                v-for="rebateType in rebateTypes" 
                @click="handleRebateType(rebateType)"
            > 
                <span>{{ rebateType.name }}</span>
            </li>
        </ul>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useProjectStore } from '../../../../stores/project';

const projectStore = useProjectStore();
const { rebateTypes } = storeToRefs(projectStore);

const props = defineProps([
    'selected',
    'modelValue'
]);

const emit = defineEmits([
    'update:modelValue',
]);

const selectedRebateType = computed(() => {
    if (!rebateTypes?.value?.length) return '';
    const selectedRebateTypeRecord = rebateTypes.value.find(rebateType => rebateType?.id?.toString() === props?.modelValue?.toString());

    if (!selectedRebateTypeRecord) return '';
    return selectedRebateTypeRecord.name;
});

const handleRebateType = (rebateType) => emit('update:modelValue', rebateType.id);

</script>

<style lang="scss" scoped>

</style>
