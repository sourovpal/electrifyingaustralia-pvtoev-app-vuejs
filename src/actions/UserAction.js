import api from "./api";

export const FetchUsersWithPagination = (payload) => {
    return new Promise((resolve, reject) => {
        api.get(`/users?page=${payload.page}&limit=${payload.limit}`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const SendInviteMail = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/users/invite`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const UpdateProfile = (id, payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/users/update/${id}`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const UpdateBasicDetails = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/users/basic-details`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const UpdateContactInformation = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/users/contact-info`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const UploadProfilePicture = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/users/upload/profile-pricure`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            return resolve(res.data);
        }).catch((error) => {
            return reject(error);
        });
    });
}

export const RemoveProfilePicture = () => {
    return new Promise((resolve, reject) => {
        api.post(`/users/remove/profile-pricure`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const FetchProfile = (id = null) => {
    return new Promise((resolve, reject) => {
        api.get(`/users/profile${id ? '/' + id : ''}`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const ChangePassword = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            api.post('/users/change/password', payload)
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

export const FetchSessions = () => {
    return new Promise((resolve, reject) => {
        api.get(`/users/sessions`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const SendEmailOtp = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/users/send/email-otp`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const ChangeEmailAddress = (payload) => {
    return new Promise((resolve, reject) => {
        api.post(`/users/change/email-address`, payload)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}

export const LogoutAction = (id = null) => {
    return new Promise((resolve, reject) => {
        api.post(`/users/logout${id ? '?token_id=' + id : ''}`)
            .then((res) => {
                return resolve(res.data);
            }).catch((error) => {
                return reject(error);
            });
    });
}
