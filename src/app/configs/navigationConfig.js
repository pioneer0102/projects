import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from '../auth';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
    {
        id: 'Partners',
        title: 'Partners',
        type: 'item',
        icon: 'heroicons-outline:user-group',
        auth: authRoles.user,
        url: 'partners'
    },
    {
        id: 'UserManagement',
        title: 'User Management',
        type: 'item',
        icon: 'heroicons-outline:user-group',
        auth: authRoles.admin,
        url: 'admin/users'
    },
    {
        id: 'ItemManagement',
        title: 'Item Management',
        type: 'item',
        icon: 'heroicons-outline:shopping-cart',
        auth: authRoles.adminAndUser,
        url: 'items'
    },
    {
        id: 'Orders',
        title: 'Orders',
        type: 'item',
        icon: 'heroicons-outline:pencil-alt',
        auth: authRoles.user,
        url: 'orders'
    },
    {
        id: 'Insights',
        title: 'Insights',
        type: 'item',
        // icon: 'heroicons-outline:chart-bar',
        icon: 'material-outline:leaderboard',
        auth: authRoles.user,
        url: 'insights'
        // children: [
        //     {
        //         id: 'Insights.Channels',
        //         title: 'Channels',
        //         type: 'item',
        //         url: 'insights/channels'
        //     },
        //     {
        //         id: 'Insights.Categories',
        //         title: 'Categories',
        //         type: 'item',
        //         url: 'insights/categories'
        //     }
        // ]
    },
    {
        id: 'Settings',
        title: 'Settings',
        type: 'collapse',
        icon: 'heroicons-outline:cog',
        auth: authRoles.user,
        children: [
            {
                id: 'Settings.UserManagement',
                title: 'User Management',
                type: 'item',
                url: 'settings/user-management'
            },
            {
                id: 'Insights.PosSettings',
                title: 'POS Settings',
                type: 'item',
                url: 'settings/pos-settings'
            }
        ]
    },
    {
        id: 'Stores',
        title: 'Stores',
        type: 'item',
        icon: 'material-outline:house',
        auth: authRoles.admin,
        url: 'admin/stores'
    }
];

export default navigationConfig;
