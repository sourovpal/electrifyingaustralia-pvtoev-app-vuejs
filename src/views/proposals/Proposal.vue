<template>
    <div class="content content-y-100vh">
        <div class="proposal-display mt-3 d-flex justify-content-center gap-4">
            <div ref="content" class="pages-wrapper d-flex flex-column align-items-center">
                <Cover :class="separatePages ? 'mb-5' : ''" />
                <ProductionDetails  :page-number="1" :class="separatePages ? 'mb-5' : ''" />
                <FinancialSummary   :page-number="2" :class="separatePages ? 'mb-5' : ''" />
                <Quote              :page-number="3" :class="separatePages ? 'mb-5' : ''" />
                <AssumedValues      :page-number="4" :class="separatePages ? 'mb-5' : ''" />
                <Warranty           :page-number="5" :class="separatePages ? 'mb-5' : ''" />
                <TermsAndConditions :page-number="6" :class="separatePages ? 'mb-5' : ''" />
            </div>

            <Menu @print="makePdf" />
        </div>
    </div>
</template>

<script setup>
import html2pdf from 'html2pdf.js';
import { onMounted, ref } from 'vue';
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
    
    separatePages.value = true;
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

<style lang="scss"></style>
