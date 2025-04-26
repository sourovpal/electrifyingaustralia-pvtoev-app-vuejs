<script setup>
    import { useProgress } from '@stores';
    import { computed } from 'vue';

    const progress = useProgress();

    const is_loading = computed(() => progress.getFullScreenLoader);

</script>

<template>
    <section v-if="is_loading"
        class="full-screen-loader">
        <div class="d-flex flex-column text-center">
            <div class="">
                <span class="loader"></span>
            </div>
            <div class="fs-20px text-soft">Loading...</div>
        </div>
    </section>
</template>
<style scoped
    lang="scss">
    .full-screen-loader {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        z-index: 99999999;
        display: flex;
        justify-content: center;
        align-items: center;

        .loader {
            width: 48px;
            height: 48px;
            display: inline-block;
            position: relative;
            border: 3px solid;
            border-color: #de3500 #0000 #10b981 #0000;
            border-radius: 50%;
            box-sizing: border-box;
            animation: 1s rotate linear infinite;
        }

        .loader:before,
        .loader:after {
            content: '';
            top: 0;
            left: 0;
            position: absolute;
            border: 10px solid transparent;
            border-bottom-color: #10b981;
            transform: translate(-10px, 19px) rotate(-35deg);
        }

        .loader:after {
            border-color: #de3500 #0000 #0000 #0000;
            transform: translate(32px, 3px) rotate(-35deg);
        }

        @keyframes rotate {
            100% {
                transform: rotate(360deg)
            }
        }
    }
</style>