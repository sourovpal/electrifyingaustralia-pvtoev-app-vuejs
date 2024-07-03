<script setup>
import { ref, computed } from 'vue'

import ESignatureInput from './ESignatureInput.vue'
import SendProposalInput from './SendProposalInput.vue'
import ShareHistory from './ShareHistory.vue'

const props = defineProps(['activeTab']);
const emit = defineEmits(['close']);

const componentToShow = computed(() => {
    if (props.activeTab === 'send-proposal') return SendProposalInput;
    if (props.activeTab === 'esignature-input') return ESignatureInput;
    return '';
});

const handleCloseClick = () => {
    emit('close');
}

</script>

<template>
	<div class="content-wrapper py-4 px-3 h-100 position-relative col-md-9">
        <button
            @click="handleCloseClick"
            type="button"
            class="btn-close position-absolute"
            style="right: 0.5rem; top: 0.5rem;"
            data-bs-dismiss="modal"
            aria-label="Close">
        </button>

        <!-- <component :is="componentToShow" /> -->
        <ShareHistory />
	</div>
</template>

<style lang="scss">
.recipient {
    background: #ffffff;
    padding: 0.25rem 0.55rem;
    border-radius: 2rem;
}

.ql-container {
    border: none !important;
}

.ql-toolbar {
    border: none !important;
}

.ql-editor {
    height: 30rem !important;
    border: none !important;
}

</style>
