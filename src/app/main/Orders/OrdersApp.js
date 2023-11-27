import withReducer from 'app/store/withReducer';
import { useDeepCompareEffect } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import reducer from './store';
import { getOrders } from "./store/ordersSlice";
import OrdersTable from "./OrdersTable";
import OrdersSearchFilter from "./OrdersSearchFilter";
import OrderBreadcrumb from './OrderBreadCrumb';
import { QueryClient, QueryClientProvider } from 'react-query';
// import styles from './style.module.scss';

const queryClient = new QueryClient();

function OrdersApp(props) {
    // const dispatch = useDispatch();

    // useDeepCompareEffect(() => {
    //     dispatch(getOrders());
    // }, [dispatch]);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <OrderBreadcrumb />
                <OrdersSearchFilter />
                <OrdersTable />
            </QueryClientProvider >
        </>
    )
}

export default withReducer('ordersApp', reducer)(OrdersApp);
