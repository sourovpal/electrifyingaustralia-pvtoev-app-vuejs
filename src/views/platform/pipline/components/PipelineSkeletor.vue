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
        <div class="pip-header ps-3 pe-2 py-2 d-flex flex-column">
            <h3 class="fs-18px text-head fw-bold mb-0 fw-bold">
                <Skeletor style="width:8rem;height:10px;"/>
            </h3>
            <span class="fs-12px text-head">{{ index+1*200 }} Deals</span>
            <div class="pip-header-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" height="64" viewBox="0 0 8 56" width="8">
                    <path d="M0 0h16v64H0z" fill="none"></path> 
                    <path d="M0,0 1,0 8,28 1,56 0,56 7,28z"></path>
                </svg>
            </div>
        </div>

        <div class="py-1 value-bar">
            <div class="px-3 d-flex justify-content-between align-items-center">
                <span class="text-head fw-bold fs-12px">Value</span>
                <span class="text-head fw-bold fs-12px">$125{{ index }}.00</span>
            </div>
        </div>  
        <div class="pip-body px-2">
            <loading-state-leads :col-size="6" />
        </div>
    </div>
</template>
