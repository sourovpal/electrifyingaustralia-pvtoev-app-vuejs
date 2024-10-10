<script setup>
import {computed, onMounted, ref} from 'vue';
import CustomSwitch from '../../../components/forms/CustomSwitch.vue';
import SaveableInput from '../components/SaveableInput.vue';
import { useProjectStore } from '../../../stores/project';
import axios from '../../../actions/api';
import Formatter from '../../../helpers/Formatter';
import { useToast } from 'vue-toast-notification';

const formData = ref({});
const projectStore = useProjectStore();
const certificateTypes = projectStore.certificateTypes;
const loading = ref(false);


const selectedCertificateType = computed(() => {
    if (!certificateTypes?.length) return '';
    if (!formData.value.certificate_type_id) return '';

    const selectedCertificateTypeRecord =
        certificateTypes.find(
            certificateType => certificateType?.id?.toString() === formData.value.certificate_type_id?.toString()
        );

    if (!selectedCertificateTypeRecord) return '';
    return selectedCertificateTypeRecord;
});



const toast = useToast();
const handleCertificateTypeClick = (certificateId) => {
    formData.value.certificate_type_id = certificateId; 
    updatePaymentSettings();
}

const handleDepositTypeOptionClick = (newType) => {
    formData.value.deposit_type = newType 
    updatePaymentSettings();
}

onMounted(() => {
    formData.value = projectStore.getPaymentSettings;
});

const updatePaymentSettings = () => {
    projectStore.setRecalculationLoadingState(true);
    axios.put(`projects/${projectStore.getProjectId}/payment_settings/${formData.value.id}`, formData.value)
        .then((res) => {
            toast.success(res?.data?.message ?? 'Success');
            projectStore.setCurrentProject(projectStore.getProjectId);
        })
        .catch(e => {
            toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
            console.log(e);
        })
        .finally(() => {
            projectStore.setRecalculationLoadingState(false) 
        });
}
</script>

