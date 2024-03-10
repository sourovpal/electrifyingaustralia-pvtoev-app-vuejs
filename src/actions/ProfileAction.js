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
        axios.post('/profile', payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        })
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