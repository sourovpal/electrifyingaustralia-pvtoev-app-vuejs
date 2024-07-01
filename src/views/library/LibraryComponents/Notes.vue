<template>
	<div>
		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Notes content
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
				    <textarea v-model="note" style="width: 95%;" rows="6"></textarea>
				</div>
				<div style="width: 95%;" class="d-flex align-items-center justify-content-between pt-1 pb-3">
				    <small class="fs-12px">{{note.length}}/{{characterLimit}}</small>
				    <button class="btn fs-12px btn-sm btn-secondary">Save</button>
				</div>
				<p class="fs-12px">This content will appear in the <span class="fw-bold">Notes</span> section of this project's proposal</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const characterLimit = ref(2500);
const note = ref('');

</script>

<style lang="scss" scoped></style>
