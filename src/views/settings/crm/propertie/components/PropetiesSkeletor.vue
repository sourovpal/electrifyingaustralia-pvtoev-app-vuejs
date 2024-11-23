<script setup>
    import { Skeletor } from 'vue-skeletor';
</script>

<template>
    <div class="tbl-tr full-width"
        v-for="(_, index) in Array.from(Array(25).keys())"
        :key="index">

        <div style="width:4rem;margin-left: -7px;"
            class="tbl-td">

            <label class="custom-form-checkbox btn btn-floating btn-light">
                <Skeletor style="width:20px;height:20px;border-radius:3px;" />
            </label>

        </div>

        <div style="width:15rem;"
            class="tbl-td">
            <Skeletor width="70%" />
        </div>

        <div style="width:15rem;"
            class="tbl-td">
            <Skeletor width="70%" />
        </div>

        <div style="width:10rem;flex-grow: 1;"
            class="tbl-td">
            <Skeletor width="70%" />
        </div>

        <div style="width:10rem;flex-grow: 1;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>

        <div style="width:15rem;flex-grow: 1;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>

        <div style="width:10rem;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>

        <div style="width:10rem;"
            class="tbl-td d-none d-lg-flex">
            <Skeletor width="70%" />
        </div>
    </div>
</template>