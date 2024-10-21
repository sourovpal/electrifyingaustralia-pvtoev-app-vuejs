<script setup>
import { nextTick, onMounted, ref } from 'vue';
import Formatter from '../../../../helpers/Formatter';
import SaveableInput from '../../../library/components/SaveableInput.vue';
import axios from '../../../../actions/api';
import { useProjectStore } from '../../../../stores/project';
import { useToast } from 'vue-toast-notification';

const toast = useToast()
const props = defineProps(['inverter']);
const emit = defineEmits(['inverter-delete']);

const formData = ref({
    quantity: 0,
    ac_output_limit: 0
});

// deleting from the parent as retrieving new inverter sale date is required
const handleInverterDelete = (inverterId) => {
    emit('inverter-delete', inverterId);
}

const collapsed = ref(true);

const projectStore = useProjectStore();
const updateInverterSale = () => nextTick(() => {
    axios.put(`projects/${projectStore.getProjectId}/inverter-sales/update/${props.inverter.pivot.id}`, formData.value)
        .then((res) => toast.success(res?.data?.message ?? 'Success'))
        .catch(e => {
            toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
            console.log(e);
        })
})

onMounted(() => {
    const inverterSaleDetails = props?.inverter?.pivot;
    if (!inverterSaleDetails) return;

    formData.value.quantity = inverterSaleDetails.quantity;
    formData.value.ac_output_limit = inverterSaleDetails.ac_output_limit;
});


</script>

<template>
    <div class="position-relative inverter-unit pb-4">
        <div class="row mt-4">
			<p class="text-end fs-14px col-md-4 text-secondary">
				Inverter model
			</p>
			<div class="col-md-8">
				<p class="text-black fs-14px mb-0"> {{ inverter.model }} · {{ inverter.max_input_v }} VA </p>
                <!-- <small class="text-secondary fs-12px">GEP 4-20KW Three Phase Series · Three-phase · PV-only Inverter · AU</small> -->
			</div>
		</div>

		<div  class="inverter-control position-absolute text-end d-inline-flex align-items-center gap-3">
		    <font-awesome-icon
			    class="fs-13px inverter-delete-btn text-secondary cursor-pointer"
			    icon="fas fa-trash"
                @click="handleInverterDelete(inverter.id)"
		    />

			<!-- <font-awesome-icon -->
			<!--     :class="`text-secondary fs-14px cursor-pointer ${!collapsed ? '' : 'while-collapsed'}`" -->
			<!--     icon="fas fa-chevron-up" -->
   <!--              @click="collapsed = !collapsed" -->
			<!-- /> -->
		</div>

        <template v-if="!collapsed">
            <div class="row mt-4">
			    <p class="text-end fs-14px col-md-4 text-secondary">
				    Quantity
			    </p>
			    <div class="col-md-8">
				    <div class="d-flex align-items-center gap-3">
		                <SaveableInput
		                    @update:modelValue="updateInverterSale"
		                    v-model.number="formData.quantity"
		                />
				    </div>

		            <div class="info-table d-flex align-items-center" style="gap: 7rem;">
		                <div class="column-1">
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">MPPT:</span> {{ inverter.mppt }}
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">Max. input current </span> {{ inverter.max_input_v }}
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">DC input voltage</span> 1,100 V
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">Max DC power</span> 20000 W
		                    </p>
		                </div>

		                <div class="column-2">
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">AC apparent output:</span> 1
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">Max. input current </span> 30/15
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">DC input voltage</span> 1,100 V
		                    </p>
		                    <p class="fs-13px mb-0"> 
		                        <span class="text-secondary">Max DC power</span> 20000 W
		                    </p>
		                </div>
		            </div>
			    </div>
		    </div>

            <div class="row mt-4 align-items-center position-relative">
			    <p class="text-end fs-14px col-md-4 text-secondary mb-0">
				    AC Output limit
			    </p>
			    <div class="col-md-8 d-flex align-items-center gap-3">
		            <SaveableInput  
		                v-model.number="formData.ac_output_limit" 
		                @update:modelValue="updateInverterSale"
                        :amount-formatter="(num) => Formatter.toIntlFormat(num) + ' VA'"
		            />
		            <!-- <small class="text-primary fs-12px fw-bold">Maximise AC Output</small> -->
			    </div>
		    </div>
        </template>
	</div>
</template>


<style lang="scss" scoped>
.inverter-control {
    top: 0;
    right: 2rem;

    & > * { transition: 200ms; }
}

.inverter-delete-btn {
    &:hover {
        transform: scale(1.15);
        color: #dc4c64 !important; 
    }
}

.inverter-unit:not(:last-child) { border-bottom: 1px solid #cbd2d9; }
.while-collapsed { transform: rotate(180deg); }

</style>
