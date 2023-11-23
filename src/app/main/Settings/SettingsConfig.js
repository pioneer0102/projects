import { lazy } from 'react';

const SettingsApp = lazy(() => import('./SettingsApp'));

const SettingsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'settings',
            element: <SettingsApp />,
            childrean: [
                {
                    path: 'userManagement',
                    element: <SettingsApp />
                },
                {
                    path: 'categories',
                    element: <SettingsApp />
                }
            ]
        }
    ]
};

export default SettingsConfig;