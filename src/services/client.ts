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
    ) {
        return await client.get(url, { params });
    }

    static async post(
        url: string,
        payload?: HttpPayload,
        options?: object
    ) {
        return await client.post(url, payload, options);
    }

    static async put(
        url: string,
        payload?: HttpPayload,
        options?: object
    ) {
        return await client.put(url, payload, options);

    }

    static async delete(
        url: string,
        params?: HttpPayload,
    ) {
        return await client.delete(url, { params });
    }

    static error(error: { [key: string]: any }): object {

        try {
            const { response, status, message } = error;
            const { errors, message: error_message, success } = response?.data;
            return {
                status,
                success: success ?? false,
                message: error_message || { type: 'error', text: message },
                errors,
            };

        } catch (error) {
            return {
                status: 500,
                success: false,
                message: { type: 'error', text: 'Oops! Something went wrong.' },
            };
        }

    }

}