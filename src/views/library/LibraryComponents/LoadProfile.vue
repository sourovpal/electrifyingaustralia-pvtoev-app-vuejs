<template>
	<div class="overflow-x-hidden position-relative">
		<div class="row align-items-center py-3 px-4">
			<p class="text-end fs-14px col-md-4 mb-0 text-secondary">
				Simulate load profile
			</p>
			<div class="col-md-8">
				<!-- placeholder -->
				<CustomCheckbox v-model="simulateLoadProfile" />
			</div>
		</div>
		<div class="row align-items-baseline py-3 px-4">
			<p class="text-end fs-14px col-md-4 mb-0 text-secondary">
				Simple self consumption
			</p>
            <div class="col-md-8">
			    <SaveableInput :amount-formatter="(num => num + '%')"  v-model="selfConsumption" />
            </div>
		</div>
		<div class="help-icon position-absolute">
			<font-awesome-icon
				class="text-secondary"
				icon="fas fa-circle-question"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import CustomCheckbox from '../../../components/forms/CustomCheckbox.vue'
import SaveableInput from '../components/SaveableInput.vue';

const selfConsumption = ref(40);
const simulateLoadProfile = ref(false);

</script>

<style lang="scss" scoped>
input:where([type='checkbox'][role='switch']) {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	position: relative;
	color: inherit;
	font-size: inherit;
	width: 2em;
	height: 1em;
	box-sizing: content-box;
	border: 1px solid;
	border-radius: 1em;
	vertical-align: text-bottom;
	margin: auto;
}

input:where([type='checkbox'][role='switch'])::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 0;
	transform: translate(0, -50%);
	box-sizing: border-box;
	width: 0.7em;
	height: 0.7em;
	margin: 0 0.15em;
	border: 1px solid;
	border-radius: 50%;
	background: currentcolor;
}

input:where([type='checkbox'][role='switch']):checked::before {
	left: 1em;
}

input:where([type='checkbox'][role='switch']):disabled {
	opacity: 0.4;
}
.help-icon {
    top: 1rem;
    right: 1rem;
}
</style>
