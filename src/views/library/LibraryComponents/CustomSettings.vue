<script setup>
import { ref } from 'vue';
import SaveableInput from '../components/SaveableInput.vue';
import Formatter from '../../../helpers/Formatter';

const installationYear = ref(2023);
const systemEfficiency = ref(81);

</script>

<template>
	<div>
		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Installation year
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
			        <SaveableInput v-model="installationYear" />
				</div>
				<p class="fs-12px">
					The year of installation determines how many STCs this
					project is eligible for.
				</p>
			</div>
		</div>
		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				System efficiency
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
			        <SaveableInput 
			            :amount-formatter="(num) => Formatter.toIntlFormat(num) + '%'" 
			            v-model="systemEfficiency" 
			        />
				</div>
				<p class="fs-12px">
					This value should account for inverter losses, AC/DC
					cable losses, shading and dirt.
				</p>
			</div>
		</div>

		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Proposal valid until
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">July 31, 2024</p>
					<font-awesome-icon
						class="text-secondary fs-14px"
						icon="fas fa-calendar"
					/>

					<font-awesome-icon
						class="text-secondary fs-14px"
						icon="fas fa-trash"
					/>
				</div>
			</div>
		</div>

		<div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Proposed installation date
			</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">July 15, 2024</p>
					<font-awesome-icon
						class="text-secondary fs-14px"
						icon="fas fa-calendar"
					/>

					<font-awesome-icon
						class="text-secondary fs-14px"
						icon="fas fa-trash"
					/>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped></style>
