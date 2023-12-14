import { lazy } from 'react';
import StoreForm from './StoreForm';

const StoresApp = lazy(() => import('./index'));

const StoreConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'stores',
            element: <StoresApp />
        },
        {
            path: 'stores/:action/:id',
            element: <StoreForm />
        }
    ]
};

export default StoreConfig;
