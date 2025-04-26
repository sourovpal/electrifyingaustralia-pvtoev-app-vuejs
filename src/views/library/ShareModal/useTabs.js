import { ref, onMounted } from 'vue';

export function useTabs(emit) {
    const activeTab = ref('')

    const tabs = [
	    {name: 'esignature-input', label: 'Send e-Signature request'},
	    {name: 'send-proposal', label: 'Send proposal'},
    ]

    const handleTabClick = (tab) => {
	    emit('tab-click', tab)
	    activeTab.value = tab
    }

    // emittnig an event out of the tabs
    const handleShareBtnClick = () => {
        emit('tab-click', 'share-history');
        activeTab.value = 'share-history';
    }

    const setDefaultTab = () => {
	    emit('tab-click', tabs[0].name)
	    activeTab.value = tabs[0].name
    }

    onMounted(() => {
	    setDefaultTab()
    })

    return {
        tabs, emit, handleTabClick, handleShareBtnClick, activeTab
    }
}
