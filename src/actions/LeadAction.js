import api from "./api";

const FetchLeads = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            var query = new URLSearchParams(payload);

            // api.get(`/leads?page=${payload.page}&limit=${payload.limit}${payload.status?`&status=${payload.status}`:''}&headers=${payload.f_headers?1:0}&lead_properties=${payload.f_lead_properties?1:0}${payload.search?`&${payload.search}`:''}`)
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

export {
    FetchLeads
}