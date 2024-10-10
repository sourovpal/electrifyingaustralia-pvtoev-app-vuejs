import { useApiRequest } from "@actions";
import { defineStore } from 'pinia';

export const useNotification = defineStore('notification', {

    state: () => {
        return {
            isLoading: false,
            notifications: [],
            pagination: {
                "total": 0,
                "per_page": 15,
                "current_page": 1,
                "next_page": null,
                "prev_page": null,
                "last_page": 0,
                "from": 0,
                "to": 0
            },
        }
    },

    getters: {
        getIsLoading(stage) {
            return stage.isLoading;
        },
        getNotifications(stage) {
            return stage.notifications;
        }
    },
    actions: {
        setIsLoading(payload) {
            this.isLoading = payload;
        },
        setNotifications(payload) {
            if (Array.isArray(payload)) {
                this.notifications = payload;
            }
        },
        setPagination(payload) {
            if (payload) {
                this.pagination = payload;
            }
        },
        callFetchNotifications() {
            this.setIsLoading(true);
            useApiRequest({
                url: '/notifications',
            }).then(res => {
                const { success, message, notifications, pagination } = res;
                this.setIsLoading(false);
                if (success) {
                    this.setNotifications(notifications);
                    this.setPagination(pagination);
                }
            }).catch(error => {
                this.setIsLoading(false);
            }).finally(() => {
                this.setIsLoading(false);
            });
        }
    }

});
