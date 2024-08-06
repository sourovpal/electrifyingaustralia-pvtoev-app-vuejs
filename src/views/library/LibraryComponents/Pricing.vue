<template>
    <div class="--overflow-x-hidden">
        <!-- table header -->
        <div class="row px-4 py-2 pe-5 table-header border-bottom">
            <small class="fw-bold col-5 col-md-4 ">Description</small>
            <small class="fw-bold col-1 col-md-2 text-end">Units</small>
            <small class="fw-bold col-2 col-md-2 text-end">Quantity</small>
            <small class="fw-bold col-2 col-md-2 text-end">Unit price</small>
            <small class="fw-bold col-2 col-md-2 text-end">Total</small>
        </div>

        <!-- table rows -->
        <div class="row pricing-value px-4 py-2 pe-5" v-for="pricing in pricings">
            <!-- Description -->
            <small class="col-5 col-md-4">{{ pricing.description }}</small>

            <!-- Units -->
            <small class="col-1 col-md-2 text-end">{{pricing.unit}}</small>

            <!-- Quantity -->
            <small class="col-2 col-md-2 text-end">{{pricing.quantity}}</small>

            <!-- Unit Price -->
            <small class="col-2 col-md-2 text-end">{{pricing.unit_price}}</small>

            <!-- Total -->
            <small class="col-2 col-md-2 text-end">
                {{ pricing.total ? '$' + Formatter.toIntlFormat(pricing.total) : '-' }}
            </small>

			<div class="pricing-action">
                <div class="dropdown text-end p-0 w-100">
                    <div
                        class="fw-bold cursor-pointer"
                        style="display: grid; place-items: center"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                    >
			            <font-awesome-icon 
			                class="fs-14px" 
			                icon="fas fa-ellipsis-vertical" 
			            />
		            </div>
                    <div class="dropdown-menu shadow" aria-labelledby="dropdownMenuLink">
                        <li class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer"> Hide item </li>
                        <li class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer"> Hide price </li>
                        <li class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer text-danger"> Delete item </li>
                    </div>
	            </div>
			</div>
        </div>

        <AddPricingInput
            ref="addInputWrapper"
            class="mb-3"
            v-if="showAddInput"
            @pricing-created="handlePricingCreated"
            @pricing-cancel="handlePricingCancel"
        />

        <div v-else class="row px-4 py-2 cursor-pointer" @click="handleAddAnotherItemClick">
            <small class="fw-bold col-5 col-md-4 text-secondary">Add another item...</small>
        </div>
    </div>
</template>

<script setup>
import  axios from '../../../actions/api.js';
import { useRoute } from 'vue-router';
import AddPricingInput from './AddPricingInput.vue';
import { onMounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import Formatter from '../../../helpers/Formatter';
const { params } = useRoute();

const addInputWrapper = ref(null);
onClickOutside(addInputWrapper, () => showAddInput.value = false);

const showAddInput = ref(false);
const handleAddAnotherItemClick = () => showAddInput.value = !showAddInput.value;

onMounted(() => {
    getPricings();
});


const pricings = ref([]);
const getPricings = async () => {
    const response = await axios.get(`projects/${params.project_id}/pricing`)
    if (!response.data.length) return;

    pricings.value = response.data;
}

const handlePricingCreated = () => {
    showAddInput.value = false;
    getPricings();
}
const handlePricingCancel = () => showAddInput.value = false;

const showUnitSelector = ref(false);
const handleUnitClick = () => showUnitSelector.value = !showUnitSelector.value

</script>

<style lang="scss" scoped>
.table-header {
    background: rgba(0, 0, 0, 0.05);
}

.pricing-value {
    position: relative;

    .pricing-action {
        width: 4.5rem;
        // border: 1px solid #bada55;

        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        right: 0;
    }
}
</style>
