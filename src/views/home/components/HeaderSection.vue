<script setup>

</script>

<template>
    <div class="header-section px-3">
        <div class="col-left"></div>
        <div class="col-right">
            <div class="">
                <button class="btn btn-sm btn-light d-flex justify-content-between align-items-center">
                    <img src="https://static.getpylon.com/images/app/ui/gem.png"
                        alt=""
                        height="18px"
                        class="me-1">
                    <span class="fs-16px fw-bold me-1 text-soft">Credits:&nbsp;</span>
                    <div class="fs-16px fw-bold text-head">33</div>
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss"
    scoped>
    .header-section {
        margin-left: var(--main-left-navbar-width);
        height: 3.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>