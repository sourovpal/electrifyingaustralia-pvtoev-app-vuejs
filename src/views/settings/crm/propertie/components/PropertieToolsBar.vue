<script setup>
    import ActionBar from '@components/ActionBar/ActionBar.vue';
    import LeftActionBar from '@components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '@components/ActionBar/RightActionBar.vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';
    import { useConfirm } from "primevue/useconfirm";
    import { ref } from "vue";


    const confirm = useConfirm();

    const props = defineProps({
        pagination: { type: Object, default: {} },
        selectedProperties: { type: Array, default: [] },
    });

    const emits = defineEmits(['checkedAll', 'fetch', 'toggleAddNew']);

    const is_deleting = ref(false);

    const confirmDelete = () => {
        confirm.require({
            target: null,
            header: 'Delete Property?',
            message: 'Are you sure you want to delete?',
            icon: 'pi pi-trash fs-16px',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
                style: 'height:2rem'
            },
            acceptProps: {
                label: 'Delete',
                severity: 'danger',
                style: 'height:2rem'
            },
            accept: () => handleDelete(),
            reject: () => { }
        });
    };

    function handleDelete() {
        is_deleting.value = true;
        var url = '/settings/properties?properties_id=' + props.selectedProperties;
        useApiRequest({
            url,
            method: 'DELETE',
        }).then(({ message }) => {
            emits('fetch');
            $toast.success(message.text);
        }).catch(error => {
            $toast.error(error.message);
        }).finally(_ => {
            is_deleting.value = false;
        });
    }


</script>

<template>
    <action-bar class="border-0">
        <left-action-bar>

            <div class="d-flex justify-content-center align-item-start"
                style="margin-left: 8px">

                <custom-checkbox @click="emits('checkedAll')"
                    :checked="!!(
                        selectedProperties.length &&
                        pagination.total === 
                        selectedProperties.length
                    )"
                    :reset="!!(
                        pagination.total && 
                        selectedProperties.length && 
                        pagination.total != selectedProperties.length
                    )">
                </custom-checkbox>

            </div>

            <div>

                <button @click="emits('fetch', 1)"
                    class="toolbar-btn btn btn-light btn-floating ms-3">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                            d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z">
                        </path>
                        <path d="M0 0h24v24H0z"
                            fill="none"></path>
                    </svg>
                </button>

            </div>
            <div>

                <button v-if="selectedProperties.length"
                    class="toolbar-btn btn btn-danger btn-sm me-3 ms-3"
                    @click="confirmDelete">
                    <span class="fs-12px">{{ selectedProperties.length }} selected</span>
                    <span class="ms-2">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                            fill="currentColor"
                            width="20px"
                            height="20px">
                            <path
                                d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
                        </svg>
                    </span>
                </button>

            </div>

        </left-action-bar>

        <right-action-bar>

            <!-- <div v-if="isLoading"
                class="me-3">
                <svg class="spinner"
                    viewBox="0 0 50 50"
                    style="width:20px;height:20px;margin-left:0px;">
                    <circle style="stroke: rgb(59, 113, 202);"
                        class="path"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke-width="5"></circle>
                </svg>
            </div> -->

            <div class="me-3">
                <button @click="emits('toggleAddNew')"
                    class="btn btn-primary fw-bold btn-sm">
                    Add New
                </button>
            </div>

            <div class="fw-bold d-flex justify-content-center align-items-center me-3 text-overflow-ellipsis fs-16px"
                style="min-width: 4rem;">{{ pagination.from }} - {{ pagination.to }} of {{ pagination.total }}
            </div>

            <button :disabled="!pagination.prev_page"
                @click="pagination.prev_page && emits('fetch', pagination.prev_page)"
                class="toolbar-btn btn btn-light btn-floating me-3">

                <font-awesome-icon icon="fas fa-arrow-left"
                    class="fs-16px text-head"></font-awesome-icon>

            </button>

            <button :disabled="!pagination.next_page"
                @click="pagination.next_page && emits('fetch', pagination.next_page)"
                class="toolbar-btn btn btn-light btn-floating me-3">

                <font-awesome-icon icon="fas fa-arrow-right"
                    class="fs-16px text-head"></font-awesome-icon>

            </button>

        </right-action-bar>
    </action-bar>

</template>