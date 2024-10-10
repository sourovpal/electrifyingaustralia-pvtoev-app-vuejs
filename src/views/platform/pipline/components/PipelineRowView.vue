<script setup>
import PipelineStateLeadDetails from './PipelineStateLeadDetails.vue';
const props = defineProps([
    'stages', 
    'components', 
    'loadMoreLeads', 
    'isLoadings',
    'leadLastId',
]);

</script>

<template>
    <section class="pipline__table">
        <div class="px-4 mt-4" v-for="(stage, index) in props?.stages" :key="index">
            <div class="row mb-2">
                <div class="col-6 ps-0">
                    <span 
                        class=" px-3 fw-bold shadow-none py-1 fs-14px" 
                        :class="{'alert-info':(stage.status==0), 
                        'alert-danger':(stage.status==1), 
                        'alert-success':(stage.status==2), }"
                        style="border-radius:3px;"
                    >
                        {{ stage.name }}
                    </span>
                </div>
                <div class="col-6 pe-0">
                    <div class="text-soft d-flex justify-content-end align-items-center">
                        {{ stage?.total_leads }} Deals worth ${{ stage?.total_estimated_value }}
                    </div>
                </div>
            </div>
            <div class="row border">
                <div class="col-4 text-soft fs-14px fw-bold py-2">Deal</div>
                <div class="col-2 text-soft fs-14px fw-bold py-2">Value</div>
                <div class="col-2 text-soft fs-14px fw-bold py-2">Last Update</div>
                <div class="col-2 text-soft fs-14px fw-bold py-2">First Create</div>
                <div class="col-2 text-soft fs-14px fw-bold py-2">Owner</div>
            </div>

            <component 
                v-for="(component, index) in components[stage.id]??[]" 
                :key="index" 
                :is="PipelineStateLeadDetails" 
                :data="component.data" 
                :index="index"
                :isRow="true"
            />
            <div v-if="leadLastId[stage.id]" class="row border border-top-0">
                <div                 
                @click="props.loadMoreLeads(stage.id)"
                class="col-12 text-head fs-15px fw-bold py-2 d-flex flex-column align-items-center justify-content-center alert-secondary cursor-pointer text-primary">
                    {{ isLoadings[stage.id]?'Loading...':'Load More...' }}
                </div>
            </div>
        </div>
        <br><br><br>
    </section>
</template>

<style lang="scss" scoped>
    .pipline__table{
        overflow: auto;
        height:89vh;
    }
</style>