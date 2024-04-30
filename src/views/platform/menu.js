export const title = 'Platform';

export const menus = async({lead_statuses, pipelines})=>{
    return await new Promise(async(resolve, reject)=>{
        try{
            return resolve([    
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
                        ].concat(lead_statuses)
                    },
                    {
                        label:'Pipelines',
                        path:'/platform/deals',
                        query:{},
                        icon:'',
                        children:[].concat(pipelines)
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
            );
        }catch(error){
            return reject(error);
        }
    }) 

}
