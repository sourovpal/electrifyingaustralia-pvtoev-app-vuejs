<template>
    <div class="dropdown dropup text-end p-0">
        <small
            class="fw-bold cursor-pointer"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
        >
			<span class="me-3">{{ selectedUnitName }}</span>
			<font-awesome-icon
			    icon="fas fa-caret-down"
			/>
		</small>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li
                class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer" 
                v-for="unit in units" 
                @click="handleUnitSelect(unit)"
            > 
                {{ unit.name }}
            </li>
        </ul>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../../stores/app';
import { computed } from 'vue';

const appStore = useAppStore();
const { units } = storeToRefs(appStore);

const props = defineProps(['selected', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const selectedUnitName = computed(() => {
    if (!units?.value?.length) return '';
    const selectedUnit = units.value.find(unit => unit?.id?.toString() === props?.modelValue?.toString());

    if (!selectedUnit) return '';
    return selectedUnit.name;
});

const handleUnitSelect = (unit) => {
    emit('update:modelValue', unit.id);
}

</script>

<style lang="scss" scoped>

</style>
