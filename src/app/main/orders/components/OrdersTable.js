import clsx from 'clsx';
import history from '@history';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import { MoreHoriz } from "@mui/icons-material";
import { TablePagination } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
    setPagenumber,
    setPagesize,
    selectPageSize,
    selectPageNumber,
    getOrders,
    selectOrders,
    setOrders,
    selectDbSize,
    selectFilterSize,
    selectFilter
} from '../store/ordersSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { OrdersListHeader } from 'src/app/model/OrdersModel';
import { useTranslation } from 'react-i18next';
import styles from '../style.module.scss';

const useStyles = makeStyles(() => ({
    popover: {
        '& .MuiPaper-elevation8': {
            boxShadow:
                '3px 3px 5px 1px rgba(200, 200, 200, 0.15)' /* Customize the boxShadow here */
        }
    }
}));

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
    const [anchorEl, setAnchorEl] = useState(null);
    const { t } = useTranslation();
    const classes = useStyles();
    const [searchData, setSearchData] = useState(null);

    const filter = useSelector(selectFilter);
    const page = useSelector(selectPageNumber);
    const rowsPerPage = useSelector(selectPageSize);
    const orders = useSelector(selectOrders);
    const dbSize = useSelector(selectDbSize);
    const filterSize = useSelector(selectFilterSize);

    const { data, isLoading, isError } = useQuery(
        ['ordersList', searchData],
        async () => {
            console.log(data);
            try {
                const ordersData = await getOrders(searchData);
                console.log(ordersData);
                dispatch(setOrders(ordersData));
            } catch (error) {
                console.log(error);
            }
        }
    );

    const showDetail = (item) => history.push(`/orders/${item.id}`);

    const handleAction = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleActionClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const popOpen = Boolean(anchorEl);
    const id = popOpen ? 'simple-popover' : undefined;

    useEffect(() => {
        const database = {
            searchText: filter.searchText,
            subtotal: filter.subtotal,
            channel: filter.channel,
            status: filter.status,
            pageNumber: page,
            pageSize: rowsPerPage
        };

        setSearchData(database);
    }, [filter, page, rowsPerPage]);

    return (
        <>
            {
                isLoading ?
                    <FuseLoading />
                    :
                    isError ?
                        <div className="flex flex-1 items-center justify-center h-full">
                            <Typography color="text.secondary" variant="h5">
                                {t('orders.noData')}
                            </Typography>
                        </div>
                        :
                        <Paper
                            className={`flex flex-col py-24 px-24 my-16 mx-24 overflow-auto  ${styles.paper}`}
                            sx={{ boxShadow: 'none', borderRadius: 1 }}>
                            {
                                orders.length == 0 ?
                                    <div className="flex flex-1 items-center justify-center h-full">
                                        <Typography color="text.secondary" variant="h5">
                                            {t('orders.noData')}
                                        </Typography>
                                    </div>
                                    :
                                    <>
                                        <Table>
                                            <Thead className="border-b-2">
                                                <Tr>
                                                    {OrdersListHeader.map((item, index) => (
                                                        <Th
                                                            key={index}
                                                            align={item.align}>
                                                            <Typography
                                                                color="text.secondary"
                                                                className="font-bold text-20 pb-16">
                                                                {item.label}
                                                            </Typography>
                                                        </Th>
                                                    ))}
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {
                                                    orders.map((item, index) => {
                                                        return (orders &&
                                                            <Tr
                                                                key={index}
                                                                role="button"
                                                                onClick={() => { showDetail(item); }}>
                                                                <Td align="left">
                                                                    <Typography
                                                                        color="text.secondary"
                                                                        className="text-16 md:pt-16">
                                                                        {item.channel}
                                                                    </Typography>
                                                                </Td>
                                                                <Td align="left">
                                                                    <Typography
                                                                        color="text.secondary"
                                                                        className="text-16 md:pt-16">
                                                                        {item.customer}
                                                                    </Typography>
                                                                </Td>
                                                                <Td align="left">
                                                                    <Typography
                                                                        color="text.secondary"
                                                                        className="text-16 md:pt-16">
                                                                        {item.history[0].date.toLocaleString('en-US', options)}
                                                                    </Typography>
                                                                </Td>
                                                                <Td align="left">
                                                                    <Typography
                                                                        color="text.secondary"
                                                                        className="text-16 md:pt-16">
                                                                        $ {item.subtotal}
                                                                    </Typography>
                                                                </Td>
                                                                <Td align="left" className="md:pt-16 overflow-hidden">
                                                                    <Typography
                                                                        className={clsx(
                                                                            'inline-flex items-center font-bold text-12 px-12 py-2 tracking-wide uppercase',
                                                                            item.history[0].status === "completed" &&
                                                                            'bg-green-500 text-grey-100',
                                                                            item.history[0].status === "pickedup" &&
                                                                            'bg-blue-500 text-grey-100',
                                                                            item.history[0].status === "pending" &&
                                                                            'bg-yellow-600 text-grey-100',
                                                                            item.history[0].status === "received" &&
                                                                            'bg-purple-500 text-grey-100',
                                                                            item.history[0].status === "rejected" &&
                                                                            'bg-red-500 text-grey-100',
                                                                        )}
                                                                        sx={{ borderRadius: "3px" }}>
                                                                        {item.history[0].status}
                                                                    </Typography>
                                                                </Td>
                                                                <Td align="left" className="md:pt-16">
                                                                    <IconButton aria-describedby={id} onClick={handleAction}>
                                                                        <MoreHoriz />
                                                                    </IconButton>
                                                                    <Popover
                                                                        id={id}
                                                                        open={popOpen}
                                                                        anchorEl={anchorEl}
                                                                        onClose={handleActionClose}
                                                                        className={classes.popover}
                                                                        anchorOrigin={{
                                                                            vertical: 'bottom',
                                                                            horizontal: 'left',
                                                                        }}>
                                                                        <Box className='flex flex-col' sx={{ p: 1 }}>
                                                                            <Button
                                                                                className="text-grey-500 justify-start"
                                                                                onClick={handleActionClose}>
                                                                                <FuseSvgIcon size={20} color="action">heroicons-solid:pencil</FuseSvgIcon>
                                                                                <span className='mx-8'>{t('orders.replace')}</span>
                                                                            </Button>
                                                                            <Button
                                                                                className="text-grey-500 justify-start"
                                                                                onClick={handleActionClose}>
                                                                                <FuseSvgIcon size={20} color="action">heroicons-solid:trash</FuseSvgIcon>
                                                                                <span className='mx-8'>{t('orders.cancel')}</span>
                                                                            </Button>
                                                                        </Box>
                                                                    </Popover>
                                                                </Td>
                                                            </Tr>
                                                        );
                                                    })
                                                }
                                            </Tbody>
                                        </Table>
                                        <div className="flex md:flex-row flex-col items-center border-t-2 mt-16">
                                            <Typography
                                                className="text-18 text-center font-medium"
                                                color="text.secondary">
                                                {t('orders.total')} : {dbSize}
                                            </Typography>
                                            <TablePagination
                                                className="flex-1 overflow-scroll mt-8"
                                                component="div"
                                                count={filterSize}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                                                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                                                onPageChange={(event, newPage) => dispatch(setPagenumber(parseInt(newPage, 10)))}
                                                onRowsPerPageChange={(event) => {
                                                    dispatch(setPagesize(parseInt(event.target.value, 10)));
                                                    dispatch(setPagenumber(0));
                                                }}
                                            />
                                        </div>
                                    </>
                            }
                        </Paper>
            }
        </>
    );
};

export default OrdersTable;
