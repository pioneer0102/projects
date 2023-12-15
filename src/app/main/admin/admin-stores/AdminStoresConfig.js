import AdminStores from './AdminStores';
import AdminStoreDetail from './AdminStoreDetail';

const StoreConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'admin/stores',
            element: <AdminStores />
        },
        {
            path: 'admin/stores/:storeId/*',
            element: <AdminStoreDetail />
        }
    ]
};

export default StoreConfig;
