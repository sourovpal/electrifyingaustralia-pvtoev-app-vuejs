export const title = 'Platform';

export const menus = async({lead_statuses, pipelines})=>{
    return await new Promise(async(resolve, reject)=>{
        try{
            return resolve([    
                    {
                        name:'tasks',
                        label:'Tasks',
                        path:'/platform/tasks',
                        query:{},
                        icon:'',
                        children:[
                            {
                                label:'All',
                                path:'tasks',
                                query:{},
                                icon:'',
                            },            
                        ].concat([])
                    },
                    {
                        name:'leads',
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
                        ].concat(lead_statuses)
                    },
                    {
                        name:'pipeline',
                        label:'Pipelines',
                        path:'/platform/deals',
                        query:{},
                        icon:'',
                        children:[].concat(pipelines)
                    },
                    {
                        name:'contacts',
                        label:'Contacts',
                        path:'/platform/contacts',
                        query:{},
                        icon:'',
                        children:[
                            {
                                label:'All',
                                path:'/platform/contacts',
                                query:{},
                                icon:'',
                            },
                        ]
                    },
                ]
            );
        }catch(error){
            return reject(error);
        }
    }) 

}
