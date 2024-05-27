import api from "./api";

const FetchPipelineWithStagesWithLeads = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            
            try{
                delete payload['view'];
            }catch(error){}

            var query = new URLSearchParams(payload);
            api.get(`/pipelines/stages-leads?${query.toString()}`)
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

const FetchLeadsByPipelineStageId = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            var query = new URLSearchParams(payload);
            api.get(`/pipelines/stage/leads?${query.toString()}`)
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

export{
    FetchPipelineWithStagesWithLeads,
    FetchLeadsByPipelineStageId
}