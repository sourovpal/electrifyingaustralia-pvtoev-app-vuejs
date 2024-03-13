import api from "./api";

const FetchComapny = ()=>{
    return new Promise((resolve, reject)=>{
        api.get(`/company`)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

export {
    FetchComapny
}