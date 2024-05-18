import api from "./api";

const FetchPipelineWithStagesWithLeads = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
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

export{
    FetchPipelineWithStagesWithLeads
}