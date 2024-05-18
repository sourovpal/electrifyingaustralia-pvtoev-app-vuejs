<script>
    import LoadingStateLeads from './LoadingStateLeads.vue';
    import { Skeletor } from 'vue-skeletor';
    export default {
        components:{
            LoadingStateLeads,
            Skeletor
        }
    }
</script>

<template>
    <div class="piplien-state" v-for="(_, index) in 8" :key="index">
        <div class="pip-header px-3 py-2 d-flex flex-column">
            <h3 class="fs-18px text-head fw-bold mb-1">
                <Skeletor style="width:8rem;height:10px;"/>
            </h3>
            <span class="fs-12px text-head">0 Deals</span>
        </div>
        <div class="py-1 value-bar">
            <div class="px-3 d-flex justify-content-between align-items-center">
                <span class="text-head fw-bold fs-12px">Value</span>
                <span class="text-head fw-bold fs-12px">$0.00</span>
            </div>
        </div>  
        <div class="pip-body px-2">
            <loading-state-leads :show="true" :size="6" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.value-bar{
    background-color: #e5f4ff;
    border-bottom: 1px solid #80c6ff;
    border-top: 1px solid #80c6ff;
}
.piplien-body{
    background-color: #f5f7fa;
}
.pipline-scrollbar{
    display: flex;
    flex-direction: row;
    height: 100%;
}
.piplien-state{
    width:272px;
    max-width:300px;
    &:last-child{
        .pip-header{
            padding-right:20px;
            &::before,
            &::after{
                display: none;
            }
        }
    }
}
.pip-header{
    background-color: #ffffff;
    position: relative;
    &::before{
        content: "";
        position: absolute;
        top:-1px;
        right: 0;
        width: 1px;
        height: 53%;
        background-color: #dddddd;
        transform: rotate(-15deg);
        z-index: 1;
    }
    &::after{
        content: "";
        position: absolute;
        bottom:-1px;
        right: 0;
        width: 1px;
        height:53%;
        background-color: #dddddd;
        transform: rotate(15deg);
        z-index: 1;
    }
}
</style>