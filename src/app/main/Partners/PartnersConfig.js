import { lazy } from 'react';

const PartnersApp = lazy(() => import('./PartnersApp'));

const PartnersConfig = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: true,
                },
                toolbar: {
                    display: true,
                },
                footer: {
                    display: false,
                },
                leftSidePanel: {
                    display: false,
                },
                rightSidePanel: {
                    display: false,
                },
            },
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