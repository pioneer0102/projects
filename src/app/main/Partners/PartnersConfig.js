import { lazy } from 'react';

const PartnersApp = lazy(() => import('./PartnersApp'));

const PartnersConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'partners',
            element: <PartnersApp />
        }
    ]
};

export default PartnersConfig;