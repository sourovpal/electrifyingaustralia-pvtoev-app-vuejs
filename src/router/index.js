import { createRouter, createWebHistory } from "vue-router";
import Master from '../components/Master.vue';

import PlatformIndex from '../views/platform/PlatformIndex.vue';

import MapIndex from '../views/map/MapIndex.vue';

import HomeIndex from '../views/home/HomeIndex.vue';

import PaymentIndex from '../views/payment/PaymentIndex.vue';

import LibraryIndex from '../views/library/LibraryIndex.vue';

import WebSite from '../components/WebSite.vue';

import DataTableVue from "../views/platform/components/DataTable.vue";

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

import WorkflowIndex from '../views/settings/crm/workflow/WorkflowIndex.vue';

import AutomationIndex from '../views/settings/crm/automation/AutomationIndex.vue';

import TagIndex from '../views/settings/crm/tag/TagIndex.vue';

import LeadCaptureFormIndex from '../views/settings/crm/lead-capture-forms/LeadCaptureFormIndex.vue';

import RolesIndex from '../views/settings/roles/RolesIndex.vue';

import TeamIndex from '../views/settings/team/TeamIndex.vue';

import BillingIndex from '../views/settings/billing/BillingIndex.vue';

import ApiIndex from '../views/settings/api/ApiIndex.vue';
import Apilogs from '../views/settings/api/Apilogs.vue';
import ApiEventLogs from '../views/settings/api/EventLogs.vue';
import ApiEventDetails from '../views/settings/api/EventDetails.vue';

import IntegrationsIndex from '../views/settings/integrations/IntegrationsIndex.vue';

import EsignatureIndex from '../views/settings/esignature/EsignatureIndex.vue';

import AccreditationIndex from '../views/settings/accreditation/AccreditationIndex.vue';

