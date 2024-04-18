import api from "./api";

const FetchLeads = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            var query = new URLSearchParams(payload);
            api.get(`/leads?${query.toString()}`)
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

const CreateNewLead = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/leads`, payload)
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

const UpdateLeadPropertieHeaders = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/leads/properties`, payload)
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

const UpdateMultipelLeadStatus = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/leads/status`, payload)
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

const DeleteMultipleLeads = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/leads/delete`, payload)
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

const UpdateMultipelLeadOwner = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/leads/owner`, payload)
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

const FetchLeadPipelineWithStage = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/leads/pipelines`, payload)
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

const ConfirmQualify = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/leads/confirm-qualify`, payload)
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
    FetchLeads,
    UpdateLeadPropertieHeaders,
    UpdateMultipelLeadStatus,
    CreateNewLead,
    DeleteMultipleLeads,
    UpdateMultipelLeadOwner,
    FetchLeadPipelineWithStage,
    ConfirmQualify,
}