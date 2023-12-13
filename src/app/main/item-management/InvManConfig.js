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
            path: 'item-management',
            element: <InventoryApp />
        },
        {
            path: 'item-management/:action/:id',
            element: <InvForm />
        }
    ]
};

export default InvManCofig;
