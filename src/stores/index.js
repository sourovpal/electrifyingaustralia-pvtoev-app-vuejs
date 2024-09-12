import { useLeadStore } from "./timeline";
import { useAuthStore } from "./auth";
import { useAppStore } from "./app";

const leadStore = useLeadStore();
const authStore = useAuthStore();
const appStore = useAppStore();

export {
    useLeadStore,
    useAuthStore,
    useAppStore,
    leadStore,
    authStore,
    appStore
}