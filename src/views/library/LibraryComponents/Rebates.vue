<template>
    <div class="overflow-x-hidden">
        <!-- table header -->
        <div class="row px-4 py-2 table-header border-bottom">
            <small class="fw-bold col-md-8">Description</small>
            <small class="fw-bold col-md-2 text-end">Amount</small>
            <div class="fw-bold col-md-2 text-end d-flex gap-2 align-items-center justify-content-center">
                <small>Rebate</small>
                <font-awesome-icon
				    class="text-secondary fs-14px"
				    icon="fas fa-circle-question"
				/>
            </div>
        </div>

        <div class="table-row row px-4 py-2">
            <small class="col-md-8 text-secondary">Add another item...</small>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.table-header {
    background: rgba(0, 0, 0, 0.05);
}
</style>
