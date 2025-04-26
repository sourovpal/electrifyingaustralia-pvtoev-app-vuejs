import api from "./api";

const FetchAllStatus = () => {
    return new Promise((resolve, reject) => {
        api.get(`/statuses`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

const UpdateStatus = (payload)=>{
    return new Promise((resolve, reject)=>{
        try{
            api.post(`/statuses`, payload)
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
    FetchAllStatus,
    UpdateStatus
}