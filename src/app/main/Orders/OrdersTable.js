import clsx from 'clsx';
import history from '@history';
import { useState } from "react";
import { format } from "date-fns";
import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { Button } from "@mui/material";
import { motion } from 'framer-motion';
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import { useDispatch } from 'react-redux';
import { Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { MoreHoriz } from "@mui/icons-material";
import { TablePagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
    selectSearchText,
    selectSubtotal,
    setPagenumber,
    setPagesize,
    selectPageSize,
    selectPageNumber,
    selectChannel,
    selectStatus,
    getOrders
} from "./store/ordersSlice";
import FuseLoading from '@fuse/core/FuseLoading';
import { OrdersListHeader } from 'src/app/model/OrdersModel';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
    popover: {
        '& .MuiPaper-elevation8': {
            boxShadow: '3px 3px 5px 1px rgba(200, 200, 200, 0.15)' /* Customize the boxShadow here */
        }
    },
}));

const OrdersTable = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const { t } = useTranslation();
    const classes = useStyles();

    const searchText = useSelector(selectSearchText);
    const subtotal = useSelector(selectSubtotal);
    const channel = useSelector(selectChannel);
    const status = useSelector(selectStatus);
    const page = useSelector(selectPageNumber);
    const rowsPerPage = useSelector(selectPageSize);

    const searchData = {
        searchText: searchText,
        subtotal: subtotal,
        channel: channel,
        status: status,
        pageNumber: page,
        pageSize: rowsPerPage,
    };

    const { data: allOrders, isLoading, isError } = useQuery(['ordersList', searchData], () => getOrders(searchData));
    const dbSize = allOrders && allOrders.dbSize;
    const filterSize = allOrders && allOrders.filterSize;

    const showDetail = (item) => history.push(`/orders/${item.id}`);

    if (isLoading) {
        return <FuseLoading />;
    }

    if (isError) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="text.secondary" variant="h5">
                    {t('orders.noData')}
                </Typography>
            </div>
        );
    }

    if (allOrders.pagedData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="text.secondary" variant="h5">
                    {t('orders.noData')}
                </Typography>
            </div>
        );
    }

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

    return (
        <>
            <Paper
                className="flex flex-col py-24 border-b-10 my-16 mx-32"
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                sx={{ boxShadow: 'none', borderRadius: 1 }}>
                <FuseScrollbars className="grow overflow-x-auto mx-24">
                    <Table>
                        <TableHead>
                            <TableRow>
                                {OrdersListHeader.map((item, index) => (
                                    <TableCell
                                        className="border-b-1"
                                        key={index}
                                        align={item.align}>
                                        <Typography
                                            color="text.secondary"
                                            className="font-bold text-16">
                                            {item.label}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allOrders.pagedData
                                .map((item, index) => {
                                    return (allOrders &&
                                        <TableRow
                                            key={index}
                                            role="button"
                                            onClick={() => { showDetail(item); }}>
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14 ml-8">
                                                    {item.customer}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14 -ml-8">
                                                    {format(new Date(item.date), 'MMMM d,y')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14">
                                                    $ {item.subtotal}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14">
                                                    {item.channel}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    className={clsx(
                                                        'inline-flex items-center font-bold text-12 px-10 py-2 tracking-wide uppercase',
                                                        item.status === "completed" &&
                                                        'bg-green-500 text-grey-100',
                                                        item.status === "pending" &&
                                                        'bg-yellow-600 text-grey-100',
                                                        item.status === "rejected" &&
                                                        'bg-red-500 text-grey-100',
                                                    )}
                                                    sx={{ borderRadius: "3px" }}>
                                                    {item.status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton aria-describedby={id} onClick={handleAction}>
                                                    <MoreHoriz />
                                                </IconButton>
                                                <Popover
                                                    id={id}
                                                    open={popOpen}
                                                    anchorEl={anchorEl}
                                                    onClose={handleActionClose}
                                                    // sx={{
                                                    //     '.muiltr-q5bk6i-MuiPaper-root-MuiPopover-paper': {
                                                    //         boxShadow: '3px 3px 5px 1px rgba(200, 200, 200, 0.15)' /* Customize the boxShadow here */
                                                    //     }
                                                    // }}
                                                    className={classes.popover}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}>
                                                    <Box className='flex flex-col' sx={{ p: 1 }}>
                                                        <Button
                                                            className="text-blue-500"
                                                            onClick={handleActionClose}
                                                            startIcon={<EditIcon />}>
                                                            {t('orders.replace')}
                                                        </Button>
                                                        <Button
                                                            className="text-blue-500"
                                                            onClick={handleActionClose}
                                                            startIcon={<DeleteIcon />}>
                                                            {t('orders.cancel')}
                                                        </Button>
                                                    </Box>
                                                </Popover>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                    <div className="flex flex-row border-t-1">
                        <Typography
                            className="inline text-16 text-center font-medium mt-16 ml-24"
                            color="text.secondary">
                            {t('orders.total')} : {dbSize}
                        </Typography>
                        <TablePagination
                            className=" flex-auto"
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
                </FuseScrollbars>
            </Paper>
        </>
    );
};

export default OrdersTable;
