<template>
    <div class="customer-detail-sidebar">
        <p class="display-1">beans</p>
    </div>
</template>

<script setup>


</script>

<style lang="scss" scoped>
$sidebar-width: 20rem;

.customer-detail-sidebar {
    background-color: #bada55;
    width: $sidebar-width;
    transition: 200ms;

    z-index: 999;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;

    &.hidden {
        right: -$sidebar-width;
    }
}

</style>
