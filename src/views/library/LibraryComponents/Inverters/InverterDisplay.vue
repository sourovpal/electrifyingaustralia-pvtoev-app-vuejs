<script setup>
import { ref, computed, onMounted } from 'vue';
import InverterUnit from './InverterUnit.vue';
import { useProjectStore } from '../../../../stores/project';
import axios from '../../../../actions/api';
import { useToast } from 'vue-toast-notification';


const toast = useToast()
const projectStore = useProjectStore();
const inverterModels = computed(() => projectStore.getAvailableInverters);

const searchTerm = ref('');

const searchedInverters = computed(() =>
	inverterModels.value.filter((inverter) =>
		inverter.model
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase()) ||
		inverter.max_input_v
			.toString()
			.includes(searchTerm.value.toLowerCase())
			? inverter
			: ''
	)
)

const getInverterSales = async () => {
    const response = await axios.get(`projects/${projectStore.getProjectId}/inverter-sales`);
    selectedInverters.value = response?.data ?? [];
}

const loading = ref(false);
const selectedInverters = ref([]);
const handleInverterClick = (inverterId) => {
    loading.value = true
    axios.post(`projects/${projectStore.getProjectId}/inverter-sales/add`, { inverter_id: inverterId })
        .then(getInverterSales)
        .catch(err => {
            toast.error(err?.res?.data?.message ?? 'Something went wrong');
            console.log(err);
        })
        .finally(() => {
            loading.value = false
        })
}

const handleInverterDelete = async (inverterId) => {
    const inverters_to_keep = 
        selectedInverters.value
            .filter(inv => inv.id.toString() !== inverterId.toString())
            .map(inv => inv.id);

    loading.value = true
    axios.put(`projects/${projectStore.getProjectId}/inverter-sales/remove`, { inverters_to_keep })
        .then(getInverterSales)
        .catch(err => {
            toast.error(err?.response?.data?.message ?? 'Something went wrong');
            console.log(err);
        })
        .finally(() => {
            loading.value = false
        })
}

onMounted(getInverterSales)

</script>

<template>
    <div :class="`inverter-display position-relative ${loading ? 'loading-opacity' : ''}`">
 	    <div class="row align-items-center border-bottom py-3 px-4">
		    <p class="text-end fs-14px col-md-4 mb-0 text-secondary">Add an inverter</p>
		    <div class="col-md-8">
                <div class="dropdown">
					<input
					    v-model="searchTerm"
					    placeholder="Search for available inverters"
					    class="dropdown-toggle form-control"
					    id="dropdownMenuButton"
					    data-toggle="dropdown"
					    aria-haspopup="true"
					    data-mdb-toggle="dropdown"
					    aria-expanded="false"
					/>

					<div class="dropdown-menu border inverter-list" aria-labelledby="dropdownMenuButton">
						<a 
						    class="dropdown-item cursor-pointer d-flex align-items-center justify-content-between"
						    @click="handleInverterClick(inverterModel.id)"
						    v-for="inverterModel in searchedInverters"
						>
                            <div>
						        <span class="mb-0 d-block">
						            <span>{{ inverterModel.model }}</span> · <span class="text-secondary">{{ inverterModel.max_input_v }}VA</span>
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
            <div class="row align-items-center px-4 pt-1">
		        <small class="offset-4 col-md-8 fs-13px text-secondary">
                    *At least one inverter is required per project
		        </small>
	        </div>
	    </div>
	    <div v-if="!selectedInverters.length" class="graphic d-flex flex-column align-items-center">
	        <img src="https://static-pylon.imgix.net/images/app/ui/empty/empty_inverter.png?auto=format" alt="">
	        <p class="text-muted mb-0">Search to add an inverter</p>
	    </div>

        <!-- temporary -->
	    <InverterUnit 
	        v-for="inverter in selectedInverters" 
            @inverter-delete="handleInverterDelete"
	        :inverter
	        :selectedInvertersCount="selectedInverters.length"
	        :key="`#${inverter.id}-${loading}`"
	    />

        <div v-if="loading" class="card-loader">
			<font-awesome-icon
			    icon="fas fa-circle-notch"
			    class="animate-spin"
			/>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.inverter-display  {
    overflow-x: clip;

    .inverter-list {
        width: 28rem;
        height: 15rem;
        overflow-y: scroll;
    }
}
</style>
