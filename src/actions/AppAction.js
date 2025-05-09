import api from "./api";

export const FetchTimezoneList = () => {
    return new Promise((resolve, reject) => {
        api.get(`/app/timezones`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const FetchCountriesList = () => {
    return new Promise((resolve, reject) => {
        api.get(`/app/countries`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}