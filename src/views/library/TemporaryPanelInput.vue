<script setup>
import SaveableInput from './components/SaveableInput.vue'
import {computed, onMounted, ref} from 'vue'
import {useProjectStore} from '../../stores/project'
import axios from '../../actions/api'

const quantity = ref(0)
const projectStore = useProjectStore()

const handlePanelClick = (panelId) => updateSelectedPanel(panelId)

const updateSelectedPanel = async (panelId) => {
	await axios.post(`projects/${projectStore.getProjectId}/panel-sales`, {
		panel_model_id: panelId,
		quantity: quantity.value ?? 1,
	})
	getSelectedPanelDetails()
}

const handlePanelQuantityChange = () => {
    updateSelectedPanel(projectStore.getSelectedPanel.id)
}

const selectedPanel = computed(() => projectStore.getSelectedPanel)

const getSelectedPanelDetails = () => {
	axios.get(`projects/${projectStore.getProjectId}/panel-sales`).then(
		(res) =>
			projectStore.setSelectedPanel({
				panel_model_id: res.data?.panel_model_id,
				quantity: res.data?.quantity,
			})
	)
}

onMounted(() => {
	quantity.value = projectStore.selectedPanelDetails.quantity
})
</script>

<template>
	<div class="mb-5 px-3">
		<div class="dropdown mb-2 d-flex align-items-center justify-content-between">
			<!-- <span>{{ selectedPanel?.model ?? '' }}</span> -->
			<p class="fw-bold mb-0 fs-12px">Panel: </p>
			<div>
                <input
				    :placeholder="selectedPanel?.model ?? `Search for available panels`"
				    class="dropdown-toggle form-control"
				    id="dropdownMenuButton"
				    data-toggle="dropdown"
				    aria-haspopup="true"
				    data-mdb-toggle="dropdown"
				    aria-expanded="false"
			    />

			    <div
				    class="dropdown-menu border panel-list"
				    aria-labelledby="dropdownMenuButton"
			        >
				    <a
					    class="dropdown-item cursor-pointer d-flex align-items-center justify-content-between"
					    @click="handlePanelClick(panelModel.id)"
					    v-for="panelModel in projectStore.getAvailablePanels"
				        >
					    <div>
						    <span class="mb-0 d-block">
							    <span>{{ panelModel.model }}</span> ·
							    <span class="text-secondary">
							        {{ panelModel.max_input_v }}VA
							    </span>
						    </span>
					    </div>
					    <font-awesome-icon
						    class="fs-13px text-warning"
						    icon="fas fa-star"
					    />
				    </a>
			    </div>
            </div>
		</div>
		<div class="d-flex align-items-center justify-content-between">
			<p class="fw-bold mb-0 fs-12px">Quantity:</p>
			<SaveableInput
				v-model.number="quantity"
				@update:modelValue="handlePanelQuantityChange"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
