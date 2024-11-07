<template>
    <div class="row px-4 py-2 align-items-center">
        <div class="col-5 col-md-3">
            <input
                v-model="formData.description" 
                @keyup.enter="handleCreateClick"
                placeholder="Enter description" 
                class="form-control p-1 ps-2" 
                type="text" 
            />
        </div>

        <div class="col-1 col-md-2">
            <UnitSelector v-model="formData.unit_id" />
        </div>

        <div class="col-md-2">
            <input
                placeholder="Quantity"
                :min="0"
                :disabled="!formData.description"
                v-model.number="formData.quantity"
                @keyup.enter="handleCreateClick"
                :class="`form-control text-end p-1 ${ formData.quantity < 0 ? 'invalid-input' : '' }`"
                type="number"
            />
        </div>

        <div class="col-md-2">
            <input
                placeholder="Unit price"
                :class="`form-control text-end p-1 ${ formData.unit_price < 0 ? 'invalid-input' : '' }`"
                :min="0"
                :disabled="!formData.description"
                v-model.number="formData.unit_price"
                @keyup.enter="handleCreateClick"
                type="number"
            />
        </div>

        <div class="col-md-2 d-flex gap-3 justify-content-end pricing-control">
		    <template v-if="!loading">
                <font-awesome-icon
			        :class="`create-pricing-btn cursor-pointer ${invalidInput ? 'disabled' : ''}`"
				    icon="fas fa-circle-check"
			        @click="handleCreateClick"
			    />

			    <font-awesome-icon
			        class="discard-pricing-btn cursor-pointer"
				    icon="fas fa-circle-xmark"
			        @click="handleCancelClick"
			    />
            </template>

            <template v-else>
			    <font-awesome-icon 
			        class="animate-spin" 
			        icon="fas fa-circle-notch" 
			    />
            </template>
        </div>
        <small class="text-secondary fs-12px">Enter 0 to unset values</small>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import  axios from '../../../../actions/api.js';
import { useRoute } from 'vue-router';
import UnitSelector from './UnitSelector.vue';
import { useToast } from 'vue-toast-notification';
import { handlePromise } from '../../../../helpers/index.js';

const emit = defineEmits(['created', 'cancel', 'updated']);
const props = defineProps(['pricing', 'lastPricingRecordOrder']);
const currentRoute = useRoute();
const toast = useToast();

const loading = ref(false);
const formData = ref({
    description: props.pricing?.description ?? '',
    quantity: props.pricing?.quantity ?? 0,
    unit_price: props.pricing?.unit_price ?? 0,
    unit_id: props.pricing?.unit_id ?? null, // the 'null' serves as the id for a default placeholder record
    order: props.lastPricingRecordOrder
        ? props.lastPricingRecordOrder + 1
        : props?.pricing?.order 
            ? props.pricing.order + 1 
            : 0
});

const invalidInput = computed(() => {
    if (!Boolean(formData.value.description)) return true;

    if (typeof formData.value.quantity !== 'number') return true;
    if (typeof formData.value.unit_price !== 'number') return true; 

    // not just relying on :min attribute due to firefox's incompatibility
    if (formData.value.quantity < 0) return true; 
    if (formData.value.unit_price < 0) return true;

    return false;
});

const handleCreateClick = async () => {
    if (invalidInput.value) 
        return toast.error('Please enter valid input values!');

    const projectId = currentRoute.params.project_id;
    const payload = formData.value;

    const endpoint = !props.pricing 
        ? `projects/${projectId}/pricing` 
        : `projects/${projectId}/pricing/${props?.pricing?.id}`;

    const axiosCall = !props.pricing 
        ? axios.post(endpoint, payload) 
        : axios.put(endpoint, payload);

    loading.value = true;
    const {response, error} = await handlePromise(axiosCall);

    if (error) toast.error(
        error?.response?.data?.message ?? 'Something went wrong, please check your inputs and try again'
    ); 

    if (response) emit(
        !props.pricing ? 'created' : 'updated'
    );

    loading.value = false;
}

const handleCancelClick = () => {
    emit('cancel');
}

</script>

<style lang="scss" scoped>
$scale-factor: 1.25;

.pricing-control svg {
    color: #adadad;
    transition: 100ms;
}

.invalid-input {
    color: #dc4c64;
    border: 2px solid;
}

.create-pricing-btn {
    &:hover { 
        transform: scale($scale-factor); 
        color: #14a44d;
    }

    &.disabled {
        pointer-events: none !important;
        opacity: 0.5;
    }
}

.discard-pricing-btn:hover { 
    transform: scale($scale-factor); 
    color: #dc4c64;
}


</style>
