<template>
    <div class="row px-4 py-2 align-items-center">
        <div class="col-5 col-md-4">
            <input
                v-model="description" 
                placeholder="Enter description" 
                class="form-control p-1 ps-2" 
                type="text" 
            />
        </div>

        <div class="col-1 col-md-2">
            <div class="dropdown dropup text-end p-0">
                <small
                    class="fw-bold cursor-pointer text-secondary"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                >
				    <span class="me-3">watt</span>
				    <font-awesome-icon
				        class="text-secondary"
				        icon="fas fa-caret-down"
				    />
				</small>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li class="py-2 px-3 dropdown-item cursor-pointer"> 
                        kWh
                    </li>
                </ul>
			</div>
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
			    class="create-pricing-btn cursor-pointer"
				icon="fas fa-check"
			    @click="handleCreateClick"
			/>

			<font-awesome-icon
			    class="discard-pricing-btn cursor-pointer"
				icon="fas fa-xmark"
			/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import  axios from '../../../actions/api.js';
import { useRoute } from 'vue-router';

const emit = defineEmits(['pricing-created'])
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
</script>

<style lang="scss" scoped>
$scale-factor: 1.25;

.pricing-control svg {
    color: #adadad;
    transition: 100ms;
}

.create-pricing-btn:hover { 
    transform: scale($scale-factor); 
    color: #14a44d;
}

.discard-pricing-btn:hover { 
    transform: scale($scale-factor); 
    color: #dc4c64;
}

</style>
