import { lazy } from 'react';
import InvForm from './InvForm';

const InventoryApp = lazy(() => import('./index'));

const InvManCofig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'inventory-manager',
            element: <InventoryApp />
        },
        {
            path: 'inventory-manager/:action/:id',
            element: <InvForm />
        }
    ]
};

export default InvManCofig;
