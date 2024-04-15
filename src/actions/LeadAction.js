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

const UpdateLeadStatus = (payload)=>{
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

export {
    FetchLeads,
    UpdateLeadPropertieHeaders,
    UpdateLeadStatus,
    CreateNewLead
}