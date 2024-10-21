<template>
	<div class="overflow-x-hidden position-relative px-4">
		<div class="row align-items-center py-3 px-4">
			<p class="text-end fs-14px col-md-4 mb-0 text-secondary">
				Simulate load profile
			</p>
			<div class="col-md-8 d-flex align-items-center gap-3">
				<!-- placeholder -->
				<CustomSwitch
				    class="pe-none loading-opacity"
				    v-model="formData.is_simulated" 
				/>
			    <font-awesome-icon
				    class="check-sign text-secondary"
                    v-tippy="{content:'Load profile simulation is yet to be implemented', placement : 'top'}"
				    icon="fas fa-circle-info"
			    />
			</div>
		</div>
		<div class="row align-items-baseline py-3 px-4">
			<p class="text-end fs-14px col-md-4 mb-0 text-secondary">
				<template v-if="!formData.is_simulated">Simple self consumption</template>
				<template v-else>Calculated self consumption</template>
			</p>
            <div class="col-md-8">
			    <SaveableInput
			        :amount-formatter="(num => num + '%')"  
			        v-model.number="formData.self_consumption_rate" 
			    />
            </div>
		</div>
		<div class="help-icon position-absolute">
			<font-awesome-icon
				class="text-secondary"
				icon="fas fa-circle-question"
			/>
		</div>
        <template v-if="formData.is_simulated">
		    <hr>
		    <div>
		        <div class="inputs-wrapper d-flex gap-4 mb-4">
		            <div class="custom-checkbox d-flex gap-2">
		                <label for="gas-input">Gas: </label>
		                <input id="gas-input" type="checkbox" v-model="formData.has_gas" />
		            </div>

		            <div class="custom-checkbox d-flex gap-2">
		                <label for="pool-input">Pool: </label>
		                <input id="pool-input" type="checkbox" v-model="formData.has_pool" />
		            </div>
		            <div class="custom-checkbox d-flex gap-2">
		                <label for="air-con-input">Air con: </label>
		                <input id="air-con-input" type="checkbox" v-model="formData.has_air_con" />
		            </div>
		            <div class="custom-checkbox d-flex gap-2">
		                <label for="controlled-load-input">Controlled load: </label>
		                <input id="controlled-load-input" type="checkbox" v-model="formData.load_controlled" />
		            </div>
		        </div>
		        <div class="occupants-input-wrapper d-flex align-items-baseline gap-3">
		            <p>Occupants</p>
		            <SaveableInput v-model="formData.occupants" />
		        </div>
		        <div :class="`graph-wrapper ${loading ? 'loading-opacity' : ''}`">
		            Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.
		            Nisi anim cupidatat excepteur officia.
		            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.
		            Nostrud officia pariatur ut officia.
		            Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
		            Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod.
		            Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim.
		            Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
		        </div>
		    </div>
        </template>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import CustomSwitch from '../../../../components/forms/CustomSwitch.vue'
import SaveableInput from '../../components/SaveableInput.vue';
import { useProjectStore } from '../../../../stores/project';
import { storeToRefs } from 'pinia';
import axios from '../../../../actions/api';
import { useToast } from 'vue-toast-notification';



const toast = useToast();
const projectStore = useProjectStore();
const { getProjectId  } = storeToRefs(projectStore);

const formData = ref({});

const getLoadProfileDetails = () => 
    axios
      .get(`projects/${getProjectId.value}/load_profile`)
      .then(res => formData.value = res.data);


const loading = ref(false);
const updateLoadProfile = () => {
    const apiEndpoint = `projects/${getProjectId.value}/load_profiles/${formData.value.id}`;
    loading.value = true
    axios.put(apiEndpoint, formData.value)
        .then(res => toast.success(res?.data?.message ?? 'Success'))
        .catch(error => {
            toast.error(error?.response?.data?.message ?? 'Something went wrong, please check your inputs');
            console.log(error);
        })
        .finally(() => loading.value = false)
}

onMounted(getLoadProfileDetails);

watch(
    () => JSON.stringify(formData.value),
    (_, oldValue) => {
        if (Object.keys(JSON.parse(oldValue)).length === 0) return;
        updateLoadProfile();
    }
);

watch(
    () => formData.value.self_consumption_rate,
    projectStore.setSelfConsumption
);

</script>

<style lang="scss" scoped>
input:where([type='checkbox'][role='switch']) {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	position: relative;
	color: inherit;
	font-size: inherit;
	width: 2em;
	height: 1em;
	box-sizing: content-box;
	border: 1px solid;
	border-radius: 1em;
	vertical-align: text-bottom;
	margin: auto;
}

input:where([type='checkbox'][role='switch'])::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 0;
	transform: translate(0, -50%);
	box-sizing: border-box;
	width: 0.7em;
	height: 0.7em;
	margin: 0 0.15em;
	border: 1px solid;
	border-radius: 50%;
	background: currentcolor;
}

input:where([type='checkbox'][role='switch']):checked::before {
	left: 1em;
}

input:where([type='checkbox'][role='switch']):disabled {
	opacity: 0.4;
}
.help-icon {
    top: 1rem;
    right: 1rem;
}
</style>
