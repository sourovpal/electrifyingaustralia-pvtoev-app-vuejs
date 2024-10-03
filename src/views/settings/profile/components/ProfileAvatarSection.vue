<script>
    import { ref } from 'vue';
    import { Modal } from "mdb-ui-kit";
    import { Cropper } from 'vue-advanced-cropper'
    import 'vue-advanced-cropper/dist/style.css';
    import { UploadProfilePicture, RemoveProfilePicture } from '../../../../actions/UserAction';
    import CustomModal from '../../../../components/modals/CustomModal.vue';


    export default {
        setup(props) {
            const removeProfileImageConfirmModal = ref(null);
            const prifileImageCroperModel = ref(null);
            return { removeProfileImageConfirmModal, prifileImageCroperModel };
        },
        emits: ['fetchProfile'],
        props: {
            profileData: Object,
        },
        components: {
            Cropper,
            CustomModal,
        },
        data() {
            return {
                errors: {},
                profile_avatar: null,
                inputProfileImage: null,
                profileImageFile: null,
                isSubmitProfileImage: false,
                isSubmitProfileImageRemove: false,
                toggleConfirmDialog: false,
            }
        },
        watch: {
            "profileData"(val) {
                this.profile_avatar = val.profile_avatar;
            }
        },
        methods: {
            async formSubmitHandler(payload = null) {
                if (!this.profileImageFile) {
                    this.errors['profile_picture'] = ['Please select profile photo.'];
                    return;
                }
                var formData = new FormData();
                formData.append('profile_picture', this.profileImageFile);
                this.isSubmitProfileImage = true;
                try {
                    const res = await UploadProfilePicture(formData);
                    const { success, errors, message } = res;
                    this.$toast[message.type](message.text);
                    if (success) {
                        this.inputProfileImage = null;
                        this.profileImageFile = null;
                        this.toggleConfirmDialog = null;
                        this.$emit('fetch-profile');
                    } else {
                        this.errors = errors;
                    }
                } catch (error) {
                    this.$toast.error('Oops, something went wrong');
                } finally {
                    this.isSubmitProfileImage = false;
                    this.isSubmitProfileImageRemove = false;
                }
            },
            async removeProfilePictureHandler() {
                try {
                    this.$toast.clear();
                    this.errors = {};
                    this.isSubmitProfileImageRemove = true;
                    const res = await RemoveProfilePicture();
                    const { success, errors, message } = res;
                    this.$toast[message.type](message.text);
                    this.toggleConfirmDialog = false;
                    if (success) {
                        this.removeProfilePictureHandler.modalHide();
                        this.$emit('fetch-profile');
                    } else {
                        this.errors = errors;
                    }
                } catch (error) {
                    this.$toast.error('Oops, something went wrong');
                } finally {
                    this.isSubmitProfileImageRemove = false;
                }
            },
            async selectProfileImage(e) {
                if (e.target.files && e.target.files.length) {
                    var file = e.target.files[0];
                    if (file) {
                        this.prifileImageCroperModel.modalShow();
                        this.inputProfileImage = URL.createObjectURL(file);
                        e.target.value = '';
                    } else {
                    }
                }
            },
            async prifilePhotoCrop() {
                const { coordinates, canvas, } = this.$refs.cropper.getResult();
                this.coordinates = coordinates;
                this.profile_avatar = canvas.toDataURL();
                this.prifileImageCroperModel.modalHide();
                this.inputProfileImage = null;
                const response = await fetch(canvas.toDataURL());
                const blob = await response.blob();
                this.profileImageFile = await new File([blob], 'profile-image.png', { lastModified: Date.now() });
            }
        },
    }
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
                            @click="removeProfileImageConfirmModal.modalShow()">
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
    <custom-modal ref="removeProfileImageConfirmModal"
        size="sm">
        <div class="">
            <div class="text-center">
                <h5 class="text-head fw-bold">Permanently Remove?</h5>
                <p class="text-soft fs-14px">Are you sure you want to remove profile picture?</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <button @click="removeProfileImageConfirmModal.modalHide()"
                    class="btn btn-sm btn-danger">Cancel</button>
                <loading-button class="btn-sm"
                    :isLoading="isSubmitProfileImageRemove"
                    @click="removeProfilePictureHandler">
                    Confirm
                </loading-button>
            </div>
        </div>
    </custom-modal>


    <!-- Profile image cropper -->
    <custom-modal ref="prifileImageCroperModel">
        <div class="d-flex justify-content-between justify-content-start pb-2">
            <h5 class="modal-title text-soft fs-18px"
                id="exampleModalLabel">Resize Image</h5>
            <button type="button"
                class="btn btn-light btn-sm btn-floating"
                data-mdb-dismiss="modal"
                aria-label="Close">
                <svg  
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="22">
                    <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z">
                    </path>
                </svg>
            </button>
        </div>
        <div class="">
            <cropper class="cropper"
                :src="inputProfileImage"
                ref="cropper"
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
    </custom-modal>


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