<script setup>
import ShareModal from './ShareModal/ShareModal.vue'
import ProjectInstallModal from './ProjectInstallModal/ProjectInstallModal.vue'
import {ref, watch, computed} from 'vue'
import {storeToRefs} from 'pinia'
import {Skeletor} from 'vue-skeletor'
import { useProjectStore } from '../../stores/project';
import TemporaryPanelInput from './TemporaryPanelInput.vue'
import Formatter from '../../helpers/Formatter'
import { RouterLink } from 'vue-router'

const projectStore = useProjectStore();
const { toggleSendModal } = storeToRefs(projectStore);

const activeTaxSlug = computed(() => projectStore.getTaxType);

watch(toggleSendModal, (newValue) => {
    if (!newValue) return; // to prevent infinite recursion
    shareModalOpen.value = newValue;
    projectStore.setToggleSendModal(false); // resetting it immediately after opening the modal
});

const shareModalOpen = ref(false);
const handleShareModalClose = () => shareModalOpen.value = false
// const handleShareBtnClick = () => shareModalOpen.value = true

const projectInstallModalOpen = ref(false)
// const handleInstallerBtnClick = () => projectInstallModalOpen.value = !projectInstallModalOpen.value
const handleProjectInstallModalClose = () => projectInstallModalOpen.value = false

const isLoading = computed(() => projectStore.getProjectLoadingState);
</script>

