<script setup>
    import { Skeletor } from 'vue-skeletor';
</script>

<template>
    <div class="tbl-tr"
        v-for="(_, index) in Array.from(Array(25).keys())"
        :key="index">

        <div style="width:20rem;flex-grow: 1;"
            class="tbl-td">
            <div class="circle-avatar me-2">
                <Skeletor style="width:32px;height:32px;border-radius:50%;" />
            </div>
            <Skeletor width="70%" />
        </div>


        <div style="width:20rem;flex-grow: 1;"
            class="tbl-td">
            <Skeletor width="70%" />
        </div>


        <div style="width:15rem;flex-grow: 1;"
            class="tbl-td">
            <Skeletor width="70%" />
        </div>


        <div style="width:10rem;flex-grow: 1;"
            class="tbl-td">
            <Skeletor width="70%" />
        </div>


        <div style="width:10rem;flex-grow: 1;"
            class="tbl-td">
            <Skeletor width="70%" />
        </div>

    </div>
</template>
