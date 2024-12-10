import type { Model } from "@/types/model";
import Http from "./client";

export default <Model>{
    find: async (payload: { [key: string]: string | number }) => await Http.get('/auth/me', payload),
    list: async (payload: { [key: string]: string | number }) => await Http.get('/', payload),
    all: async (payload: { [key: string]: string | number }) => await Http.get('/todos', payload),
    create: async (payload: { [key: string]: string | number }) => await Http.post('/', payload),
    update: async (payload: { [key: string]: string | number }) => await Http.put('/', payload),
    delete: async (payload: { [key: string]: string | number }) => await Http.delete('/', payload),
}