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

const UpdateOrCreatePipelines = (payload, id)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/pipelines${id?'/'+id:''}`, payload)
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

const FetchLeadProperties = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/lead-properties?page=${payload.page}&limit=${payload.limit}&pipeline_id=${payload.pipeline_id}`)
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
            api.get(`/lead-properties/${payload.id}`)
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
            api.post(`/lead-properties`, payload)
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
            api.post(`/lead-properties/${id}`, payload)
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
    UpdateOrCreatePipelines,
    FindPipeline,
    FetchLeadProperties,
    CreateLeadPropertie,
    FindLeadPropertie,
    UpdateLeadPropertie
}