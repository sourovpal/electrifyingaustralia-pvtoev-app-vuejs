<script setup>
import ShareModal from './ShareModal/ShareModal.vue';
import ProjectInstallModal from './ProjectInstallModal/ProjectInstallModal.vue';
import {ref, onMounted} from 'vue';
import { Skeletor } from 'vue-skeletor';

const shareModalOpen = ref(false)

const handleShareBtnClick = () => {
    shareModalOpen.value = true;
}

const handleShareModalClose = () => {
    shareModalOpen.value = false;
}



const projectInstallModalOpen = ref(false)

const handleInstallerBtnClick = () => {
    projectInstallModalOpen.value = !projectInstallModalOpen.value;
}

const handleProjectInstallModalClose = () => {
    projectInstallModalOpen.value = false;
}

onMounted(() => {
    simulateApiCall();
});
const isLoading = ref(false);

const simulateApiCall = () => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
}

</script>

<template>
    <div class="col-md-4 project-status">
	    <div class="d-none d-md-flex align-items-center gap-2">
            <Skeletor v-if="isLoading" width="10.25rem" height="2.4375rem"/>
            <button v-else class="btn btn-large btn-primary" style="flex-grow: 2;">
	            <font-awesome-icon icon="fas fa-up-right-from-square" />
	            <span class="fw-bold ms-2">PROPOSAL</span>
	        </button>

            <Skeletor v-if="isLoading" width="7.6875rem" height="2.4375rem" />
	        <button v-else class="btn btn-secondary" style="flex-grow: 1;" @click="handleShareBtnClick">
	            <font-awesome-icon class="text-secondary" icon="fas fa-share-nodes" />
	            <span class="fw-bold text-black ms-2">SHARE</span>
	        </button>

            <Skeletor v-if="isLoading" width="4.5rem" height="2.4375rem" />
	        <button v-else class="btn btn-secondary" style="flex-grow: 1;" @click="handleInstallerBtnClick">
	            <font-awesome-icon class="text-secondary" icon="fas fa-clipboard-list" />
	        </button>
        </div>
       <div class="proposal-info-display mt-2 rounded border">
            <div class="editor-display position-relative">
                <img 
                class="w-100" style="height: 14rem;" alt="Solar panel image"
                src="https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg" 
            />
                <div class="editor-display-menu d-none d-md-block text-white position-absolute py-3 px-3 d-flex justify-content-between align-items-center">
                    <div class="d-flex gap-2 align-items-center">
                        <font-awesome-icon icon="fas fa-pen" />
					    <span>Edit design</span>
                    </div>

				    <div>
				        <font-awesome-icon icon="fas fa-ellipsis-vertical"/>
				    </div>
                </div>
            </div>
            <div class="project-stats-wrapper px-3 pt-1">
                <p class="lead fw-bold fs-24px mb-5">Beans</p>
                <div class="mb-4">
                    <div class="section-heading d-none d-md-block">
                        <small class="fw-bold fs-12px">PROJECT STATS</small> </div>

                    <div class="info-cell-wrapper justify-content-between row">
                        <div class="info-cell mb-4 mb-md-0 col-md-6">
                            <small class="fs-16px fs-md-12px text-md-secondary">System Size (DC)</small>
                            <p class="mb-0 fs-13px fs-md-16px text-secondary">12.4 kW</p>
                        </div>

                        <div class="info-cell mb-4 mb-md-0 col-md-6">
                            <small class="fs-16px fs-md-12px text-md-secondary">Annual production (DC)</small>
                            <p class="mb-0 fs-13px fs-md-16px text-secondary">17,800 kWh</p>
                        </div>

                        <div class="info-cell mb-4 mb-md-0 col-md-6">
                            <small class="fs-16px fs-md-12px text-md-secondary">Self consumption</small>
                            <p class="mb-0 fs-13px fs-md-16px text-secondary">80%</p>
                        </div>

                        <div class="info-cell mb-md-4 mb-md-0 col-md-6">
                            <small class="fs-16px fs-md-12px text-md-secondary">Annual bill</small>
                            <p class="mb-0 fs-13px fs-md-16px text-secondary">$3,555.99</p>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <div class="section-heading d-none d-md-flex align-items-center gap-2">
                        <small class="fw-bold fs-12px">FINANCIAL FIGURES</small>

                        <font-awesome-icon
						class="text-secondary"
						icon="fas fa-circle-question"
						/>
                    </div>

                    <div class="info-cell-wrapper justify-content-between row">
                        <div class="info-cell mb-4 mb-md-0 col-md-6">
                            <small class="fs-16px fs-md-12px text-md-secondary">Discounted payback</small>
                            <p class="mb-0 fs-13px fs-md-16px text-secondary">7.41 years</p>
                        </div>

                        <div class="info-cell mb-4 mb-md-0 col-md-6">
                            <small class="fs-16px fs-md-12px text-md-secondary">ROI</small>
                            <p class="mb-0 fs-13px fs-md-16px text-secondary">291.1%</p>
                        </div>

                        <div class="info-cell mb-4 mb-md-0 col-md-6">
                            <small class="fs-16px fs-md-12px text-md-secondary">Net present value</small>
                            <p class="mb-0 fs-13px fs-md-16px text-secondary">$81,469.63</p>
                        </div>

                        <div class="info-cell mb-4 mb-md-0 col-md-6">
                            <small class="fs-16px fs-md-12px text-md-secondary">IRR</small>
                            <p class="mb-0 fs-13px fs-md-16px text-secondary">15.19%</p>
                        </div>
                    </div>
                </div>
                <div class="pb-2 d-none d-md-block">
                    <div class="section-heading mb-1">
                        <small class="fw-bold fs-12px">QUOTE</small>
                    </div>

                    <div class="row">
                        <small class="col-md-6 mb-0 text-secondary">Subtotal incl GST.</small>
                        <small class="col-md-6 mb-0 text-end">$32,452.50</small>
                    </div>
                    <div class="row">
                        <small class="col-md-6 mb-0 text-secondary">Incl GST.</small>
                        <small class="col-md-6 mb-0 text-end">$2950.23</small>
                    </div>
                    <div class="row">
                        <small class="col-md-6 mb-0 text-secondary">STCs x 119</small>
                        <small class="col-md-6 mb-0 text-success text-end">-$4462.50</small>
                    </div>

                    <div class="row mt-3">
                        <p class="col-md-6 text-dark fw-bold fs-5 mb-0">Total</p>
                        <p class="col-md-6 text-dark fw-bold fs-5 mb-0 text-end">$27,990.00</p>
                    </div>
                </div>

                <div class="info-cell-wrapper justify-content-between row d-md-none">
                    <div class="info-cell mb-4 mb-md-0 col-md-6">
                        <small class="fs-16px fs-md-12px text-md-secondary">Subtotal incl GST.</small>
                        <p class="mb-0 fs-13px fs-md-16px text-secondary">$32,452.50</p>
                    </div>

                    <div class="info-cell mb-4 mb-md-0 col-md-6">
                        <small class="fs-16px fs-md-12px text-md-secondary">Incl GST.</small>
                        <p class="mb-0 fs-13px fs-md-16px text-secondary">$2950.23</p>
                    </div>

                    <div class="info-cell mb-4 mb-md-0 col-md-6">
                        <small class="fs-16px fs-md-12px text-md-secondary">STCs x 119</small>
                        <p class="mb-0 fs-13px fs-md-16px text-secondary">-$4462.50</p>
                    </div>

                    <div class="info-cell mb-4 mb-md-0 col-md-6">
                        <small class="fs-16px fs-md-12px text-md-secondary">Total</small>
                        <p class="mb-0 fs-13px fs-md-16px text-secondary">$27,990.00</p>
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

.project-status { 
    position: fixed; 
    top: 3.45rem;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    height: 100vh;

    overflow: {
        x: hidden;
        y: auto;
    }
}


@media only screen and (min-width: 768px) {
    .project-status {
        position: static; 
        height: auto;

        overflow: {
            x: visible;
            y: visible;
        }
    }
}

</style>
