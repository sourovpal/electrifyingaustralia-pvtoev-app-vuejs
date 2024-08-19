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


const CreateContact = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/contacts`, payload)
                .then((res) => {
                    return resolve(res.data);
                }).catch((error) => {
                    return reject(error);
                });
        } catch (error) {
            return reject(error);
        }
    });
}

const UpdateContact = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/contacts/update`, payload)
                .then((res) => {
                    return resolve(res.data);
                }).catch((error) => {
                    return reject(error);
                });
        } catch (error) {
            return reject(error);
        }
    });
}

const SearchContact = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/contact/search`, payload)
                .then((res) => {
                    return resolve(res.data);
                }).catch((error) => {
                    return reject(error);
                });
        } catch (error) {
            return reject(error);
        }
    });
}

const DeleteContact = (id) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/contact/${id}`)
                .then((res) => {
                    return resolve(res.data);
                }).catch((error) => {
                    return reject(error);
                });
        } catch (error) {
            return reject(error);
        }
    });
}

export {
    FetchContact,
    CreateContact,
    SearchContact,
    UpdateContact,
    DeleteContact
}