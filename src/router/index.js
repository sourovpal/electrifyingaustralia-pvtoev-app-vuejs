import { createRouter, createWebHistory, createWebHashHistory , createMemoryHistory} from "vue-router";
import VueCookies from 'vue-cookies';

import LoginIndexPage from '../views/auth/LoginIndexPage.vue';
import RegisterIndexPage from '../views/auth/RegisterIndexPage.vue';

import Master from '../components/Master.vue';

import PlatformIndex from '../views/platform/PlatformIndex.vue';

import MapIndex from '../views/map/MapIndex.vue';

import HomeIndex from '../views/home/HomeIndex.vue';

import PaymentIndex from '../views/payment/PaymentIndex.vue';

import LibraryIndex from '../views/library/LibraryIndex.vue';

import WebSite from '../components/WebSite.vue';

// Platform
import LeadIndexPage from "../views/platform/pages/lead/LeadIndexPage.vue";
import EditLeadPage from "../views/platform/pages/lead/EditLeadPage.vue";
import DealsIndexPage from '../views/platform/pages/pipline/DealsIndexPage.vue';
import ContactsIndexPage from '../views/platform/pages/contacts/ContactsIndexPage.vue';



import SettingsIndex from "../views/settings/SettingsIndex.vue";

import SettingsProfileIndex from '../views/settings/profile/ProfileIndex.vue';

import SettingsAccountIndex from '../views/settings/account/AccountIndex.vue';

import SettingsNotificationIndex from '../views/settings/notifications/NotificationsIndex.vue';

import SettingsReferIndex from '../views/settings/refer/ReferIndex.vue';

import SettingsCompanyDetailsIndex from '../views/settings/company/CompanyDetailsIndex.vue';

import SettingsLocalizationIndex from '../views/settings/localization/LocalizationIndex.vue';

import SettingsInstallersIndex from '../views/settings/installers/InstallersIndex.vue';
import SettingsInstallerCreate from '../views/settings/installers/InstallerCreate.vue';
import SettingsInstallerEdit from '../views/settings/installers/InstallerEdit.vue';

import SettingsAboutIndex from '../views/settings/about/AboutIndex.vue';

import SettingsPreferenceIndex from '../views/settings/proposal/PreferenceIndex.vue';

import LegalsIndex from '../views/settings/proposal-legals/LegalsIndex.vue';
import ProposalLegalsWarranty from '../views/settings/proposal-legals/ProposalWarranty.vue';

import SolarDesignIndex from '../views/settings/solardesign/SolarDesignIndex.vue';

import ComponentPriceIndex from '../views/settings/component/ComponentPriceIndex.vue';

import PackageIndex from '../views/settings/packages/PackageIndex.vue';

import JobSheetsIndex from '../views/settings/job/JobSheetsIndex.vue';

import FinancingIndex from '../views/settings/financing/FinancingIndex.vue';

import EmailTemplatesIndex from '../views/settings/email-templates/EmailTemplatesIndex.vue';

import EmailIndex from '../views/settings/crm/email/EmailIndex.vue';

import LeadProviderEmailIndex from '../views/settings/crm/lead-provider-email/LeadProviderEmailIndex.vue';

import LeadsIndex from '../views/settings/crm/leads/LeadsIndex.vue';

import LeadCustomProperties from '../views/settings/crm/leads/CustomProperties.vue';

import PipelineEdit from '../views/settings/crm/leads/PipelineEdit.vue';

import WorkflowIndex from '../views/settings/crm/workflow/WorkflowIndex.vue';

import AutomationIndex from '../views/settings/crm/automation/AutomationIndex.vue';

import TagIndex from '../views/settings/crm/tag/TagIndex.vue';

import LeadCaptureFormIndex from '../views/settings/crm/lead-capture-forms/LeadCaptureFormIndex.vue';

import RolesIndex from '../views/settings/roles/RolesIndex.vue';
import RoleEdit from '../views/settings/roles/EditRole.vue';

import TeamMemberIndex from '../views/settings/team/TeamMemberIndex.vue';

import BillingIndex from '../views/settings/billing/BillingIndex.vue';

import ApiIndex from '../views/settings/api/ApiIndex.vue';
import Apilogs from '../views/settings/api/Apilogs.vue';
import ApiEventLogs from '../views/settings/api/EventLogs.vue';
import ApiEventDetails from '../views/settings/api/EventDetails.vue';

import IntegrationsIndex from '../views/settings/integrations/IntegrationsIndex.vue';

import EsignatureIndex from '../views/settings/esignature/EsignatureIndex.vue';

import AccreditationIndex from '../views/settings/accreditation/AccreditationIndex.vue';


// Error
import Forbidden403 from '../views/errors/Forbidden403.vue';


