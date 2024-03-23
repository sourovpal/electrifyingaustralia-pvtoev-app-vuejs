// import {FetchLeadStatus} from '../../actions/CrmLeads';
// const lostIcon = `<svg class="svg-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>`;


// async function getLeadStatus(){
//     const output = [];
//     const res = await FetchLeadStatus();
    
//     try{
//         const {lead_statuses} = res;
//         output['lead_statuses'] = lead_statuses.map((item)=>{
//             return {
//                 label:item.name,
//                 path:'/platform/leads',
//                 query:{status:btoa(item.name)},
//                 icon:item.is_lost==1?lostIcon:null,
//             };
//         });

//         return output;
//     }catch(error){
//         return [];
//     }
// }


export const title = 'Platform';

export const menus = async({lead_statuses})=>{
    return await new Promise(async(resolve, reject)=>{
        try{
            // const {lead_statuses} = await getLeadStatus();
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
            );
        }catch(error){
            return reject(error);
        }
    }) 

}