import DealsIndexPage from '../views/platform/pages/pipline/DealsIndexPage.vue';
import ContactsIndexPage from '../views/platform/pages/contacts/ContactsIndexPage.vue';




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
                children: [
                ]
            },
            { 
                name:"PlatformIndexPath",
                path: '/platform',
                component: PlatformIndex,
                redirect: "/platform/leads",
                children: [
                    {
                        name:"leads",
                        path:'leads',
                        component: DataTableVue,
                        children:[],
                    },
                    {
                        name:"deals",
                        path:'deals',
                        component: DealsIndexPage,
                        children:[],
                    },
                    {
                        name:"contacts",
                        path:'contacts',
                        component: ContactsIndexPage,
                        children:[],
                    }
                ]
            },
            { 
                name:"MapIndex",
                path: '/map',
                component: MapIndex,
                children: [
                ]
            },
            { 
                name:"LibraryIndex",
                path: '/library',
                component: LibraryIndex,
                children: [
                ]
            },
            { 
                name:"PaymentIndex",
                path: '/payments',
                component: PaymentIndex,
                children: [
                ]
            },
            { 
                name:"SettingsIndex",
                path: '/settings',
                redirect: "/settings/profile",
                component: SettingsIndex,
                children: [
                    {
                        name:'ProfileSettingPage',
                        path:'profile',
                        component: SettingsProfileIndex,
                    },
                    {
                        name:'SettingsAccountPage',
                        path:'account',
                        component: SettingsAccountIndex,
                    },
                    {
                        name:'SettingsNotificationPage',
                        path:'notifications',
                        component: SettingsNotificationIndex,
                    },
                    {
                        name:'SettingsReferPage',
                        path:'refer',
                        component: SettingsReferIndex,
                    },
                    {
                        name:'SettingsCompanyDetailsPage',
                        path:'company',
                        component: SettingsCompanyDetailsIndex,
                    },
                    {
                        name:'SettingsLocalizationPage',
                        path:'Localization',
                        component: SettingsLocalizationIndex,
                    },
                    {
                        name:'SettingsInstallersPage',
                        path:'installers',
                        component: SettingsInstallersIndex,
                    },
                    {
                        name:'SettingsInstallerCreate',
                        path:'installers/new',
                        component: SettingsInstallerCreate,
                    },
                    {
                        name:'SettingsInstallerEdit',
                        path:'installers/edit/:id',
                        component: SettingsInstallerEdit,
                    },
                    {
                        name:'SettingsProposalPage',
                        path:'proposals',
                        component: SettingsPreferenceIndex,
                    },
                    {
                        name:'SettingsAboutPage',
                        path:'about-us',
                        component: SettingsAboutIndex,
                    },
                    {
                        name:'SettingsLegalsPage',
                        path:'proposal-legals',
                        component: LegalsIndex,
                    },
                    {
                        name:'ProposalLegalsWarranty',
                        path:'proposal-legals/warranty',
                        component: ProposalLegalsWarranty,
                    },
                    {
                        name:'SolarDesignIndex',
                        path:'design',
                        component: SolarDesignIndex,
                    },
                    {
                        name:'ComponentPriceIndex',
                        path:'component-prices',
                        component: ComponentPriceIndex,
                    },
                    {
                        name:'PackageIndex',
                        path:'packages',
                        component: PackageIndex,
                    },
                    {
                        name:'JobShootIndex',
                        path:'job-sheets',
                        component: JobSheetsIndex,
                    },
                    {
                        name:'FinancingIndex',
                        path:'financing',
                        component: FinancingIndex,
                    },
                    {
                        name:'EmailTemplatesIndex',
                        path:'email-templates',
                        component: EmailTemplatesIndex,
                    },
                    {
                        name:'RolesIndex',
                        path:'roles',
                        component: RolesIndex,
                    },
                    {
                        name:'TeamIndex',
                        path:'team',
                        component: TeamIndex,
                    },
                    {
                        name:'BillingIndex',
                        path:'billing',
                        component: BillingIndex,
                    },
                    {
                        name:'ApiIndex',
                        path:'api',
                        component: ApiIndex,
                    },
                    {
                        name:'Apilogs',
                        path:'api/logs',
                        component: Apilogs,
                    },
                    {
                        name:'ApiEventLogs',
                        path:'api/event-logs',
                        component: ApiEventLogs,
                    },
                    {
                        name:'ApiEventDetails',
                        path:'api/event-logs/details/:id',
                        component: ApiEventDetails,
                    },
                    {
                        name:'IntegrationsIndex',
                        path:'integrations',
                        component: IntegrationsIndex,
                    },
                    {
                        name:'EsignatureIndex',
                        path:'esignature',
                        component: EsignatureIndex,
                    },
                    {
                        name:'AccreditationIndex',
                        path:'accreditations',
                        component: AccreditationIndex,
                    },
                ]
            },
            { 
                name:"CrmIndex",
                path: '/crm',
                component: SettingsIndex,
                children: [
                    {
                        name:'EmailIndex',
                        path:'email',
                        component: EmailIndex,
                    },
                    {
                        name:'LeadProviderEmailIndex',
                        path:'lead-provider-emails',
                        component: LeadProviderEmailIndex,
                    },
                    {
                        name:'LeadsIndex',
                        path:'leads',
                        component: LeadsIndex,
                    },
                    {
                        name:'WorkflowIndex',
                        path:'workflows',
                        component: WorkflowIndex,
                    },
                    {
                        name:'AutomationIndex',
                        path:'automations',
                        component: AutomationIndex,
                    },
                    {
                        name:'TagIndex',
                        path:'tags',
                        component: TagIndex,
                    },
                    {
                        name:'LeadCaptureFormIndex',
                        path:'lead-capture-forms',
                        component: LeadCaptureFormIndex,
                    },
                ]
            },
        ],
    },
];






const router = createRouter({
    history: createWebHistory(),
    routes:routes, 
    strict: true,
});

export default router;