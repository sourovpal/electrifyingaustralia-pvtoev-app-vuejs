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