<script setup>
import { computed, defineProps, defineEmits } from 'vue'

import ESignatureInput from './ESignatureInput.vue'
import SendProposalInput from './SendProposalInput.vue'
import ShareHistory from './ShareHistory.vue'

const props = defineProps(['activeTab']);
const emit = defineEmits(['close']);

const componentToShow = computed(() => {
    if (props.activeTab === 'send-proposal') return SendProposalInput;
    if (props.activeTab === 'esignature-input') return ESignatureInput;
    if (props.activeTab === 'share-history') return ShareHistory;
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
            class="position-absolute btn btn-light p-0"
            style="right: 0.75rem; top: 0.75rem;"
            data-bs-dismiss="modal"
            aria-label="Close">
			<font-awesome-icon
				class="text-secondary fs-18px"
				icon="fas fa-xmark"
			/>
        </button>

        <component :is="componentToShow" />
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
