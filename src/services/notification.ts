import type { HttpPayload } from "@/types";
import Http from "./client";

interface Model {
    all: Function,
    seen: Function,
    hide: Function,
    mark: Function,
};

export default <Model>{

    all: async (payload: HttpPayload) => await Http.get('/', payload),

    seen: async (query: HttpPayload) => await Http.get(`/notifications/${query?.id ?? 'all'}/seen`),

    hide: async (query: HttpPayload) => await Http.get(`/notifications/${query?.id ?? 'all'}/hide`),
    
    mark: async (query: HttpPayload) => await Http.get(`/notifications/${query?.id}/mark`),

}