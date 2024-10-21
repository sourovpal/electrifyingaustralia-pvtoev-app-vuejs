<template>
    <div class="rebate-display">
        <!-- table header -->
        <div class="row g-0 px-4 py-2 table-header border-bottom align-items-center">
            <div class="fw-bold col-md-6"><small>Description</small></div>
            <div class="fw-bold col-md-2 text-end"><small>Amount</small></div>
            <div class="fw-bold col-md-3 text-end">
                <small class="me-2">Rebate type</small>
                <font-awesome-icon
				    class="text-secondary fs-14px"
				    icon="fas fa-circle-question"
				/>
            </div>
            <small class="col-1"></small>
        </div>

        <!-- table rows -->

        <vue-draggable-next
            :class="`rebate-item-list ${loading ? 'opacity-30 pe-none' : ''}`"
            tag="div" 
            @change="handleChange"
            ghost-class="dragged-on" 
            :list="rebates" 
            handle=".handle"
        >
            <RebateItem
                v-for="(rebate, idx) in rebates" 
                :rebate 
                :idx
                :key="`#${rebateItemKey}-${idx}`"
                @item-updated="getRebates"
            />
        </vue-draggable-next>

        <AddRebateInput 
            ref="addInputWrapper"
            class="mb-3"
            v-if="showAddInput"
            :lastRebateRecordOrder
            @created="handleRebateCreated"  
            @cancel="handleRebateCancel"
        />

        <div v-else class="row px-4 py-2 cursor-pointer" @click="handleAddAnotherItemClick">
            <small class="fw-bold col-5 col-md-4 text-secondary">{{ rebates.length ? 'Click to add another item' : 'Click to add items' }}</small>
        </div>

        <div v-if="loading" class="card-loader">
			<font-awesome-icon
			    icon="fas fa-circle-notch"
			    class="animate-spin"
			/>
        </div>
    </div>
</template>

<script setup>
import axios from '../../../../actions/api.js';

import { useRoute } from 'vue-router';
import { VueDraggableNext } from 'vue-draggable-next';
import { computed, onMounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import RebateItem from './RebateItem.vue';
import AddRebateInput from './AddRebateInput.vue';

const { params } = useRoute();

const addInputWrapper = ref(null);
onClickOutside(addInputWrapper, () => showAddInput.value = false);

const showAddInput = ref(false);
const handleAddAnotherItemClick = () => showAddInput.value = !showAddInput.value;

onMounted(() => {
    getRebates();
});


const rebates = ref([]);
const getRebates = async () => {
    const response = await axios.get(`projects/${params.project_id}/rebates`)
    if (!response.data.length) {
        rebates.value = [];
    };

    rebateItemKey.value++;
    rebates.value = response.data;
}

const lastRebateRecordOrder = computed(() => {
    if (!rebates.value.length)
        return 0;

    if (rebates.value.length === 1) 
        return rebates.value[0].order;

    const last_item = rebates.value.reduce(
        (a, v) => a.order < v.order
            ? a = v
            : v,
        rebates.value[0]
    );

    return last_item.order;
});

const handleRebateCreated = () => {
    showAddInput.value = false;
    getRebates();
}
const handleRebateCancel = () => showAddInput.value = false;

const rebateItemKey = ref(0);

const loading = ref(false);
const handleChange = async () => {
    loading.value = true;
    const indicesMappedToOrders = rebates.value.map(({id, description}, i) => ({id, order: i, description}))

    await axios.put(
        `projects/${params.project_id}/rebate/rebates-order-update`,
        { new_order_values: indicesMappedToOrders }
    );

    await getRebates();
    loading.value = false
};

</script>

<style lang="scss">
.table-header {
    background: rgba(0, 0, 0, 0.05);
}

.rebate-display { overflow-x: clip; }

.rebate-amount-input {
    width: 5rem;
    text-align: end;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type=number] {
        -moz-appearance: textfield; 
    }
}
</style>
