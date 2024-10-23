import { defineStore } from 'pinia';
import { useNProgress } from '@vueuse/integrations/useNProgress';
const { isLoading, progress, start, done } = useNProgress(0.1, {
    minimum: 0.4,
    showSpinner: false,
    speed: 1000,
});

export const useProgress = defineStore('progress', {
    state: () => {
        return {
        }
    },
    actions: {
        startProgress() {
            isLoading.value = true;
            start();
        },
        doneProgress() {
            isLoading.value = false;
            return done();
        },

    }
});
