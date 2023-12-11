import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import {
    selectSaleTotalByCategory,
    selectOrderTotalByCategory
} from '../../store/categorySlice';
import {green, orange} from '@mui/material/colors';
import { Cagetories } from 'src/app/model/Global';
import Paper from "@mui/material/Paper";
import styles from '../../style.module.scss';

const BarStatistics = () => {
    const saleTotalByCategory = useSelector(selectSaleTotalByCategory);
    const orderTotalByCategory = useSelector(selectOrderTotalByCategory);

    const orderData = [];
    const saleData = [];

    Cagetories.forEach((channel) => {
        if(Object.entries(saleTotalByCategory).length!==0) saleData.push(saleTotalByCategory[channel]);
        if(Object.entries(orderTotalByCategory).length!==0)orderData.push(orderTotalByCategory[channel]);
    })

    const saleChartOptions = {
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "30%"
            }
        },

        title: {
            text: 'Sale Statistics',
            align: 'left'
        },
        colors: [green[500]],
        stroke: {
            width: 1,
        },
        xaxis: {
            categories: Cagetories
        },
        yaxis: {
            tickAmount: 10,
        }
    };
    const saleSeries = [
        {
            name: "Order",
            type: "column",
            data: saleData
        }
    ];

    const orderChartOptions = {
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "30%"
            }
        },

        title: {
            text: 'Order Statistics',
            align: 'left'
        },
        colors: [orange[500]],
        stroke: {
            width: 1
        },
        xaxis: {
            categories: Cagetories
        },
        yaxis: {
            tickAmount: 5,
        }
    };
    const orderSeries = [
        {
            name: "Order",
            type: "column",
            data: orderData
        }
    ];

    return (
        <Paper className={`mx-24 my-32 px-32 py-32 grid md:grid-cols-2 grid-cols-1 gap-x-96 ${styles.paper}`}>
            <ReactApexChart
                options={saleChartOptions}
                series={saleSeries}
                type="bar"
            />
            <ReactApexChart
                options={orderChartOptions}
                series={orderSeries}
                type="bar"
            />
        </Paper>
    );
}

export default BarStatistics;