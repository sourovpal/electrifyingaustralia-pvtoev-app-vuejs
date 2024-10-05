import api from "./api";

const FetchAllPipelines = () => {
    return new Promise((resolve, reject) => {
        api.get(`/pipelines`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

const ChangePipelinePosition = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/pipelines/change-position`, payload)
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


const FetchPipelineWithStagesWithLeads = (payload) => {
    return new Promise((resolve, reject) => {
        try {

            try {
                delete payload['view'];
            } catch (error) { }

            var query = new URLSearchParams(payload);
            api.get(`/pipelines/stages-leads?${query.toString()}`)
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

const FetchLeadsByPipelineStageId = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            var query = new URLSearchParams(payload);
            api.get(`/pipelines/stage/leads?${query.toString()}`)
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

const FindPipeline = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.get(`/pipelines/${payload.id}`)
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
    FetchAllPipelines,
    ChangePipelinePosition,
    FetchPipelineWithStagesWithLeads,
    FetchLeadsByPipelineStageId,
    FindPipeline,
    UpdateOrCreatePipelines,
}