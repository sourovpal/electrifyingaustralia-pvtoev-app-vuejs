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

import SettingsAboutIndex from '../views/settings/about/AboutIndex.vue';

import SettingsPreferenceIndex from '../views/settings/proposal/PreferenceIndex.vue';

import LegalsIndex from '../views/settings/proposal/LegalsIndex.vue';

import SolarDesignIndex from '../views/settings/solardesign/SolarDesignIndex.vue';

import ComponentPriceIndex from '../views/settings/component/ComponentPriceIndex.vue';

import PackageIndex from '../views/settings/packages/PackageIndex.vue';

import JobSheetsIndex from '../views/settings/job/JobSheetsIndex.vue';

import FinancingIndex from '../views/settings/financing/FinancingIndex.vue';

import EmailTemplatesIndex from '../views/settings/email-templates/EmailTemplatesIndex.vue';

import EmailIndex from '../views/settings/crm/EmailIndex.vue';

import LeadProviderEmailIndex from '../views/settings/crm/LeadProviderEmailIndex.vue';

import LeadsIndex from '../views/settings/crm/LeadsIndex.vue';

const routes = [
    {
        name:'Website',
        path:'/',
        component:WebSite,
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