const routes = [
    {
        name:'Website',
        path:'/',
        component:WebSite,
        redirect: "/app",
    },
    { 
        name:"root",
        path:'/',
        component: Master,
        children: [
            { 
                name:"AppPath",
                path: '/app',
                component: HomeIndex,
                meta:{
                    auth:true,
                    progress:true,
                    title:'Home Page',
                    permissions:[],
                },
                children: [
                ]
            },
            { 
                name:"PlatformIndexPath",
                path: '/platform',
                component: PlatformIndex,
                meta:{
                    auth:true,
                    progress:true,
                    title:'Home Page',
                    permissions:[],
                },
                redirect: "/platform/leads",
                children: [
                    {
                        name:"leads",
                        path:'leads',
                        component: LeadIndexPage,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                        children:[],
                    },
                    {
                        name:"leadsEdit",
                        path:'leads/:id',
                        component: EditLeadPage,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                        children:[],
                    },
                    {
                        name:"deals",
                        path:'deals',
                        component: DealsIndexPage,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                        children:[],
                    },
                    {
                        name:"contacts",
                        path:'contacts',
                        component: ContactsIndexPage,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                        children:[],
                    }
                ]
            },
            { 
                name:"MapIndex",
                path: '/map',
                component: MapIndex,
                meta:{
                    auth:true,
                    progress:true,
                    title:'Home Page',
                    permissions:[],
                },
                children: [
                ]
            },
            { 
                name:"LibraryIndex",
                path: '/library',
                component: LibraryIndex,
                meta:{
                    auth:true,
                    progress:true,
                    title:'Home Page',
                    permissions:[],
                },
                children: [
                ]
            },
            { 
                name:"PaymentIndex",
                path: '/payments',
                component: PaymentIndex,
                meta:{
                    auth:true,
                    progress:true,
                    title:'Home Page',
                    permissions:[],
                },
                children: [
                ]
            },
            { 
                name:"SettingsIndex",
                path: '/settings',
                redirect: "/settings/profile",
                component: SettingsIndex,
                meta:{
                    auth:true,
                    progress:true,
                    title:'Home Page',
                    permissions:[],
                },
                children: [
                    {
                        name:'ProfileSettingPage',
                        path:'profile',
                        component: SettingsProfileIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsAccountPage',
                        path:'account',
                        component: SettingsAccountIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsNotificationPage',
                        path:'notifications',
                        component: SettingsNotificationIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsReferPage',
                        path:'refer',
                        component: SettingsReferIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsCompanyDetailsPage',
                        path:'company',
                        component: SettingsCompanyDetailsIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsLocalizationPage',
                        path:'Localization',
                        component: SettingsLocalizationIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsInstallersPage',
                        path:'installers',
                        component: SettingsInstallersIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsInstallerCreate',
                        path:'installers/new',
                        component: SettingsInstallerCreate,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsInstallerEdit',
                        path:'installers/edit/:id',
                        component: SettingsInstallerEdit,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsProposalPage',
                        path:'proposals',
                        component: SettingsPreferenceIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsAboutPage',
                        path:'about-us',
                        component: SettingsAboutIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SettingsLegalsPage',
                        path:'proposal-legals',
                        component: LegalsIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'ProposalLegalsWarranty',
                        path:'proposal-legals/warranty',
                        component: ProposalLegalsWarranty,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'SolarDesignIndex',
                        path:'design',
                        component: SolarDesignIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'ComponentPriceIndex',
                        path:'component-prices',
                        component: ComponentPriceIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'PackageIndex',
                        path:'packages',
                        component: PackageIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'JobShootIndex',
                        path:'job-sheets',
                        component: JobSheetsIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'FinancingIndex',
                        path:'financing',
                        component: FinancingIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'EmailTemplatesIndex',
                        path:'email-templates',
                        component: EmailTemplatesIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'RolesIndex',
                        path:'roles',
                        component: RolesIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'RoleEdit',
                        path:'roles/edit/:id',
                        component: RoleEdit,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'TeamMemberIndex',
                        path:'team-members',
                        component: TeamMemberIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'BillingIndex',
                        path:'billing',
                        component: BillingIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'ApiIndex',
                        path:'api',
                        component: ApiIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'Apilogs',
                        path:'api/logs',
                        component: Apilogs,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'ApiEventLogs',
                        path:'api/event-logs',
                        component: ApiEventLogs,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'ApiEventDetails',
                        path:'api/event-logs/details/:id',
                        component: ApiEventDetails,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'IntegrationsIndex',
                        path:'integrations',
                        component: IntegrationsIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'EsignatureIndex',
                        path:'esignature',
                        component: EsignatureIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'AccreditationIndex',
                        path:'accreditations',
                        component: AccreditationIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                ]
            },
            { 
                name:"CrmIndex",
                path: '/settings/crm',
                component: SettingsIndex,
                children: [
                    {
                        name:'EmailIndex',
                        path:'email',
                        component: EmailIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'LeadProviderEmailIndex',
                        path:'lead-provider-emails',
                        component: LeadProviderEmailIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'LeadsIndex',
                        path:'leads',
                        component: LeadsIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'LeadCustomProperties',
                        path:'leads/properties',
                        component: LeadCustomProperties,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'PipelineEdit',
                        path:'leads/:id',
                        component: PipelineEdit,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'WorkflowIndex',
                        path:'workflows',
                        component: WorkflowIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'AutomationIndex',
                        path:'automations',
                        component: AutomationIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'TagIndex',
                        path:'tags',
                        component: TagIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                    {
                        name:'LeadCaptureFormIndex',
                        path:'lead-capture-forms',
                        component: LeadCaptureFormIndex,
                        meta:{
                            auth:true,
                            progress:true,
                            title:'Home Page',
                            permissions:[],
                        },
                    },
                ]
            },
        ], // name - Root
    },
    {
        name:"login",
        path:'/login',
        component:LoginIndexPage,
    },
    {
        name:"register",
        path:'/register',
        component:RegisterIndexPage,
    },
    {
        name:"forbidden",
        path:'/forbidden',
        component:Forbidden403,
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