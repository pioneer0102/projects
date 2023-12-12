import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SaleFilter from '../searchFilter/SaleFilter';
import { showMessage } from 'app/store/fuse/messageSlice';
import {
    selectSale,
    selectTabValue,
    setTabValue,
    selectResponseGraphWarning
} from '../store/saleSlice';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
import { ThemeProvider, useTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
    dialog: {
        '& .muiltr-7en360-MuiPaper-root-MuiDialog-paper': {
            borderRadius: '6px'
        }
    }
}));

const SaleReport = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const contrastTheme = useSelector(
        selectContrastMainTheme(theme.palette.primary.main)
    );
    const [open, setOpen] = useState(false);

    const saleData = useSelector(selectSale);
    const tabValue = useSelector(selectTabValue);
    const responseWarning = useSelector(selectResponseGraphWarning);

    const handleTabChange = (value) => {
        dispatch(setTabValue(value));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        responseWarning &&
            dispatch(
                showMessage({
                    message:
                        'Input date correctly! From should be smaller than To',
                    variant: 'warning'
                })
            );
    }, [responseWarning]);

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
                            className="mt-8 ml-16 text-2xl md:text-3xl font-semibold"
                            color="text.secondary"
                        >
                            Sales Overview
                        </Typography>
                        <div className="flex flex-row items-center">
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => handleOpen()}
                                className={'mx-16 my-8'}
                            >
                                <FuseSvgIcon size={24} className="text-white">
                                    material-solid:filter_alt
                                </FuseSvgIcon>
                                <span className="mx-4 text-white">Filter</span>
                            </Button>
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
            <Dialog
                open={open}
                onClose={handleClose}
                className={classes.dialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <Typography className={'font-semibold text-32 mt-16 ml-8'}>
                        <span>Filter</span>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    className="flex flex-col"
                    sx={{ width: '450px' }}
                >
                    <SaleFilter parent="graph" />
                </DialogContent>
                <DialogActions className="mx-24 mb-24"></DialogActions>
            </Dialog>
        </>
    );
};

export default SaleReport;
