<script setup>
    import { Modal } from "mdb-ui-kit";
    import { ref, watch, computed, onMounted,  } from 'vue';
    import { useLeadsStore } from '@stores';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';

    const leadsStore = useLeadsStore();
    const uploadSpreadsheetModalRef = ref(null);
    const emits = defineEmits(['refresh', 'close']);
    const modalInstance = computed(() => leadsStore.getUploadSpreadsheetModal);
    const errors = ref({});
    const isLoading = ref(false);

    function hideModal() {
        modalInstance.value?.hide();
        emits('close', true);
    }

    onMounted(() => {
        leadsStore.setUploadSpreadsheetModal(new Modal(uploadSpreadsheetModalRef.value));
    });
</script>

<template>

    <div class="modal fade"
        ref="uploadSpreadsheetModalRef">
        <div class="modal-dialog modal-dialog-centered modal-lg mx-auto">
            <div class="modal-content">
                <div class="modal-header py-2 border-bottom-0">
                    <div class=""></div>
                    <div>
                        <button class="btn btn-light btn-sm btn-floating"
                            @click="hideModal">
                            <font-awesome-icon icon="fas fa-close" class="fs-14px text-soft"></font-awesome-icon>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="w-100 d-flex justify-content-center align-items-center"
                        style="min-height:400px;">
                        <div class="d-flex flex-column text-center">
                            <span class="fs-16px text-head mb-3 fw-bold">Select a CSV file to import leads.</span>
                            <div class="mb-3">
                                <button class="btn btn-primary"
                                    @click="selectLeadSvgFileHandler()">
                                    <svg class="me-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        fill="currentColor"
                                        width="24">
                                        <path
                                            d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                                    </svg>
                                    Upload File
                                </button>
                            </div>
                            <div>
                                <a class="fs-14px"
                                    href="">Download a sample format file</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>