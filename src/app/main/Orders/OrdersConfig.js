import { lazy } from 'react';

const OrdersApp = lazy(() => import('./OrdersApp'));

const OrdersConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'orders',
            element: <OrdersApp />
        }
    ]
};

export default OrdersConfig;
