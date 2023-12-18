import { lazy } from 'react';
import ItemDetail from './ItemDetail';

const Items = lazy(() => import('./Items'));

const ItemsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'items',
            element: <Items />
        },
        {
            path: 'items/:itemId/*',
            element: <ItemDetail />
        }
    ]
};

export default ItemsConfig;
