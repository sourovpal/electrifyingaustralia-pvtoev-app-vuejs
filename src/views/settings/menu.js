export const title = 'Settings'
export const menus =[
    {
        label:'Your Settings',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#616E7C"><g><rect fill="none" height="24" width="24"></rect></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,6c1.93,0,3.5,1.57,3.5,3.5S13.93,13,12,13 s-3.5-1.57-3.5-3.5S10.07,6,12,6z M12,20c-2.03,0-4.43-0.82-6.14-2.88C7.55,15.8,9.68,15,12,15s4.45,0.8,6.14,2.12 C16.43,19.18,14.03,20,12,20z"></path></g></svg>`,
        children:[
            {
                label:'Profile',
                path:'/settings/profile',
                query:{},
                icon:'',
            },
            {
                label:'Account',
                path:'/settings/account',
                query:{},
                icon:'',
            },
            {
                label:'Notifications',
                path:'/settings/notifications',
                query:{},
                icon:'',
            },
            {
                label:'Refer a friend',
                path:'/settings/refer',
                query:{},
                icon:'',
            },
        ]
    },
    {
        label:'Company Settings',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#616E7C"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg>`,
        children:[
            {
                label:'Company details',
                path:'/settings/company',
                query:{},
                icon:'',
            },
            {
                label:'Localization',
                path:'/settings/localization',
                query:{},
                icon:'',
            },
            {
                label:'Accreditations',
                path:'/settings/accreditations',
                query:{},
                icon:'',
            },
            {
                label:'Installers list',
                path:'/settings/installers',
                query:{},
                icon:'',
            },
        ]
    },
    {
        label:'Proposal Settings',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#616E7C"><g><rect fill="none" height="24" width="24"></rect></g><g><g><g><polygon points="14,19.88 14,22 16.12,22 21.29,16.83 19.17,14.71"></polygon></g><g><path d="M20,8l-6-6H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H12v-2.95l8-8V8z M13,9V3.5L18.5,9H13z"></path></g><g><path d="M22.71,14L22,13.29c-0.39-0.39-1.02-0.39-1.41,0L19.88,14L22,16.12l0.71-0.71C23.1,15.02,23.1,14.39,22.71,14z"></path></g></g></g></svg>`,
        children:[
            {
                label:'Proposal preferences',
                path:'/settings/proposals',
                query:{},
                icon:'',
            },
            {
                label:'About us',
                path:'/settings/about-us',
                query:{},
                icon:'',
            },
            {
                label:'Proposal legals',
                path:'/settings/proposal-legals',
                query:{},
                icon:'',
            },
        ]
    },
    {
        label:'Solar Design',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#616E7C"><g><rect fill="none" height="24" width="24"></rect></g><g><g><polygon points="3.33,16 11,16 11,13 4,13"></polygon><polygon points="13,16 20.67,16 20,13 13,13"></polygon><polygon points="21.11,18 13,18 13,22 22,22"></polygon><polygon points="2,22 11,22 11,18 2.89,18"></polygon><rect height="3" width="2" x="11" y="8"></rect><rect height="3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.2089 14.6085)" width="2" x="16.53" y="6.06"></rect><rect height="2" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -3.448 6.7885)" width="3" x="4.97" y="6.56"></rect><rect height="2" width="3" x="3" y="2"></rect><rect height="2" width="3" x="18" y="2"></rect><path d="M12,7c2.76,0,5-2.24,5-5H7C7,4.76,9.24,7,12,7z"></path></g></g></svg>`,
        children:[
            {
                label:'Design defaults',
                path:'/settings/design',
                query:{},
                icon:'',
            },
            {
                label:'Component prices',
                path:'/settings/component-prices',
                query:{},
                icon:'',
            },
            {
                label:'Line item packages',
                path:'/settings/packages',
                query:{},
                icon:'',
            },
            {
                label:'Job sheets',
                path:'/settings/job-sheets',
                query:{},
                icon:'',
            },
            {
                label:'Custom financing',
                path:'/settings/financing',
                query:{},
                icon:'',
            },
            {
                label:'E-signature requests',
                path:'/settings/esignature',
                query:{},
                icon:'',
            },
            {
                label:'Templates',
                path:'/settings/email-templates',
                query:{},
                icon:'',
            },
        ]
    },
    {
        label:'CRM Settings',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#616E7C"><path d="M0 0h24v24H0z" fill="none"></path><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></svg>`,
        children:[
            {
                label:'Pipelines & Lead statuses',
                path:'/crm/leads',
                query:{},
                icon:'',
            },
            {
                label:'Email & CRM Sending',
                path:'/crm/email',
                query:{},
                icon:'',
            },
            {
                label:'Task workflows',
                path:'/crm/workflows',
                query:{},
                icon:'',
            },
            {
                label:'Lead provider emails',
                path:'/crm/lead-provider-emails',
                query:{},
                icon:'',
            },
            {
                label:'Automations',
                path:'/crm/automations',
                query:{},
                icon:'',
            },
            {
                label:'Tags',
                path:'/crm/tags',
                query:{},
                icon:'',
            },
            {
                label:'Lead Capture Forms',
                path:'/crm/lead-capture-forms',
                query:{},
                icon:'',
            },
        ]
    },
    {
        label:'Company Settings',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#616E7C"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg>`,
        children:[
            {
                label:'Company details',
                path:'/settings/company',
                query:{},
                icon:'',
            },
            {
                label:'Company details',
                path:'/settings/localization',
                query:{},
                icon:'',
            },
            {
                label:'Accreditations',
                path:'/settings/accreditations',
                query:{},
                icon:'',
            },
            {
                label:'Installers list',
                path:'/settings/installers',
                query:{},
                icon:'',
            },
        ]
    },
    {
        label:'Company Settings',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#616E7C"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg>`,
        children:[
            {
                label:'Company details',
                path:'/settings/company',
                query:{},
                icon:'',
            },
            {
                label:'Company details',
                path:'/settings/localization',
                query:{},
                icon:'',
            },
            {
                label:'Accreditations',
                path:'/settings/accreditations',
                query:{},
                icon:'',
            },
            {
                label:'Installers list',
                path:'/settings/installers',
                query:{},
                icon:'',
            },
        ]
    },
]

