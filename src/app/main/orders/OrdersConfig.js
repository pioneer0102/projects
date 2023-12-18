import { lazy } from 'react';
import OrderDetail from './OrderDetail';

const Orders = lazy(() => import('./Orders'));

const OrdersConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'orders',
            element: <Orders />
        },
        {
            path: 'orders/:id',
            element: <OrderDetail />
        }
    ]
};

export default OrdersConfig;
