import api from "./api";

const FetchUsers = (payload)=>{
    return new Promise((resolve, reject)=>{
        api.get(`/users?page=${payload.page}&limit=${payload.limit}`)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const InviteMember = (payload)=>{
    return new Promise((resolve, reject)=>{
        api.post(`/users/invite`, payload)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const UpdateTeamMember = (payload, id)=>{
    return new Promise((resolve, reject)=>{
        api.post(`/users/update/${id}`, payload)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

export {
    FetchUsers,
    InviteMember,
    UpdateTeamMember
}