<template>
    <div class="row px-4 py-2 align-items-center">
        <div class="col-5 col-md-3">
            <input
                v-model="formData.description" 
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
                v-model="formData.quantity"
                class="form-control text-end p-1"
                type="number"
            />
        </div>

        <div class="col-md-2">
            <input
                placeholder="Unit price"
                class="form-control text-end p-1"
                v-model="formData.unit_price"
                type="number"
            />
        </div>

        <div class="col-md-2 d-flex gap-3 justify-content-end pricing-control">
			<font-awesome-icon
			    :class="`create-pricing-btn cursor-pointer ${Boolean(formData.description) ? '' : 'disabled'}`"
				icon="fas fa-circle-check"
			    @click="handleCreateClick"
			/>

			<font-awesome-icon
			    class="discard-pricing-btn cursor-pointer"
				icon="fas fa-circle-xmark"
			    @click="handleCancelClick"
			/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import  axios from '../../../actions/api.js';
import { useRoute } from 'vue-router';
import UnitSelector from './UnitSelector.vue';

const emit = defineEmits(['created', 'cancel'])
const props = defineProps(['pricing'])
const currentRoute = useRoute();

const formData = ref({
    description: props.pricing?.description ?? '',
    quantity: props.pricing?.quantity ?? '',
    unit_price: props.pricing?.unit_price ?? '',
    unit_id: props.pricing?.unit_id ?? 1,
})

const handleCreateClick = async () => {
    const projectId = currentRoute.params.project_id;
    const { description, quantity, unit_price, unit_id } = formData.value;

    const payload = {
        description,
        quantity,
        unit_price,
        unit_id
    }

    if (!props.pricing) {
        await axios.post(`projects/${projectId}/pricing`, payload)
        return emit('created');
    }

    await axios.put(`projects/${projectId}/pricing/${props.pricing.id}`, payload)
    emit('updated');
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
