import { createRouter, createWebHistory} from "vue-router";

import { isAuthorized, checkPermission } from "../stores/auth";

const loginPath = '/login';

const routes = [
    {
        name:'Website',
        path:'/',
        component:()=>import('../components/WebSite.vue'),
        redirect: "/app",
    },
    { 
        name:"root",
        path:'/',
        component:()=>import('../components/Master.vue'),
        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
        children: [
            { 
                name:"AppPath",
                path: '/app',
                component:()=>import('../views/home/HomeIndex.vue'),
                beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                meta:{
                    title:'Home Page',
                },
                children: [
                ]
            },
            { 
                name:"PlatformIndexPath",
                path: '/platform',
                component:()=>import('../views/platform/PlatformIndex.vue'),
                beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                meta:{
                    title:'Home Page',
                },
                redirect: "/platform/leads",
                children: [
                    {
                        name:"tasks",
                        path:'tasks',
                        component:()=>import('../views/platform/lead/LeadIndexPage.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                        children:[],
                    },
                    {
                        name:"leads",
                        path:'leads',
                        component:()=>import('../views/platform/lead/LeadIndexPage.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                        children:[],
                    },
                    {
                        name:"leadsEdit",
                        path:'leads/:id',
                        component:()=>import('../views/platform/lead/LeadEditTimelinePage.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                        children:[],
                    },
                    {
                        name:"deals",
                        path:'deals',
                        component:()=>import('../views/platform/pipline/DealsIndexPage.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                        children:[],
                    },
                    {
                        name:"contacts",
                        path:'contacts',
                        component:()=>import('../views/platform/contacts/ContactsIndexPage.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                        children:[],
                    }
                ]
            },
            { 
                name:"MapIndex",
                path: '/map',
                component:()=>import('../views/map/MapIndex.vue'),
                beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                meta:{
                    title:'Home Page',
                },
                children: [
                ]
            },
            { 
                name:"LibraryIndex",
                path: '/library',
                component:()=>import('../views/library/LibraryIndex.vue'),
                beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                meta:{
                    title:'Home Page',
                },
                children: [
                ]
            },
            { 
                name:"PaymentIndex",
                path: '/payments',
                component:()=>import('../views/payment/PaymentIndex.vue'),
                beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                meta:{
                    title:'Home Page',
                },
                children: [
                ]
            },
            { 
                name:"SettingsIndex",
                path: '/settings',
                redirect: "/settings/profile",
                component:()=>import('../views/settings/SettingsIndex.vue'),
                beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                meta:{
                    title:'Home Page',
                },
                children: [
                    {
                        name:'ProfileSettingPage',
                        path:'profile',
                        component:()=>import('../views/settings/profile/ProfileIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsAccountPage',
                        path:'account',
                        component:()=>import('../views/settings/account/AccountIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsNotificationPage',
                        path:'notifications',
                        component:()=>import('../views/settings/notifications/NotificationsIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsReferPage',
                        path:'refer',
                        component:()=>import('../views/settings/refer/ReferIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsCompanyDetailsPage',
                        path:'company',
                        component:()=>import('../views/settings/company/CompanyDetailsIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsLocalizationPage',
                        path:'Localization',
                        component:()=>import('../views/settings/localization/LocalizationIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsInstallersPage',
                        path:'installers',
                        component:()=>import('../views/settings/installers/InstallersIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsInstallerCreate',
                        path:'installers/new',
                        component:()=>import('../views/settings/installers/InstallerCreate.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsInstallerEdit',
                        path:'installers/edit/:id',
                        component:()=>import('../views/settings/installers/InstallerEdit.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsProposalPage',
                        path:'proposals',
                        component:()=>import('../views/settings/proposal/PreferenceIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsAboutPage',
                        path:'about-us',
                        component:()=>import('../views/settings/about/AboutIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SettingsLegalsPage',
                        path:'proposal-legals',
                        component:()=>import('../views/settings/proposal-legals/LegalsIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'ProposalLegalsWarranty',
                        path:'proposal-legals/warranty',
                        component:()=>import('../views/settings/proposal-legals/ProposalWarranty.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'SolarDesignIndex',
                        path:'design',
                        component:()=>import('../views/settings/solardesign/SolarDesignIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'ComponentPriceIndex',
                        path:'component-prices',
                        component:()=>import('../views/settings/component/ComponentPriceIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'PackageIndex',
                        path:'packages',
                        component:()=>import('../views/settings/packages/PackageIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'JobShootIndex',
                        path:'job-sheets',
                        component:()=>import('../views/settings/job/JobSheetsIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'FinancingIndex',
                        path:'financing',
                        component:()=>import('../views/settings/financing/FinancingIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'EmailTemplatesIndex',
                        path:'email-templates',
                        component:()=>import('../views/settings/email-templates/EmailTemplatesIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'RolesIndex',
                        path:'roles',
                        component:()=>import('../views/settings/roles/RolesIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'RoleEdit',
                        path:'roles/edit/:id',
                        component:()=>import('../views/settings/roles/EditRole.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'TeamMemberIndex',
                        path:'team-members',
                        component:()=>import('../views/settings/team/TeamMemberIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'BillingIndex',
                        path:'billing',
                        component:()=>import('../views/settings/billing/BillingIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'ApiIndex',
                        path:'api',
                        component:()=>import('../views/settings/api/ApiIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'Apilogs',
                        path:'api/logs',
                        component:()=>import('../views/settings/api/Apilogs.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'ApiEventLogs',
                        path:'api/event-logs',
                        component:()=>import('../views/settings/api/EventLogs.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'ApiEventDetails',
                        path:'api/event-logs/details/:id',
                        component:()=>import('../views/settings/api/EventDetails.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'IntegrationsIndex',
                        path:'integrations',
                        component:()=>import('../views/settings/integrations/IntegrationsIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'EsignatureIndex',
                        path:'esignature',
                        component:()=>import('../views/settings/esignature/EsignatureIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'AccreditationIndex',
                        path:'accreditations',
                        component:()=>import('../views/settings/accreditation/AccreditationIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                ]
            },
            { 
                name:"CrmIndex",
                path: '/settings/crm',
                component:()=>import('../views/settings/SettingsIndex.vue'),
                beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                children: [
                    {
                        name:'EmailIndex',
                        path:'email',
                        component:()=>import('../views/settings/crm/email/EmailIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'LeadProviderEmailIndex',
                        path:'lead-provider-emails',
                        component:()=>import('../views/settings/crm/lead-provider-email/LeadProviderEmailIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'LeadsIndex',
                        path:'leads',
                        component:()=>import('../views/settings/crm/leads/LeadsIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'LeadCustomProperties',
                        path:'leads/properties',
                        component:()=>import('../views/settings/crm/leads/CustomProperties.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'PipelineEdit',
                        path:'leads/:id',
                        component:()=>import('../views/settings/crm/leads/PipelineEdit.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'WorkflowIndex',
                        path:'workflows',
                        component:()=>import('../views/settings/crm/workflow/WorkflowIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'WorkflowCreateForm',
                        path:'workflows/new',
                        component:()=>import('../views/settings/crm/workflow/WorkflowForm.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Workflow create form',
                        },
                    },
                    {
                        name:'lorkflowUpdateForm',
                        path:'workflows/:workflow_id',
                        component:()=>import('../views/settings/crm/workflow/WorkflowForm.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Workflow update form',
                        },
                    },
                    {
                        name:'AutomationIndex',
                        path:'automations',
                        component:()=>import('../views/settings/crm/automation/AutomationIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'TagIndex',
                        path:'tags',
                        component:()=>import('../views/settings/crm/tag/TagIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                    {
                        name:'LeadCaptureFormIndex',
                        path:'lead-capture-forms',
                        component:()=>import('../views/settings/crm/lead-capture-forms/LeadCaptureFormIndex.vue'),
                        beforeEnter:()=>isAuthorized(loginPath) && checkPermission([]),
                        meta:{
                            title:'Home Page',
                        },
                    },
                ]
            },
        ],
    },
    {
        name:"login",
        path:'/login',
        component:()=>import('../views/auth/LoginIndexPage.vue'),
        beforeEnter:()=>!isAuthorized('/', true),
    },
    {
        name:"register",
        path:'/register',
        component:()=>import('../views/auth/RegisterIndexPage.vue'),
        beforeEnter:()=>!isAuthorized('/', true),
    },
    {
        name:"forbidden",
        path:'/forbidden',
        component:()=>import('../views/errors/Forbidden403.vue'),
    }
];


const router = createRouter({
    history: createWebHistory('/'),
    routes:routes, 
    strict: true,
    mode: 'history',
    base: '/',
});

export default router;
