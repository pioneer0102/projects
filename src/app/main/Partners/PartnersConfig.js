import { lazy } from 'react';
import PartnerForm from './PartnerForm';

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
        },
        {
            path: 'partners/:either/:channel',
            element: <PartnerForm />
        }
    ]
};

export default PartnersConfig;