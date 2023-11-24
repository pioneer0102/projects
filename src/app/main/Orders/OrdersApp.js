import withReducer from 'app/store/withReducer';
import { useDeepCompareEffect } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import reducer from './store';
import { getOrders, getAllSize } from "./store/ordersSlice";
import OrdersTable from "./OrdersTable";
import OrdersSearchFilter from "./OrdersSearchFilter";

function OrdersApp(props) {
    const dispatch = useDispatch();

    useDeepCompareEffect(() => {
        dispatch(getOrders());
        dispatch(getAllSize());
    }, [dispatch]);

    return (
        <>
            <OrdersSearchFilter />
            <OrdersTable />
        </>
    )
}

export default withReducer('ordersApp', reducer)(OrdersApp);
