import clsx from 'clsx';
import history from '@history';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MoreHoriz } from '@mui/icons-material';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { OrdersListHeader } from 'src/app/model/OrdersModel';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {
    Box,
    Paper,
    Button,
    Popover,
    Typography,
    IconButton,
    TablePagination
} from '@mui/material';
import {
    setOrders,
    getOrders,
    setFilter,
    selectFilter,
    selectOrders,
    selectTotalCount
} from '../store/ordersSlice';

const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
};

const OrdersTable = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [actionMenu, setActionState] = useState(null);
    const popOpen = Boolean(actionMenu);

    const filter = useSelector(selectFilter);
    const orders = useSelector(selectOrders);
    const totalCount = useSelector(selectTotalCount);

    const { isLoading, isError } = useQuery(
        ['ordersList', filter],
        async () => {
            try {
                const ordersData = await getOrders(filter);
                dispatch(setOrders(ordersData));
            } catch (error) {
                console.log(error);
            }
        }
    );

    const showDetail = (item) => history.push(`/orders/${item.id}`);

    const handleAction = (event) => {
        event.stopPropagation();
        setActionState(event.currentTarget);
    };

    const handleActionClose = (event) => {
        event.stopPropagation();
        setActionState(null);
    };

    return (
        <>
            <Paper className="flex flex-col py-24 px-24 my-24 mx-24 overflow-auto">
                <Table>
                    <Thead className="border-b-2">
                        <Tr>
                            {OrdersListHeader.map((item, index) => (
                                <Th key={index} align={item.align}>
                                    <Typography
                                        color="text.secondary"
                                        className="font-bold text-20 pb-16"
                                    >
                                        {item.label}
                                    </Typography>
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {!isLoading &&
                            !isError &&
                            orders.length > 0 &&
                            orders.map((item, index) => {
                                return (
                                    orders && (
                                        <Tr
                                            key={index}
                                            role="button"
                                            onClick={() => {
                                                showDetail(item);
                                            }}
                                        >
                                            <Td align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-16 md:pt-16"
                                                >
                                                    {item.channel}
                                                </Typography>
                                            </Td>
                                            <Td align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-16 md:pt-16"
                                                >
                                                    {item.customer}
                                                </Typography>
                                            </Td>
                                            <Td align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-16 md:pt-16"
                                                >
                                                    {item.history[0].date.toLocaleString(
                                                        'en-US',
                                                        options
                                                    )}
                                                </Typography>
                                            </Td>
                                            <Td align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-16 md:pt-16"
                                                >
                                                    $ {item.subtotal}
                                                </Typography>
                                            </Td>
                                            <Td
                                                align="left"
                                                className="md:pt-16 overflow-hidden"
                                            >
                                                <Typography
                                                    className={clsx(
                                                        'inline-flex items-center font-bold text-12 px-12 py-2 tracking-wide uppercase rounded-full',
                                                        item.history[0]
                                                            .status ===
                                                            'completed' &&
                                                            'bg-green-500 text-grey-100',
                                                        item.history[0]
                                                            .status ===
                                                            'pickedup' &&
                                                            'bg-blue-500 text-grey-100',
                                                        item.history[0]
                                                            .status ===
                                                            'pending' &&
                                                            'bg-yellow-600 text-grey-100',
                                                        item.history[0]
                                                            .status ===
                                                            'received' &&
                                                            'bg-purple-500 text-grey-100',
                                                        item.history[0]
                                                            .status ===
                                                            'rejected' &&
                                                            'bg-red-500 text-grey-100'
                                                    )}
                                                >
                                                    {item.history[0].status}
                                                </Typography>
                                            </Td>
                                            <Td
                                                align="left"
                                                className="md:pt-16"
                                            >
                                                <IconButton
                                                    onClick={handleAction}
                                                >
                                                    <MoreHoriz />
                                                </IconButton>
                                            </Td>
                                        </Tr>
                                    )
                                );
                            })}
                    </Tbody>
                </Table>
                {orders.length > 0 && (
                    <div className="flex md:flex-row flex-col items-center border-t-2 mt-16">
                        <Typography
                            className="text-18 text-center font-medium"
                            color="text.secondary"
                        >
                            {t('orders.total')} : {totalCount}
                        </Typography>
                        <TablePagination
                            className="flex-1 overflow-scroll mt-8"
                            component="div"
                            count={totalCount}
                            rowsPerPage={filter.pageSize}
                            page={filter.pageNumber}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page'
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page'
                            }}
                            onPageChange={(event, newPage) =>
                                dispatch(
                                    setFilter({
                                        ...filter,
                                        pageNumber: newPage
                                    })
                                )
                            }
                            onRowsPerPageChange={(event) => {
                                dispatch(
                                    setFilter({
                                        ...filter,
                                        pageNumber: 0,
                                        pageSize: event.target.value
                                    })
                                );
                            }}
                        />
                    </div>
                )}
                {isLoading ? (
                    <FuseLoading />
                ) : isError || orders.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center h-full py-24">
                        <Typography color="text.secondary" variant="h5">
                            {t('noData')}
                        </Typography>
                    </div>
                ) : (
                    <></>
                )}
            </Paper>
            <Popover
                open={popOpen}
                anchorEl={actionMenu}
                onClose={handleActionClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Box className="flex flex-col" sx={{ p: 1 }}>
                    <Button
                        className="text-grey-500 justify-start"
                        onClick={handleActionClose}
                    >
                        <FuseSvgIcon size={20} color="action">
                            heroicons-solid:pencil
                        </FuseSvgIcon>
                        <span className="mx-8">{t('orders.replace')}</span>
                    </Button>
                    <Button
                        className="text-grey-500 justify-start"
                        onClick={handleActionClose}
                    >
                        <FuseSvgIcon size={20} color="action">
                            heroicons-solid:trash
                        </FuseSvgIcon>
                        <span className="mx-8">{t('orders.cancel')}</span>
                    </Button>
                </Box>
            </Popover>
        </>
    );
};

export default OrdersTable;
