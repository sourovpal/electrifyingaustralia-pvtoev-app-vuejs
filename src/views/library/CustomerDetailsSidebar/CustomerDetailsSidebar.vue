<template>
    <div class="customer-detail-sidebar content pb-2 content-y-100vh">
        <p class="sidebar-heading border-bottom fw-bold px-3 py-2">Customer details</p>
        <div class="sidebar-content px-3 mb-3">
            <div>
                <label class="fs-13px">Customer name</label>
                <input type="text" class="form-control" />
            </div>

            <div>
                <label class="fs-13px">Contact number</label>
                <input type="number" class="form-control" />
            </div>

            <div>
                <label class="fs-13px">Email</label>
                <input type="email" class="form-control" />
            </div>

            <div>
                <label class="fs-13px">Customer reference number</label>
                <input type="text" class="form-control" />
            </div>

            <div>
                <label class="fs-13px">Street and Number</label>
                <input type="text" class="form-control mb-2" />
                <input type="text" class="form-control" />
            </div>

            <div>
                <label class="fs-13px">City, suburb or town</label>
                <input type="number" class="form-control" />
            </div>

            <div>
                <label class="fs-13px">Post code</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="formData.post_code"
                    @keyup.enter="handlePostCodeSave"
                    @focusout="handleFocusOut"
                />
            </div>

            <div>
                <label class="fs-13px">State</label>
                <input type="text" class="form-control" />
            </div>

            <div>
                <label class="fs-13px">Country</label>
                <input type="text" class="form-control" />
            </div>

            <hr>

            <div>
                <label class="fs-13px">Company name</label>
                <input type="text" class="form-control" />
            </div>

            <div>
                <label class="fs-13px">Australian Business Number (ABN)</label>
                <input type="text" class="form-control" />
            </div>
        </div>

        <!-- Additional details -->
        <!-- <p class="sidebar-heading border-bottom fw-bold px-3">Additional details</p> -->
        <p class="sidebar-heading border-bottom fw-bold px-3 py-2">Additional details</p>
        <div class="sidebar-content px-3 mb-5">
            <div class="solicited-input mb-3">
                <p class="text-muted fs-13px mb-2">Unsolicited Customer</p>

                <div class="btn-group shadow-none me-3 w-100 rounded border" style="padding: 0.125rem;">
                    <button style="margin-right: 0.25rem;" class="btn btn-sm btn-secondary text-muted">Unsolicited</button>
                    <button class="btn btn-sm btn-primary">Solicited</button>
                </div>
            </div>

            <div>
                <label class="fs-13px">Roof material</label>
                <input type="text" class="form-control" />
            </div>
            <div>
                <label class="fs-13px">Number of storeys</label>
                <input type="text" class="form-control" />
            </div>
            <div class="solicited-input mb-3">
                <p class="text-muted fs-13px mb-2">Building classification</p>

                <div class="btn-group shadow-none me-3 w-100 rounded border" style="padding: 0.125rem;">
                    <button style="margin-right: 0.25rem;" class="btn btn-sm btn-secondary text-muted">Residential</button>
                    <button class="btn btn-sm btn-secondary text-muted">Commercial</button>
                </div>
            </div>

            <div>
                <label class="fs-13px">Monitoring</label>
                <input type="text" class="form-control" />
            </div>
            <div>
                <label class="fs-13px">Power phases</label>
                <input type="text" class="form-control" />
            </div>
            <div>
                <label class="fs-13px">NMI</label>
                <input type="text" class="form-control" />
            </div>
            <div>
                <label class="fs-13px">DNSP Pre-approval Number</label>
                <input type="text" class="form-control" />
            </div>
            <div>
                <label class="fs-13px">Meter number</label>
                <input type="text" class="form-control" />
            </div>
            <div>
                <label class="fs-13px">Energy retailer</label>
                <input type="text" class="form-control" />
            </div>
            <div>
                <label class="fs-13px">Energy distributor</label>
                <input type="text" class="form-control" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import axios from '../../../actions/api';
import { useProjectStore } from '../../../stores/project';
import { useToast } from 'vue-toast-notification';

const formData = ref({ post_code: '' });

const toast = useToast();
const projectStore = useProjectStore();

const inputValid = computed(() => {
    if (formData.value.post_code.length !== 4)
        return false;

    const numberRegex = /^[0-9]*$/;

    if (!numberRegex.test(formData.value.post_code)) 
        return false

    return true;
});

// resetting the value on focus out
const handleFocusOut = () =>
    formData.value.post_code = projectStore.project?.post_code ?? '';

 const handlePostCodeSave = async () => {
    if (!inputValid.value)
        return toast.error('Invalid postcode');

    const payload = { post_code: formData.value.post_code };
    try {
        const res = await axios.put(`/projects/${projectStore.getProjectId}`, payload)
        toast.success(res?.data?.message ?? 'Success');

        await projectStore.setCurrentProject(projectStore.getProjectId);

        if (projectStore.project?.post_code)
            formData.value.post_code = projectStore.project?.post_code;
    } 
    catch (err) {
        toast.error(err?.response?.data?.message ?? 'Something went wrong');
        console.log(err);
    }
}

watch(
    () => projectStore.project ?? '',
    (newValue) => formData.value.post_code = newValue?.post_code ?? ''
)

</script>

<style lang="scss" scoped>
$sidebar-width: 20rem;

.customer-detail-sidebar {
    background-color: #ffffff;
    width: $sidebar-width;
    transition: 200ms;
    border-left: 2px solid rgb(59, 113, 202) !important;

    z-index: 999;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;

    &.hidden { right: -$sidebar-width; }
}

.sidebar-heading {
    padding-bottom: 0.75rem;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 1;
}

.sidebar-content > div {
    margin-bottom: 1rem;
}
</style>
