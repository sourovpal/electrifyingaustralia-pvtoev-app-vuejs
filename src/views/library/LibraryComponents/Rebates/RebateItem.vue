<template>
	<div :class="`row rebate-value ${ loading ? 'opacity-30' : '' } align-items-center gx-0 px-4 py-2 position-relative`">
        <!-- drag handle (not a part of the grid) -->
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
        <div :class="`col-6 ${rebate.active ? '' : 'opacity-30'}`">
            <input
                type="text" 
                class="border-0 form-control ps-0"
                v-model="rebateProperties.description"
                @focusout="handleDescriptionInputFocusOut"
                @keyup.enter="handleRebateUpdate(rebateProperties)"
            >
        </div>

        <!-- Amount -->
        <div class="col-2 text-end">
            <small
                v-if="!toggleAmountInput"
                class="cursor-pointer"
                @click="handleAmountClick"
            >
                {{'$ ' + Formatter.toIntlFormat(rebateProperties.amount) }}
            </small>

            <input
                v-else
                ref="amountInput"
                @keyup.enter="handleRebateUpdate(rebateProperties)"
                class="rebate-amount-input border-0"
                v-model.number="rebateProperties.amount"
                @focusout="handleAmountInputFocusOut"
                type="number"
            />
        </div>

        <!-- Rebate type -->
		<div class="col-3 text-end">
		    <RebateTypeSelector v-model="rebateProperties.type_id" />
		</div>

        <div class="col-1" style="transform: translateX(0.5rem);">
            <!-- for larger screens -->
			<div
				class="fw-bold cursor-pointer d-none d-xxl-flex gap-3 justify-content-end"
				aria-expanded="false"
			>
			    <font-awesome-icon
			        @click="handleDeleteClick"
                    v-tippy='{ content:"Delete rebate", placement : "top" }'
			        class="cursor-pointer rebate-action-btn delete-btn text-secondary"
				    icon="fas fa-xmark"
			    />

                <template v-if="!rebate.active">
                    <font-awesome-icon
			            class="cursor-pointer rebate-action-btn active-btn text-secondary"
                        v-tippy='{ content: "Activate rebate", placement : "top" }'
				        icon="fas fa-eye"
                        @click="handleRebateActiveStatusChange"
			        />
                </template>

                <template v-else>
                    <font-awesome-icon
			            class="cursor-pointer rebate-action-btn active-btn text-secondary"
                        v-tippy='{ content: "De-activate rebate", placement : "top" }'
				        icon="fas fa-eye-slash"
                        @click="handleRebateActiveStatusChange"
			        />
                </template>
			</div>
            <!-- for mobile -->
            <div class="dropdown text-end p-0 d-block d-xxl-none">
				<div
					class="fw-bold cursor-pointer rebate-type-menu"
					style=" display: grid; place-items: center; "
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
                        @click="handleRebateActiveStatusChange"
                    >
						<span>{{ rebate.active ? 'Deactivate' : 'Activate' }}</span>
						<font-awesome-icon
						    v-if="!rebate.active"
						    class="fs-12px"
						    :icon="`fas fa-circle-check`"
						/>

						<font-awesome-icon
						    v-else
						    class="fs-12px"
						    icon="fas fa-circle-minus"
						/>
					</li>

                    <li
                        class="py-2 px-3 overflow-hidden dropdown-item cursor-pointer d-flex align-items-center justify-content-between px-4 text-danger"
						@click="handleDeleteClick()"
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

        <!-- loader (not a part of the grid system) -->
        <span class="position-absolute rebate-item-loader" v-if="loading">
			<font-awesome-icon
			    icon="fas fa-circle-notch"
			    class="animate-spin"
			/>
        </span>
	</div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import useRebateActions from '../composables/useRebateActions';
import RebateTypeSelector from './RebateTypeSelector.vue';
import Formatter from '../../../../helpers/Formatter';

const emit = defineEmits(['item-updated'])
const props = defineProps(['rebate']);

const amountInput = ref(null)
const toggleAmountInput = ref(false);

const handleAmountClick = async () => {
    toggleAmountInput.value = !toggleAmountInput.value
    await nextTick();
    amountInput.value.focus();
}


const rebateProperties = ref({
    amount: props?.rebate?.amount,
    type_id: props?.rebate?.rebate_type_id,
    description: props?.rebate?.description,
    order: props?.rebate?.order,
});

const handleDescriptionInputFocusOut = () => rebateProperties.value.description = props.rebate.description
const handleAmountInputFocusOut = () => {
    rebateProperties.value.amount = props.rebate.amount 
    toggleAmountInput.value = false;
}

const rebate = props.rebate;
const {
    loading,
    handleDeleteClick,
    handleRebateActiveStatusChange,
    handleRebateUpdate,
} = useRebateActions(emit, rebate);

watch(
    () => rebateProperties.value.type_id,
    () => handleRebateUpdate({
        ...rebateProperties.value,
        rebate_type_id: rebateProperties.value.type_id 
    })
);

</script>

<style lang="scss" scoped>
.rebate-type-menu {
    opacity: 0.7;
    transition: 200ms;

    &:hover { opacity: 1; }
}

.rebate-item-loader { left: 50%; }

.rebate-value {
    transition: 200ms; 

    .icon.handle { 
        opacity: 0;
        display: grid;
        place-items: center;
        width: 1rem;
        left: 0.175rem; 
        cursor: move;
    }

    &:hover .icon.handle { opacity: 1; }

    input {
        font-size: 0.875em;
        color: rgb(79, 79, 79);
    }
}

.rebate-action-btn {
    transition: 100ms;
    &:hover {
        transform: scale(1.25);
    }
}

.rebate-action-btn.delete-btn:hover { 
    color: #dc4c64 !important; 
}

.rebate-action-btn.active-btn:hover {
    color: #4f4f4f !important; 
}

</style>
