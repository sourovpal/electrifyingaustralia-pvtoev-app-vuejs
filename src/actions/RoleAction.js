import api from "./api";

const FetchRoles = (payload)=>{
    return new Promise((resolve, reject)=>{
        api.get(`/roles`)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

export {
    FetchRoles
}