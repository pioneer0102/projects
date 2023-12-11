import SaleReport from './SaleReport';
import OrderReport from './OrderReport';
import ItemReport from './ItemReport';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

const Report = () => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <>
            <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SaleReport />
                </Grid>
                <Grid item xs={8}>
                    <OrderReport className="col-span-2" />
                </Grid>
                <Grid item xs={4}>
                    <ItemReport />
                </Grid>
            </Grid>
        </>
    );
};

export default Report;
