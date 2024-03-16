import api from "./api";

const FetchInstaller = (payload)=>{
    return new Promise((resolve, reject)=>{
        api.get(`/installers?page=${payload.page}&limit=${payload.limit}`)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

export {
    FetchInstaller
}