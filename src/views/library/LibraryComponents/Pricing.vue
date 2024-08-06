<template>
    <div class="--overflow-x-hidden">
        <!-- table header -->
        <div class="row px-4 py-2 table-header border-bottom gx-0">
            <small class="fw-bold col-5 col-md-3 ">Description</small>
            <small class="fw-bold col-1 col-md-2 text-end">Units</small>
            <small class="fw-bold col-2 col-md-2 text-end">Quantity</small>
            <small class="fw-bold col-2 col-md-2 text-end">Unit price</small>
            <small class="fw-bold col-2 col-md-2 text-end">Total</small>
            <small class="col-2 col-md-1"></small>
        </div>

        <!-- table rows -->
        <div class="row pricing-value align-items-center px-4 py-2" v-for="pricing in pricings">
            <!-- Description -->
            <small class="col-5 col-md-3">{{ pricing.description }}</small>

            <!-- Units -->
            <small class="col-1 col-md-2 text-end">{{ pricing.unit }}</small>

            <!-- Quantity -->
            <small class="col-2 col-md-2 text-end">{{ pricing.quantity }}</small>

            <!-- Unit Price -->
            <small class="col-2 col-md-2 text-end">{{ pricing.unit_price }}</small>

            <!-- Total -->
            <small class="col-2 col-md-2 text-end">
                {{ pricing.total ? '$' + Formatter.toIntlFormat(pricing.total) : '-' }}
            </small>

			<div class="col-md-1">
                <div class="dropdown text-end p-0">
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
                        <li class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer" @click="handleItemHide(pricing)"> Hide item </li>
                        <li class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer" @click="handleItemPriceHide(pricing)"> Hide price </li>
                        <li 
                            class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer text-danger" 
                            @click="handleDeleteClick(pricing.id)"
                        > Delete item </li>
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
    if (!response.data.length) {
        pricings.value = [];
    };

    pricings.value = response.data;
}

const handlePricingCreated = () => {
    showAddInput.value = false;
    getPricings();
}
const handlePricingCancel = () => showAddInput.value = false;

const showUnitSelector = ref(false);
const handleUnitClick = () => showUnitSelector.value = !showUnitSelector.value

const handleDeleteClick = async (pricingId) => {
    await axios.delete(`projects/${params.project_id}/pricing/${pricingId}`)
    getPricings();
}

const handleItemHide = async (pricing) => {
    await axios.put(`projects/${params.project_id}/pricing/${pricing.id}/item-hide`, {
        hide_item: !Boolean(pricing.item_hidden)
    });
    getPricings();
}

const handleItemPriceHide = async (pricing) => {
    await axios.put(`projects/${params.project_id}/pricing/${pricing.id}/item-price-hide`, {
        hide_item_price: !Boolean(pricing.price_hidden)
    });
    getPricings();
}

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
