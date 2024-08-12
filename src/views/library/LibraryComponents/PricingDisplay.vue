<template>
    <div class="pricing-display position-relative">
        <!-- table header -->
        <div class="row px-4 py-2 table-header border-bottom --gx-0">
            <small class="fw-bold col-5 col-md-3 ">Description*</small>
            <small class="fw-bold col-1 col-md-2 text-end">Units</small>
            <small class="fw-bold col-2 col-md-2 text-end">Quantity</small>
            <small class="fw-bold col-2 col-md-2 text-end">Unit price</small>
            <small class="fw-bold col-2 col-md-2 text-end">Total</small>
            <small class="col-2 col-md-1"></small>
        </div>

        <!-- table rows -->

        <vue-draggable-next
            :class="`pricing-item-list ${loading ? 'opacity-30 pe-none' : ''}`"
            tag="div" 
            :list="pricings" 
            @change="handleChange" 
            handle=".handle"
        >
            <PricingItem
                v-for="(pricing, idx) in pricings" 
                :pricing
                :idx
                :key="`#${pricingItemKey}-${pricing.id}`"
                @item-updated="handleItemUpdated"
            />
        </vue-draggable-next>

        <AddPricingInput
            ref="addInputWrapper"
            class="mb-3"
            v-if="showAddInput"
            @created="handlePricingCreated"
            @cancel="handlePricingCancel"
        />

        <div v-else class="row px-4 py-2 cursor-pointer" @click="handleAddAnotherItemClick">
            <small class="fw-bold col-5 col-md-4 text-secondary">{{
                pricings.length ? 'Click to add another item' : 'Click to add items'
            }}</small>
        </div>

        <div v-if="loading" class="position-absolute pricing-items-loader">
			<font-awesome-icon
			    icon="fas fa-spinner"
			    class="animate-spin"
			/>
        </div>
    </div>
</template>

<script setup>
import axios from '../../../actions/api.js';
import AddPricingInput from './AddPricingInput.vue';
import PricingItem from './PricingItem.vue';

import { useRoute } from 'vue-router';
import { VueDraggableNext } from 'vue-draggable-next';
import { onMounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

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

const pricingItemKey = ref(0);
const handleItemUpdated = async () => {
    await getPricings();
    pricingItemKey.value++;
}

const loading = ref(false);
const handleChange = async () => {
    loading.value = true;
    const indicesMappedToOrders = pricings.value.map(({id, description}, i) => ({id, order: i, description}))

    await axios.put(
        `projects/${params.project_id}/pricing/items-order-update`,
        { new_order_values: indicesMappedToOrders }
    );

    await getPricings();
    loading.value = false
};

</script>

<style lang="scss" scoped>
.table-header {
    background: rgba(0, 0, 0, 0.05);
}

.pricing-display { overflow-x: clip; }

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

.pricing-items-loader {
    top: 50%;
    left: 50%;
}
</style>
