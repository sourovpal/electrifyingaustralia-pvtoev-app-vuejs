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
            full_screen_loading: true,
        }
    },
    getters: {
        getFullScreenLoader(state) {
            return state.full_screen_loading;
        }
    },
    actions: {
        startProgress() {
            isLoading.value = true;
            start();
        },
        doneProgress() {
            isLoading.value = false;
            setTimeout(() => this.full_screen_loading = false, 1000);
            return done();
        },
    }
});
