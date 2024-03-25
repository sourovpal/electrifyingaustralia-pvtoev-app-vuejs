import api from "./api";

const FetchLeadStatusAndDealPiplines = ()=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/lead-status?with=pipeline`)
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

const FindPipeline = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/pipelines/${payload.id}`)
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

const UpdatePipelines = (payload, id)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/pipelines/${id}`, payload)
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
    UpdateLeadStatus,
    UpdatePipelines,
    FindPipeline
}