import api from "./api";

const GetAppDependencies = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/app/dependencies`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export {
    GetAppDependencies
}