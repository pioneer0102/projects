import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/material';
import { selectSale, selectTabValue, setTabValue } from '../store/saleSlice';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
import { ThemeProvider, useTheme } from '@mui/material/styles';

const SaleReport = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const contrastTheme = useSelector(
        selectContrastMainTheme(theme.palette.primary.main)
    );

    const saleData = useSelector(selectSale);
    const tabValue = useSelector(selectTabValue);
    const handleTabChange = (value) => {
        dispatch(setTabValue(value));
    };

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
            width: '100%',
            height: '300%',
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: [contrastTheme.palette.secondary.light],
        dataLabels: {
            enabled: false
        },
        fill: {
            colors: [contrastTheme.palette.secondary.dark]
        },
        grid: {
            show: true,
            borderColor: contrastTheme.palette.divider,
            padding: {
                bottom: 0,
                left: 0,
                right: 0
            },
            position: 'back',
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        stroke: {
            curve: 'straight',
            width: 2
        },
        tooltip: {
            followCursor: true,
            theme: 'dark',
            x: {
                format: 'MMM dd, yyyy'
            },
            y: {
                formatter: (value) => `${value}`
            }
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                stroke: {
                    color: contrastTheme.palette.divider,
                    dashArray: 0,
                    width: 2
                }
            },
            labels: {
                offsetY: 0,
                style: {
                    colors: contrastTheme.palette.text.secondary
                }
            },
            tickAmount: 20,
            tooltip: {
                enabled: false
            },
            type: 'datetime'
        },
        yaxis: {
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            },
            tickAmount: 5,
            show: false
        }
    };

    return (
        <>
            <ThemeProvider theme={contrastTheme}>
                <Paper className="shadow rounded-md py-16 px-16">
                    <div className="flex flex-row items-center justify-between">
                        <Typography
                            className="mt-8 text-2xl md:text-3xl font-semibold"
                            color="text.secondary"
                        >
                            Sales Overview
                        </Typography>
                        <div className="flex flex-row items-center">
                            <Tabs
                                value={tabValue}
                                onChange={(ev, value) => handleTabChange(value)}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="scrollable"
                                scrollButtons={false}
                                className="-mx-4 min-h-40"
                                classes={{
                                    indicator:
                                        'flex justify-center bg-transparent w-full h-full'
                                }}
                                TabIndicatorProps={{
                                    children: (
                                        <Box
                                            sx={{ bgcolor: 'text.disabled' }}
                                            className="w-full h-full rounded-full opacity-20"
                                        />
                                    )
                                }}
                            >
                                <Tab
                                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                    disableRipple
                                    key="graph"
                                    label="Graph"
                                />
                                <Tab
                                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                    disableRipple
                                    key="table"
                                    label="Table"
                                />
                            </Tabs>
                        </div>
                    </div>
                    <div>
                        <ReactApexChart
                            options={chartOptions}
                            series={series}
                            type={chartOptions.chart.type}
                            height={chartOptions.chart.height}
                        />
                    </div>
                </Paper>
            </ThemeProvider>
        </>
    );
};

export default SaleReport;
