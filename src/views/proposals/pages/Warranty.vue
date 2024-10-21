<template>
	<Page>
	    <div class="row">
	        <small>Warranty</small>

	        <div class="row heading text-black fs-14px border-top border-bottom py-2">
	            <p class="mb-0 fw-bold col-3">Product</p>
	            <p class="mb-0 fw-bold col-3">Type</p>
	            <p class="mb-0 fw-bold col-3">Standard warranty</p>
	            <p class="mb-0 fw-bold col-3 text-end">Downloads</p>
	        </div>

	        <div class="row heading text-black fs-12px py-2" v-for="warranty in warranties">
	            <p class="mb-0 col-3">{{ warranty.product.model }}</p>
	            <p class="mb-0 col-3 text-capitalize">{{ warranty.type }}</p>
	            <p class="mb-0 col-3">{{ warranty.standard_warranty_in_years }} years</p>
	            <p class="mb-0 col-3 text-end text-info">
	                <a :href="warranty.warranty_file" target="_blank">
	                    Warranty file
	                </a>
	            </p>
	        </div>

            <p class="mb-0 fs-14px mt-3 text-black">
                System component warranties are different from the system lifetime. Please see the Assumed Values page above.
            </p>
	    </div>
	</Page>
</template>

<script setup>
import { computed } from 'vue';
import Page from './Page.vue'
import { useProjectStore } from '../../../stores/project';

const projectStore = useProjectStore();
const warranties = computed(() => projectStore.getWarranties);

</script>

<style lang="scss" scoped></style>
