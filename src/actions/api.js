import axios from "axios";
import VueCookies from 'vue-cookies';
const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        'Accept': 'application/json',
    }
});



instance.interceptors.request.use((request)=>{
    var token = VueCookies.get('access_token');
    request.headers.set('Authorization', 'Bearer '+token);
    return request;
},(error)=>{
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    if (error.response.status === 401)
    {
        VueCookies.remove('access_token');
        VueCookies.remove('user_data');
        window.location.replace('/login');
    }
    return Promise.reject(error);
}
);

export default instance;