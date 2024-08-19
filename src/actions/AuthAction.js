import api from "./api";


const LoginAction = async (payload=null)=>{
    return new Promise((resolve, reject)=>{
        api.post(`/login`, payload)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}


const RegisterAction = async (payload=null)=>{
    return new Promise((resolve, reject)=>{
        api.post('/register', payload)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}



export {
    LoginAction,
    RegisterAction,
}