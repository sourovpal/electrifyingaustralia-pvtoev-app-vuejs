<script setup>
    import { defineEmits, defineProps, onMounted, ref } from 'vue';
    import { Modal } from 'mdb-ui-kit';

    const emits = defineEmits([]);
    const props = defineProps({
        size: {
            type: String,
            default: 'md',
        }
    });

    const modalRef = ref(null);
    let modalInstance = null

    onMounted(() => {
        modalInstance = new Modal(modalRef.value, {
            // keyboard: false,
            // backdrop: 'static',
        });
    });

    function modalShow() {
        modalInstance.show()
    }

    function modalHide() {
        modalInstance.hide()
    }

    defineExpose({
        modalShow,
        modalHide
    });
</script>

<template>
    <div class="modal fade"
        tabindex="-1"
        ref="modalRef">
        <div :class="`modal-dialog modal-dialog-centered modal-${size}`">
            <div class="modal-content">
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>