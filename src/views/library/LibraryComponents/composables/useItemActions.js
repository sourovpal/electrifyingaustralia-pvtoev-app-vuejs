import {useRoute} from 'vue-router'
import {ref} from 'vue'
import axios from '../../../../actions/api.js'

function useItemActions(emit, pricing) {
	const {params} = useRoute()
	const loading = ref(false)

	const handleItemHide = async () => {
		loading.value = true

		await axios.put(
			`projects/${params.project_id}/pricing/${pricing.id}/item-hide`,
			{hide_item: !Boolean(pricing.item_hidden)}
		)

		loading.value = false
		emit('item-updated')
	}

	const handleItemPriceHide = async () => {
		loading.value = true
		await axios.put(
			`projects/${params.project_id}/pricing/${pricing.id}/item-price-hide`,
			{
				hide_item_price: !Boolean(pricing.price_hidden),
			}
		)
		loading.value = false
		emit('item-updated')
	}

	const handleUnitChange = async (payload) => {
		loading.value = true
		await axios.put(
			`projects/${params.project_id}/pricing/${payload.pricingId}/item-unit-update`,
			{
				unit_id: payload.new_unit_id,
			}
		)
		loading.value = false
		emit('item-updated')
	}

	const handleDeleteClick = async () => {
		loading.value = true
		await axios.delete(
			`projects/${params.project_id}/pricing/${pricing.id}`
		)
		loading.value = false
		emit('item-updated')
	}

	return {
		handleItemHide,
		handleUnitChange,
		handleItemPriceHide,
		handleDeleteClick,
		loading,
	}
}

export default useItemActions
