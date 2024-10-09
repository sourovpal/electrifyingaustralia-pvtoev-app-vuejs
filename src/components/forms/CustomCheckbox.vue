<template>
    <div :class="`custom-checkbox ${active ? 'active' : ''}`">
        <div class="circle">
			<font-awesome-icon
				class="fs-12px check-sign"
				icon="fas fa-check"
			/>
        </div>
    </div>
</template>

<script setup>
import {defineProps} from 'vue';
const props = defineProps({
    active: {
        default: false,
    }
});
</script>

<style lang="scss" scoped>
$inactive-color: #cbd2d9;
$active-color: #007ee5;
$circle-dimension: 1.05rem;

.custom-checkbox {
    width: 2.75rem;
    height: 1.5rem;
    border-radius: 2rem;
    background-color: $inactive-color;
    position: relative;
    cursor: pointer;


    .circle {
        display: grid;
        place-items: center;

        height: $circle-dimension;
        width: $circle-dimension;
        background-color: #ffffff;
        border-radius: 2rem;
        position: absolute;
        bottom: 50%;
        transform:  translateY(50%);
        left: 3px;
    }

    svg { opacity: 0; }

    &.active {
        background-color: $active-color;

        .circle {
            opacity: 1;
            left: auto;
            right: 3px;
            color: $active-color;
        }

        svg { opacity: 1; }
    }
}

</style>
