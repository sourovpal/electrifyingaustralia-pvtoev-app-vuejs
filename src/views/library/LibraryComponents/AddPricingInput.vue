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
            <UnitSelector />
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

const emit = defineEmits(['pricing-created', 'pricing-cancel'])
const props = defineProps(['pricing'])
const currentRoute = useRoute();

const description = ref('');
const quantity = ref()
const unitPrice = ref()

const handleCreateClick = async () => {
    const projectId = currentRoute.params.project_id;
    const payload = {
        description: description.value,
        quantity: quantity.value,
        unit_price: unitPrice.value,
    }

    await axios.post(`projects/${projectId}/pricing`, payload)
    emit('pricing-created');
}

const handleCancelClick = () => {
    emit('pricing-cancel');
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
