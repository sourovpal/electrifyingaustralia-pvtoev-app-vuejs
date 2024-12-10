import type { HttpPlyload } from "@/types";
import Http from "./client";

export default {
    login: async (payload: HttpPlyload) => await Http.post('/login', payload),
    logout: async (payload: HttpPlyload) => await Http.post('/settings/account/logout', payload),
    register: async (payload: HttpPlyload) => await Http.post('/register', payload),
    forgot: async (payload: HttpPlyload) => await Http.post('/forgot', payload),
    invited: async (payload: HttpPlyload) => await Http.get('/register', payload), // Fetch Invited User for Register
    reset: async (payload: HttpPlyload, query: string) => await Http.post('/reset?' + query, payload),
    validate: async (payload: HttpPlyload) => await Http.get('/reset', payload), // Validate Token For Password Reset
}