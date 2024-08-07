<template>
    <div class="row px-4 py-2 align-items-center">
        <div class="col-5 col-md-3">
            <input
                v-model="description" 
                placeholder="Enter description" 
                class="form-control p-1 ps-2" 
                type="text" 
            />
        </div>

        <div class="col-1 col-md-2">
            <UnitSelector v-model="unit_id" />
        </div>

        <div class="col-md-2">
            <input
                placeholder="Quantity"
                v-model="quantity"
                class="form-control text-end p-1"
                type="number"
            />
        </div>

        <div class="col-md-2">
            <input
                placeholder="Unit price"
                class="form-control text-end p-1"
                v-model="unitPrice"
                type="number"
            />
        </div>

        <div class="col-md-2 d-flex gap-3 justify-content-end pricing-control">
			<font-awesome-icon
			    :class="`create-pricing-btn cursor-pointer ${Boolean(description) ? '' : 'disabled'}`"
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

const description = ref(props.pricing?.description ?? '');
const quantity = ref(props.pricing?.quantity ?? '')
const unitPrice = ref(props.pricing?.unit_price ?? '')
const unit_id = ref(props.pricing?.unit_id ?? 1);

const formData = ref({
    description: props.pricing?.description ?? '',
    quantity: props.pricing?.quantity ?? '',
    unitPrice: props.pricing?.unit_price ?? '',
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

    await axios.post(`projects/${projectId}/pricing`, payload)
    emit('created');
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
