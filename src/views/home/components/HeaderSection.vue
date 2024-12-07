<script setup>
    import SearchBox from './SearchBox.vue';
</script>

<template>
    <div class="header-section px-4 border-bottom">
        <div class="col-left">
            <SearchBox></SearchBox>
        </div>
        <div class="col-right">
            <div class="">
                <button class="btn btn-sm btn-light d-flex justify-content-between align-items-center">
                    <img src="https://static.getpvtoev.com/images/app/ui/gem.png"
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
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 9;
        background-color: #ffffff;
    }
</style>