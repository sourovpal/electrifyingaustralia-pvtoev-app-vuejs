import api from "./api";

const FetchInstaller = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/installers?page=${payload.page}&limit=${payload.limit}`)
            .then((res)=>{
                return resolve(res.data);
            }).catch((error)=>{
                return reject(error);
            });
        }catch(error){
            return reject(error);
        }
    });
}

const FindInstaller = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/installers/${payload.id}`)
            .then((res)=>{
                return resolve(res.data);
            }).catch((error)=>{
                return reject(error);
            });
        }catch(error){
            return reject(error);
        }
    });
}

const CreateInstaller = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post('/installers', payload, {
                headers: {
                }
            })
            .then((res)=>{
                return resolve(res.data);
            }).catch((error)=>{
                return reject(error);
            });
        }catch(error){
            return reject(error);
        }
    });
}

const UpdateInstaller = (payload, id)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.put(`/installers/${id}`, payload, {
                headers: {
                }
            })
            .then((res)=>{
                return resolve(res.data);
            }).catch((error)=>{
                return reject(error);
            });
        }catch(error){
            return reject(error);
        }
    });
}

const DeleteInstaller = (payload, id)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.delete(`/installers/${id}`, {
                headers: {
                }
            })
            .then((res)=>{
                return resolve(res.data);
            }).catch((error)=>{
                return reject(error);
            });
        }catch(error){
            return reject(error);
        }
    });
}


export {
    FetchInstaller,
    FindInstaller,
    CreateInstaller,
    UpdateInstaller,
    DeleteInstaller
}