<template>
	<!-- temporarily using an icon that has already been imported -->
	<button class="bg-primary btn p-0 text-white rounded-circle message-btn">
		<font-awesome-icon
			class="fs-18px"
			icon="fas fa-pen"
		/>
	</button>
	<div class="col-md-4">
		<div class="project-status">
            <div class="d-none d-md-flex align-items-center gap-2 my-3">
				<Skeletor
				    v-if="isLoading"
				    width="10.25rem"
				    height="2.4375rem"
				/>
				<router-link
					v-else
					class="btn btn-sm btn-lg-large btn-primary py-xl-2"
					style="flex-grow: 2"
					:to="`/proposal/${projectStore.getProjectId}`"
					target="_blank"
				>
					<font-awesome-icon
					    class="d-none d-lg-inline"
					    icon="fas fa-up-right-from-square"
					/>
					<span class="fw-bold ms-2">PROPOSAL</span>
				</router-link>

				<Skeletor
				    v-if="isLoading"
				    width="7.6875rem"
				    height="2.4375rem"
				/>
				<!-- <button -->
				<!-- 	v-else -->
				<!-- 	class="btn btn-sm btn-lg-large btn-secondary py-xl-2" -->
				<!-- 	style="flex-grow: 1" -->
				<!-- 	@click="handleShareBtnClick" -->
				<!-- > -->
				<!-- 	<font-awesome-icon -->
				<!-- 		class="text-secondary" -->
				<!-- 		icon="fas fa-share-nodes" -->
				<!-- 	/> -->
				<!-- 	<span class="fw-bold text-black ms-2 d-none d-lg-inline">SHARE</span> -->
				<!-- </button> -->
				<!---->
				<!-- <Skeletor -->
				<!-- 	v-if="isLoading" -->
				<!-- 	width="4.5rem" -->
				<!-- 	height="2.4375rem" -->
				<!-- /> -->
				<!-- <button -->
				<!-- 	v-else -->
				<!-- 	class="btn btn-secondary btn-sm btn-lg-large py-xl-2" -->
				<!-- 	style="flex-grow: 1" -->
				<!-- 	@click="handleInstallerBtnClick" -->
				<!-- > -->
				<!-- 	<font-awesome-icon -->
				<!-- 		class="text-secondary" -->
				<!-- 		icon="fas fa-clipboard-list" -->
				<!-- 	/> -->
				<!-- </button> -->
			</div>
			<div class="proposal-info-display mt-2 rounded border">
				<div :class="`editor-display position-relative ${isLoading ? 'opacity-0' : ''}`">
                    <!-- temporarily keeping this opacity-0 for a temporary input -->

					<!-- <img -->
					<!-- 	class="w-100" -->
					<!-- 	style="height: 14rem;" -->
					<!-- 	alt="Solar panel image" -->
					<!-- 	src="https://as2.ftcdn.net/v2/jpg/07/91/22/59/1000_F_791225926_MUEPuko0xgjKvWeAHGPdErQHY6X2ZJ1m.jpg" -->
					<!-- /> -->
					<div class="w-100 d-flex border-bottom justify-content-center mb-3 align-items-center" style="height: 14rem;">
					    <span class="text-uppercase lead fw-bold opacity-50">Map Coming soon</span>
					</div>

					<TemporaryPanelInput />
					<!-- <div -->
					<!-- 	class="editor-display-menu d-none d-md-flex text-white position-absolute py-3 px-3 d-flex justify-content-between align-items-center" -->
					<!-- > -->
					<!-- 	<div class="d-flex gap-2 align-items-center"> -->
					<!-- 		<font-awesome-icon icon="fas fa-pen" /> -->
					<!-- 		<span>Edit design</span> -->
					<!-- 	</div> -->
					<!---->
					<!-- 	<div> -->
					<!-- 		<font-awesome-icon -->
					<!-- 			icon="fas fa-ellipsis-vertical" -->
					<!-- 		/> -->
					<!-- 	</div> -->
					<!-- </div> -->
				</div>
				<div :class="`project-stats-wrapper px-3 pt-1 ${isLoading ? 'opacity-0' : ''}`">
					<p class="lead fw-bold d-md-none fs-24px mb-5">
						Beans
					</p>
					<div class="mb-4 mb-md-2">
						<div class="section-heading d-none d-md-block">
							<small class="fw-bold fs-12px"
								>PROJECT STATS</small
							>
						</div>

						<div
							class="info-cell-wrapper justify-content-between row"
						>
							<div class="info-cell mb-4 mb-md-0 col-md-12 col-lg-6">
								<small>System Size (DC)</small>
								<p>{{ projectStore.getSystemSize }} kW</p>
							</div>

							<div class="info-cell mb-4 mb-md-0 col-md-12 col-lg-6">
								<small>Annual production (DC)</small>
								<p>{{ Formatter.toIntlFormat(projectStore.getAnnualProduction) }} kWh</p>
							</div>

							<div class="info-cell mb-4 mb-md-0 col-md-12 col-lg-6">
								<small>Self consumption</small>
								<p>{{projectStore.selfConsumption}}%</p>
							</div>

							<div
								class="info-cell mb-md-0 col-md-12 col-lg-6"
							>
								<small>Annual bill</small>
								<p>$ {{ Formatter.toIntlFormat(projectStore.getAnnualBill) }}</p>
							</div>
						</div>
					</div>

					<div class="mb-4">
						<div
							class="section-heading d-none d-md-flex align-items-center gap-2"
						>
							<small class="fw-bold text-black fs-12px">
							    FINANCIAL FIGURES
							</small>
							<font-awesome-icon
								class="text-secondary"
								icon="fas fa-circle-question"
							/>
						</div>

						<div :class="` info-cell-wrapper justify-content-between row position-relative ${ projectStore.getRecalculationLoadingState ? 'custom-loading-opacity' : '' }` ">
						    <div class="info-cell mb-4 mb-md-0 col-md-12 col-lg-6">
								<small>Discounted payback</small>
								<p>{{projectStore.getDiscountedPayback}} years</p>
							</div>

							<div class="info-cell mb-4 mb-md-0 col-md-12 col-lg-6">
								<small>ROI</small>
								<p>{{ projectStore.getReturnOfInvestment }}%</p>
							</div>

							<div class="info-cell mb-4 mb-md-0 col-md-12 col-lg-6">
								<small>Net present value</small>
								<p>$ {{ Formatter.toIntlFormat(projectStore.getNetPresentValue) }}</p>
							</div>

							<div class="info-cell mb-4 mb-md-0 col-md-12 col-lg-6">
								<small>IRR</small>
								<p>15.19%</p>
							</div>

			                <font-awesome-icon
				                v-if="projectStore.getRecalculationLoadingState"
			                    icon="fas fa-circle-notch"
			                    class="animate-spin position-absolute financial-figures-loader fs-20px"
			                />
						</div>
					</div>
					<div class="pb-2 d-none d-md-block">
						<div class="section-heading mb-1">
							<small class="fw-bold fs-12px">QUOTE</small>
						</div>

						<div class="row">
							<!-- <small class="col-md-6 mb-0 text-secondary">Subtotal incl GST.</small> -->
			                <small class="col-md-6 mb-0 text-secondary" :key="activeTaxSlug">
			                    Subtotal
			                    <template v-if="activeTaxSlug !== 'no-tax'">
			                        {{activeTaxSlug === 'included' ? 'incl.GST' : 'excl.GST'}}
			                    </template>
			                </small>
							<small class="col-md-6 mb-0 text-end">$ {{ Formatter.toIntlFormat(projectStore.getQuotationDetails('total')) }}</small>
						</div>
						<div class="row" v-if="activeTaxSlug !== 'no-tax'">
                            <span class="col-md-6 mb-0 text-secondary">
                                {{ activeTaxSlug === 'included' ? 'Incl.' : 'Excl.' }} GST
                            </span>
							<small class="col-md-6 mb-0 text-end">
							    $ {{ Formatter.toIntlFormat(projectStore.getQuotationDetails('gst')) }}
							</small>
						</div>
						<div class="row" v-if="projectStore.getStcEnabledState">
							<small class="col-md-6 mb-0 text-secondary"
								>STCs x {{ projectStore.getStcCount }}</small
							>
							<small
								class="col-md-6 mb-0 text-success text-end"
								>-$  {{ projectStore.getCalculatedStcDiscount }} </small
							>
						</div>

						<div class="row mt-3">
							<p
								class="col-md-6 text-dark fw-bold fs-5 mb-0"
							>
								Total
							</p>
							<p
								class="col-md-6 text-dark fw-bold fs-5 mb-0 text-end"
							>
								$ {{ Formatter.toIntlFormat(projectStore.getQuotationDetails('totalAmountAfterStcDiscount')) }}
							</p>
						</div>
					</div>

					<div
						class="info-cell-wrapper justify-content-between row d-md-none"
					>
						<div class="info-cell mb-4 mb-md-0 col-md-6">
							<small>Subtotal incl GST.</small>
							<p>${{ Formatter.toIntlFormat(projectStore.getQuotationDetails('total')) }}</p>
						</div>

						<div class="info-cell mb-4 mb-md-0 col-md-6">
							<small>Incl GST.</small>
							<p>${{ Formatter.toIntlFormat(projectStore.getQuotationDetails('gst')) }}</p>
						</div>

						<div class="info-cell mb-4 mb-md-0 col-md-6">
							<small>STCs x {{ projectStore.getQuotationDetails('stcCount') }}</small>
							<p class="text-success">-$ {{ projectStore.getQuotationDetails('calculatedStcDiscount') }}</p>
						</div>

						<div class="info-cell mb-4 mb-md-0 col-md-6">
							<small>Total</small>
							<p>$ {{ Formatter.toIntlFormat(projectStore.getQuotationDetails('totalAmountAfterStcDiscount')) }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<ShareModal
		@close="handleShareModalClose"
		v-if="shareModalOpen"
	/>

	<ProjectInstallModal
		@close="handleProjectInstallModalClose"
		v-if="projectInstallModalOpen"
	/>
</template>

<style lang="scss" scoped>
.editor-display-menu {
	bottom: 0;
	right: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.6);
}

