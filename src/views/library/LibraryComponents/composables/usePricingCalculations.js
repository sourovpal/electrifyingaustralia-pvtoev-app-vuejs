import {computed, watch} from 'vue'
import {useProjectStore} from '../../../../stores/project'

function usePricingCalculations(pricings, activeTaxType) {
	const projectStore = useProjectStore()
	const total = computed(() =>
		!pricings.value?.length
			? 0
			: pricings.value.reduce((a, v) => +a + +v.total, 0)
	)

	const gst = computed(() =>
		((projectStore.gstRate / 100) * total.value).toFixed(2)
	)
	const stcCount = projectStore.getStcCount

	const subtotal = computed(() =>
		activeTaxType.value !== 'excluded'
			? total.value
			: total.value + +gst.value
	)

	const calculatedStcDiscount = computed(
		() => projectStore.getCalculatedStcDiscount
	)
	const totalAmountAfterStcDiscount = computed(
		() =>
			subtotal.value -
			(subtotal.value ? calculatedStcDiscount.value : 0)
	)

	watch(
		() => ({
			total: total.value,
			gst: gst.value,
			totalAmountAfterStcDiscount: totalAmountAfterStcDiscount.value,
		}),
		(newValue) =>
			projectStore.setQuotationDetails(
				JSON.parse(JSON.stringify(newValue))
			)
	)

	return {
		total,
		gst,
		stcCount,
		calculatedStcDiscount,
		totalAmountAfterStcDiscount,
	}
}

export default usePricingCalculations
