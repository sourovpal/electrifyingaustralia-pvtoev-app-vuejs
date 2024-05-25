import Storage from "../helpers/storage";
import { defineStore } from 'pinia';
import { CONFIG } from "../config";

const userStorage = new Storage(CONFIG.VITE_AUTH_USER);
const securityStorage = new Storage(CONFIG.VITE_AUTH_TOKEN);


export const isAuthorized = (path=null, state=false)=>{
    
    var auth = !!securityStorage.get() && !!userStorage.get();

    if(auth === state && path){
        window.location.replace(path);
    }

    return auth;
} 

export const checkPermission = (permissions)=>{
    return true;
};

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user:userStorage.get(),
            access_token:securityStorage.get(),
        }
    },
    getters:{
        getUser(state){
            return state.user;
        },
        getAccessToken(state){
            return state.access_token;
        }
    },
    actions:{
        setUser(payload=null){
            var user = null;
            if(payload){
                userStorage.remove();
                userStorage.set(payload);
                user = payload;
            }else{
                user = userStorage.get();
            }
            if(user){
                this.user = user;
            }else{
                return;
            }
        },
        setAccessToken(payload=null){
            var access_token = null;
            if(payload){
                securityStorage.remove();
                securityStorage.set(payload);
                access_token = payload;
            }else{
                access_token = securityStorage.get();
            }
            if(access_token){
                this.access_token = access_token;
            }else{
                return;
            }
        }
    }
});
