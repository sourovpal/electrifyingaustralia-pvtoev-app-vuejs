<template>
	<template v-if="!Boolean(pricing.is_line_item)">
        <div
		    v-if="!editMode"
		    :class="`row pricing-value ${ loading ? 'loading' : '' } align-items-center px-4 py-2 position-relative`"
	    >
            <div class="icon handle position-absolute">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 0 24 24"
                    width="18px"
                    fill="#000000"
                >
                    <path d="M0 0h24v24H0z" fill="none"></path> 
                    <path  d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path>
                </svg>
            </div>
		    <!-- Description -->
		    <small
			    :class="`col-5 col-md-3 cursor-pointer ${pricing.item_hidden ? 'opacity-50' : ''}`"
			    @click="toggleEditMode"
		        >
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
		        >
		        {{ pricing.unit_price ? '$ ' + Formatter.toIntlFormat(pricing.unit_price) : '-' }}
		    </small>

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
					? '$ ' + Formatter.toIntlFormat(pricing.total)
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
				    <ul
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
						    v-if="pricing.unit_price !== null"
						    @click="handleItemPriceHide"
					        >
						    <span>{{
							    pricing.price_hidden
								    ?
								    'Show price'
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
						    <span class="text-danger">Delete item</span>
						    <font-awesome-icon
							class="fs-12px text-danger"
							icon="fas fa-trash"
						    />
					    </li>
				    </ul>
			    </div>
		    </div>

            <span class="position-absolute unit-selector-loader">
			    <font-awesome-icon
			    icon="fas fa-circle-notch"
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
    <LineItemUnit @item-updated="emit('item-updated')" v-else :pricing />
</template>

<script setup>
import { ref, watch } from 'vue'
import Formatter from '../../../../helpers/Formatter'
import UnitSelector from './UnitSelector.vue'
import AddPricingInput from './AddPricingInput.vue'
import usePricingActions from '../composables/usePricingActions.js'
import LineItemUnit from './LineItemUnit.vue'

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
} = usePricingActions(emit, pricing);

watch(unit, (new_unit_id) => 
	handleUnitChange({
	    pricingId: pricing.id,
	    new_unit_id
	})
)

</script>

<style lang="scss">

.strike-through { text-decoration: line-through; }

.solar-system-bg {
    background-color: #bada55;
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
</style>
