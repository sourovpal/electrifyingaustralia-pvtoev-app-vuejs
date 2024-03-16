import axios from "axios";
import VueCookies from 'vue-cookies';

var token = VueCookies.get('access_token');

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
            VueCookies.remove('access_token');
            VueCookies.remove('user_data');
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);

export default instance;