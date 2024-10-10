import { useToast } from "vue-toast-notification";
import axios from "../../../../actions/api";
import { useProjectStore } from "../../../../stores/project";

function updateCustomSettingsActions(formData, loading) {
    const toast = useToast();
    const projectStore = useProjectStore();
    const projectId = projectStore.getProjectId;

    const getCustomSettingsDetails = () => {
        loading.value = true;
        axios.get(`projects/${projectId}/custom_settings`)
            .then(res => formData.value = res.data)
            .catch(e => {
                toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
                console.log(e);
            })
            .finally(() => loading.value = false)
    }

    const updateCustomSettings = () => {
        loading.value = true;
        axios.put(`projects/${projectId}/custom_settings/${formData.value.id}`, formData.value)
            .then(res => {
                toast.success(res?.data?.message ?? 'Operation successful');
                getCustomSettingsDetails();
            })
            .catch(e => {
                toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
                console.log(e);
            })
            .finally(() => loading.value = false)
    }

    const cancelInstallationDate = () => {
        const payload = { ...formData.value, installation_date:	null }

        axios.put(`projects/${projectId}/custom_settings/${formData.value.id}`, payload)
            .then(res => {
                toast.success(res?.data?.message ?? 'Operation successful');
                getCustomSettingsDetails();
            })
            .catch(e => {
                toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
                console.log(e);
            })
            .finally(() => loading.value = false)
    }

    const cancelValidityDate = () => {
        const payload = { ...formData.value, valid_date: null }

        axios.put(`projects/${projectId}/custom_settings/${formData.value.id}`, payload)
            .then(res => {
                toast.success(res?.data?.message ?? 'Operation successful');
                getCustomSettingsDetails();
            })
            .catch(e => {
                toast.error(e?.response?.data?.message ?? 'Oops, something went wrong');
                console.log(e);
            })
            .finally(() => loading.value = false)
    }

    return {
        cancelInstallationDate,
        cancelValidityDate,
        updateCustomSettings,
        getCustomSettingsDetails
    }
}

export default updateCustomSettingsActions;
