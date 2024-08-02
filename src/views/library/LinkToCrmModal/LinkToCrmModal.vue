<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {Modal} from 'mdb-ui-kit'
import TagInput from './TagInput.vue';
import DropdownOwnerList from '../../platform/lead/components/dropdowns/DropdownOwnerList.vue';

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

const handleCloseClick = () => {
    myModal.hide() 
    emit('close');
};

const owners = ref([
	{ id: 3, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 4, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 5, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 6, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 7, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
	{ id: 8, name: 'beans', display_name: null, email: 'fahim@gmail.com', profile_avatar: 'https://ui-avatars.com/api/?background=48D1CC&color=fff&name=beans&bold=true&id=83', is_owner: 1, user_role: null, },
])

</script>

<template>
	<div class="modal fade" tabindex="-1" ref="shareModal">
		<div class="modal-dialog modal-dialog-scrollable modal-xl modal-dialog-centered custom-radius share-modal-dialog">
			<div
			    class="modal-content custom-radius">
				<div class="modal-body p-0 row g-0" id="modal-body">
                    <div class="row g-0">

                        <div class="border col-lg-8 col-6">
                            <div class="section-heading d-flex align-items-baseline justify-content-between pe-4">
                                <div class="d-flex align-items-center gap-2" style="padding: 1.65rem 1.65rem 1rem 1.65rem">
					                <font-awesome-icon
					                    class="text-muted fs-22px"
					                    icon="fas fa-user-plus"
					                />
                                    <p class="mb-0 lead fw-bold fs-20px">New lead</p>
                                </div>
                            </div>

                            <!-- Column content starts here -->
                            <div class="mx-4 mb-3 mt-1">
                                <div class="input-wrapper mb-4">
                                    <label class="pb-1">
                                        <span class="text-black fw-bold fs-14px pe-2">Contact person</span>
                                        <span class="text-muted fs-14px">(required)</span>
                                    </label>
                                    <input class="form-control" type="text" />
                                </div>

                                <div class="input-wrapper mb-4">
                                    <label class="pb-1">
                                        <span class="text-black fw-bold fs-14px pe-2">Address  </span>
                                        <span class="text-muted fs-14px">(optional)</span>
                                    </label>
                                    <input class="form-control form-info" type="text" />
                                </div>

                                <div class="input-wrapper mb-4">
                                    <label class="pb-1">
                                        <span class="text-black fw-bold fs-14px pe-2">Phone or email</span>
                                        <span class="text-muted fs-14px">(optional)</span>
                                    </label>
                                    <input class="form-control form-info" type="text" />
                                </div>

                                <div class="input-wrapper mb-4">
                                    <label class="pb-1">
                                        <span class="text-black fw-bold fs-14px pe-2">Lead source </span>
                                        <span class="text-muted fs-14px">(optional)</span>
                                    </label>
                                    <input placeholder="e.g, Facebook, Referral" class="form-control form-info" type="text" />
                                </div>

                                <div>
                                    <p class="mb-0 text-black fw-bold fs-14px"> Existing leads / deals </p>
                                    <span class="text-secondary fs-14px"> No matching leads or deals found </span>
                                </div>

                                <div style="margin-top: 20rem;" class="calls-to-action d-flex align-items-center justify-content-between">
                                    <button class="btn btn-light">Cancel</button>
                                    <button class="btn btn-primary">Create Lead</button>
                                </div>
                            </div>
                        </div>

                        <!-- second column -->
                        <div class="col-lg-4 col-6 p-4" style="background-color: #f5f7fa;">
                            <div class="section-heading d-flex align-items-baseline justify-content-between">
                                <div class="d-flex align-items-center gap-2">
					                <font-awesome-icon
					                class="text-muted fs-22px"
					                icon="fas fa-user-plus"
					                />
                                    <p class="mb-0 lead fw-bold fs-20px">Details</p>
                                </div>
                            </div>

                            <!-- Column content starts here -->
                            <div class="mb-3 mt-4">
                                <div class="input-wrapper mb-4">
                                    <label class="pb-1">
                                        <span class="text-black fw-bold fs-14px pe-2">Lead title</span>
                                        <span class="text-muted fs-14px">(required)</span>
                                    </label>
                                    <input placeholder="e.g. Nelson's House" class="form-control" type="text" />
                                </div>

                                <div class="input-wrapper mb-4">
                                    <label class="pb-1">
                                        <span class="text-black fw-bold fs-14px pe-2">Lead status</span>
                                        <span class="text-muted fs-14px">(optional)</span>
                                    </label>
                                    <input placeholder="e.g, Facebook, Referral" class="form-control form-info" type="text" />
                                </div>

                                <div class="input-wrapper mb-4">
                                    <label class="pb-1">
                                        <span class="text-black fw-bold fs-14px pe-2">Owner</span>
                                    </label>

                                    <div class="dropdown d-none d-lg-block">
                                        <div class="d-flex cursor-pointer align-items-center gap-2 p-2 rounded"
                                            data-mdb-toggle="dropdown"
                                            aria-expanded="false"
                                        >
				                            <font-awesome-icon icon="fas fa-circle-user"/>
				                            <font-awesome-icon
				                            class="text-secondary"
				                            icon="fas fa-caret-down"
				                            />
				                        </div>
                                        <DropdownOwnerList :owners="owners" />
                                    </div>
                                </div>

                                <div class="input-wrapper mb-4">
                                    <label class="pb-1">
                                        <span class="text-black fw-bold fs-14px pe-2">Tag</span>
                                        <span class="text-muted fs-14px">(optional)</span> 
                                    </label>
                                    <!-- tag input -->
                                    <TagInput />
                                </div>
                            </div>

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
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss"></style>
