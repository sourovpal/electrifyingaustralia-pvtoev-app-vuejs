<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {Modal} from 'mdb-ui-kit'
import ModalSidebar from './ModalSidebar.vue';
import ModalBody from './ModalBody.vue';

const confirmationModal = ref(null)
let myModal = null

onMounted(() => {
	myModal = new Modal(confirmationModal.value, {
		keyboard: false,
		backdrop: 'static',
	})
	myModal.show()
})

const handleConfirmBtnClick = () => {
    emit('confirm')
}

const handleCancelBtnClick = () => {
    myModal.hide();
    emit('cancel')
}

onBeforeUnmount(() => {
    myModal.hide();
});

</script>

<template>
	<div class="modal fade" tabindex="-1" ref="confirmationModal">
		<div class="modal-dialog modal-xl modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-body p-0 row g-0" id="modal-body">
				    <ModalSidebar />
				    <ModalBody />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">

.active-tab {
    background-color: #e5f4ff;
    border-left: 3px solid #007ee5;
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

.input-control {
    z-index: 99;
    right: 0;
    top: 0;
    height: 100%;
}

</style>
