import api from "./api";

const FetchContact = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            var query = new URLSearchParams(payload);
            api.get(`/contacts?${query.toString()}`)
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
    FetchContact
}