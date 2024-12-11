import type { HttpPayload } from "@/types";
import type { Model } from "@/types/model";
import Http from "./client";

export default <Model>{

    find: async (payload: HttpPayload) => await Http.get('/', payload),

    all: async (payload: HttpPayload) => await Http.get("/platform/leads", payload),

    search: async (payload: HttpPayload) => await Http.post('/platform/leads/search', payload),

    updateOwner: async (payload: HttpPayload, query: HttpPayload) => await Http.put(`/platform/owners/${query.lead_id}/update`, payload),

    updateStatus: async (payload: HttpPayload, query: HttpPayload) => await Http.put(`/platform/status/${query.lead_id}/update`, payload),

    updateTeamMember: async (payload: HttpPayload, query: HttpPayload) => await Http.put(`/platform/deals/${query.lead_id}/team-members`, payload),

    create: async (payload: HttpPayload) => await Http.post("/platform/leads", payload),

    update: async (payload: HttpPayload) => await Http.put('/', payload),

    delete: async (payload: HttpPayload) => await Http.delete('/', payload),
    
}