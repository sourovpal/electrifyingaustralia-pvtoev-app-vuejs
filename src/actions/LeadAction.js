import api from "./api";

const FetchLeads = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/leads?page=${payload.page}&limit=${payload.limit}&headers=${payload.f_headers?1:0}&lead_properties=${payload.f_lead_properties?1:0}${payload.search?`&${payload.search}`:''}`)
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
    FetchLeads
}