<script setup>
    const props = defineProps({
        pagination: {
            type: Object,
            default: {
                prev_page: null,
                next_page: null,
                from: 0,
                to: 0,
                total: 0,
            }
        },
        loading: { type: [Number, Boolean], default: false }
    });
    const emits = defineEmits(['change']);
</script>

<template>

    <div class="d-flex justify-context-start align-items-center">

        <div style="min-width: 5rem"
            class="fw-bold d-flex justify-content-center align-items-center text-overflow-ellipsis fs-16px">

            {{ pagination?.from ?? 0 }} - {{ pagination?.to ?? 0 }} of {{ pagination?.total?? 0 }}

        </div>

        <div class="ms-3">

            <Button icon="pi pi-arrow-left"
                rounded
                severity="secondary"
                size="small"
                variant="outlined"
                :disabled="!pagination?.prev_page || loading"
                v-tippy="{ content: 'Previous', placement: 'top' }"
                class="toolbar-btn btn btn-light btn-floating me-3 border-0"
                @click="emits('change', pagination?.prev_page)">

                <material-icon name="west" size="20"></material-icon>

            </Button>

            <Button rounded
                severity="secondary"
                size="small"
                variant="outlined"
                aria-label="Filter"
                :disabled="!pagination?.next_page || loading"
                v-tippy="{ content: 'Next', placement: 'top' }"
                @click="emits('change', pagination?.next_page)"
                class="toolbar-btn btn btn-light btn-floating me-3 border-0">

                <material-icon name="east" size="20"></material-icon>

            </Button>

        </div>

    </div>

</template>
<style scoped
    lang="scss">
    button {
        min-width: 2rem !important;
        width: 2rem !important;
        min-height: 2rem !important;
        height: 2rem !important;
    }
</style>