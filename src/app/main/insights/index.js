import reducer from './store';
import withReducer from 'app/store/withReducer';
import SaleTable from './SaleTable';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SaleReport from './report/SaleReport';
import OrderReport from './report/OrderReport';
import ItemReport from './report/ItemReport';
import FilterPopButton from './filter/FilterPopButton';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import {
    getSaleData,
    getSaleTableData,
    saleFilter,
    selectTabValue
} from './store/saleSlice';
import { getOrderData, orderFilter } from './store/orderSlice';
import { getItemData } from './store/itemSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { selectUser } from 'app/store/userSlice';
import history from '@history';
import ChannelReport from './report/ChannelReport';

const breadCrumbs = [{ name: 'Insights', url: null }];

const InsightsApp = () => {
    const user = useSelector(selectUser);
    if (user.role === 'admin') {
        history.push('/items');
        return;
    }
    const dispatch = useDispatch();
    const filter = useSelector(saleFilter);
    const orderStatus = useSelector(orderFilter);
    const tabValue = useSelector(selectTabValue);

    const saleLoaded = useSelector(
        ({ insightsApp }) => insightsApp.sale.saleLoaded
    );

    const orderLoaded = useSelector(
        ({ insightsApp }) => insightsApp.order.orderLoaded
    );

    const itemLoaded = useSelector(
        ({ insightsApp }) => insightsApp.item.itemLoaded
    );

    useEffect(() => {
        if (tabValue === 0) {
            dispatch(getSaleData(filter));
        } else if (tabValue === 1) {
            dispatch(getSaleTableData(filter));
        }

        dispatch(getOrderData({ ...orderStatus, ...filter }));
        dispatch(getItemData());
    }, [dispatch, filter, tabValue]);
    useEffect(() => {
        dispatch(getOrderData({ ...orderStatus, ...filter }));
    }, [dispatch, filter, orderStatus]);

    return (
        <div className="flex flex-col mb-24">
            <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 items-center justify-between pt-24 px-24 md:px-24">
                <Breadcrumb breadCrumbs={breadCrumbs} />
                <div>
                    <FilterPopButton />
                </div>
            </div>
            {saleLoaded && orderLoaded && itemLoaded ? (
                <div className="flex items-center justify-center flex-grow">
                    <FuseLoading />
                </div>
            ) : (
                <Grid container spacing={0}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className="mx-24 my-16">
                            {tabValue === 0 && <SaleReport />}
                            {tabValue === 1 && <SaleTable />}
                        </div>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className="mx-24 my-16">
                            <OrderReport />
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div className="mx-24 my-16">
                            <ItemReport />
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div className="mx-24 my-16">
                            <ChannelReport />
                        </div>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default withReducer('insightsApp', reducer)(InsightsApp);
