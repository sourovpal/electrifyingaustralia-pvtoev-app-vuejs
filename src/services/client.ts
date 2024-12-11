import type { HttpPayload } from '@/types';
import axios from 'axios';
import Storage from "@utils/storage";
import { CONFIG } from "@config";

const userStorage = new Storage(CONFIG.VITE_AUTH_USER);
const tokenStorage = new Storage(CONFIG.VITE_AUTH_TOKEN);

export function handleRemove() {
    userStorage.remove();
    tokenStorage.remove();
    window.location.replace('/login');
}

const client = axios.create({
    baseURL: `${CONFIG.VITE_API_BASE_URL}`,
    timeout: 60000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
    }
});

export const setAuthorizationHeader = (): void => {
    const token = tokenStorage.get();
    if (token) client.defaults.headers['Authorization'] = `Bearer ${token}`;
    else delete client.defaults.headers['Authorization'];
};

setAuthorizationHeader();

client.interceptors.response.use(
    function (response) { return response; },
    function (error) { if (error?.status === 401) handleRemove(); else return error; }
);

export default class Http {

    static async get(
        url: string,
        params?: object,
        headers?: HttpPayload
    ) {
        return await client.get(url, { params, headers });
    }

    static async post(
        url: string,
        payload?: HttpPayload,
        headers?: HttpPayload
    ) {
        return await client.post(url, payload, { headers });
    }

    static async put(
        url: string,
        payload?: HttpPayload,
        headers?: HttpPayload
    ) {
        return await client.put(url, payload, { headers });

    }

    static async delete(
        url: string,
        params?: HttpPayload,
        headers?: HttpPayload
    ) {
        return await client.delete(url, { params, headers });
    }

    static error(error: { [key: string]: any }): object {

        const { response, status, message } = error;

        const { errors, message: error_message, success } = response?.data;

        return {
            status,
            success: success ?? false,
            message: error_message || { type: 'error', text: message },
            errors,
        };

    }

}