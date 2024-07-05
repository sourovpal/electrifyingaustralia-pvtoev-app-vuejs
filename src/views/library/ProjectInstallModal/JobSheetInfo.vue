<script setup>
import { VueDraggableNext } from 'vue-draggable-next';

</script>

<template>
    <div class="row g-0">
        
        <div class="border col-md-8">
            <div class="section-heading d-flex align-items-baseline justify-content-between pe-4">
                <p class="mb-0 lead fw-bold fs-20px" style="padding: 1.65rem 1.65rem 1rem 1.65rem">Job sheet info</p>
                <span class="mb-0 fw-bold text-primary fs-14px">Reset</span>
            </div>

            <span class="d-block fw-bold fs-14px" style="padding: 0 1.65rem 0.65rem 1.65rem;">Bill of Materials</span>
            <div>
                <!-- table header -->
                <div class="row table-header py-1 border-bottom px-4">
                    <small class="fw-bold col-md-4">Item</small>
                    <small class="fw-bold col-md-2 text-end">Unit quantity</small>
                    <small class="fw-bold col-md-2 text-end">Unit</small>
                    <small class="fw-bold col-md-2 text-end">Multiplier</small>
                    <small class="fw-bold col-md-2 text-end">Total</small>
                </div>

                <div class="materials-table">
                    <!-- table rows -->
                    <vue-draggable-next handle=".handle">
                        <div class="row material-row border-bottom position-relative px-4 py-2" v-for="i in 50">
                            <div class="handle cursor-move position-absolute">
				                <font-awesome-icon
				                class="text-secondary fs-14px"
				                icon="fas fa-grip-vertical"
				                />
                            </div>
                            <!-- table starts from here -->
                            <small class="fw-bold col-md-4">
                                <input type="text" class="item-input" :value="i" />
                            </small>
                            <small class="fw-bold col-md-2 text-end text-secondary">22</small>
                            <p class="col-md-2 mb-0 text-end">Panel</p>
                            <p class="col-md-2 mb-0 text-end">2</p>
                            <small class="fw-bold col-md-2 text-end text-secondary">44</small>
                        </div>
                    </vue-draggable-next>
                </div>
            </div>
        </div>

        <!-- second column -->
        <div class="col-md-4 p-4 position-relative additional-details-wrapper" style="background-color: #f5f7fa;">
            <p class="lead fw-bold fs-20px">Additional details</p>

            <div class="input-form-wrapper">
                <div class="img-input mb-4">
                    <p class="text-muted fs-13px mb-2">Images & PDFs</p>
                    <div class="upload-box">
				        <font-awesome-icon
				        class="text-muted"
				        icon="fas fa-plus"
				        />
                    </div>
                </div>

                <div class="date-input mb-4">
                    <p class="text-muted fs-13px mb-2">Proposed installed date</p>
                    <input class="form-control" type="date" />
                </div>

                <div class="note-input mb-3">
                    <p class="text-muted fs-13px mb-2">Notes</p>
                    <textarea class="form-control border-info" rows="3"></textarea>
                </div>

                <div class="solicited-input mb-3">
                    <p class="text-muted fs-13px mb-2">Unsolicited Customer</p>

                    <div class="btn-group shadow-none me-3 w-100 rounded border" style="padding: 0.125rem;">
                        <button class="btn btn-secondary text-muted">Unsolicited</button>
                        <button class="btn btn-primary">Solicited</button>
                    </div>
                </div>

                <div class="roof-material-input mb-3">
                    <p class="text-muted fs-13px mb-2">Roof material</p>
                    <input class="form-control" type="text" />
                </div>

                <div class="stories-input mb-3">
                    <p class="text-muted fs-13px mb-2">Number of stories</p>
                    <input class="form-control" type="number" />
                </div>

                <div class="solicited-input mb-3">
                    <p class="text-muted fs-13px mb-2">Building classification</p>

                    <div class="btn-group shadow-none me-3 w-100 rounded border" style="padding: 0.125rem;">
                        <button class="btn btn-secondary text-muted">Residential</button>
                        <button class="btn btn-secondary text-muted">Commerical</button>
                    </div>
                </div>

                <div class="stories-input mb-3">
                    <p class="text-muted fs-13px mb-2">Monitoring</p>
                    <input class="form-control" type="text" />
                </div>

                <div class="stories-input mb-3">
                    <p class="text-muted fs-13px mb-2">Racking</p>
                    <input class="form-control" type="text" />
                </div>
                <div class="stories-input mb-3">
                    <p class="text-muted fs-13px mb-2">Power Phases</p>
                    <input class="form-control" type="text" />
                </div>
                <div class="stories-input mb-3">
                    <p class="text-muted fs-13px mb-2">NMI</p>
                    <input class="form-control" type="text" />
                </div>
                <div class="stories-input mb-3">
                    <p class="text-muted fs-13px mb-2">DNSP Pre-approval Number</p>
                    <input class="form-control" type="text" />
                </div>
                <div class="stories-input mb-3">
                    <p class="text-muted fs-13px mb-2">Meter number</p>
                    <input class="form-control" type="text" />
                </div>
                <div class="stories-input mb-3">
                    <p class="text-muted fs-13px mb-2">Energy Retailer</p>
                    <input class="form-control" type="text" />
                </div>
                <div class="stories-input mb-3">
                    <p class="text-muted fs-13px mb-2">Energy Distributor</p>
                    <input class="form-control" type="text" />
                </div>

            </div>

            <div class="job-control-wrapper d-flex align-items-center gap-2 p-4">
                <button class="btn btn-primary rounded fw-bold text-white d-flex align-items-center gap-2">
				    <font-awesome-icon
				        icon="fas fa-up-right-from-square"
				    />
                    <span>JOB SHEET</span>
                </button>

                <button class="btn btn-light rounded">
	                <font-awesome-icon icon="fas fa-share-nodes" />
                </button>

                <button class="btn btn-light rounded">
	                <font-awesome-icon icon="fas fa-trash" />
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table-header { background: rgba(0, 0, 0, 0.05); }

.job-control-wrapper { 
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%);

    // padding: 1rem 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}

.upload-box {
    width: 4.5rem;
    height: 4.5rem;
    display: grid;
    place-items: center;
    background-color: #e4e7eb;
    border: 1px solid #9aa5b1;
    border-radius: 0.15rem;
}

.material-row {
    // border: 1px solid red;
    .handle {
        cursor: move;
        left: 5px;
        bottom: 50%;
        transform: translateY(50%);
        width: 5px;
        opacity: 0;
    }

    .item-input {
        border: none;
        padding: 0.5rem 0.15rem;
    }

    &:hover .handle { opacity: 1; }
}

.input-form-wrapper {
    height: 50rem;
    overflow: scroll;
    padding-bottom: 14rem;
}

.materials-table {
    height: 45rem;
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>
