<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {Modal} from 'mdb-ui-kit'

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

const handleModalClose = () => {
    myModal.hide() 
    emit('close');
};

</script>

<template>
	<div class="modal fade" tabindex="-1" ref="shareModal">
		<div class="modal-dialog modal-xl modal-dialog-centered custom-radius share-modal-dialog">
			<div
			    class="modal-content custom-radius">
				<div class="modal-body p-0 row g-0" id="modal-body">
                    <div class="row g-0">

                        <div class="border col-md-8">
                            <div class="section-heading d-flex align-items-baseline justify-content-between pe-4">
                                <div class="d-flex align-items-center gap-2" style="padding: 1.65rem 1.65rem 1rem 1.65rem">
					                <font-awesome-icon
					                    class="text-muted fs-22px"
					                    icon="fas fa-user"
					                />
                                    <p class="mb-0 lead fw-bold fs-20px">New lead</p>
                                </div>
                            </div>
                        </div>

                        <!-- second column -->
                        <div class="col-md-4 p-4 position-relative additional-details-wrapper" style="background-color: #f5f7fa;">
                            <button
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

                            <p class="lead fw-bold fs-20px">Details</p>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss"></style>
