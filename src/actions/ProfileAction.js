import axios from "axios";

const FetchProfile = (active_users=0)=>{
    return new Promise((resolve, reject)=>{
        axios.get(`/profile${active_users>0?'?active_users=1':''}`)
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

const UpdateProfilePassword = (payload)=>{
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
    UpdateProfile,
    UpdateProfilePassword
}