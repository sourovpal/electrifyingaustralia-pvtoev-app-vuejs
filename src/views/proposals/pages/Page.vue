<template>
	<section class="page border p-5">
		<div class="page-number bg-primary text-white text-end pe-2 fw-bold">
		    <span>{{ props.pageNumber }}</span>
		</div>

		<div class="page-content mt-5">
		    <slot></slot>
		</div>
	</section>
</template>

<script setup>
const props = defineProps({
    pageNumber: {
        default: 1
    }
})

</script>

<style lang="scss">
$border-color: #000000;

.page {
	width: 210mm;
	height: 297mm;
	position: relative;
}

.page-number {
	width: 6rem;
	position: absolute;
	left: 0;
	top: 2rem;
}

.participant-details, 
.project-item {
    font-size: 0.75rem;
}

.project-item { color: $border-color; }

.signatory {
    border-top: 1px solid $border-color; 
}

.project-items-display {
    margin-bottom: 12rem;

    .header {
	    font-size: 0.85rem;
	    border-top: 1px solid $border-color;
	    border-bottom: 1px solid $border-color;
    } 
}

.gst-figure-wrapper {
    border-bottom: 1px solid $border-color; 
}
.total-figure-wrapper { border-bottom: 2px solid $border-color; }
</style>
