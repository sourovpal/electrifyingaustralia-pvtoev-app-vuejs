import axios from "axios";

const FetchComapny = ()=>{
    return new Promise((resolve, reject)=>{
        axios.get(`/company`)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

export {
    FetchComapny
}