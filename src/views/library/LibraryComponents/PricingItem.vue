<template>
	<div
		v-if="!editMode"
		:class="`row pricing-value ${ loading ? 'loading' : '' } align-items-center px-4 py-2 position-relative`"
	>
        <div class="icon handle position-absolute">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"></path> <path  d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></svg>
        </div>
		<!-- Description -->
		<small
			:class="pricing.item_hidden ? 'opacity-50' : ''"
			class="col-5 col-md-3 cursor-pointer"
			@click="toggleEditMode"
		>
            <span class="text-danger fw-bold">({{ $attrs.idx + 1 }})</span>
			{{ pricing.description }}
		</small>

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

		<div class="col-2 col-md-1">
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
import useItemActions from './composables/useItemActions.js'

const props = defineProps(['pricing'])
const emit = defineEmits(['item-updated'])

const unit = ref(props.pricing.unit_id)
const editMode = ref(false)

const toggleEditMode = () => (editMode.value = !editMode.value)

const handleUpdated = () => {
	editMode.value = false
	emit('item-updated')
}

const pricing = props.pricing;
const {
    loading,
    handleDeleteClick,
    handleItemPriceHide,
    handleUnitChange,
    handleItemHide
} = useItemActions(emit, pricing);

watch(unit, (new_unit_id) => 
	handleUnitChange({
	    pricingId: pricing.id,
	    new_unit_id
	})
)

</script>

<style lang="scss">

.strike-through { text-decoration: line-through; }

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
