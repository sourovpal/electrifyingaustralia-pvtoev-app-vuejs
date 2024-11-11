<template>
    <div class="dropdown p-0">
        <button
            class="fw-bold cursor-pointer btn btn-sm btn-light"
            data-mdb-toggle="dropdown"
        >
			<span class="me-3">{{ selectedValue[displayKey] ?? 'beans' }}</span>
			<font-awesome-icon icon="fas fa-caret-down" />
		</button>
        <ul class="dropdown-menu overflow-hidden" aria-labelledby="dropdownMenuLink">
            <li v-for="listItem in list" class="dropdown-item cursor-pointer" @click="handleOptionClick(listItem.id)">
                {{ listItem[displayKey] }}
            </li>
        </ul>
	</div>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps([
    'list',
    'displayKey',
    'modelValue'
]);

// onMounted(() => {
//     const listKeys = props.list.map(listItem => Object.keys(listItem));
// });

const selectedValue = computed(() => {
    return props.list.find(listItem => listItem.id.toString() === props.modelValue.toString())
});

const handleOptionClick = (listItemId) => {
    console.log(listItemId);
}

</script>

<style lang="scss" scoped>

</style>
