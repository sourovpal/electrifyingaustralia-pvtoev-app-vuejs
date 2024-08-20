<script setup>
    import { Skeletor } from 'vue-skeletor';
    import { ref, defineProps, watch, reactive, onMounted } from 'vue';
    import { RemoveCompanyLogo, UploadCompanyLogo } from '../../../../actions/CompanyAction';
    import { $toast } from '../../../../config';
    import CustomModal from '../../../../components/modals/CustomModal.vue';

    const confirmRemoveModal = ref(null);

    const props = defineProps({
        company: {
            type: Object,
            default: {},
        },
        isLoading: {
            type: Boolean,
            default: false,
        }
    });

    const state = reactive({
        errors: {},
        companyLogo: null,
        isSubmitCompanyLogo: false,
        // 
        isSubmitRemoveLogo: false,
    });

    watch(() => props.company, () => {
        state.errors = {};
        state.companyLogo = props.company?.business_logo ?? null;
    }, { deep: true });

    async function uploadCompanyLogoHandler(event) {
        try {
            $toast.clear();
            state.errors = {};
            state.isSubmitCompanyLogo = true;
            var formData = new FormData();
            var files = event.target.files;
            if (files.length) {
                var objUrl = URL.createObjectURL(files[0]);
                state.companyLogo = objUrl;
                formData.append('company_logo', files[0]);
            }
            event.target.value = null;
            const res = await UploadCompanyLogo(formData);
            const { success, errors, message } = res;
            $toast[message.type](message.text);
            if (!success) {
                state.errors = errors;
            }
        } catch (error) {
            $toast.error('Oops, something went wrong');
        } finally {
            state.isSubmitCompanyLogo = false;
        }
    }

    async function removeCompanyLogo() {
        try {
            $toast.clear();
            state.errors = {};
            state.isSubmitRemoveLogo = true;
            const res = await RemoveCompanyLogo();
            const { success, company_logo, errors, message } = res;
            $toast[message.type](message.text);
            if (company_logo) {
                state.companyLogo = company_logo;
            }
        } catch (error) {
            $toast.error('Oops, something went wrong');
        } finally {
            confirmRemoveModal.value.modalHide();
            state.isSubmitRemoveLogo = false;
        }
    }


</script>

<template>
    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Company logo</h2>
                <span class="sub-title">This logo will appear in your solar proposals.</span>
            </div>
        </div>
        <div class="col-lg-5 col-12">
            <div class="row">

                <div class="col-lg-8">
                    <div class="preview-logo">
                        <div v-if="isLoading"
                            class="d-flex justify-content-start align-items-center">
                            <Skeletor style="width:40%;height:4.5rem;border-radius:5px;" />
                            <div class="d-block w-100 ms-3">
                                <Skeletor style="width:80%;height:100%;border-radius:5px;" />
                                <Skeletor style="width:60%;height:100%;border-radius:5px;" />
                            </div>
                        </div>
                        <img v-else
                            class="logo-img"
                            :src="state.companyLogo"
                            :alt="company.company_name">
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="settings-group-item mb-1 d-flex justify-content-between align-items-center">
                        <input @click="delete state.errors.business_logo"
                            @change="uploadCompanyLogoHandler"
                            type="file"
                            class="form-control">
                        <div class="ms-3">
                            <button class="btn-danger btn-sm btn"
                                @click="confirmRemoveModal.modalShow()">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <div class="settings-group-item">
                    <span class="fs-14px text-danger py-1 w-100 d-block"
                        v-if="state.errors?.company_logo?.length">{{ state.errors?.company_logo[0] }}</span>
                    <span v-else
                        class="form-input-commant">For best results, use a horizontal image with a white or transparent
                        background.</span>
                </div>
            </div>
        </div>
    </div>
    <CustomModal ref="confirmRemoveModal"
        size="sm">
        <div class="">
            <div class="text-center">
                <h5 class="text-head fw-bold">Permanently Remove?</h5>
                <p class="text-soft fs-14px">Are you sure you want to remove logo?</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <button @click="confirmRemoveModal.modalHide()"
                    class="btn btn-sm btn-danger">Cancel</button>
                <loading-button class="btn-sm"
                    :isLoading="state.isSubmitRemoveLogo"
                    @click="removeCompanyLogo">
                    Confirm
                </loading-button>
            </div>
        </div>
    </CustomModal>
</template>

<style scoped
    lang="scss">
    .preview-logo {
        padding: 12px;
        background: #ffffff !important;
        border: 1px solid #bdbdbd !important;
        margin-bottom: 1.5rem;
        border-radius: 5px;
        height: 6rem;

        img {
            height: 100%;
            width: auto !important;
        }
    }
</style>