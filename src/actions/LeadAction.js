import api from "./api";

const GetLeadDependencies = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            var query = new URLSearchParams(payload);
            api.get(`/leads/dependencies?${query.toString()}`)
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


const FetchLeads = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            var query = new URLSearchParams(payload);
            api.get(`/leads?${query.toString()}`)
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

const CreateNewLead = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads`, payload)
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

const UpdateLeadPropertieHeaders = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/properties`, payload)
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

const UpdateMultipelLeadStatus = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/status`, payload)
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

const DeleteMultipleLeads = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/delete`, payload)
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

const UpdateMultipelLeadOwner = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/owner`, payload)
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

const FetchLeadPipelineWithStage = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.get(`/leads/pipelines`, payload)
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

const ConfirmQualify = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/confirm-qualify`, payload)
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

const MoveLeadStatusToPipeline = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/move-lead`, payload)
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

const UpdateLeadConfidence = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/confidence`, payload)
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


const LeadPropertieUpdate = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/propertie/update`, payload)
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

const UpdateSubscribers = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post(`/leads/subscribers`, payload)
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

const LeadUpdate = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            return api.post(`/leads/update`, payload)
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
    FetchLeads,
    UpdateLeadPropertieHeaders,
    UpdateMultipelLeadStatus,
    CreateNewLead,
    DeleteMultipleLeads,
    UpdateMultipelLeadOwner,
    FetchLeadPipelineWithStage,
    ConfirmQualify,
    MoveLeadStatusToPipeline,
    UpdateLeadConfidence,
    LeadPropertieUpdate,
    UpdateSubscribers,
    LeadUpdate,
    GetLeadDependencies
}