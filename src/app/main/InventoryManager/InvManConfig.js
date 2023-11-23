import { lazy } from 'react';

const InvManApp = lazy(() => import('./InvManApp'));

const InvManCofig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'inventoryManager',
            element: <InvManApp />
        }
    ]
};

export default InvManCofig;