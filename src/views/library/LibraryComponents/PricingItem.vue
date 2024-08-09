<template>
	<div
		v-if="!editMode"
		:class="`row pricing-value ${ loading ? 'loading' : '' } align-items-center px-4 py-2 gx-0 position-relative`"
	>
		<!-- Description -->
		<small
			:class="pricing.item_hidden ? 'opacity-50' : ''"
			class="col-5 col-md-3 cursor-pointer"
			@click="toggleEditMode"
			>{{ pricing.description }}</small
		>

		<!-- Units -->
		<small
			:class="pricing.item_hidden ? 'opacity-50' : ''"
			class="col-1 col-md-2"
		>
			<UnitSelector v-model="unit" />
		</small>

		<!-- Quantity -->
		<small
			:class="pricing.item_hidden ? 'opacity-50' : ''"
			class="col-2 col-md-2 text-end cursor-pointer"
			@click="toggleEditMode"
			>{{ pricing.quantity ?? '-' }}</small
		>

		<!-- Unit Price -->
		<small
			:class="pricing.item_hidden ? 'opacity-50' : ''"
			class="col-2 col-md-2 text-end cursor-pointer"
			@click="toggleEditMode"
			>{{ pricing.unit_price ?? '-' }}</small
		>

		<!-- Total -->
		<small
			:class="{
			    'opacity-50':  pricing.item_hidden,
			    'strike-through':  pricing.price_hidden,
			}" 
			class="col-2 col-md-2 text-end"
		>
			{{
				pricing.total
					? '$' + Formatter.toIntlFormat(pricing.total)
					: '-'
			}}
		</small>

		<div class="col-md-1">
			<div class="dropdown text-end p-0">
				<div
					class="fw-bold cursor-pointer pricing-item-menu"
					style="display: grid; place-items: center"
					data-mdb-toggle="dropdown"
					aria-expanded="false"
				>
					<font-awesome-icon
						class="fs-14px"
						icon="fas fa-ellipsis-vertical"
					/>
				</div>
				<div
					class="dropdown-menu shadow"
					aria-labelledby="dropdownMenuLink"
				>
					<li
						class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer d-flex align-items-center justify-content-between px-4"
						@click="handleItemHide"
					>
						<span>{{
							pricing.item_hidden
								? 'Show item'
								: 'Hide item'
						}}</span>
						<font-awesome-icon
							class="fs-12px"
							:icon="`fas ${!pricing.item_hidden ? 'fa-eye-slash' : 'fa-eye'}`"
						/>
					</li>

					<li
						class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer d-flex align-items-center justify-content-between px-4"
						@click="handleItemPriceHide"
					>
						<span>{{
							pricing.price_hidden
								? 'Show price'
								: 'Hide price'
						}}</span>
						<div>
							<font-awesome-icon
								class="fs-12px"
								icon="fas fa-dollar-sign"
							/>
						</div>
					</li>

					<li
						class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer d-flex align-items-center justify-content-between px-4 text-danger"
						@click="handleDeleteClick(pricing.id)"
					>
						Delete item
						<font-awesome-icon
							class="fs-12px"
							icon="fas fa-trash"
						/>
					</li>
				</div>
			</div>
		</div>

        <span class="position-absolute unit-selector-loader">
			<font-awesome-icon
			    icon="fas fa-spinner"
			    class="animate-spin"
			/>
        </span>
	</div>

	<AddPricingInput
		v-else
		:pricing
		@updated="handleUpdated"
		@cancel="toggleEditMode"
	/>
</template>

<script setup>
import { ref, watch } from 'vue'
import Formatter from '../../../helpers/Formatter'
import UnitSelector from './UnitSelector.vue'
import AddPricingInput from './AddPricingInput.vue'

const props = defineProps(['pricing'])
const emit = defineEmits([
	'item-hide',
	'item-price-hide',
	'item-delete',
	'unit-change',
	'item-update',
])

const unit = ref(props.pricing.unit_id)

const editMode = ref(false)
const toggleEditMode = () => (editMode.value = !editMode.value)
const handleUpdated = () => {
	editMode.value = false
	emit('item-updated')
}

const handleItemHide = () => emit('item-hide', props.pricing)
const handleItemPriceHide = () => emit('item-price-hide', props.pricing)
const handleDeleteClick = () => emit('item-delete', props.pricing.id)

watch(unit, (newValue) => 
	emit('unit-change', {
	    pricingId: props.pricing.id,
	    new_unit_id: newValue
	})
)

</script>

<style lang="scss">

.strike-through { text-decoration: line-through; }
.pricing-value > small { transition: 200ms; }
.pricing-value {
    transition: 200ms; 
}

.pricing-item-menu {
    opacity: 0.7;
    transition: 200ms;

    &:hover {
        opacity: 1;
    }

}

.unit-selector-loader {
    left: 50%;
}

.pricing-value {
    .unit-selector-loader { display: none; }

    &.loading {
        small, div {opacity: 50%;}
        .unit-selector-loader { display: inline; }
    }
}
</style>
