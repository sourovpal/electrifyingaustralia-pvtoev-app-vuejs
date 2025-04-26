<script setup>
    const props = defineProps({
        size: { type: String, default: null }
    });
</script>

<template>

    <Button v-bind="$attrs"
        :size="size"
        class="danger-button"
        severity="danger"
        :class="{
            'small-size':(size == 'small'),
            'large-size':(size != 'small'),
            }">
        <slot></slot>
    </Button>

</template>

<style scoped
    lang="scss">
    .danger-button {
        border-radius: 5px;
        box-shadow: 0 4px 7px -4px #b30c47;
        color: #ffffff;
        border: none !important;

        &:hover {
            box-shadow: 0 2px 7px -4px #a42e57;
        }

        &.small-size {
            padding: 0.3rem 0.8rem 0.3rem;
        }

        &.large-size {
            padding: 0.350rem 1rem 0.350rem;
        }
    }
</style>