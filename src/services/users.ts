import type { HttpPayload } from "@/types";
import type { Model } from "@/types/model";
import Http from "./client";

export default <Model>{

    find: async (payload: HttpPayload) => await Http.get('/auth/me', payload),

    list: async (payload: HttpPayload) => await Http.get('/', payload),

    all: async (payload: HttpPayload) => await Http.get('/todos', payload),

    create: async (payload: HttpPayload) => await Http.post('/', payload),

    update: async (payload: HttpPayload) => await Http.put('/', payload),

    delete: async (payload: HttpPayload) => await Http.delete('/', payload),
    
}