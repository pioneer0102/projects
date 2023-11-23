import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'Partners',
    title: 'Partners',
    type: 'item',
    icon: 'heroicons-outline:check-circle',
    url: 'partners',
  },
  {
    id: 'Inventory Manager',
    title: 'Inventory Manager',
    type: 'item',
    icon: 'heroicons-outline:check-circle',
    url: 'inventoryManager',
  },
  {
    id: 'Orders',
    title: 'Orders',
    type: 'item',
    icon: 'heroicons-outline:check-circle',
    url: '/orders',
  },
  {
    id: 'Insights',
    title: 'Insights',
    type: 'collapse',
    icon: 'heroicons-outline:check-circle',
    children: [
      {
        id: 'Insights.Channels',
        title: 'Channels',
        type: 'item',        
        url: 'insights/channels',
      },
      {
        id: 'Insights.Categories',
        title: 'Categories',
        type: 'item',
        url: 'insights/categories',
      }
    ]
  },
  {
    id: 'Settings',
    title: 'Settings',
    translate: 'Settings',
    type: 'collapse',
    icon: 'heroicons-outline:check-circle',
    children: [
      {
        id: 'Settings.User Management',
        title: 'User Management',
        type: 'item',
        url: 'settings/userManagement',
      },
      {
        id: 'Insights.posSettings',
        title: 'POS Settings',
        type: 'item',
        url: 'settings/posSettings',
      }
    ]
  }
];

export default navigationConfig;
