<script setup>
    import { VueDraggableNext } from 'vue-draggable-next';
    const props = defineProps({
        options: { type: Array, default: [{}] },
    });

    const emits = defineEmits(['addNew', 'delete']);

</script>

<template>

    <label class="fs-16px text-head mt-2">Input Options</label>

    <vue-draggable-next tag="div"
        :list="options"
        handle=".handle">
        <icon-field v-for="(option, index) in options"
            :key="index"
            class="mt-2">

            <input-icon class="pi pi-sort-alt fs-14px handle-move handle" />

            <input-text class="w-100"
                v-model="option['value']"
                size="small"
                placeholder="Type value"></input-text>

            <input-icon @click="emits('delete', index, option)"
                class="pi pi-trash fs-14px text-danger cursor-pointer" />

        </icon-field>
    </vue-draggable-next>

    <div class="mt-2">
        <Button size="small"
            type="button"
            class="w-100"
            severity="secondary"
            label="Add New"
            @click="emits('addNew')"></Button>
    </div>

</template>

<style scoped
    lang="scss">
    .handle-move {
        cursor: move;
    }
</style>