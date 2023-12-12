import SaleTable from '../SaleTable';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SaleReport from './SaleReport';
import OrderReport from './OrderReport';
import ItemReport from './ItemReport';
import { getSaleData, saleFilter, selectTabValue } from '../store/saleSlice';

const Report = () => {
    const dispatch = useDispatch();
    const filter = useSelector(saleFilter);
    const tabValue = useSelector(selectTabValue);
    useEffect(() => {
        dispatch(getSaleData(filter));
    }, [dispatch, filter]);

    return (
        <div className="flex flex-col my-24">
            <div className="mx-24 my-24">
                {tabValue === 0 && <SaleReport />}
                {tabValue === 1 && <SaleTable />}
            </div>
            <Grid container>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <OrderReport />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <ItemReport />
                </Grid>
            </Grid>
        </div>
    );
};

export default Report;
