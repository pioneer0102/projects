import reducer from './store';
import OrdersTable from "./OrdersTable";
import withReducer from 'app/store/withReducer';
import OrdersSearchFilter from "./OrdersSearchFilter";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const OrdersApp = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <OrdersSearchFilter />
                <OrdersTable />
            </QueryClientProvider >
        </>
    );
}

export default withReducer('ordersApp', reducer)(OrdersApp);
