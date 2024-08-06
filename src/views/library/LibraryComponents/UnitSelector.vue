<template>
    <div class="dropdown dropup text-end p-0">
        <small
            class="fw-bold cursor-pointer text-secondary"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
        >
			<span class="me-3">watt</span>
			<font-awesome-icon
			    class="text-secondary"
			    icon="fas fa-caret-down"
			/>
		</small>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer" v-for="unit in units"> 
                {{unit.name}}
            </li>
        </ul>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../../stores/app';

const appStore = useAppStore();
const { units } = storeToRefs(appStore);

const props = defineProps(['selected']);

</script>

<style lang="scss" scoped>

</style>
