<template>
    <div class="customer-detail-sidebar content py-2 content-y-100vh">
        <p class="sidebar-heading border-bottom fw-bold px-3">Customer details</p>

        <div class="sidebar-content px-3">
            <div>
                <label class="fs-13px">Customer name</label>
                <input type="text" class="form-control" />
            </div>
        </div>
    </div>
</template>

<script setup>
// section.library-menu, section.content.lead-list > section

</script>

<style lang="scss" scoped>
$sidebar-width: 20rem;

.customer-detail-sidebar {
    background-color: #ffffff;
    width: $sidebar-width;
    transition: 200ms;
    border-left: 2px solid rgb(59, 113, 202);

    z-index: 999;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;

    &.hidden { right: -$sidebar-width; }
}

.sidebar-heading {
    padding-bottom: 0.75rem;
}

</style>
