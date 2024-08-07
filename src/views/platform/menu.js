export const title = 'Platform';
import { useAppStore } from '../../stores/app';

export const menus = async () => {

    const appStore = useAppStore();
    
    const getLeadStatus = appStore.getLeadStatuses.map((item) => {
        return {
            label: item.name,
            path: '/platform/leads',
            query: { status: item.id },
            icon: item.is_lost == 1 ? 'fas fa-square-caret-down' : null,
        };
    });

    const getPipelineStages = appStore.getPipelines.map((item) => {
        return {
            label: item.title,
            path: '/platform/deals',
            query: { pipeline: item.id },
        };
    });

    const getFirstPipelineStage = ()=>{
        if(appStore.getPipelines?.length){
            var stage = appStore.getPipelines[0];
            if(stage){
                return {pipeline:btoa(stage.title)}
            }
        }
        return {}
    }


    try {
        return [
            {
                label: 'Tasks',
                path: '/platform/tasks',
                query: {},
                icon: 'fas fa-list-check',
                children: [
                    {
                        label: 'All',
                        path: 'tasks',
                        query: {},
                        icon: '',
                    },
                ].concat([])
            },
            {
                label: 'Leads',
                path: '/platform/leads',
                query: {},
                icon: 'fas fa-users',
                children: [
                    {
                        label: 'All',
                        path: '/platform/leads',
                        query: {},
                        icon: '',
                    },
                ].concat(getLeadStatus)
            },
            {
                label: 'Pipelines',
                path: '/platform/deals',
                query: {...getFirstPipelineStage()},
                icon: 'fas fa-sliders',
                children: [].concat(getPipelineStages)
            },
            {
                label: 'Contacts',
                path: '/platform/contacts',
                query: {},
                icon: 'fas fa-id-badge',
                children: [
                    {
                        label: 'All',
                        path: '/platform/contacts',
                        query: {},
                        icon: '',
                    },
                ]
            },
        ];
    } catch (error) {
        console.log(error)
    }

}
