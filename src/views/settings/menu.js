export const title = 'Settings'
export const menus =[
    {
        label:'Profile Settings',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#616E7C"><g><rect fill="none" height="24" width="24"></rect></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,6c1.93,0,3.5,1.57,3.5,3.5S13.93,13,12,13 s-3.5-1.57-3.5-3.5S10.07,6,12,6z M12,20c-2.03,0-4.43-0.82-6.14-2.88C7.55,15.8,9.68,15,12,15s4.45,0.8,6.14,2.12 C16.43,19.18,14.03,20,12,20z"></path></g></svg>`,
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
        icon:`<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#616E7C"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg>`,
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
        icon:`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#616E7C"><g><rect fill="none" height="24" width="24"></rect></g><g><g><g><polygon points="14,19.88 14,22 16.12,22 21.29,16.83 19.17,14.71"></polygon></g><g><path d="M20,8l-6-6H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H12v-2.95l8-8V8z M13,9V3.5L18.5,9H13z"></path></g><g><path d="M22.71,14L22,13.29c-0.39-0.39-1.02-0.39-1.41,0L19.88,14L22,16.12l0.71-0.71C23.1,15.02,23.1,14.39,22.71,14z"></path></g></g></g></svg>`,
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
        icon:`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#616E7C"><g><rect fill="none" height="24" width="24"></rect></g><g><g><polygon points="3.33,16 11,16 11,13 4,13"></polygon><polygon points="13,16 20.67,16 20,13 13,13"></polygon><polygon points="21.11,18 13,18 13,22 22,22"></polygon><polygon points="2,22 11,22 11,18 2.89,18"></polygon><rect height="3" width="2" x="11" y="8"></rect><rect height="3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.2089 14.6085)" width="2" x="16.53" y="6.06"></rect><rect height="2" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -3.448 6.7885)" width="3" x="4.97" y="6.56"></rect><rect height="2" width="3" x="3" y="2"></rect><rect height="2" width="3" x="18" y="2"></rect><path d="M12,7c2.76,0,5-2.24,5-5H7C7,4.76,9.24,7,12,7z"></path></g></g></svg>`,
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
        icon:`<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#616E7C"><path d="M0 0h24v24H0z" fill="none"></path><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></svg>`,
        children:[
            {
                label:'Pipelines & Lead statuses',
                path:'/settings/crm/leads',
                query:{},
                icon:'',
            },
            {
                label:'Email & CRM Sending',
                path:'/settings/crm/email',
                query:{},
                icon:'',
            },
            {
                label:'Task workflows',
                path:'/settings/crm/workflows',
                query:{},
                icon:'',
            },
            {
                label:'Lead provider emails',
                path:'/settings/crm/lead-provider-emails',
                query:{},
                icon:'',
            },
            {
                label:'Automations <span class="badge bg-success ms-2">NEW</span>',
                path:'/settings/crm/automations',
                query:{},
                icon:'',
            },
            {
                label:'Tags',
                path:'/settings/crm/tags',
                query:{},
                icon:'',
            },
            {
                label:'Lead Capture Forms <span class="badge bg-success ms-2">NEW</span>',
                path:'/settings/crm/lead-capture-forms',
                query:{},
                icon:'',
            },
        ]
    },
    {
        label:'Integrations & API',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#616E7C"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></svg>`,
        children:[
            {
                label:'Integrations',
                path:'/settings/integrations',
                query:{},
                icon:'',
            },
            {
                label:'API settings',
                path:'/settings/api',
                query:{},
                icon:'',
            },
        ]
    },
    {
        label:'Admin Settings',
        path:'',
        query:{},
        icon:`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20px" viewBox="0 0 24 24" width="20px" fill="#616E7C"><rect fill="none" height="24" width="24"></rect> <path d="M17,11c0.34,0,0.67,0.04,1,0.09V6.27L10.5,3L3,6.27v4.91c0,4.54,3.2,8.79,7.5,9.82c0.55-0.13,1.08-0.32,1.6-0.55 C11.41,19.47,11,18.28,11,17C11,13.69,13.69,11,17,11z"></path><path d="M17,13c-2.21,0-4,1.79-4,4c0,2.21,1.79,4,4,4s4-1.79,4-4C21,14.79,19.21,13,17,13z M17,14.38c0.62,0,1.12,0.51,1.12,1.12 s-0.51,1.12-1.12,1.12s-1.12-0.51-1.12-1.12S16.38,14.38,17,14.38z M17,19.75c-0.93,0-1.74-0.46-2.24-1.17 c0.05-0.72,1.51-1.08,2.24-1.08s2.19,0.36,2.24,1.08C18.74,19.29,17.93,19.75,17,19.75z"></path></svg>`,
        children:[
            {
                label:'Payment Gateway',
                path:'/payments',
                query:{},
                icon:'',
            },
            {
                label:'Team members',
                path:'/settings/team',
                query:{},
                icon:'',
            },
            {
                label:'Roles & access',
                path:'/settings/roles',
                query:{},
                icon:'',
            },
            {
                label:'Billing',
                path:'/settings/billing',
                query:{},
                icon:'',
            },
        ]
    },
]

