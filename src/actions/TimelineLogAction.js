import api from "./api";

const FetchTimelineLogs = (payload={}) => {
    return new Promise((resolve, reject) => {
        try {
            var query = new URLSearchParams(payload);
            api.get(`/timelines?${query.toString()}`)
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
    FetchTimelineLogs,
}