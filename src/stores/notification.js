import { useApiRequest } from "@actions";
import { defineStore } from 'pinia';
import Storage from "@helpers/Storage";
const storeUnseen = new Storage('unseen');

export const useNotificationStore = defineStore('notification', {

    state: () => {
        return {
            isComplete: false,
            isLoading: false,
            notifications: [],
            seenAll: false,
            hideAll: false,
            totalUnseen: storeUnseen.get() ?? 0,
            pagination: {
                total: 0,
                per_page: 15,
                current_page: 1,
                next_page: null,
                prev_page: null,
                last_page: 0,
                from: 0,
                to: 0
            },
        }
    },

    getters: {
        getIsLoading(stage) {
            return stage.isLoading;
        },
        getIsComplete(stage) {
            return stage.isComplete;
        },
        getNotifications(stage) {
            return stage.notifications;
        },
        getSeenAll(stage) {
            return stage.seenAll;
        },
        getHideAll(stage) {
            return stage.hideAll;
        },
        getUnseen(stage) {
            return stage.totalUnseen;
        }
    },
    actions: {
        setIsLoading(payload) {
            this.isLoading = payload;
        },
        setIsComplete(payload) {
            this.isComplete = payload;
        },
        setNotifications(payload, reset = false) {
            if (reset) return this.notifications = [];
            if (!Array.isArray(payload)) return;
            if (!this.notifications?.length) return this.notifications = payload;
            return this.notifications = this.notifications.concat(payload);
        },
        setPagination(payload) {
            if (payload) {
                this.pagination = payload;
            }
        },
        setSeenAll() {
            this.seenAll = !this.seenAll;
            this.setTotalUnseen(0);
        },
        setHideAll() {
            this.hideAll = !this.hideAll;
            this.setTotalUnseen(0);
        },
        setTotalUnseen(payload = null, seen = null) {
            if (typeof payload === 'number' && !isNaN(payload) && !seen) {
                storeUnseen.set(payload)
                return this.totalUnseen = payload;
            }
            if (seen) {
                this.totalUnseen = Math.ceil(this.totalUnseen - 1);
                storeUnseen.set(this.totalUnseen);
            }
        },
        callFetchNotifications() {
            this.setIsLoading(true);
            this.setIsComplete(false);
            let page = 1;
            if (this.pagination.next_page && this.notifications?.length) {
                page = this.pagination.next_page;
            }
            useApiRequest({
                url: `/notifications?page=${page}&limit=10`,
            }).then(res => {
                const { success, message, notifications, unseen, pagination } = res;
                this.setIsLoading(false);
                if (success) {
                    this.setPagination(pagination);
                    this.setNotifications(notifications);
                    this.setTotalUnseen(unseen);
                    if (!pagination.next_page) this.setIsComplete(true);
                }
            }).catch(error => {
                this.setIsLoading(false);
            }).finally(() => {
                this.setIsLoading(false);
            });
        }
    }

});
