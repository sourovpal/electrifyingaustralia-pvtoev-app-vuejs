<script setup>
    import { Skeletor } from 'vue-skeletor';
</script>


<template>

    <div v-for="(item, index) in 5" :key="index" class="list-group-item px-0 py-0 border-0">

        <div class="item px-2 d-flex justify-content-between align-items-center">
            <div class="left w-75 d-flex justify-content-start align-items-center">
                <Skeletor class="icon"></Skeletor>
                <Skeletor class="input ms-3"></Skeletor>
            </div>
            <div class="right w-25">
                <Skeletor class="icon ms-auto"></Skeletor>
            </div>

        </div>

    </div>

</template>

<style scoped
    lang="scss">
    .item {
        height: 2.7rem;
        width: 100%;
        border: 1px solid rgb(99 99 99 / 25%);
        border-radius: 3px;
        border-bottom: none;

        .left {
            .icon {
                width: 1rem;
                height: 1rem;
            }

            .input {
                height: 1rem;
                width: 30%;
            }
        }

        .right {
            text-align: right;
            .icon {
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>