<template>
    <div class="dropdown dropup text-end p-0">
        <small
            class="fw-bold cursor-pointer"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
        >
			<span class="me-3" v-if="selectedUnitName">{{ selectedUnitName }}</span>
			<span class="me-3 text-secondary" v-else>Select</span>

			<font-awesome-icon icon="fas fa-caret-down" />
		</small>
        <ul class="dropdown-menu overflow-hidden" aria-labelledby="dropdownMenuLink">
            <li
                class="py-2 px-3 dropdown-item cursor-pointer d-flex align-items-center justify-content-between" 
                v-for="unit in computedUnits" 
                @click="handleUnitSelect(unit)"
            > 
                <span :class="unit.id ? '' : 'text-danger'">{{ unit.name }}</span>
                <span class="text-secondary fs-11px" v-if="unit.description">({{ unit.description }})</span>
                <font-awesome-icon 
                    v-if="!unit.id" 
                    class="text-danger" 
                    icon="fas fa-trash" 
                />
            </li>
        </ul>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useProjectStore } from '../../../../stores/project';

const projectStore = useProjectStore(); 
const { units } = storeToRefs(projectStore);

const props = defineProps([
    'selected',
    'modelValue'
]);

const emit = defineEmits([
    'update:modelValue',
    'unit-remove-click'
]);

const selectedUnitName = computed(() => {
    if (!units?.value?.length) return '';
    const selectedUnit = units.value.find(unit => unit?.id?.toString() === props?.modelValue?.toString());

    if (!selectedUnit) return '';
    return selectedUnit.name;
});

const computedUnits = computed(() => (
    [  
        props.modelValue ? { name: 'Remove unit', id: null } : null,
       ...units.value
    ]
    .filter(v => v))
);

const handleUnitSelect = (unit) => emit('update:modelValue', unit.id);

</script>

<style lang="scss" scoped>

</style>
