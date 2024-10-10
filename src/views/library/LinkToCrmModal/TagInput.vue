<template>
    <div 
        v-if="inputActive"
        @click="handleTagInput" 
        class="d-flex cursor-pointer text-primary align-items-center gap-2" 
    >
		<font-awesome-icon 
		    class="fs-12px" 
		    icon="fas fa-tag"
		/>
        <span class="fw-bold fs-14px pe-2">Add tag</span>
    </div>
    <div v-else>
        <input
            placeholder="Type to search or create a new tag..." 
            class="form-control p-0 ps-2 py-1 fs-13px" 
            @input="handleInput" 
            type="text" 
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update:modelValue']);

const inputActive = ref(true);
const handleTagInput = () => {
    inputActive.value = false;
}




</script>

<style lang="scss" scoped>

</style>
