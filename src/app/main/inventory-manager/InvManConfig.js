import { lazy } from 'react';
import InvForm from './InvForm';

const InvManApp = lazy(() => import('./InvManApp'));

const InvManCofig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'inventory-manager',
            element: <InvManApp />
        },
        {
            path: 'inventory-manager/:action/:id',
            element: <InvForm />
        }
    ]
};

export default InvManCofig;