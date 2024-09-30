export const title = 'Platform';
import { useAppStore } from '../../stores/app';

export const menus = async () => {

    const appStore = useAppStore();

    const getLeadStatus = appStore.getLeadStatuses.map((item) => {
        return {
            label: item.name,
            path: '/platform/leads',
            query: { status: item.status_id },
            icon: item.is_lost == 1 ? 'fas fa-square-caret-down' : null,
        };
    });

    const getPipelineStages = appStore.getPipelines.map((item) => {
        return {
            label: item.title,
            path: '/platform/deals',
            query: { pipeline: item.pipeline_id },
        };
    });

    const getFirstPipelineStage = () => {
        if (appStore.getPipelines?.length) {
            var stage = appStore.getPipelines[0];
            if (stage) {
                return { pipeline: btoa(stage.title) }
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
                        label: 'Today',
                        path: 'tasks',
                        query: {},
                        icon: '',
                    },
                    {
                        label: 'Complete',
                        path: 'tasks',
                        query: {stage: 'complete'},
                        icon: '',
                    },
                    {
                        label: 'In Complete',
                        path: 'tasks',
                        query: {stage: 'in-complete'},
                        icon: '',
                    },
                    {
                        label: 'Upcoming',
                        path: 'tasks',
                        query: { stage: 'upcoming' },
                        icon: '',
                    },
                    {
                        label: 'Overdue',
                        path: 'tasks',
                        query: { stage: 'overdue' },
                        icon: '',
                    },
                    {
                        label: 'Unassigned',
                        path: 'tasks',
                        query: { stage: 'unassigned' },
                        icon: '',
                    },
                    {
                        label: 'Unscheduled',
                        path: 'tasks',
                        query: { stage: 'unscheduled' },
                        icon: '',
                    },
                ]
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
                query: { ...getFirstPipelineStage() },
                icon: 'fas fa-sliders',
                children: [].concat(getPipelineStages)
            },
            {
                label: 'Contacts',
                path: '/platform/contacts',
                query: {},
                icon: 'fas fa-id-badge',
                children: [
                ]
            },
        ];
    } catch (error) {
        console.log(error)
    }

}
