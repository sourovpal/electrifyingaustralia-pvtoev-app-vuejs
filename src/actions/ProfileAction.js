import axios from "axios";

const FetchProfile = ()=>{
    return new Promise((resolve, reject)=>{
        axios.get('/profile')
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const UpdateProfile = (payload)=>{
    return new Promise((resolve, reject)=>{
        axios.put('/profile', payload)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}



export{
    FetchProfile,
    UpdateProfile
}