import {useRoute} from 'vue-router'
import {ref} from 'vue'
import axios from '../../../../actions/api.js'
import { useToast } from 'vue-toast-notification';

function useRebateActions(emit, rebate) {
	const {params} = useRoute()
	const loading = ref(false)
    const toast = useToast();

	const handleRebateActiveStatusChange = async () => {
		loading.value = true
		try {
		    await axios.put(
			    `projects/${params.project_id}/rebate/${rebate.id}/rebate-active-state-update`,
			    { active: !Boolean(rebate.active) }
		    )
		    emit('item-updated');
		} catch (error) {
		    toast.error(error?.response?.data?.message ?? 'Something went wrong'); 
            console.log(error)
		} finally {
		    loading.value = false
		}
	}

	const handleDeleteClick = async () => {
		loading.value = true

		try {
            await axios.delete(`projects/${params.project_id}/rebates/${rebate.id}`)
		    emit('item-updated')
		} 
		catch (error) {
		    toast.error(error?.response?.data?.message ?? 'Something went wrong'); 
            console.log(error)
		}
		finally {
		    loading.value = false 
		}

		loading.value = false
		emit('item-updated')

	}

    const handleRebateUpdate = async (payload) => {
        loading.value = true
		try {
		    await axios.put(
		        `projects/${params.project_id}/rebates/${rebate.id}`,
		        payload
		    )

		    emit('item-updated')
		} catch (error) {
            toast.error(error?.response?.data?.message ?? 'Something went wrong, please check your inputs');
            console.log(error)
		} finally {
		    loading.value = false
		}
    }

	return {
		handleRebateActiveStatusChange,
		handleDeleteClick,
        handleRebateUpdate,
		loading,
	}
}

export default useRebateActions;
