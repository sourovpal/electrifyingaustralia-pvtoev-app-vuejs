<script setup>
import { ref, onMounted } from 'vue';
import Formatter from '../../../../helpers/Formatter';
import { onClickOutside } from '@vueuse/core';
import axios from '../../../../actions/api';
import { useProjectStore } from '../../../../stores/project';
import { useToast } from 'vue-toast-notification';
import { isNumeric } from '../../../../helpers';

const emit = defineEmits([
    'item-updated'
]);

const props = defineProps([
    'pricing'
]);

const projectStore = useProjectStore();
const toast = useToast();

onMounted(() => {
    total.value = props.pricing.line_item_price;
    userInput.value = total.value
});

const total = ref(0);
const toggleQuantityInput = ref(false);

const toggleEditMode = () => {
    userInput.value = total.value;
    toggleQuantityInput.value = !toggleQuantityInput.value 
};

const userInput = ref(0);
const handleTotalInput = () => {
    if (!isNumeric(userInput.value))
        return toast.error('Please enter valid input values!');
    total.value = userInput.value;
    updateRecord();
}

const updateRecord = () => {
	const payload = { new_total: total.value }
	axios.put(`projects/${projectStore.getProjectId}/pricing/${props.pricing.id}/update-line-item-price`, payload)
	    .then((res) => {
            toast.success(res?.data?.message ?? 'Current bills updated');
            emit('item-updated');
	    })
	    .catch(err => {
            toast.error(err?.response?.data?.message ?? 'Something went wrong');
            console.log(err);
	    })
	    .finally(toggleEditMode)
}

const quantityInput = ref(null);
onClickOutside(
    quantityInput, 
    () => toggleQuantityInput.value = false
);

</script>

<template>
	<div class="row pricing-value align-items-center px-4 py-2 position-relative">
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
        <p class="col-5 col-md-3 mb-0 cursor-pointer text-info fw-bold">{{ pricing.description }}</p>

		<small class="offset-6 col-2 col-md-2 text-end">
            <template v-if="!toggleQuantityInput">
                <span class="cursor-pointer" @click="toggleEditMode"> $ {{ Formatter.toIntlFormat(total) }}</span>
            </template>

            <input
                v-else
                :min="0"
                @keyup.enter="handleTotalInput"
                class="form-control text-end p-1"
                placeholder="Quantity"
                ref="quantityInput"
                v-model.number="userInput"
                type="number"
            />
		</small>
		<div class="col-2 col-md-1"></div>
	</div>
</template>

<style lang="scss"></style>
