import clsx from 'clsx';
import history from '@history';
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { IconButton } from '@mui/material';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectTaxInfo, selectOrderInfo } from "./store/ordersSlice";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import { OrderDetailContentHeader, OrderDetailCustomHeader } from 'src/app/model/OrdersModel';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import styles from './style.module.scss';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";
import { Status } from 'src/app/model/OrdersModel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
    updateStatus,
    getItem,
    updateStatusById,
    removeItem,
    removeFront
} from './store/ordersSlice';

const OrderDetail = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const taxInfo = useSelector(selectTaxInfo);
    const orderInfo = useSelector(selectOrderInfo);

    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [removeId, setRemoveId] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        dispatch(getItem(routeParams.id));
    }, [routeParams]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleStatusChange = (status) => {
        const statusData = {
            id: orderInfo.id,
            status: status
        }
        dispatch(updateStatusById(statusData))
        dispatch(updateStatus(status));
        setAnchorEl(null);
    }
    const handleRemoveItem = () => {
        const item = {
            orderId: orderInfo.id,
            itemId: removeId
        }
        dispatch(removeItem(item))
        dispatch(removeFront(removeId))
        setDialogOpen(false);
    }

    const handleOpenDialog = (id) => {
        setDialogOpen(true);
        setRemoveId(id);
    }

    return (
        <div>
            <div className='flex items-center mx-32 mt-32 justify-between'>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            className="inline text-18 text-center font-medium"
                            color="text.secondary"
                            role="button"
                            component={NavLinkAdapter}
                            to={`../orders`}>
                            {t('orders.orders')}
                        </Typography>
                        <Typography className="inline text-18 text-center font-medium text-pink-500">
                            {t('orders.detail')}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => { history.push('/orders'); }}
                    className={styles.backButton}
                >
                    <FuseSvgIcon size={18}>heroicons-solid:arrow-left</FuseSvgIcon>
                    <span className='ml-8'>{t('back')}</span>
                </Button>
            </div>
            <div className='flex flex-col md:flex-row'>
                <Paper
                    className="px-8 py-24 my-32 mx-32 md:w-1/2"
                    sx={{ boxShadow: 'none', borderRadius: 1 }}>
                    <div className="sm:items-start mx-24">
                        <Typography
                            className="text-20 font-medium"
                            color="text.secondary">
                            {t('orders.orderInfo')}
                        </Typography>
                    </div>
                    <FuseScrollbars className="grow overflow-x-auto mx-24 mt-16">
                        <Table>
                            <TableHead className='border-b-2'>
                                <TableRow>
                                    {OrderDetailCustomHeader.map((item, index) => (
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
                                {orderInfo &&
                                    <TableRow>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14">
                                                {orderInfo.customer}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14">
                                                {orderInfo.date}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14">
                                                {orderInfo.channel}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                className={clsx(
                                                    'inline-flex items-center font-bold text-12 px-10 py-2 tracking-wide uppercase',
                                                    orderInfo.status === "completed" &&
                                                    'bg-green-500 text-grey-100',
                                                    orderInfo.status === "pending" &&
                                                    'bg-yellow-600 text-grey-100',
                                                    orderInfo.status === "rejected" &&
                                                    'bg-red-500 text-grey-100',
                                                )}
                                                role="button"
                                                aria-describedby={id}
                                                onClick={handleClick}
                                                sx={{
                                                    borderRadius: "3px"
                                                }}>
                                                {orderInfo.status}
                                                {!open && <FuseSvgIcon className="inline" size={24}>heroicons-solid:chevron-down</FuseSvgIcon>}
                                                {open && <FuseSvgIcon className="inline" size={24}>heroicons-solid:chevron-up</FuseSvgIcon>}
                                            </Typography>
                                            <Popover
                                                id={id}
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <Box className='flex flex-col' sx={{ p: 1 }}>
                                                    {
                                                        Status.map((item, index) => {
                                                            return (
                                                                <Typography
                                                                    key={index}
                                                                    color="text.secondary"
                                                                    role="button"
                                                                    className="font-semibold text-14 px-8 py-2 uppercase uppercase"
                                                                    onClick={() => handleStatusChange(item)}
                                                                >
                                                                    {item}
                                                                </Typography>
                                                            )
                                                        })
                                                    }
                                                </Box>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </FuseScrollbars>
                </Paper>

                <Paper
                    className="px-8 py-24 my-32 mx-32 md:w-1/2"
                    sx={{ boxShadow: 'none', borderRadius: 1 }}>
                    <div className="sm:items-start mx-24">
                        <Typography
                            className="text-20 font-medium"
                            color="text.secondary">
                            {t('orders.taxInfo')}
                        </Typography>
                    </div>
                    <FuseScrollbars className="grow overflow-x-auto mx-24 mt-16">
                        <Table>
                            <TableHead className='border-b-2'>
                                <TableRow>
                                    {OrderDetailContentHeader.map((item, index) => (
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
                                {taxInfo
                                    .map((item, index) => {
                                        return (taxInfo &&
                                            <TableRow
                                                key={index}
                                                role="button"
                                            >
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14">
                                                        image
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14">
                                                        {item.category}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14">
                                                        {item.quantity}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14">
                                                        $ {item.price}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <IconButton
                                                        className="text-gray-500"
                                                        onClick={() => handleOpenDialog(item.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <Dialog
                                                    open={dialogOpen}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"User"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Do you want to really delete this Item?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Disagree</Button>
                                                        <Button onClick={handleRemoveItem} autoFocus>
                                                            Agree
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </TableRow>
                                        );
                                    })}
                                <TableRow className='border-t-2'>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16">
                                            subtotal
                                        </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-bold text-30">
                                            $ {orderInfo.subtotal}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='border-t-2'>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16">
                                            tax
                                        </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-bold text-30">
                                            $ {orderInfo.tax}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow className='border-t-2'>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16">
                                            tip
                                        </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-bold text-30">
                                            $ {orderInfo.tip}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </FuseScrollbars>
                </Paper>
            </div >
        </div>
    );
};

export default withReducer('ordersApp', reducer)(OrderDetail);

