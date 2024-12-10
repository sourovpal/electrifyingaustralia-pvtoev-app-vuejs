import type { HttpPlyload } from '@/types';
import axios from 'axios';
import Storage from "@utils/storage";
import { CONFIG } from "@config";

const userStorage = new Storage(CONFIG.VITE_AUTH_USER);
const tokenStorage = new Storage(CONFIG.VITE_AUTH_TOKEN);

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

export function handleRemove() {
    userStorage.remove();
    tokenStorage.remove();
    window.location.replace('/login');
}


export default class Http {

    static async get(
        url: string,
        params?: object,
        headers?: HttpPlyload
    ) {
        return await client.get(url, { params, headers });
    }

    static async post(
        url: string,
        payload?: HttpPlyload,
        headers?: HttpPlyload
    ) {
        return await client.post(url, payload, { headers });
    }

    static async put(
        url: string,
        payload?: HttpPlyload,
        headers?: HttpPlyload
    ) {
        return await client.put(url, payload, { headers });

    }

    static async delete(
        url: string,
        params?: HttpPlyload,
        headers?: HttpPlyload
    ) {
        return await client.delete(url, { params, headers });
    }

    static error(error: { [key: string]: any }): any {

        const { response, status, message } = error;

        const { errors, message: error_message, success } = response?.data;

        if (status == 401) return handleRemove();

        return {
            status,
            success: success ?? false,
            message: error_message || { type: 'error', text: message },
            errors,
        };

    }

}