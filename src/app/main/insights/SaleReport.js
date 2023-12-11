import { getSaleData, saleFilter } from './store/saleSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { green, grey } from '@mui/material/colors';
import { selectSale } from './store/saleSlice';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const SaleReport = () => {
    const dispatch = useDispatch();
    const filter = useSelector(saleFilter);
    const saleData = useSelector(selectSale);
    useEffect(() => {
        dispatch(getSaleData(filter));
    }, [dispatch, filter]);
    const series = [
        {
            name: 'Sale',
            data: saleData
        }
    ];
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
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: [grey[500]],
        dataLabels: {
            enabled: false
        },
        fill: {
            colors: [grey[400]],
            opacity: 0.5
        },
        grid: {
            show: false,
            padding: {
                bottom: 0,
                left: 0,
                right: 0
            }
        },
        legend: {
            show: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        tooltip: {
            followCursor: true,
            theme: 'dark',
            x: {
                format: 'MMM dd, yyyy'
            }
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            labels: {
                offsetY: 0,
                rotate: 0,
                style: {
                    colors: green[400]
                }
            },
            tickAmount: 3,
            tooltip: {
                enabled: false
            },
            type: 'datetime'
        },
        yaxis: {
            labels: {
                style: {
                    colors: green[400]
                }
            },
            show: false,
            tickAmount: 5
        }
    };

    return (
        <Paper className="my-32 mx-24 rounded-md pt-16 pl-16">
            <Typography
                className="mt-8 ml-16 text-2xl md:text-3xl font-semibold"
                color="text.secondary"
            >
                Sales Overview
            </Typography>
            <div>
                {
                    <ReactApexChart
                        className="flex-auto w-full"
                        options={chartOptions}
                        series={series}
                        type={chartOptions.chart.type}
                        height={chartOptions.chart.height}
                    />
                }
            </div>
        </Paper>
    );
};

export default SaleReport;
