import { lazy } from 'react';

const AdminApp = lazy(() => import('./AdminApp'));

const AdminConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'Admin',
            element: <AdminApp />
        }
    ]
};

export default AdminConfig;