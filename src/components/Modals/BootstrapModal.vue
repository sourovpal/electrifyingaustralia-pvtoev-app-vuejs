<script setup>
import { ref, onMounted, useAttrs, onUnmounted } from "vue";
import { Modal } from "mdb-ui-kit";

const props = defineProps({
  position: { type: String, default: "centered" },
  size: { type: String, default: "md" },
  modalStyle: { type: Object, default: {} },
  dialogStyle: { type: Object, default: {} },
  contentStyle: { type: Object, default: {} },
  bodyStyle: { type: Object, default: {} },
  backdrop: { type: Boolean, default: false },
});

const modalRef = ref(null);
const modalInstance = ref(null);
const attrs = useAttrs();
const emits = defineEmits(["close"]);

function show() {
  modalInstance.value.show();
}

function hide() {
  modalInstance.value.hide();
}

onMounted(() => {
  modalInstance.value = new Modal(modalRef.value, {
    keyboard: true,
    ["backdrop"]: props.backdrop ? "static" : "normal",
  });
  modalInstance.value.show();
  if (modalRef.value) {
    modalRef.value.addEventListener("hide.bs.modal", () =>
      emits("close", true)
    );
  }
});

onUnmounted(() => {
  modalInstance.value.hide();
});

defineExpose({
  show,
  hide,
  modal: modalInstance,
});
</script>

<template>
  <div class="modal fade" ref="modalRef" :style="modalStyle">
    <div
      :class="`modal-dialog modal-dialog-${position} modal-${size}`"
      :style="dialogStyle"
    >
      <div class="modal-content" :style="contentStyle">
        <slot name="header"></slot>
        <div class="modal-body" :style="bodyStyle">
          <slot name="body"></slot>
          <slot default></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>