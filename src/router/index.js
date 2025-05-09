import { createRouter, createWebHistory } from "vue-router";
import { isAuthorized, checkPermission } from "@stores/auth";
import { useProgress } from '@stores';

const loginPath = '/login';

const routes = [
    {
        name: 'Website',
        path: '/',
        component: () => import('@components/WebSite.vue'),
        redirect: "/app",
    },
    {
        name: "root",
        path: '/',
        component: () => import('@components/Master.vue'),
        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
        children: [
            {
                name: "AppPath",
                path: '/app',
                component: () => import('@views/home/HomeIndex.vue'),
                beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                meta: {
                    title: 'Home Page',
                },
                children: [
                ]
            },
            {
                name: "PlatformIndexPath",
                path: '/platform',
                component: () => import('@views/platform/PlatformIndex.vue'),
                beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                meta: {
                    title: 'Home Page',
                },
                redirect: "/platform/leads",
                children: [
                    {
                        name: "platform-tasks",
                        path: 'tasks',
                        component: () => import('@views/platform/tasks/TaskIndexPage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                        children: [],
                    },
                    {
                        name: "leads",
                        path: 'leads',
                        component: () => import('@views/platform/leads/LeadIndexPage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                        children: [],
                    },
                    {
                        name: "timeline-lead-edit",
                        path: 'leads/:id',
                        component: () => import('@views/platform/timeline/LeadEditTimelinePage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                        children: [],
                    },
                    {
                        name: "deals",
                        path: 'deals',
                        component: () => import('@views/platform/pipline/DealsIndexPage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                        children: [],
                    },
                    {
                        name: "timeline-deal-edit",
                        path: 'deals/:id',
                        component: () => import('@views/platform/timeline/LeadEditTimelinePage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                        children: [],
                    },
                    {
                        name: "contacts",
                        path: 'contacts',
                        component: () => import('@views/platform/contacts/ContactsIndexPage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                        children: [],
                    }
                ]
            },
            {
                name: "MapIndex",
                path: '/map',
                component: () => import('@views/map/MapIndex.vue'),
                beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                meta: {
                    title: 'Home Page',
                },
                children: [
                ]
            },
            {
                name: "LibraryIndex",
                path: '/library',
                redirect: '/library/active',
                component: () => import('../views/library/LibraryIndex.vue'),
                beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                meta: {
                    title: 'Home Page',
                },
                children: [
                    {
                        name: 'LibraryProjects',
                        path: 'active',
                        component: () => import('../views/library/LibraryProjectsList.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Projects',
                        },
                    },
                    {
                        name: 'LibraryProposals', // DO NOT CHANGE THIS NAME
                        path: 'proposals/:project_id',
                        component: () => import('../views/library/LibraryProposalList.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Projects',
                        },
                    }
                ]
            },
            {
                name: "PaymentIndex",
                path: '/payments',
                component: () => import('@views/payment/PaymentIndex.vue'),
                beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                meta: {
                    title: 'Home Page',
                },
                children: [
                ]
            },
            {
                name: "SettingsIndex",
                path: '/settings',
                redirect: "/settings/profile",
                component: () => import('@views/settings/SettingsIndex.vue'),
                beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                meta: {
                    title: 'Home Page',
                },
                children: [
                    {
                        name: 'profile-setting-index',
                        path: 'profile',
                        component: () => import('@views/settings/profile/ProfileIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsAccountPage',
                        path: 'account',
                        component: () => import('@views/settings/account/AccountIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsNotificationPage',
                        path: 'notifications',
                        component: () => import('@views/settings/notifications/NotificationsIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsReferPage',
                        path: 'refer',
                        component: () => import('@views/settings/refer/ReferIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsCompanyDetailsPage',
                        path: 'company',
                        component: () => import('@views/settings/company/CompanyDetailsIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsLocalizationPage',
                        path: 'Localization',
                        component: () => import('@views/settings/localization/LocalizationIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsInstallersPage',
                        path: 'installers',
                        component: () => import('@views/settings/installers/InstallersIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsInstallerCreate',
                        path: 'installers/new',
                        component: () => import('@views/settings/installers/InstallerCreate.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsInstallerEdit',
                        path: 'installers/edit/:id',
                        component: () => import('@views/settings/installers/InstallerEdit.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsProposalPage',
                        path: 'proposals',
                        component: () => import('@views/settings/proposal/PreferenceIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsAboutPage',
                        path: 'about-us',
                        component: () => import('@views/settings/about/AboutIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SettingsLegalsPage',
                        path: 'proposal-legals',
                        component: () => import('@views/settings/proposal-legals/LegalsIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'ProposalLegalsWarranty',
                        path: 'proposal-legals/warranty',
                        component: () => import('@views/settings/proposal-legals/ProposalWarranty.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'SolarDesignIndex',
                        path: 'design',
                        component: () => import('@views/settings/solardesign/SolarDesignIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'ComponentPriceIndex',
                        path: 'component-prices',
                        component: () => import('@views/settings/component/ComponentPriceIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'PackageIndex',
                        path: 'packages',
                        component: () => import('@views/settings/packages/PackageIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'JobShootIndex',
                        path: 'job-sheets',
                        component: () => import('@views/settings/job/JobSheetsIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'FinancingIndex',
                        path: 'financing',
                        component: () => import('@views/settings/financing/FinancingIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'EmailTemplatesIndex',
                        path: 'email-templates',
                        component: () => import('@views/settings/email-templates/EmailTemplatesIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'RolesIndex',
                        path: 'roles',
                        component: () => import('@views/settings/roles/RolesIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'RoleEdit',
                        path: 'roles/:id/edit',
                        component: () => import('@views/settings/roles/EditRoleAndPermission.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'team-member-index',
                        path: 'team-members',
                        component: () => import('@views/settings/team/TeamMemberIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'BillingIndex',
                        path: 'billing',
                        component: () => import('@views/settings/billing/BillingIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'ApiIndex',
                        path: 'api',
                        component: () => import('@views/settings/api/ApiIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'Apilogs',
                        path: 'api/logs',
                        component: () => import('@views/settings/api/Apilogs.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'ApiEventLogs',
                        path: 'api/event-logs',
                        component: () => import('@views/settings/api/EventLogs.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'ApiEventDetails',
                        path: 'api/event-logs/details/:id',
                        component: () => import('@views/settings/api/EventDetails.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'IntegrationsIndex',
                        path: 'integrations',
                        component: () => import('@views/settings/integrations/IntegrationsIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'EsignatureIndex',
                        path: 'esignature',
                        component: () => import('@views/settings/esignature/EsignatureIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'AccreditationIndex',
                        path: 'accreditations',
                        component: () => import('@views/settings/accreditation/AccreditationIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                ]
            },
            {
                name: "CrmSettingsRoot",
                path: '/settings/crm',
                component: () => import('@views/settings/SettingsIndex.vue'),
                beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                children: [
                    {
                        name: 'LeadStatusSettingsIndex',
                        path: 'status',
                        component: () => import('@views/settings/crm/status/LeadStatusSettingsIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Lead Status Settings',
                        },
                    },
                    {
                        name: 'PipelineSetingsIndexPage',
                        path: 'pipeline',
                        component: () => import('@views/settings/crm/pipeline/PipelineSetingsIndexPage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'PipelineAndStageCreate',
                        path: 'pipeline/create',
                        component: () => import('@views/settings/crm/pipeline/PipelineAndStageEditPage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'PipelineAndStageEditPage',
                        path: 'pipeline/:id/edit',
                        component: () => import('@views/settings/crm/pipeline/PipelineAndStageEditPage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'EmailIndex',
                        path: 'email',
                        component: () => import('@views/settings/crm/email/EmailIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'LeadProviderEmailIndex',
                        path: 'lead-provider-emails',
                        component: () => import('@views/settings/crm/lead-provider-email/LeadProviderEmailIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'PropertieIndexPage',
                        path: 'propertie',
                        component: () => import('@views/settings/crm/propertie/PropertieIndexPage.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'WorkflowIndex',
                        path: 'workflows',
                        component: () => import('@views/settings/crm/workflow/WorkflowIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'WorkflowCreateForm',
                        path: 'workflows/new',
                        component: () => import('@views/settings/crm/workflow/WorkflowForm.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Workflow create form',
                        },
                    },
                    {
                        name: 'lorkflowUpdateForm',
                        path: 'workflows/:workflow_id',
                        component: () => import('@views/settings/crm/workflow/WorkflowForm.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Workflow update form',
                        },
                    },
                    {
                        name: 'AutomationIndex',
                        path: 'automations',
                        component: () => import('@views/settings/crm/automation/AutomationIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'TagIndex',
                        path: 'tags',
                        component: () => import('@views/settings/crm/tag/TagIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                    {
                        name: 'LeadCaptureFormIndex',
                        path: 'lead-capture-forms',
                        component: () => import('@views/settings/crm/lead-capture-forms/LeadCaptureFormIndex.vue'),
                        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
                        meta: {
                            title: 'Home Page',
                        },
                    },
                ]
            },
        ],
    },
    {
        name: "Proposal",
        path: '/proposal/:project_id',
        component: () => import('../views/proposals/Proposal.vue'),
        beforeEnter: () => isAuthorized(loginPath) && checkPermission([]),
        meta: {
            title: 'Proposal',
        },
    },
    {
        name: "login",
        path: '/login',
        component: () => import('@views/auth/LoginIndexPage.vue'),
        beforeEnter: () => !isAuthorized('/', true),
    },
    {
        name: "register",
        path: '/register',
        component: () => import('@views/auth/RegisterIndexPage.vue'),
        beforeEnter: () => !isAuthorized('/', true),
    },
    {
        name: "forgot",
        path: '/forgot',
        component: () => import('@views/auth/ForgotPasswordPage.vue'),
        beforeEnter: () => !isAuthorized('/', true),
    },
    {
        name: "reset",
        path: '/reset',
        component: () => import('@views/auth/ResetPasswordPage.vue'),
        beforeEnter: () => !isAuthorized('/', true),
    },
    {
        name: "forbidden",
        path: '/forbidden',
        component: () => import('@views/errors/Forbidden403.vue'),
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes: routes,
    strict: true,
    mode: 'history',
    base: '/',
});

router.beforeEach((to, from) => useProgress().startProgress());
router.afterEach((to, from) => useProgress().doneProgress());

export default router;
