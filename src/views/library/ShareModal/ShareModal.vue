<script setup>
import {onBeforeUnmount, onMounted, ref, } from 'vue'
import {Modal} from 'mdb-ui-kit'
import ModalSidebar from './ModalSidebar.vue';
import ModalBody from './ModalBody.vue';

const emit = defineEmits(['close']);
const shareModal = ref(null)
let myModal = null

onMounted(() => {
	myModal = new Modal(shareModal.value, {
		keyboard: false,
		backdrop: 'static',
	})
	myModal.show()
})

onBeforeUnmount(() => {
    myModal.hide();
});

const activeTab = ref('');
const handleModalClose = () => {
    myModal.hide() 
    emit('close');
};
const handleTabClick = (tabName) => {
    activeTab.value = tabName;
}

</script>

<template>
	<div class="modal fade" tabindex="-1" ref="shareModal">
		<div class="modal-dialog modal-xl modal-dialog-centered custom-radius share-modal-dialog">
			<div class="modal-content custom-radius">
				<div class="modal-body p-0 row g-0" id="modal-body">
				    <ModalSidebar @tab-click="handleTabClick" />
				    <ModalBody @close="handleModalClose" :activeTab="activeTab" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.custom-radius {
    border-radius: 1rem !important;
    overflow: hidden;
}

.link-input {
    input {
        font-size: 0.825rem;
        padding: 0;
        background-color: #ffffff;
        border: none;
        padding: .75rem 5rem .75rem .75rem;
    } 
}

.share-modal-dialog {
    border-radius: 0.75rem;
    overflow: hidden !important;
}

.input-control {
    z-index: 99;
    right: 0;
    top: 0;
    height: 100%;
}

</style>
