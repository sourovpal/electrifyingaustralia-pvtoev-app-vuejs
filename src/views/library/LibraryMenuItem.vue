<template>
    <div :class="`${'active-border'} library-menu-item px-4 border-bottom d-flex flex-column justify-content-between position-relative`">
        <p class="mb-0">1 Scallop Street , Huskisson</p>
        <small class="text-secondary mb-0 d-block">75.68kW TW</small>
        <small class="text-secondary fs-12px">
            Created at Jul 1, 2024
        </small>
        <div class="position-absolute item-control-wrapper">
            <div class="item-control sold-btn">
                <font-awesome-icon
			        class="text-secondary"
			        icon="fas fa-check"
				/>
            </div>

            <div class="item-control archive-btn">
                <font-awesome-icon
			        class="text-secondary"
			        icon="fas fa-box-archive"
				/>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
$item-control-wrapper-width: 2.15rem;

.active-border { border-left: 2px solid #007ee5; }
.bottom-border { border-bottom: 1px solid #999 !important; }

.item-control-wrapper {
    height: 100%;
    right: -$item-control-wrapper-width;
    transition: 250ms;

    .item-control {
        height: 50%;
        width: $item-control-wrapper-width;
        display: grid;
        place-items: center;
        cursor: pointer;
        background-color: #f1f1f1;

        &.sold-btn:hover, &.archive-btn:hover {
            svg { color: #ffffff !important; }
        }

        &.sold-btn:hover { background-color: #14a44d; }
        &.archive-btn:hover { background-color: #dc4c64; }
    }
}

.library-menu-item:hover .item-control-wrapper {
    right: 0;
}
</style> 
