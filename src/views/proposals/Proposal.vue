<template>
    <div class="content content-y-100vh">
        <div class="proposal-display mt-3">
            <Menu @print="makePdf" />
            <div ref="content" class="pages-wrapper d-flex flex-column">
                <Cover :class="separatePages ? 'mb-5 shadow' : ''" />
                <ProductionDetails  :page-number="1" :class="separatePages ? 'mb-5 shadow' : ''" />
                <FinancialSummary   :page-number="2" :class="separatePages ? 'mb-5 shadow' : ''" />
                <Quote              :page-number="3" :class="separatePages ? 'mb-5 shadow' : ''" />
                <AssumedValues      :page-number="4" :class="separatePages ? 'mb-5 shadow' : ''" />
                <Warranty           :page-number="5" :class="separatePages ? 'mb-5 shadow' : ''" />
                <TermsAndConditions :page-number="6" :class="separatePages ? 'mb-5 shadow' : ''" />
            </div>
        </div>
    </div>
</template>

<script setup>
import html2pdf from 'html2pdf.js';
import { nextTick, onMounted, ref } from 'vue';
import Quote from './pages/Quote.vue';
import FinancialSummary from './pages/FinancialSummary.vue';
import Cover from './pages/Cover.vue';
import Warranty from './pages/Warranty.vue';
import AssumedValues from './pages/AssumedValues.vue';
import TermsAndConditions from './pages/TermsAndConditions.vue';
import ProductionDetails from './pages/ProductionDetails.vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '../../stores/project';
import Menu from './Menu.vue';

const content = ref(null);
const separatePages = ref(true);
const worker = html2pdf();

const makePdf = () => {
    separatePages.value = false;
    html2pdf(content.value);

    // still in progress but it is promising
    // worker
    //   .from(content.value)
    //   .outputPdf()
    //   .then(console.log)
    
    nextTick(() => separatePages.value = true);
}

const route = useRoute();
const project_id = route.params?.project_id;
const projectStore = useProjectStore();

const fetchProjectDetails = () => {
    if (!project_id) return;

    projectStore.setProjectSelectables(project_id);
    projectStore.setCurrentProject(project_id);
}

onMounted(fetchProjectDetails);

</script>

<style lang="scss">
.pages-wrapper {
    margin-left: 25rem;
}
</style>
