<script setup>
    const props = defineProps({
        size: { type: String, default: null }
    });
</script>

<template>

    <Button v-bind="$attrs"
        :size="size"
        class="success-button"
        :class="{
            'small-size':(size == 'small'),
            'large-size':(size != 'small'),
            }">
    </Button>

</template>

<style scoped
    lang="scss">
    .success-button {
        border-radius: 5px;
        box-shadow: 0 4px 7px -4px #0a9668;
        color: #ffffff;
        border: none !important;

        &:hover {
            box-shadow: 0 2px 7px -4px #279973;
        }

        &.small-size {
            padding: 0.3rem 0.8rem 0.3rem;
        }

        &.large-size {
            padding: 0.350rem 1rem 0.350rem;
        }
    }
</style>