<template>
    <div @click="handleClick" :class="`custom-checkbox ${modelValue ? 'active' : ''}`">
        <div class="circle">
			<font-awesome-icon
				class="fs-12px check-sign"
				icon="fas fa-check"
			/>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        default: false,
    }
});

const emit = defineEmits(['update:modelValue']);

const handleClick = () => emit(
    'update:modelValue', 
    !props.modelValue
);


</script>

<style lang="scss" scoped>
$inactive-color: #cbd2d9;
$active-color: #007ee5;
$circle-dimension: 1.05rem;
$transition-duration: 150ms;

.custom-checkbox {
    width: 2.75rem;
    height: 1.5rem;
    border-radius: 2rem;
    background-color: $inactive-color;
    position: relative;
    cursor: pointer;
    transition: $transition-duration;


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
        transition: $transition-duration;
        right: 53%;
    }

    svg { 
        opacity: 0;
        transition: $transition-duration;
    }
        

    &.active {
        background-color: $active-color;

        .circle {
            opacity: 1;
            right: 3px;
            color: $active-color;
        }

        svg { opacity: 1; }
    }
}

</style>
