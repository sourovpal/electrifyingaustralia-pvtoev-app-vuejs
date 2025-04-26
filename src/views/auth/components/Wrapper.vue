<script setup>
    const props = defineProps({
        errorMessage: { type: Object, default: null },
        title: { type: String, default: null }
    })
</script>

<template>
    <section>
        <div class="container-xl">

            <div class="row">

                <div class="col-lg-8 mx-auto py-1">

                    <Message :severity="errorMessage?.type"
                        v-if="errorMessage"
                        @close="errorMessage = null"
                        class="text-center"
                        :icon="`pi ${(errorMessage?.type == 'error') ? 'pi-times-circle' : 'pi-check-circle'}`">
                        {{ errorMessage?.text }}
                    </Message>

                </div>

            </div>


            <div class="row">

                <div class="col-xl-4 col-lg-4 col-md-6 col-10 mx-auto mt-5 pt-5">

                    <div class="pt-5 pb-3">
                        <h3 class="text-head fw-bold">{{ title }}</h3>
                    </div>

                    <slot></slot>

                </div>

            </div>

        </div>

    </section>
</template>