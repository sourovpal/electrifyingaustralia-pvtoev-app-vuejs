export const title = 'Platform';
import { useAppStore } from '../../stores/app';

const lostIcon = `<svg class="svg-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>`;

export const menus = async () => {

    const appStore = useAppStore();
    
    const getLeadStatus = appStore.getLeadStatuses.map((item) => {
        return {
            label: item.name,
            path: '/platform/leads',
            query: { status: btoa(item.name) },
            icon: item.is_lost == 1 ? lostIcon : null,
        };
    });

    const getPipelineStages = appStore.getPipelines.map((item) => {
        return {
            label: item.title,
            path: '/platform/deals',
            query: { pipeline: btoa(item.title) },
            icon: '',
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
                icon: '',
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
                icon: '',
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
                icon: '',
                children: [].concat(getPipelineStages)
            },
            {
                label: 'Contacts',
                path: '/platform/contacts',
                query: {},
                icon: '',
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
