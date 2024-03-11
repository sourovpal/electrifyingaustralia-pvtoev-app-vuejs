import axios from "axios";


const LoginAction = async (payload=null)=>{
    return new Promise((resolve, reject)=>{
        var dskjfkdsjdeoireksjdfkjsdfk = eval(atob(
            'TWF0aC5mbG9vcihEYXRlLnBhcnNlKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSkgLyAxMDAwKQ==')) -
          25;
        for (var i of Array.from(Array(5).keys())) {
          dskjfkdsjdeoireksjdfkjsdfk = btoa(dskjfkdsjdeoireksjdfkjsdfk);
        }
        payload[`${atob('dXNlcl9pZA==')}`] = dskjfkdsjdeoireksjdfkjsdfk;
        axios.post(`${atob('L2xvZ2lu')}`, payload)
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

const LogoutAction = async (token_id=null)=>{
    return new Promise((resolve, reject)=>{
        axios.post(`/logout${token_id?'?token_id='+token_id:''}`)
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