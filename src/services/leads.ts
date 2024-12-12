import type { HttpPayload } from "@/types";
import type { Model } from "@/types/model";
import Http from "./client";

export default <Model>{

    find: async (payload: HttpPayload) => await Http.get('/', payload),

    all: async (payload: HttpPayload) => await Http.get("/platform/leads", payload),

    search: async (payload: HttpPayload) => await Http.post('/platform/leads/search', payload),

    create: async (payload: HttpPayload) => await Http.post("/platform/leads", payload),

    uploadFile: async (payload: HttpPayload, query: HttpPayload, options: object) => await Http.post(`/platform/files/${query.lead_id}/upload`, payload, options),

    updateOwner: async (payload: HttpPayload, query: HttpPayload) => await Http.put(`/platform/owners/${query.lead_id}/update`, payload),
    
    updateNote: async (payload: HttpPayload, query: HttpPayload) => await Http.put(`/platform/deals/${query.lead_id}/notes`, payload),

    updateStatus: async (payload: HttpPayload, query: HttpPayload) => await Http.put(`/platform/status/${query.lead_id}/update`, payload),

    updateTeamMember: async (payload: HttpPayload, query: HttpPayload) => await Http.put(`/platform/deals/${query.lead_id}/team-members`, payload),

    update: async (payload: HttpPayload) => await Http.put('/', payload),

    deleteFile: async (query: HttpPayload) => await Http.delete(`/platform/files/${query.file_id}/delete/${query.filename}`),

    delete: async (payload: HttpPayload) => await Http.delete('/', payload),

}