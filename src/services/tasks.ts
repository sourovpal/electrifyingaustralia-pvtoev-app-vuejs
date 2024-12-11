import type { Model } from "@/types/model";
import Http from "./client";
import type { HttpPayload } from "@/types";

export default <Model>{

    find: async (payload: HttpPayload) => await Http.get('/', payload),

    list: async (payload: HttpPayload) => await Http.get('/', payload),

    all: async (payload: HttpPayload) => await Http.get('/platform/tasks', payload),

    updateStage: async (payload: HttpPayload, query: HttpPayload) => await Http.put(`/platform/tasks/${query.lead_id}/${query.task_id}/stage`, payload),
    
    create: async (payload: HttpPayload) => await Http.post('/', payload),

    update: async (payload: HttpPayload) => await Http.put('/', payload),
    
    delete: async (payload: HttpPayload) => await Http.delete('/', payload),
}