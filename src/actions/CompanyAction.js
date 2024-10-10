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

const UpdateComapny = (payload)=>{
    return new Promise((resolve, reject)=>{
        api.post(`/company`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

export {
    FetchComapny,
    UpdateComapny
}