<script setup>
    const props = defineProps({
        title: { type: String, default: null }
    });
</script>

<template>
    <section class="header border-bottom mb-5">

        <slot name="content">

            <slot name="left">

                <slot name="title">

                    <div class="">
                        <h1 class="title mb-0 fs-22px">{{ title }}</h1>
                    </div>

                </slot>

            </slot>

            <slot name="right">

            </slot>

        </slot>

    </section>
    
</template>

<style scoped
    lang="scss">
    .header {
        height: 4rem;
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 6px 16px;

        .title {
            font-size: 22px;
            font-weight: bold;
        }
    }
</style>