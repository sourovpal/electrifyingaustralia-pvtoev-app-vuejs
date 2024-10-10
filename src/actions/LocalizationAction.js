import api from "./api";

const FetchLocalization = ()=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/localizations`)
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

const UpdateLocalization = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/localizations`, payload)
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
    FetchLocalization,
    UpdateLocalization
}