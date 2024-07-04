<template>
    <div class="row g-0">
        
        <div class="border col-md-8 " style="padding: 1.65rem 0 1.65rem 1.65rem;">
            <div class="section-heading d-flex align-items-baseline justify-content-between pe-5">
                <p class="mb-0 lead fw-bold fs-20px">Job sheet info</p>
                <span class="mb-0 fw-bold text-primary fs-14px">Reset</span>
            </div>

            <div class="table overflow-x-hidden pe-5">
                <!-- table header -->
                <div class="row table-header py-1 border-bottom">
                    <small class="fw-bold col-md-5">Item</small>
                    <small class="fw-bold col-md-1 text-end">Quantity</small>
                    <small class="fw-bold col-md-2 text-end">Unit</small>
                    <small class="fw-bold col-md-2 text-end">Multiplier</small>
                    <small class="fw-bold col-md-2 text-end">Total</small>
                </div>

                <!-- table rows -->
                <div class="row border-bottom py-3">
                    <small class="fw-bold col-md-5">Lorem ipsum dolor sit amet, qui </small>
                    <small class="fw-bold col-md-1 text-end">09</small>
                    <small class="fw-bold col-md-2 text-end">09</small>
                    <small class="fw-bold col-md-2 text-end">09</small>
                    <small class="fw-bold col-md-2 text-end">$32,452.50</small>
                </div>
            </div>
        </div>
        <div class="border col-md-4 p-4" style="background-color: #f5f7fa;">
            <p class="lead fw-bold fs-20px">Additional details</p>

            <div class="img-input">
                <p class="text-muted fs-13px mb-2">Images & PDFs</p>
                <div class="upload-box">
				    <font-awesome-icon
				        class="text-muted"
				        icon="fas fa-plus"
				    />
                </div>
            </div>

            <div class="date-input">
                <p class="text-muted fs-13px mb-2">Images & PDFs</p>
                <div>
				    <font-awesome-icon
				        class="text-secondary"
				        icon="fas fa-caret-down"
				    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.table-header {
    background: rgba(0, 0, 0, 0.05);
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
</style>
