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
            ghost-change="dragged-on" 
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
            :lastPricingRecordOrder="lastPricingRecordOrder"
            v-if="showAddInput"
            @created="handlePricingCreated"
            @cancel="handlePricingCancel"
        />

        <div v-else class="row px-4 py-2 cursor-pointer" @click="handleAddAnotherItemClick">
            <small class="fw-bold col-5 col-md-4 text-secondary">{{
                pricings.length ? 'Click to add another item' : 'Click to add items'
            }}</small>
        </div>

        <div v-if="loading" class="card-loader">
			<font-awesome-icon
			    icon="fas fa-circle-notch"
			    class="animate-spin"
			/>
        </div>
    </div>
    <!-- Summary -->
    <div :class="`px-4 mt-5 d-flex justify-content-between ${ taxLoading ? 'animate-pulse' : '' }`" v-if="pricings.length">
        <div></div>
        <div class="results-wrapper w-50">

            <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="dropdown text-end p-0">
                    <button
                        class="fw-bold cursor-pointer btn btn-sm btn-light"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                    >
			            <span class="me-3" :key="activeTaxSlug">
			                Subtotal
			                <template v-if="activeTaxSlug !== 'no-tax'">
			                    {{activeTaxSlug === 'included' ? 'incl.GST' : 'excl.GST'}}
			                </template>
			            </span>
			            <font-awesome-icon icon="fas fa-caret-down" />
		            </button>
                    <ul class="dropdown-menu overflow-hidden" aria-labelledby="dropdownMenuLink">
                        <li 
                            v-for="tax in taxTypes"
                            @click="handleTaxTypeClick(tax.slug)"
                            :class="
                            `tax-type-list-item py-2 ${activeTaxSlug === tax.slug ? 'text-info' : ''}
                            px-3 dropdown-item cursor-pointer 
                            d-flex align-items-center justify-content-between`
                            "
                        >
                            {{tax.name}}
                        </li>
                    </ul>
	            </div>
                <small class="fw-bold">$ {{ Formatter.toIntlFormat(total) }}</small>
            </div>

            <div v-if="activeTaxSlug !== 'no-tax'" class="d-flex align-items-center justify-content-between">
                <span>{{activeTaxSlug === 'included' ? 'Incl.' : 'Excl.'}} GST</span>
                <small>$ {{ Formatter.toIntlFormat(gst) }}</small>
            </div>

            <div v-if="projectStore.getStcEnabledState" class="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                <span>STCs x {{projectStore.getStcCount}}</span>
                <small class="text-success">-$ {{ Formatter.toIntlFormat(calculatedStcDiscount) }}</small>
            </div>

            <div class="d-flex align-items-center justify-content-between fw-bold">
                <p class="fs-22px">Total</p>
                <p class="fs-22px">$ {{ Formatter.toIntlFormat(totalAmountAfterStcDiscount, true) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import AddPricingInput from './AddPricingInput.vue';
import PricingItem from './PricingItem.vue';
import Formatter from '../../../../helpers/Formatter';
import axios from '../../../../actions/api.js';
import usePricingCalculations from '../composables/usePricingCalculations.js';

import { useRoute } from 'vue-router';
import { VueDraggableNext } from 'vue-draggable-next';
import { onMounted, ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useToast } from 'vue-toast-notification';
import { useProjectStore } from '../../../../stores/project.js';

const { params } = useRoute();
const projectStore = useProjectStore();

const addInputWrapper = ref(null);
onClickOutside(addInputWrapper, () => showAddInput.value = false);

const showAddInput = ref(false);
const handleAddAnotherItemClick = () => showAddInput.value = !showAddInput.value;

onMounted(() => {
    getPricings();
    activeTaxSlug.value = projectStore.getTaxType;
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

const lastPricingRecordOrder = computed(() => {
    if (!pricings.value.length)
        return 0;

    if (pricings.value.length === 1) 
        return pricings.value[0].order;

    const last_item = pricings.value.reduce(
        (a, v) => a.order < v.order
            ? a = v
            : v,
        pricings.value[0]
    );

    return last_item.order;
});


const taxLoading = ref(false);
const toast = useToast();
const activeTaxSlug = ref('');

const handleTaxTypeClick = (taxSlug) => {
    taxLoading.value = true; 
    axios.put(`projects/${params.project_id}/tax-type-update`, {tax_type: taxSlug})
        .then(res => {
            activeTaxSlug.value = res?.data?.updated_tax_type;
            projectStore.setCurrentProject(params.project_id);
        })
        .catch(e => {
		    toast.error(e?.response?.data?.message ?? 'Something went wrong'); 
            console.log(e);
        })
        .finally(() => {
            taxLoading.value = false; 
        })
};

const taxTypes = ref([
    { name: 'Included', slug: 'included'},
    { name: 'Excluded', slug: 'excluded'},
    { name: 'No tax'  , slug: 'no-tax'  },
]);

const {
    gst,
    total,
    calculatedStcDiscount,
    totalAmountAfterStcDiscount,
    stcCount
} = usePricingCalculations(pricings, activeTaxSlug);
</script>

<style lang="scss">
.table-header { background: rgba(0, 0, 0, 0.05); }

.pricing-display { overflow-x: clip; }

.pricing-value {
    position: relative;

    .pricing-action {
        width: 4.5rem;

        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        right: 0;
    }
}

.tax-type-list-item {
    border-left: 2px solid #ffffff00;

    &.active-tax-type { border-left: 2px solid rgb(59, 113, 202); }
}

.pricing-value {
    transition: 200ms; 

    & > small { transition: 200ms; }
    .unit-selector-loader { display: none; }

    &.loading {
        small, div { opacity: 0 !important; }
        .unit-selector-loader { display: inline; }
    }

    .icon.handle { 
        opacity: 0;
        display: grid;
        place-items: center;
        width: 1rem;
        left: 0.175rem; 
        cursor: move;
    }

    &:hover .icon.handle { opacity: 1; }

}
</style>
