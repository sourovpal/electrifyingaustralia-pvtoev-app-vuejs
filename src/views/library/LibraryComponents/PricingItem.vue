<template>
    <div class="row pricing-value align-items-center px-4 py-2">
        <!-- Description -->
        <small class="col-5 col-md-3 cursor-pointer" @click="toggleEditMode">{{ pricing.description }}</small>

        <!-- Units -->
        <small class="col-1 col-md-2 --text-end">
            <UnitSelector v-model="unit" />
        </small>
        

        <!-- Quantity -->
        <small class="col-2 col-md-2 text-end cursor-pointer" @click="toggleEditMode">{{ pricing.quantity }}</small>

        <!-- Unit Price -->
        <small class="col-2 col-md-2 text-end cursor-pointer" @click="toggleEditMode">{{ pricing.unit_price }}</small>

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
                    <li class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer" @click="handleItemHide"> Hide item </li>
                    <li class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer" @click="handleItemPriceHide"> Hide price </li>
                    <li 
                        class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer text-danger" 
                        @click="handleDeleteClick(pricing.id)"
                    > Delete item </li>
                </div>
	        </div>
		</div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Formatter from '../../../helpers/Formatter';
import UnitSelector from './UnitSelector.vue';

const props = defineProps(['pricing']);
const emit = defineEmits(['item-hide', 'item-price-hide', 'item-delete', 'unit-change']);

const unit = ref(props.pricing.unit_id);

const toggleEditMode = () => {};

const handleItemHide = () => emit('item-hide', props.pricing);
const handleItemPriceHide = () => emit('item-price-hide', props.pricing);
const handleDeleteClick = () => emit('item-delete', props.pricing.id);

watch(unit, (newValue) => {
    emit('unit-change', { pricingId: props.pricing.id, new_unit_id: newValue });
})

</script>

<style lang="scss">

</style>
