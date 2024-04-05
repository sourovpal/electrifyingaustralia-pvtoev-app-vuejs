import api from "./api";

const FetchRoles = (payload)=>{
    return new Promise((resolve, reject)=>{
        api.get(`/roles`)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const FetchRolesWithPermissions = (payload)=>{
    return new Promise((resolve, reject)=>{
        api.get(`/roles/role-permissions`)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const CreateNewRole = (payload)=>{
    return new Promise((resolve, reject)=>{
        api.post(`/roles`, payload)
        .then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}


export {
    FetchRoles,
    FetchRolesWithPermissions,
    CreateNewRole
}