.message-btn {
	$message-btn-dimension: 3.5rem;
	position: fixed;
	z-index: 99;
	width: $message-btn-dimension;
	height: $message-btn-dimension;
	right: 1.5rem;
	bottom: 1.5rem;
	transition: 150ms;

	&:hover {
		transform: scale(1.1125);
		cursor: pointer;
	}
}

.opacity-0 {
    opacity: 0;
}

.project-status {
	/* min-width: 20rem; */
	position: fixed;
	top: 3.45rem;
	right: 0;
	bottom: 0;
	left: 0;
	height: 100vh;

	overflow: {
		x: hidden;
		y: auto;
	}

    @media only screen and (max-width: 768px) { padding: 0; }

    @media only screen and (min-width: 768px) {
		position: static;
		height: auto;

		overflow: {
			x: visible;
			y: visible;
		}
    }
}

.info-cell-wrapper .info-cell {
	small { font-size: 1rem; }

	p {
		font-size: 0.8125rem;
		color: #1f2933;
		opacity: 0.54;
	}

	@media only screen and (min-width: 768px) {
		small { font-size: 0.8125rem; }

		p {
			opacity: 1;
			font-size: 1rem;
		}
	}
}

.financial-figures-loader { top: 50%; }

.custom-loading-opacity > div {
    transition: 100ms;
    pointer-events: none;
    opacity: 20%;
}
</style>

