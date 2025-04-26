import {ref} from 'vue'
import axios from '../../../../actions/api.js'
import { useProjectStore } from '../../../../stores/project.js'
import { useToast } from 'vue-toast-notification';

function usePricingActions(emit, pricing) {
	const projectStore = useProjectStore();
	const projectId = projectStore.getProjectId;

	const toast = useToast();
	const loading = ref(false)

	const handleItemHide = () => {
		loading.value = true
		const payload = { hide_item: !Boolean(pricing.item_hidden) }

	    axios.put(`projects/${projectId}/pricing/${pricing.id}/item-hide`, payload)
	        .then(() => emit('item-updated'))
	        .catch((e) => {
                toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
                console.log(e);
	        })
	        .finally(() => loading.value = false)
	}

	const handleItemPriceHide = () => {
		loading.value = true
		const payload = { hide_item_price: !Boolean(pricing.price_hidden) }

	    axios.put(`projects/${projectId}/pricing/${pricing.id}/item-price-hide`, payload)
	        .then(() => emit('item-updated'))
	        .catch((e) => {
                toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
                console.log(e);
	        })
	        .finally(() => loading.value = false)
	}

	const handleUnitChange = (payload) => {
		loading.value = true
		const apiPayload = { unit_id: payload.new_unit_id }

		axios.put(`projects/${projectId}/pricing/${payload.pricingId}/item-unit-update`, apiPayload)
		    .then(() => emit('item-updated'))
	        .catch((e) => {
                toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
                console.log(e);
	        })
	        .finally(() => loading.value = false)
	}

	const handleDeleteClick = () => {
		loading.value = true
	    axios.delete(`projects/${projectId}/pricing/${pricing.id}`)
	        .then(() => emit('item-updated'))
	        .catch((e) => {
                toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
                console.log(e);
	        })
	        .finally(() => loading.value = false)
	}

	return {
		handleItemHide,
		handleUnitChange,
		handleItemPriceHide,
		handleDeleteClick,
		loading,
	}
}

export default usePricingActions
