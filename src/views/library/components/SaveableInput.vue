<template>
	<div>
		<template v-if="!toggleInput">
			<div class="d-flex gap-2 align-items-center">
				<p class="fs-14px mb-0 text-black">{{ modelValue }}</p>
				<button
					class="btn btn-sm toggle-btn rounded-circle btn-light"
					@click="handlePenClick"
				>
					<font-awesome-icon
						class="text-secondary cursor-pointer"
						icon="fas fa-pen"
					/>
				</button>
			</div>
		</template>
		<template v-else>
			<div class="d-flex align-items-center gap-2">
				<input
					id="saveable-input-input"
					type="text"
					class="form-control"
					v-model="updatedStcPrice"
				/>
				<button
					class="btn btn-sm rounded btn-primary"
					@click="handleSave"
				>
					Save
				</button>
				<button
					class="btn btn-sm toggle-btn rounded-circle btn-light"
					@click="handlePenClick"
				>
					<font-awesome-icon
						class="text-secondary cursor-pointer"
						icon="fas fa-xmark"
					/>
				</button>
			</div>
		</template>
	</div>
</template>

<script setup>
import {ref,   } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const toggleInput = ref(false)
const handlePenClick = () => (toggleInput.value = !toggleInput.value)

const updatedStcPrice = ref(props.modelValue)
const handleSave = () => {
	emit('update:modelValue', updatedStcPrice.value)
	toggleInput.value = false
}
</script>

<style lang="scss" scoped>
#saveable-input-input {
	width: 4rem !important;
	padding: 0.25rem 0.5rem;
}

.toggle-btn {
	$close-btn-dimension: 2rem;
	width: $close-btn-dimension;
	height: $close-btn-dimension;
	padding: 0;
}
</style>
