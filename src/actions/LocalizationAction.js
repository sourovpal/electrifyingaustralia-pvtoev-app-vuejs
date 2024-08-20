import api from "./api";

export const FindLocalizationByCompany = ()=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/localizations/company`)
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

export const UpdateLocalization = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/localizations/update`, payload)
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
