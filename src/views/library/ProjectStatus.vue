<template>
    <div class="col-md-4">
	    <div class="d-flex align-items-center gap-2">
            <button class="btn btn-large btn-primary" style="flex-grow: 2;">
	            <font-awesome-icon icon="fas fa-up-right-from-square" />
	            <span class="fw-bold ms-2">PROPOSAL</span>
	        </button>

	        <button class="btn btn-secondary" style="flex-grow: 1;" @click="handleShareBtnClick">
	            <font-awesome-icon class="text-secondary" icon="fas fa-share-nodes" />
	            <span class="fw-bold text-black ms-2">SHARE</span>
	        </button>

	        <button class="btn btn-secondary" style="flex-grow: 1;">
	            <font-awesome-icon class="text-secondary" icon="fas fa-clipboard-list" />
	        </button>
        </div>
       <div class="proposal-info-display mt-2 rounded border">
            <div class="editor-display position-relative">
                <img 
                class="w-100" style="height: 14rem;" alt="Solar panel image"
                src="https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg" 
            />
                <div class="editor-display-menu text-white position-absolute py-3 px-3 d-flex justify-content-between align-items-center">
                    <div class="d-flex gap-2 align-items-center">
                        <font-awesome-icon
						icon="fas fa-pen"
						/>
					<span>Edit design</span>
                    </div>

				    <div>
				        <font-awesome-icon icon="fas fa-ellipsis-vertical"/>
				    </div>
                </div>
            </div>
            <div class="project-stats-wrapper px-3 pt-1">
                <div class="mb-4">
                    <div class="section-heading">
                        <small class="fw-bold fs-12px">PROJECT STATS</small>
                    </div>

                    <div class="info-cell-wrapper justify-content-between row">
                        <div class="info-cell col-md-6">
                            <small class="fs-12px text-secondary">System Size (DC)</small>
                            <p class="mb-0">12.4 kW</p>
                        </div>

                        <div class="info-cell col-md-6">
                            <small class="fs-12px text-secondary">Annual production (DC)</small>
                            <p class="mb-0">17,800 kWh</p>
                        </div>

                        <div class="info-cell col-md-6">
                            <small class="fs-12px text-secondary">Self consumption</small>
                            <p class="mb-0">80%</p>
                        </div>

                        <div class="info-cell col-md-6">
                            <small class="fs-12px text-secondary">Annual bill</small>
                            <p class="mb-0">$3,555.99</p>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <div class="section-heading d-flex align-items-center gap-2">
                        <small class="fw-bold fs-12px">FINANCIAL FIGURES</small>

                        <font-awesome-icon
						class="text-secondary"
						icon="fas fa-circle-question"
						/>
                    </div>

                    <div class="info-cell-wrapper justify-content-between row">
                        <div class="info-cell col-md-6">
                            <small class="fs-12px text-secondary">Discounted payback</small>
                            <p class="mb-0">7.41 years</p>
                        </div>

                        <div class="info-cell col-md-6">
                            <small class="fs-12px text-secondary">ROI</small>
                            <p class="mb-0">291.1%</p>
                        </div>

                        <div class="info-cell col-md-6">
                            <small class="fs-12px text-secondary">Net present value</small>
                            <p class="mb-0">$81,469.63</p>
                        </div>

                        <div class="info-cell col-md-6">
                            <small class="fs-12px text-secondary">IRR</small>
                            <p class="mb-0">15.19%</p>
                        </div>
                    </div>
                </div>
                <div>
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
            </div>
        </div>
	</div>
    <ShareModal v-if="shareModalOpen" />
</template>

<script setup>
import ShareModal from './ShareModal.vue';
import {ref} from 'vue';

const shareModalOpen = ref(false)

const handleShareBtnClick = () => {
    shareModalOpen.value = true;
}
</script>

<style lang="scss" scoped>

.editor-display-menu {
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
}

</style>
