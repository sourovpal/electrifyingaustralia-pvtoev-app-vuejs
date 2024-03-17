import api from "./api";

const FetchProfile = (active_users=0)=>{
    return new Promise((resolve, reject)=>{
        api.get(`/profile${active_users>0?'?active_users=1':''}`)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const UpdateProfile = (payload)=>{
    return new Promise((resolve, reject)=>{
        api.post('/profile', payload, {
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
        try{
            api.post('/profile/password', payload)
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
    FetchProfile,
    UpdateProfile,
    UpdateProfilePassword
}