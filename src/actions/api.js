import axios from "axios";
import VueCookies from 'vue-cookies';

var token = VueCookies.get(import.meta.env.VITE_AUTH_TOKEN);

const headers = {};
if(token){
    headers['Authorization'] = 'Bearer '+ token;
}
const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
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
            VueCookies.remove(import.meta.env.VITE_AUTH_USER, '/');
            VueCookies.remove(import.meta.env.VITE_AUTH_COMPANY, '/');
            VueCookies.remove(import.meta.env.VITE_AUTH_TOKEN, '/');
            VueCookies.remove(import.meta.env.VITE_AUTH_APP, '/');
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);

export default instance;