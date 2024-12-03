import axios from "axios";
import Storage from "@helpers/Storage";
import { CONFIG } from "@config";

const securityStorage = new Storage(CONFIG.VITE_AUTH_TOKEN);
const userStorage = new Storage(CONFIG.VITE_AUTH_USER);

const headers = {};

if (!!securityStorage.get() && !!userStorage.get()) {
    headers['Authorization'] = 'Bearer ' + securityStorage.get();
}

function handleRemove() {
    userStorage.remove();
    securityStorage.remove();
    window.location.replace('/login');
}

const instance = axios.create({
    baseURL: `${CONFIG.VITE_API_BASE_URL}`,
    timeout: 60000,
    withCredentials: false,
    headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
        ...headers
    }
});

instance.interceptors.request.use((request) => {

    return request;

}, (error) => {

    return Promise.reject(error);

});

instance.interceptors.response.use(
    function (response) {

        return Promise.resolve(response);

    }, function (error) {

        if (error?.response?.status === 401) handleRemove();

        const { message, errors } = error.response?.data;

        if (message && typeof message == 'object') error['message'] = message;

        else if (message) error['message'] = { text: message, type: 'error' }

        else error['message'] = { text: error.message, type: 'error' }

        if (errors) error['errors'] = errors;

        return Promise.reject(error);

    });



export async function useApiRequest(http = {}) {

    const { url, method, payload, headers, ...attr } = {
        url: '/',
        method: 'get',
        payload: {},
        headers: {},
        ...http,
    };

    var methods = ['get', 'post', 'put', 'patch', 'delete'];

    var parseUrl = url;

    var parseMethod = method.toLowerCase();

    if (!methods.includes(parseMethod)) {
        throw new Error(`${method} method doesn't exist.`)
    }

    if (parseMethod == 'get' || parseMethod == 'delete' && Object.keys(payload).length) {

        const query = new URLSearchParams(payload);

        const querys = query.toString();

        if (parseUrl.indexOf('?') > -1 && querys) {

            parseUrl += `&${querys}`;

        } else if (querys) {

            parseUrl += `?${querys}`;

        }
    }


    if (parseMethod == 'get') {

        return await instance.get(parseUrl, {
            headers: headers,
            ...attr
        }).then((res) => Promise.resolve(res.data)).catch((error) => Promise.reject(error));

    } else {

        return await instance[parseMethod](parseUrl, payload, {
            headers,
            ...attr,
        }).then((res) => Promise.resolve(res.data)).catch((error) => Promise.reject(error));
    }

}

export default instance;
