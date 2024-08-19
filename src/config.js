
import { useToast } from "vue-toast-notification";

export const CONFIG = {
    ...import.meta.env,
    TOAST: {
        position: 'bottom',
        duration: 5000,
    },
    TIPPYOPTIONS: {
        directive: 'tippy',
        component: 'tippy',
        componentSingleton: 'tippy-singleton',
        defaultProps: {
            placement: 'auto-end',
            allowHTML: true,
        },
    }
}

const $toast = useToast(CONFIG.TOAST);

export {
    $toast
}