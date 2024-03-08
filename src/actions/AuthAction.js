import axios from "axios";


const LoginAction = async (payload=null)=>{
    return new Promise((resolve, reject)=>{
        axios.post('/login', payload)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}


const RegisterAction = async (payload=null)=>{
    return new Promise((resolve, reject)=>{
        axios.post('/register', payload)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const LogoutAction = async (payload=null)=>{
    return new Promise((resolve, reject)=>{
        axios.post('/logout')
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
    LogoutAction
}