import axios from "axios";
import { CONFIG } from "../config";
import Storage from "../helpers/Storage";

const securityStorage = new Storage(CONFIG.VITE_AUTH_TOKEN);
const userStorage = new Storage(CONFIG.VITE_AUTH_USER);

const headers = {};

if(!!securityStorage.get() && !!userStorage.get()){
    headers['Authorization'] = 'Bearer '+ securityStorage.get();
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



instance.interceptors.request.use((request)=>{
    return request;
},(error)=>{
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
    }, function (error) {
        if (error.response.status === 401){
            userStorage.remove();
            securityStorage.remove();
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);

export default instance;
