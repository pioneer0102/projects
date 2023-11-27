import withReducer from 'app/store/withReducer';
import { useDeepCompareEffect } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import reducer from './store';
import { getOrders } from "./store/ordersSlice";
import OrdersTable from "./OrdersTable";
import OrdersSearchFilter from "./OrdersSearchFilter";
import OrderBreadcrumb from './OrderBreadCrumb';

function OrdersApp(props) {
    // const dispatch = useDispatch();

    // useDeepCompareEffect(() => {
    //     dispatch(getOrders());
    // }, [dispatch]);

    return (
        <>
            <OrderBreadcrumb />
            <OrdersSearchFilter />
            <OrdersTable />
        </>
    )
}

export default withReducer('ordersApp', reducer)(OrdersApp);
