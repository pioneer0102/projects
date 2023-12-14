import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Typography } from '@mui/material';
import { Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import Popover from '@mui/material/Popover';
import { Box } from '@mui/material';
import clsx from 'clsx';
import { Status } from '../../../model/InsightsModel';
import { orderFilter, selectOrder, setOrderFilter } from '../store/orderSlice';
import { saleFilter } from '../store/saleSlice';

const OrderReport = () => {
    const dispatch = useDispatch();
    const filter = useSelector(orderFilter);
    const headFilter = useSelector(saleFilter);
    const orderData = useSelector(selectOrder);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (currentTarget) => {
        setAnchorEl(currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOrderChange = (type, value) => {
        if (type === 'status') {
            setAnchorEl(null);
        }
        dispatch(setOrderFilter({ type: type, value: value }));
    };

    const currentTotal =
        orderData.completed.current +
        orderData.pending.current +
        orderData.received.current +
        orderData.rejected.current;
    const previousTotal =
        orderData.completed.previous +
        orderData.pending.previous +
        orderData.received.previous +
        orderData.rejected.previous;
    const previousCompleted = Math.floor(
        (orderData.completed.previous / previousTotal) * 100
    );
    const currentCompleted = Math.floor(
        (orderData.completed.current / currentTotal) * 100
    );
    const previousPending = Math.floor(
        (orderData.pending.previous / previousTotal) * 100
    );
    const currentPending = Math.floor(
        (orderData.pending.current / currentTotal) * 100
    );
    const previousReceived = Math.floor(
        (orderData.received.previous / previousTotal) * 100
    );
    const currentReceived = Math.floor(
        (orderData.received.current / currentTotal) * 100
    );
    const previousRejected = Math.floor(
        (orderData.rejected.previous / previousTotal) * 100
    );
    const currentRejected = Math.floor(
        (orderData.rejected.current / currentTotal) * 100
    );

    const series = [
        {
            name: 'Order',
            data: orderData.orderArray
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
            height: '150%',
            type: 'area',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#64748b'],
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            },
            colors: ['#0f172a']
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
            curve: 'straight',
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
                    colors: '#000'
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

    const diffDate = Math.floor(
        (new Date(headFilter.toDate) - new Date(headFilter.fromDate)) /
            (1000 * 60 * 60 * 24)
    );

    return (
        <Paper className="flex flex-col shadow rounded-md px-16 py-16">
            <div className="flex items-center justify-between mt-16 mb-0">
                <Typography className="text-2xl md:text-3xl font-semibold tracking-tight leading-6 truncate">
                    Orders View
                </Typography>
                <div className="flex flex-row items-center ml-8">
                    <Typography
                        className={clsx(
                            'inline-flex items-center font-medium text-sm px-12 py-2 tracking-wide uppercase mx-16 rounded-full',
                            filter.status === 'all' &&
                                'bg-grey-200 text-grey-100',
                            filter.status === 'completed' &&
                                'bg-green-500 text-grey-100',
                            filter.status === 'pickedup' &&
                                'bg-blue-500 text-grey-100',
                            filter.status === 'pending' &&
                                'bg-yellow-600 text-grey-100',
                            filter.status === 'received' &&
                                'bg-purple-500 text-grey-100',
                            filter.status === 'rejected' &&
                                'bg-red-500 text-grey-100'
                        )}
                        role="button"
                        aria-describedby={id}
                        onClick={(event) => handleClick(event.currentTarget)}
                        sx={{
                            backgroundColor:
                                filter.status === 'all'
                                    ? 'rgba(0, 0, 0, 0.08) !important'
                                    : 'none',
                            color:
                                filter.status === 'all'
                                    ? 'rgb(17, 24, 39) !important'
                                    : 'white'
                        }}
                    >
                        {filter.status}
                        {!open && (
                            <FuseSvgIcon className="inline" size={20}>
                                heroicons-solid:chevron-down
                            </FuseSvgIcon>
                        )}
                        {open && (
                            <FuseSvgIcon className="inline" size={20}>
                                heroicons-solid:chevron-up
                            </FuseSvgIcon>
                        )}
                    </Typography>
                    <Popover
                        id={id}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                    >
                        <Box className="flex flex-col" sx={{ p: 1 }}>
                            {Status.map((item, indexStatus) => {
                                return (
                                    <Typography
                                        key={indexStatus}
                                        color="text.secondary"
                                        role="button"
                                        className="font-semibold text-14 px-8 py-2 uppercase uppercase"
                                        onClick={() =>
                                            handleOrderChange('status', item)
                                        }
                                    >
                                        {item}
                                    </Typography>
                                );
                            })}
                        </Box>
                    </Popover>
                    <Chip
                        size="small"
                        className="font-medium text-sm"
                        label={`${diffDate} days`}
                    />
                </div>
            </div>
            <div className="flex items-start mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-42 sm:gap-48">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <div className="font-medium text-secondary leading-5">
                                Received
                            </div>
                            <Tooltip title="Predicted Ratio is calculated by using historical ratio, current trends and your goal targets.">
                                <FuseSvgIcon
                                    className="ml-6"
                                    size={16}
                                    color="disabled"
                                >
                                    heroicons-solid:information-circle
                                </FuseSvgIcon>
                            </Tooltip>
                        </div>
                        <div className="flex items-start mt-8">
                            <div className="text-2xl font-bold tracking-tight leading-none">
                                {currentReceived} %
                            </div>
                            <div className="flex items-center ml-8">
                                {currentReceived >= previousReceived ? (
                                    <>
                                        <FuseSvgIcon
                                            className="text-green-500"
                                            size={20}
                                        >
                                            heroicons-solid:arrow-circle-up
                                        </FuseSvgIcon>
                                        <Typography className="ml-4 text-md font-medium text-green-500">
                                            {Math.abs(
                                                currentReceived -
                                                    previousReceived
                                            )}{' '}
                                            %
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <FuseSvgIcon
                                            className="text-red-500"
                                            size={20}
                                        >
                                            heroicons-solid:arrow-circle-down
                                        </FuseSvgIcon>
                                        <Typography className="ml-4 text-md font-medium text-red-500">
                                            {Math.abs(
                                                currentReceived -
                                                    previousReceived
                                            )}{' '}
                                            %
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <div className="font-medium text-secondary leading-5">
                                Rejected
                            </div>
                            <Tooltip title="Predicted Ratio is calculated by using historical ratio, current trends and your goal targets.">
                                <FuseSvgIcon
                                    className="ml-6"
                                    size={16}
                                    color="disabled"
                                >
                                    heroicons-solid:information-circle
                                </FuseSvgIcon>
                            </Tooltip>
                        </div>
                        <div className="flex items-start mt-8">
                            <div className="text-2xl font-bold tracking-tight leading-none">
                                {currentRejected} %
                            </div>
                            <div className="flex items-center ml-8">
                                {currentRejected >= previousRejected ? (
                                    <>
                                        <FuseSvgIcon
                                            className="text-green-500"
                                            size={20}
                                        >
                                            heroicons-solid:arrow-circle-up
                                        </FuseSvgIcon>
                                        <Typography className="ml-4 text-md font-medium text-green-500">
                                            {Math.abs(
                                                currentRejected -
                                                    previousRejected
                                            )}{' '}
                                            %
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <FuseSvgIcon
                                            className="text-red-500"
                                            size={20}
                                        >
                                            heroicons-solid:arrow-circle-down
                                        </FuseSvgIcon>
                                        <Typography className="ml-4 text-md font-medium text-red-500">
                                            {Math.abs(
                                                currentRejected -
                                                    previousRejected
                                            )}{' '}
                                            %
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <div className="font-medium text-secondary leading-5">
                                Pending
                            </div>
                            <Tooltip title="Average Ratio is the average ratio between Page Views and Visitors">
                                <FuseSvgIcon
                                    className="ml-6"
                                    size={16}
                                    color="disabled"
                                >
                                    heroicons-solid:arrow-circle-up
                                </FuseSvgIcon>
                            </Tooltip>
                        </div>
                        <div className="flex items-start mt-8">
                            <div className="text-2xl font-bold tracking-tight leading-none">
                                {currentPending} %
                            </div>
                            <div className="flex items-center ml-8">
                                {currentPending >= previousPending ? (
                                    <>
                                        <FuseSvgIcon
                                            className="text-green-500"
                                            size={20}
                                        >
                                            heroicons-solid:arrow-circle-up
                                        </FuseSvgIcon>
                                        <Typography className="ml-4 text-md font-medium text-green-500">
                                            {Math.abs(
                                                currentPending - previousPending
                                            )}{' '}
                                            %
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <FuseSvgIcon
                                            className="text-red-500"
                                            size={20}
                                        >
                                            heroicons-solid:arrow-circle-down
                                        </FuseSvgIcon>
                                        <Typography className="ml-4 text-md font-medium text-red-500">
                                            {Math.abs(
                                                currentPending - previousPending
                                            )}{' '}
                                            %
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <div className="font-medium text-secondary leading-5">
                                Completed
                            </div>
                            <Tooltip title="Score is calculated by using the historical ratio between Page Views and Visitors. Best score is 1000, worst score is 0.">
                                <FuseSvgIcon
                                    className="ml-6"
                                    size={16}
                                    color="disabled"
                                >
                                    heroicons-solid:information-circle
                                </FuseSvgIcon>
                            </Tooltip>
                        </div>
                        <div className="flex items-start mt-8">
                            <div className="text-2xl font-bold tracking-tight leading-none">
                                {currentCompleted} %
                            </div>
                            <div className="flex items-center ml-8">
                                {currentCompleted >= previousCompleted ? (
                                    <>
                                        <FuseSvgIcon
                                            className="text-green-500"
                                            size={20}
                                        >
                                            heroicons-solid:arrow-circle-up
                                        </FuseSvgIcon>
                                        <Typography className="ml-4 text-md font-medium text-green-500">
                                            {Math.abs(
                                                currentCompleted -
                                                    previousCompleted
                                            )}{' '}
                                            %
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <FuseSvgIcon
                                            className="text-red-500"
                                            size={20}
                                        >
                                            heroicons-solid:arrow-circle-down
                                        </FuseSvgIcon>
                                        <Typography className="ml-4 text-md font-medium text-red-500">
                                            {Math.abs(
                                                currentCompleted -
                                                    previousCompleted
                                            )}{' '}
                                            %
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReactApexChart
                options={chartOptions}
                series={series}
                type={chartOptions.chart.type}
                height={chartOptions.chart.height}
            />
        </Paper>
    );
};

export default OrderReport;
