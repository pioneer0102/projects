import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getItemData, selectItem } from './store/itemSlice';

function ItemReport() {
    const dispatch = useDispatch();
    const item = useSelector(selectItem);

    useEffect(() => {
        dispatch(getItemData());
    }, [dispatch]);

    const series = item;

    const chartOptions = {
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false
                }
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '200%',
            type: 'donut',
            sparkline: {
                enabled: true
            }
        },
        colors: ['#3182CE', '#63B3ED'],
        plotOptions: {
            pie: {
                customScale: 0.9,
                expandOnClick: false,
                donut: {
                    size: '70%'
                }
            }
        },
        stroke: {
            colors: ['#3182CE']
        },
        series,
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            theme: 'dark'
        }
    };

    return (
        <Paper className="my-32 mx-24 rounded-md py-32 px-32">
            <Typography
                className="mt-8 ml-16 text-2xl md:text-3xl font-semibold"
                color="text.secondary"
            >
                Item Overview
            </Typography>

            <div>
                <ReactApexChart
                    options={chartOptions}
                    series={series}
                    type={chartOptions.chart.type}
                    height={chartOptions.chart.height}
                />
            </div>
        </Paper>
    );
}

export default ItemReport;
