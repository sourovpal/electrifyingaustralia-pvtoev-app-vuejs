import api from "./api";

const FetchAboutUs = ()=>{
    return new Promise((resolve, reject)=>{
        try{
            api.get(`/about-us`)
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

const UpdateAboutUs = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/about-us`, payload)
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
    FetchAboutUs,
    UpdateAboutUs
}
