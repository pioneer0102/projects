import { lazy } from 'react';
import OrderDetail from './OrderDetail';

const OrdersApp = lazy(() => import('./OrdersApp'));

const OrdersConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'orders',
            element: <OrdersApp />
        },
        {
            path: 'orders/:id',
            element: <OrderDetail />
        }
    ]
};

export default OrdersConfig;
