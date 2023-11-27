import clsx from 'clsx';
<<<<<<< HEAD
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { selectSearchText, selectSubtotal, setPagenumber, setPagesize } from "./store/ordersSlice";
import { useDispatch } from 'react-redux';
import { selectOrders, selectPageSize, selectPageNumber, selectDBsize, selectItems, selectChannel, selectStatus } from "./store/ordersSlice";
import { getOrders, getItem } from "./store/ordersSlice";
import Popover from "@mui/material/Popover";
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrowBack } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import { Divider } from "@mui/material";
import { useQuery } from "react-query";
import axios from 'axios';
import styles from './style.module.scss';
=======
>>>>>>> e3ac1891d1925e64e7ed03891405c4e847c34fc2
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

<<<<<<< HEAD
const headerColor = red[500];

const OrderDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: headerColor,
        color: theme.palette.common.white,
    }
}));

const headers = [
    // {
    //     id: 'id',
    //     align: 'center',
    //     disablePadding: true,
    //     label: 'NO',
    //     sort: true,
    // },
    {
        id: 'customer',
        align: 'left',
        disablePadding: true,
        label: 'Customer',
        sort: true,
    },
    {
        id: 'datetime',
        align: 'left',
        disablePadding: false,
        label: 'Datetime',
        sort: true,
    },
    {
        id: 'subtotal',
        align: 'left',
        disablePadding: true,
        label: 'Subtotal',
        sort: true,
    },
    {
        id: 'channel',
        align: 'left',
        disablePadding: true,
        label: 'Channel',
        sort: true,
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: true,
        label: 'Status',
        sort: true,
    },
    {
        id: 'action',
        align: 'left',
        disablePadding: true,
        label: 'Action',
        sort: true,
    },
];

const fetchMyData = async (searchData) => {
    const response = await axios.post('/api/getorders', searchData);
    // const data = await response.json();
    return response.data;
};

function OrdersTable(props) {
=======
const OrdersTable = () => {
>>>>>>> e3ac1891d1925e64e7ed03891405c4e847c34fc2
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const { t } = useTranslation();

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

<<<<<<< HEAD
    const handleDialogOpen = (item) => {
        dispatch(getItem(item.id));
        const url = item.id;
        history.push('/orders/${url}');
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    });

    // useEffect(() => {
    //     const searchData = {
    //         searchText: searchText,
    //         subtotal: subtotal,
    //         channel: channel,
    //         status: status,
    //         pageNumber: page,
    //         pageSize: rowsPerPage,
    //     };


    // }, [searchText])

    // dispatch -> getOrders()
    // useEffect(() => {
    //     dispatch(getOrders());
    // }, [page, rowsPerPage]);

    // case: empty Orders
    if (allOrders == null) {
        return <FuseSplashScreen />;
=======
    if (isLoading) {
        return <FuseLoading />
    }

    if(isError) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="text.secondary" variant="h5">
                    { t('orders.noData') }
                </Typography>
            </div>
        )
>>>>>>> e3ac1891d1925e64e7ed03891405c4e847c34fc2
    }

    if (allOrders.pagedData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="text.secondary" variant="h5">
                { t('orders.noData') }
                </Typography>
            </div>
        );
    }

    const handleAction = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    }

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
                                            onClick={() => { showDetail(item) }}>
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
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}>
                                                    <Box className='flex flex-col' sx={{ p: 1 }}>
                                                        <Button
                                                            className="text-blue-500"
                                                            onClick={handleActionClose}
                                                            startIcon={<EditIcon />}>
                                                            { t('orders.replace') }
                                                        </Button>
                                                        <Button
                                                            className="text-blue-500"
<<<<<<< HEAD
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                handleClose();
                                                            }}
                                                            startIcon={<ArrowBack />}>
                                                            Cancel
=======
                                                            onClick={handleActionClose}
                                                            startIcon={<DeleteIcon />}>
                                                            { t('orders.cancel') }
>>>>>>> e3ac1891d1925e64e7ed03891405c4e847c34fc2
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
                            { t('orders.total') } : {dbSize}
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
}

export default OrdersTable;
