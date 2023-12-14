import reducer from './store';
import OrdersTable from './components/OrdersTable';
import withReducer from 'app/store/withReducer';
import OrdersSearchFilter from './components/OrdersSearchFilter';
import { QueryClient, QueryClientProvider } from 'react-query';

import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import history from '@history';

const queryClient = new QueryClient();

const OrdersApp = () => {
    const user = useSelector(selectUser);
    if (user.role === 'admin') {
        history.push('/item-management');
        return;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <OrdersSearchFilter />
            <OrdersTable />
        </QueryClientProvider>
    );
};

export default withReducer('ordersApp', reducer)(OrdersApp);
