import api from "./api";

const FetchLeadStatusAndDealPiplines = ()=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/lead-status`)
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
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/lead-status`)
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

const UpdateLeadStatus = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/lead-status`, payload)
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
    FetchLeadStatusAndDealPiplines,
    FetchLeadStatus,
    UpdateLeadStatus
}