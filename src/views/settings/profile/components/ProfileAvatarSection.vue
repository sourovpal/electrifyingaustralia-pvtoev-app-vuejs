<script setup>
    import { computed, ref, watch } from 'vue';
    import { Cropper } from 'vue-advanced-cropper';
    import 'vue-advanced-cropper/dist/style.css';
    import { useApiRequest } from '@actions';
    import { useAppStore, useAuthStore } from '@stores';
    import { $toast } from '@config';

    const appStore = useAppStore();
    const authUser = computed(() => appStore.getUser);
    const company = computed(() => appStore.getCompany);

    const emit = defineEmits(['fetchProfile']);

    const errors = ref({});
    const cropperRef = ref(null);
    const profile_avatar = ref(null);
    const inputProfileImage = ref(null);
    const profileImageFile = ref(null);
    const isSubmitProfileImage = ref(false);
    const isSubmitProfileImageRemove = ref(false);
    const toggleConfirmDialog = ref(false);
    const toggleRemoveConfirmModal = ref(false);
    const toggleImageCroperModal = ref(false);

    watch(() => authUser, (val) => {
        profile_avatar.value = authUser.value.profile_avatar;
    }, { immediate: true, deep: true });


    const formSubmitHandler = async () => {
        if (!profileImageFile.value) {
            errors.value['profile_picture'] = ['Please select profile photo.'];
            return;
        }

        const payload = new FormData();
        payload.append('profile_picture', profileImageFile.value);
        isSubmitProfileImage.value = true;

        await useApiRequest({
            url: `/users/upload/profile-pricure`,
            method: 'post',
            payload
        }).then(res => {
            const { success, errors: serverErrors, message } = res;
            if (!success && serverErrors) {
                errors.value = serverErrors;
                return;
            }
            $toast[message.type](message.text);
            inputProfileImage.value = null;
            profileImageFile.value = null;
            appStore.callFetchAppData();
        }).catch(error => {
            $toast.error('Oops, something went wrong');
        }).finally(() => {
            isSubmitProfileImage.value = false;
            isSubmitProfileImageRemove.value = false;
        });
    };

    const removeProfilePictureHandler = async () => {
        $toast.clear();
        errors.value = {};
        isSubmitProfileImageRemove.value = true;
        await useApiRequest({
            url: `/users/remove/profile-pricure`,
            method: 'post',
        }).then(res => {
            const { success, errors: serverErrors, message } = res;
            toggleConfirmDialog.value = false;
            $toast[message.type](message.text);
            if (success) {
                toggleRemoveConfirmModal.value = false;
                appStore.callFetchAppData();
            } else {
                errors.value = serverErrors;
            }
        }).catch(error => {
            $toast.error('Oops, something went wrong');
        }).finally(() => {
            isSubmitProfileImageRemove.value = false;
        });
    };

    const selectProfileImage = async (e) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            if (file) {
                toggleImageCroperModal.value = true;
                inputProfileImage.value = URL.createObjectURL(file);
                e.target.value = '';
            }
        }
    };

    const prifilePhotoCrop = async () => {
        const { coordinates, canvas } = cropperRef.value.getResult();
        profile_avatar.value = canvas.toDataURL();
        toggleImageCroperModal.value = false;
        inputProfileImage.value = null;
        const response = await fetch(canvas.toDataURL());
        const blob = await response.blob();
        profileImageFile.value = new File([blob], 'profile-image.png', { lastModified: Date.now() });
    };

</script>

<template>
    <div class="row">

        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Profile photo</h2>
            </div>
        </div>

        <div class="col-lg-5 col-12">
            <div class="row">
                <div class="col-lg-9 col-8 pe-2">
                    <div class="settings-group-item">
                        <label class="form-label-title"
                            for="">Upload a photo</label>
                        <input @click="delete errors?.profile_picture"
                            @change="selectProfileImage"
                            accept=".jpeg, .png, .jpg, .webp"
                            type="file"
                            class="form-control">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="errors?.profile_picture?.length">{{ errors?.profile_picture[0] }}</span>
                    </div>
                    <div class="d-flex">
                        <loading-button :disabled="!profileImageFile"
                            :isLoading="isSubmitProfileImage"
                            @click="formSubmitHandler()">
                            Save Settings
                        </loading-button>

                        <loading-button class="ms-auto btn-danger"
                            @click="toggleRemoveConfirmModal = true">
                            Remove
                        </loading-button>
                    </div>
                </div>

                <div class="col-lg-3 col-4 text-end mt-4">
                    <div class="text-center">
                        <img class="avatar-thumbnail"
                            :src="profile_avatar"
                            alt="">
                        <div class="d-block text-center text-soft mt-2">Profile Picture</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Confirm Modal -->
    <bootstrap-modal @close="()=>toggleRemoveConfirmModal=false"
        v-if="toggleRemoveConfirmModal"
        size="sm">
        <div class="">
            <div class="text-center">
                <h5 class="text-head fw-bold">Permanently Remove?</h5>
                <p class="text-soft fs-14px">Are you sure you want to remove profile picture?</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <button data-mdb-dismiss="modal"
                    class="btn btn-sm btn-danger">Cancel</button>
                <loading-button class="btn-sm"
                    :isLoading="isSubmitProfileImageRemove"
                    @click="removeProfilePictureHandler">
                    Confirm
                </loading-button>
            </div>
        </div>
    </bootstrap-modal>


    <!-- Profile image cropper -->
    <bootstrap-modal v-if="toggleImageCroperModal"
        @close="()=>toggleImageCroperModal = false">
        <div class="d-flex justify-content-between justify-content-start pb-2">
            <h5 class="modal-title text-soft fs-18px"
                id="exampleModalLabel">Resize Image</h5>
            <button class="btn btn-light btn-sm btn-floating"
                data-mdb-dismiss="modal">
                <font-awesome-icon icon="fas fa-close"
                    class="fs-14px text-soft"></font-awesome-icon>
            </button>
        </div>
        <div class="">
            <cropper class="cropper"
                :src="inputProfileImage"
                ref="cropperRef"
                :stencil-size="{
                        width: 200,
                        height: 200
                    }"
                :stencil-props="{
                        handlers: {},
                        aspectRatio: 1,
                    }"
                image-restriction="stencil"
                :auto-zoom="false"
                :zoom="5" />
            <div class="d-flex justify-content-between align-items-center mt-3">
                <button type="button"
                    class="btn btn-danger btn-sm"
                    data-mdb-dismiss="modal">Close</button>
                <button type="button"
                    class="btn btn-primary btn-sm"
                    @click="prifilePhotoCrop()">Crop</button>
            </div>
        </div>
    </bootstrap-modal>


</template>

<style scoped
    lang="scss">
    .avatar-thumbnail {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: contain;
        padding: 2px;
        border: 1px solid #c8edff;
    }
</style>
