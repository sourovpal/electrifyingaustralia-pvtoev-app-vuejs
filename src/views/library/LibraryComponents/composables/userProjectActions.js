import { useToast } from "vue-toast-notification";
import axios from "../../../../actions/api";
import { useProjectStore } from "../../../../stores/project.js";

function useProjectActions() {

    const projectStore = useProjectStore();
    const toast = useToast();

    const toggleProjectArchivedState = (projectId) => {
        const payload = { archive: !projectStore?.project?.archived };
        axios.put(`projects/${projectId}/archive`, payload)
            .then(res => {
                toast.success(res?.data?.message ?? 'Operation successful');
                projectStore.setProjectList();
                projectStore.setCurrentProject(projectId);
            })
            .catch(e => {
                toast.error('Something went wrong');
                console.log(e)
            })
    }

    const toggleMarkAsSoldState = (projectId) => {
        const payload = { is_sold: !projectStore?.project?.marked_as_sold };
        axios.put(`projects/${projectId}/mark-as-sold`, payload)
            .then(res => {
                toast.success(res?.data?.message ?? 'Operation successful');
                projectStore.setProjectList();
                projectStore.setCurrentProject(projectId);
            })
            .catch(e => {
                toast.error('Something went wrong');
                console.log(e)
            })
    }

	return {
        toggleProjectArchivedState,
        toggleMarkAsSoldState,
	}
}

export default useProjectActions;
