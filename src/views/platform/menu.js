export const title = 'Platform'
export const menus =[    
    {
        label:'Leads',
        path:'/platform/leads',
        query:{},
        icon:'',
        children:[
            {
                label:'All',
                path:'leads',
                query:{},
                icon:'',
            },
            {
                label:'New',
                path:'leads',
                query:{status:`${btoa('new')}`},
                icon:'',
            },
            {
                label:'Processing',
                path:'leads',
                query:{status:`${btoa('processing')}`},
                icon:'',
            },
            {
                label:'Today',
                path:'leads',
                query:{status:'today'},
                icon:'',
            },
            {
                label:'Future',
                path:'leads',
                query:{status:'future'},
                icon:'',
            },
            {
                label:'Unassigned',
                path:'leads',
                query:{status:'unassigned'},
                icon:'',
            },
        ]
    },
    {
        label:'Pipelines',
        path:'/platform/deals',
        query:{},
        icon:'',
        children:[
            {
                label:'All',
                path:'deals',
                query:{},
                icon:'',
            },
            {
                label:'New',
                path:'deals',
                query:{state:'new'},
                icon:'',
            },
            {
                label:'Processing',
                path:'deals',
                query:{state:'processing'},
                icon:'',
            },
            {
                label:'Today',
                path:'deals',
                query:{state:'today'},
                icon:'',
            },
            {
                label:'Future',
                path:'deals',
                query:{state:'future'},
                icon:'',
            },
            {
                label:'Unassigned',
                path:'deals',
                query:{state:'unassigned'},
                icon:'',
            },
        ]
    },
    {
        label:'Contacts',
        path:'/platform/contacts',
        query:{},
        icon:'',
        children:[
            {
                label:'All',
                path:'?status=all',
                query:{},
                icon:'',
            },
        ]
    },
]

