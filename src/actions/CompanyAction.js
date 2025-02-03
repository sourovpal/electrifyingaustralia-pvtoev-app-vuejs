import api from "./api";

export const FetchComapny = () => {
    return new Promise((resolve, reject) => {
        api.get(`/settings/company`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const UpdateContactInformation = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/settings/company/contact-information`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const UpdateSocialDetails = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/company/social-details`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const UpdateTimezone = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/company/timezone`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const UploadCompanyLogo = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/company/logo/upload`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const RemoveCompanyLogo = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/company/logo/remove`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