<template>
	<div :class="`py-4 position-relative ${loading ? 'loading-opacity' : ''}`">
		<div class="row mb-3 align-items-center">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">
				RET certificate type
			</p>
			<div class="col-md-8">
				<div class="dropdown">
					<button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
				        data-mdb-toggle="dropdown"
						aria-expanded="false"
					>
                        {{ selectedCertificateType.name }}
				        <font-awesome-icon
				            class="text-secondary"
				            icon="fas fa-caret-down"
				        />
					</button>
					<div
						class="dropdown-menu border certificate-type-list"
						aria-labelledby="dropdownMenuButton"
					>
						<a
						    :class="`dropdown-item cursor-pointer ${ certificate.id.toString() === selectedCertificateType?.id?.toString() ? 'active-certificate' : '' }`"
						    v-for="certificate in certificateTypes" 
						    :key="certificate.id"
						    @click="handleCertificateTypeClick(certificate.id)"
						>{{certificate.name}}</a>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="row"> -->
		<!-- 	<p class="text-end fs-14px col-md-4 text-secondary">LGC price</p> -->
		<!-- 	<div class="col-md-8"> -->
		<!-- 		<p class="fs-14px mb-1 text-black">{{ Formatter.toIntlFormat(formData.lgc_price ?? 0) }}</p> -->
		<!-- 		<p class="fs-12px"> Excluding GST </p> -->
		<!-- 	</div> -->
		<!-- </div> -->

        <div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary"> STC price </p>
			<div class="col-md-8">
			    <SaveableInput 
			        v-model.number="formData.stc_price" 
			        :amount-formatter="(num) => '$ ' + Formatter.toIntlFormat(num ?? 0)" 
			        @update:modelValue="updatePaymentSettings"
			    />
			    <p class="fs-12px text-secondary">Excluding GST</p>
			</div>
		</div>

        <div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Customer keeps STCs</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
               <!--      <CustomSwitch -->
               <!--          v-model="formData.customer_keeps_stcs"  -->
			            <!-- @update:modelValue="updatePaymentSettings" -->
               <!--      /> -->
				    <CustomSwitch
				        class="pe-none loading-opacity"
				        v-model="formData.customer_keeps_stcs" 
				    />
			        <font-awesome-icon
				        class="check-sign text-secondary"
                        v-tippy="{content:'This feature is yet to be implemented', placement : 'top'}"
				        icon="fas fa-circle-info"
			        />
				</div>
			</div>
		</div>

		<hr />

		<div class="row mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">
				Deposit amount
			</p>
			<div class="col-md-8 d-flex align-items-start justify-content-between" style="padding-right: 2.5rem;">
                <div>
                    <div class="btn-group btn-group-sm mb-2" role="group" aria-label="Basic example">
                        <button
                            @click="handleDepositTypeOptionClick('no_deposit')"
                            type="button"
                            :class="`btn ${formData?.deposit_type === 'no_deposit' ? 'btn-primary' : 'btn-secondary'}`"
                        >
                            No deposit
                        </button>

                        <button
                            @click="handleDepositTypeOptionClick('percentage')"
                            type="button"
                            :class="`btn ${formData?.deposit_type === 'percentage' ? 'btn-primary' : 'btn-secondary'}`"
                        >
                            Percentage
                        </button>

                        <button
                            @click="handleDepositTypeOptionClick('fixed_amount')"
                            type="button"
                            :class="`btn ${formData?.deposit_type === 'fixed_amount' ? 'btn-primary' : 'btn-secondary'}`"
                        >
                            Fixed amount
                        </button>
                    </div>

				    <SaveableInput 
				        :amount-formatter="num => num + ' %'" 
				        v-model="formData.deposit_amount" 
			            @update:modelValue="updatePaymentSettings"
				    />

					<small class="fs-12px">This percentage of total price</small>
                </div>

                <div class="reset d-flex align-items-center gap-2 cursor-pointer">
					<font-awesome-icon
					    class="text-secondary fs-14px"
					    icon="fas fa-arrow-rotate-right"
					/>
					<p class="mb-0 fs-14px">Reset</p>
                </div>
			</div>
		</div>

		<div class="row mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Customer is GST registered</p>
			<div class="col-md-8 d-flex gap-3 align-items-center">
			    <!-- <CustomSwitch  -->
			    <!--     v-model="formData.customer_gst_registered"  -->
       <!--              @update:modelValue="updatePaymentSettings" -->
			    <!-- /> -->

				<CustomSwitch
				    class="pe-none loading-opacity"
				    v-model="formData.customer_gst_registered" 
				/>
			    <font-awesome-icon
				    class="check-sign text-secondary"
                    v-tippy="{content:'This feature is yet to be implemented', placement : 'top'}"
				    icon="fas fa-circle-info"
			    />
			</div>
		</div>

		<div class="row">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Component line items</p>
			<div class="col-md-8 d-flex gap-3 align-items-center">
			    <CustomSwitch 
				    class="pe-none loading-opacity"
			        v-model="formData.component_line_items"  
			        @update:modelValue="updatePaymentSettings"
			    />
			    <font-awesome-icon
				    class="check-sign text-secondary"
                    v-tippy="{content:'This feature is yet to be implemented', placement : 'top'}"
				    icon="fas fa-circle-info"
			    />
			</div>
		</div>
		<hr>
		<div class="row mb-3">
			<p class="text-end fs-14px col-md-4 text-secondary mb-0">Tax rate</p>
			<div class="col-md-8">
				<div class="d-flex gap-3 align-items-center">
					<p class="fs-14px mb-0 text-black">GST {{projectStore.gstRate.toFixed(2)}}%</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>

.certificate-type-list a {
    border-left: 2px solid #ffffff;

    &:hover:not(.active-certificate) { border-color: #f7f7f9; }
    &.active-certificate { border-color: #007ee5; }
}

</style>
