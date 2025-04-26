
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { CONFIG } from '@config';
import { useAuthStore } from '@stores';

const authStore = useAuthStore();


window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    authEndpoint: CONFIG.VITE_BROADCAST_AUTH_API,
    key: CONFIG.VITE_PUSHER_APP_KEY,
    cluster: CONFIG.VITE_PUSHER_APP_CLUSTER,
    wsHost: window.location.hostname,
    wsPort: 6001,
    auth: {
        headers: {
            Authorization: 'Bearer ' + authStore.getAccessToken,
        },
    },
    forceTLS: true,
    debug: true,
});

const channel = window.Echo.private(`crm-channel-${authStore.getUser?.user_id}`);


export function listenNotification(callback = null) {

    if (!callback) throw new Error('Callback function required.');

    channel.listen('.crm-notification', (event) => callback(event));

}


export function listenLeadVisible(lead_id, callback = null) {

    if (!callback) throw new Error('Callback function required.');
    if (authStore.getUser?.is_owner != 1) {
        channel.listen(`.lead-visible`, (event) => callback(event));
    }

}

export default channel;