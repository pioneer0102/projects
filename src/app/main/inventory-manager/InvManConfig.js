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
            path: 'inventoryManager',
            element: <InvManApp />
        },
        {
            path: 'inventoryManager/:action/:id',
            element: <InvForm />
        }
    ]
};

export default InvManCofig;