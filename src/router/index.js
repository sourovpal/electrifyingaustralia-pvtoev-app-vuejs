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