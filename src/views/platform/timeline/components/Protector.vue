<script setup>
    import { ref } from 'vue';
    import { onClickOutside } from '@vueuse/core';

    const targetProtector = ref(null);
    const isEditable = ref(false);

    function handleToggle() {
        isEditable.value = !isEditable.value;
    }

    onClickOutside(targetProtector, () => {
        if (isEditable.value) {
            handleToggle();
        }
    });

</script>

<template>
    <div @click="isEditable = true"
        ref="targetProtector"
        :class="{'not-editable':!isEditable, 'editable':isEditable}"
        class="protector">
        <slot></slot>
    </div>
</template>
<style scoped
    lang="scss">
    .protector {
        &.not-editable {
            position: relative;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 100;
                background-color: transparent;
            }
        }
    }
</style>