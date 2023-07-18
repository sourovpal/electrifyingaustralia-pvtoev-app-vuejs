import { createRouter, createWebHistory } from "vue-router";
import Master from '../components/Master.vue';
import PlatformIndex from '../views/platform/PlatformIndex.vue';
import DashboardVue from "../components/Datatable/Dashboard.vue";
import MapIndex from '../views/map/MapIndex.vue';
import HomeIndex from '../views/home/HomeIndex.vue';

const routes = [
    { 
        name:"root",
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
                        component: DashboardVue,
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
        ],
    },
];






const router = createRouter({
    history: createWebHistory(),
    routes:routes, 
    strict: true,
});

export default router;