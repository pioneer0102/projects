import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { selectItem } from '../../store/itemSlice';
import { Box, Typography, Paper } from '@mui/material';

function ItemReport() {
    const item = useSelector(selectItem);

    const series = item;
    const labels = ['Active', 'InActive'];

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
            width: '100%',
            height: '100%',
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
            colors: ['#EEEEEE']
        },
        labels,
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
            theme: 'dark',
            custom: ({ seriesIndex, w }) =>
                `<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            <div class="ml-8 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
        </div>`
        }
    };

    return (
        <Paper className="flex flex-col flex-auto shadow overflow-hidden p-24">
            <div className="flex flex-col sm:flex-row items-start justify-between">
                <Typography className="text-xl md:text-2xl font-semibold tracking-tight leading-6 truncate">
                    Item Overview
                </Typography>
            </div>

            <div className="flex flex-col flex-auto mt-24 h-192">
                <ReactApexChart
                    options={chartOptions}
                    series={series}
                    type={chartOptions.chart.type}
                    height={chartOptions.chart.height}
                />
            </div>
            <div className="mt-32">
                <div className="-my-12 divide-y">
                    {series.map((dataset, i) => (
                        <div className="grid grid-cols-3 py-12" key={i}>
                            <div className="flex items-center">
                                <Box
                                    className="flex-0 w-8 h-8 rounded-full"
                                    sx={{
                                        backgroundColor: chartOptions.colors[i]
                                    }}
                                />
                                <Typography className="ml-12 truncate">
                                    {labels[i]}
                                </Typography>
                            </div>
                            <Typography
                                className="text-right"
                                color="text.secondary"
                            >
                                {dataset}%
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </Paper>
    );
}

export default ItemReport;
