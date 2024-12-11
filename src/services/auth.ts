import type { HttpPayload } from "@/types";
import Http from "./client";

export default {
    login: async (payload: HttpPayload) => await Http.post('/login', payload),
    logout: async (payload: HttpPayload) => await Http.post('/settings/account/logout', payload),
    register: async (payload: HttpPayload) => await Http.post('/register', payload),
    forgot: async (payload: HttpPayload) => await Http.post('/forgot', payload),
    invited: async (payload: HttpPayload) => await Http.get('/register', payload), // Fetch Invited User for Register
    reset: async (payload: HttpPayload, query: string) => await Http.post('/reset?' + query, payload),
    validate: async (payload: HttpPayload) => await Http.get('/reset', payload), // Validate Token For Password Reset
}