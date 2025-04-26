import type { Model } from "@/types/model";
import Http from "./client";
import type { HttpPayload } from "@/types";

export default <Model>{
    find: async (payload: { [key: string]: string | number }) => await Http.get('/', payload),

    list: async (payload: { [key: string]: string | number }) => await Http.get('/', payload),

    all: async (payload: { [key: string]: string | number }) => await Http.get('/', payload),

    create: async (payload: { [key: string]: string | number }) => await Http.post('/', payload),

    update: async (payload: { [key: string]: string | number }) => await Http.put('/', payload),
    
    delete: async (query: HttpPayload) => await Http.delete(`/contacts/${query.id}/delete`),
}