import api from "./api";

const FetchLeadProperties = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/properties?page=${payload.page}&limit=${payload.limit}&pipeline_id=${payload.pipeline_id}`)
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

const FindLeadPropertie = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/properties/${payload.id}`)
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

const CreateLeadPropertie = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/properties`, payload)
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

const UpdateLeadPropertie = (payload, id)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/properties/${id}`, payload)
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
const FetchLeadStatus = ()=>{

}
export {
    FetchLeadProperties,
    CreateLeadPropertie,
    FindLeadPropertie,
    UpdateLeadPropertie,
    FetchLeadStatus,
}