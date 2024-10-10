<script>
    export default{
        name:'RightActionBar',
    }
</script>

<template>
    <div class="right-bar d-flex">
        <slot></slot>
    </div>
</template>
<style lang="scss">
.import-dropdown .dropdown-menu{
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    padding: 6px 0px;
    border-radius: 3px;
    &::after{
        content: "";
        position: absolute;
        top: -6px;
        right: 20px;
        border: 7px solid white;
        transform: rotate(45deg);
        border-bottom-color: transparent;
        border-right-color: transparent;
    }
    .dropdown-item{
        border-radius: 0px !important;
    }
}
</style>