<script setup>
import {onMounted, ref} from 'vue'
import {Modal} from 'mdb-ui-kit'

const props = defineProps({
	icon: {type: String, default: 'fa-solid fa-xmark'},
	heading: {type: String, default: 'Are you sure?'},
	subtext: {type: String, default: 'This action is permanent'},
	hideNoBtn: {type: String, default: false},
	confirmBtnClass: {type: String, default: 'danger'},
	cancelBtnClass: {type: String, default: 'secondary'},
	confirmationBtnText: {type: String, default: 'Yes'},
	cancelBtnText: {type: String, default: 'No'},
})

const confirmationModal = ref(null)
let myModal = null

onMounted(() => {
	myModal = new Modal(confirmationModal.value, {
		keyboard: false,
	})
	myModal.show()
})
</script>

<template>
	<button @click="handleOpenModalClick">Open</button>
	<div class="modal fade" tabindex="-1" ref="confirmationModal">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-body text-center py-5">
					<font-awesome-icon
						class="text-danger"
						font-size="7rem"
						:icon="icon"
					/>
					<p class="lead fw-bold mt-4">{{ heading }}</p>
					<p>{{ subtext }}</p>

					<div class="d-flex justify-content-center gap-4 mt-4">
						<button class="btn btn-secondary">
							{{ cancelBtnText }}
						</button>
						<button class="btn btn-danger">
							{{ confirmationBtnText }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
