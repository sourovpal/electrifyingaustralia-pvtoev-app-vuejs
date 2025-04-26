<script setup>
    import { ref } from 'vue';
    const props = defineProps({
        title: { type: String, default: null },
        icon: { type: String, default: null },
        iconColor: { type: String, default: null },
        iconBgColor: { type: String, default: null },
        total: { type: Number, default: 0 },
    });
</script>

<template>

    <div class="card">
        <div class="card-body py-2 px-3">
            <div class="header d-flex justify-content-between align-items-center">
                <div class="title fs-16px fw-bold">
                    {{ title }}
                </div>
                <Avatar>
                    <material-icon :name="icon" class="text-soft"></material-icon>
                </Avatar>
            </div>
            <div class="d-flex justify-content-start align-items-center">
                <div class="total-number fs-25px fw-bold text-soft">
                    {{ total }}
                </div>
                <div class="w-75 ms-3">

                </div>
            </div>
        </div>
    </div>

</template>

<style scoped
    lang="scss">
    .card .card-body {
        height: 6rem;
        overflow: hidden;
    }
</style>