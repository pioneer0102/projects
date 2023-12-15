/* eslint-disable indent */
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectTaxInfo, selectOrderInfo } from './store/ordersSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import {
    OrderDetailContentHeader,
    OrderDetailCustomHeader
} from 'src/app/model/OrdersModel';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Status, ItemStatus } from 'src/app/model/OrdersModel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { showMessage } from 'app/store/fuse/messageSlice';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import { selectUser } from 'app/store/userSlice';
import history from '@history';

import {
    updateStatus,
    updateItemStatus,
    getItem,
    updateStatusById,
    updateItemStatusById,
    removeItem,
    removeFront
} from './store/ordersSlice';

const breadCrumbs = [
    { name: 'Orders', url: '/orders' },
    { name: 'Detail', url: null }
];

const OrderDetail = () => {
    const user = useSelector(selectUser);
    if (user.role === 'admin') {
        history.push('/item-management');
        return;
    }
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const taxInfo = useSelector(selectTaxInfo);
    const orderInfo = useSelector(selectOrderInfo);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorItemEl, setAnchorItemEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [itemIndex, setItemIndex] = useState(0);
    const [itemId, setItemid] = useState(0);

    const open = Boolean(anchorEl);
    const itemOpen = Boolean(anchorItemEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        dispatch(getItem(routeParams.id));
    }, [routeParams]);

    const handleClick = (currentTarget, historyIndex) => {
        if (historyIndex !== 0) return;
        setAnchorEl(currentTarget);
        setHistoryIndex(historyIndex);
    };

    const handleClickItemStatus = (currentTarget, itemIndex, itemId) => {
        setAnchorItemEl(currentTarget);
        setItemIndex(itemIndex);
        setItemid(itemId);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setAnchorEl(null);
        setAnchorItemEl(null);
    };

    const handleStatusChange = (status) => {
        const statusData = {
            id: orderInfo.id,
            history: historyIndex,
            status: status
        };
        dispatch(updateStatusById(statusData));
        dispatch(updateStatus(statusData));
        setAnchorEl(null);
    };
    const handleItemStatusChange = (itemStatus) => {
        const statusData = {
            id: orderInfo.id,
            itemId: itemId,
            itemIndex: itemIndex,
            itemStatus: itemStatus
        };
        dispatch(updateItemStatusById(statusData));
        dispatch(updateItemStatus(statusData));
        setAnchorItemEl(null);
    };

    const handleRemoveItem = () => {
        const item = {
            orderId: orderInfo.id,
            itemId: removeId
        };
        dispatch(removeItem(item));
        dispatch(removeFront(removeId));
        setDialogOpen(false);
        dispatch(
            showMessage({
                message: 'Deleted item successfully.',
                variant: 'success'
            })
        );
    };

    const handleOpenDialog = (id) => {
        setDialogOpen(true);
        setRemoveId(id);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between pt-24 px-24 md:px-24">
                <Breadcrumb breadCrumbs={breadCrumbs} />

                <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                    <Button
                        component={Link}
                        to="/orders"
                        variant="contained"
                        color="secondary"
                        startIcon={
                            <FuseSvgIcon size={18}>
                                heroicons-solid:arrow-left
                            </FuseSvgIcon>
                        }
                    >
                        {t('back')}
                    </Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <Paper
                    className="px-8 py-24 my-24 mx-24 md:w-1/2"
                    sx={{ boxShadow: 'none', borderRadius: 1 }}
                >
                    <div className="sm:items-start mx-24">
                        <Typography
                            className="text-20 font-medium"
                            color="text.secondary"
                        >
                            {t('orders.orderInfo')}
                        </Typography>
                    </div>
                    <FuseScrollbars className="grow overflow-x-auto mx-24 mt-16">
                        <Table>
                            <TableHead className="border-b-2">
                                <TableRow>
                                    {OrderDetailCustomHeader.map(
                                        (item, index) => (
                                            <TableCell
                                                className="border-b-1"
                                                key={index}
                                                align={item.align}
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-bold text-16"
                                                >
                                                    {item.label}
                                                </Typography>
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderInfo.history &&
                                    orderInfo.history.map(
                                        (item, historyIndex) => {
                                            return (
                                                <TableRow key={historyIndex}>
                                                    <TableCell align="left">
                                                        <Typography
                                                            color="text.secondary"
                                                            className="text-16"
                                                        >
                                                            {historyIndex === 0
                                                                ? orderInfo.customer
                                                                : ''}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography
                                                            color="text.secondary"
                                                            className="text-16"
                                                        >
                                                            {historyIndex === 0
                                                                ? orderInfo.channel
                                                                : ''}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography
                                                            color="text.secondary"
                                                            className="text-14"
                                                        >
                                                            {item.date}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography
                                                            className={clsx(
                                                                'inline-flex items-center font-bold text-12 px-12 py-2 tracking-wide uppercase',
                                                                item.status ===
                                                                    'completed' &&
                                                                    'bg-green-500 text-grey-100',
                                                                item.status ===
                                                                    'pickedup' &&
                                                                    'bg-blue-500 text-grey-100',
                                                                item.status ===
                                                                    'pending' &&
                                                                    'bg-yellow-600 text-grey-100',
                                                                item.status ===
                                                                    'received' &&
                                                                    'bg-purple-500 text-grey-100',
                                                                item.status ===
                                                                    'rejected' &&
                                                                    'bg-red-500 text-grey-100'
                                                            )}
                                                            role="button"
                                                            aria-describedby={
                                                                id
                                                            }
                                                            onClick={(event) =>
                                                                handleClick(
                                                                    event.currentTarget,
                                                                    historyIndex
                                                                )
                                                            }
                                                            sx={{
                                                                borderRadius:
                                                                    '3px'
                                                            }}
                                                        >
                                                            {item.status}
                                                            {historyIndex ===
                                                                0 &&
                                                                !open && (
                                                                    <FuseSvgIcon
                                                                        className="inline"
                                                                        size={
                                                                            20
                                                                        }
                                                                    >
                                                                        heroicons-solid:chevron-down
                                                                    </FuseSvgIcon>
                                                                )}
                                                            {open && (
                                                                <FuseSvgIcon
                                                                    className="inline"
                                                                    size={20}
                                                                >
                                                                    heroicons-solid:chevron-up
                                                                </FuseSvgIcon>
                                                            )}
                                                        </Typography>
                                                        {/* <Popover
                                                        id={id}
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                    >
                                                        <Box className='flex flex-col' sx={{ p: 1 }}
                                                            {
                                                                Status.map((item, indexStatus) => {
                                                                    return (
                                                                        <Typography
                                                                            key={indexStatus}
                                                                            color="text.secondary"
                                                                            role="button"
                                                                            className="text-14 px-8 py-2 uppercase uppercase"
                                                                            onClick={() => handleStatusChange(item)}
                                                                        >
                                                                            {item}
                                                                        </Typography>
                                                                    )
                                                                })
                                                            }
                                                            onClick={(event) =>
                                                                handleClick(
                                                                    event.currentTarget,
                                                                    historyIndex
                                                                )
                                                            }
                                                            sx={{
                                                                borderRadius:
                                                                    '3px'
                                                            }}
                                                        >
                                                            {item.status}
                                                            {historyIndex ==
                                                                0 &&
                                                                !open && (
                                                                    <FuseSvgIcon
                                                                        className="inline"
                                                                        size={
                                                                            20
                                                                        }
                                                                    >
                                                                        heroicons-solid:chevron-down
                                                                    </FuseSvgIcon>
                                                                )}
                                                            {open && (
                                                                <FuseSvgIcon
                                                                    className="inline"
                                                                    size={20}
                                                                >
                                                                    heroicons-solid:chevron-up
                                                                </FuseSvgIcon>
                                                            )}
                                                        </Box>
                                                    </Popover> */}
                                                        <Popover
                                                            id={id}
                                                            open={open}
                                                            anchorEl={anchorEl}
                                                            onClose={
                                                                handleClose
                                                            }
                                                            anchorOrigin={{
                                                                vertical:
                                                                    'bottom',
                                                                horizontal:
                                                                    'left'
                                                            }}
                                                        >
                                                            <Box
                                                                className="flex flex-col"
                                                                sx={{ p: 1 }}
                                                            >
                                                                {Status.map(
                                                                    (
                                                                        item,
                                                                        indexStatus
                                                                    ) => {
                                                                        return (
                                                                            <Typography
                                                                                key={
                                                                                    indexStatus
                                                                                }
                                                                                color="text.secondary"
                                                                                role="button"
                                                                                className="font-semibold text-14 px-8 py-2 uppercase uppercase"
                                                                                onClick={() =>
                                                                                    handleStatusChange(
                                                                                        item
                                                                                    )
                                                                                }
                                                                            >
                                                                                {
                                                                                    item
                                                                                }
                                                                            </Typography>
                                                                        );
                                                                    }
                                                                )}
                                                            </Box>
                                                        </Popover>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                            </TableBody>
                        </Table>
                    </FuseScrollbars>
                </Paper>

                <Paper
                    className="px-8 py-24 my-24 mx-32 md:w-1/2"
                    sx={{ boxShadow: 'none', borderRadius: 1 }}
                >
                    <div className="sm:items-start mx-24">
                        <Typography
                            className="text-20 font-medium"
                            color="text.secondary"
                        >
                            {t('orders.itemInfo')}
                        </Typography>
                    </div>
                    <FuseScrollbars className="grow overflow-x-auto mx-24 mt-16">
                        <Table>
                            <TableHead className="border-b-2">
                                <TableRow>
                                    {OrderDetailContentHeader.map(
                                        (item, index) => (
                                            <TableCell
                                                className="border-b-1"
                                                key={index}
                                                align={item.align}
                                            >
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-bold text-16"
                                                >
                                                    {item.label}
                                                </Typography>
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {taxInfo.map((item, itemIndex) => {
                                    return (
                                        taxInfo && (
                                            <TableRow
                                                key={itemIndex}
                                                role="button"
                                            >
                                                <TableCell align="left">
                                                    <img
                                                        src={item.image}
                                                        width={64}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="text-14"
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="text-14"
                                                    >
                                                        {item.quantity}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="text-14"
                                                    >
                                                        $ {item.price}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        className={clsx(
                                                            'inline-flex items-center font-bold text-12 px-12 py-2 tracking-wide uppercase',
                                                            item.status ===
                                                                'replaced' &&
                                                                'bg-blue-500 text-grey-100',
                                                            item.status ===
                                                                'canceled' &&
                                                                'bg-red-500 text-grey-100'
                                                        )}
                                                        sx={{
                                                            borderRadius: '3px'
                                                        }}
                                                        onClick={(event) =>
                                                            handleClickItemStatus(
                                                                event.currentTarget,
                                                                itemIndex,
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        {item.status}
                                                        {itemId === item.id &&
                                                        itemOpen &&
                                                        item.status ? (
                                                            <FuseSvgIcon
                                                                className="inline"
                                                                size={20}
                                                            >
                                                                heroicons-solid:chevron-up
                                                            </FuseSvgIcon>
                                                        ) : item.status ? (
                                                            <FuseSvgIcon
                                                                className="inline"
                                                                size={20}
                                                            >
                                                                heroicons-solid:chevron-down
                                                            </FuseSvgIcon>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Typography>
                                                    <Popover
                                                        id={id}
                                                        open={itemOpen}
                                                        anchorEl={anchorItemEl}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left'
                                                        }}
                                                    >
                                                        <Box
                                                            className="flex flex-col"
                                                            sx={{ p: 1 }}
                                                        >
                                                            {ItemStatus.map(
                                                                (
                                                                    item,
                                                                    indexStatus
                                                                ) => {
                                                                    return (
                                                                        <Typography
                                                                            key={
                                                                                indexStatus
                                                                            }
                                                                            color="text.secondary"
                                                                            role="button"
                                                                            className="text-14 px-8 py-2 uppercase uppercase"
                                                                            onClick={() =>
                                                                                handleItemStatusChange(
                                                                                    item
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                item
                                                                            }
                                                                        </Typography>
                                                                    );
                                                                }
                                                            )}
                                                        </Box>
                                                    </Popover>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <IconButton
                                                        className="text-gray-500"
                                                        onClick={() =>
                                                            handleOpenDialog(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    );
                                })}
                                <TableRow className="border-t-2">
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-16"
                                        >
                                            Subtotal
                                        </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-30"
                                        >
                                            $ {orderInfo.subtotal}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-t-2">
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-16"
                                        >
                                            Tax
                                        </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-30"
                                        >
                                            $ {orderInfo.tax}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-t-2">
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-16"
                                        >
                                            Tip
                                        </Typography>
                                    </TableCell>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="text-30"
                                        >
                                            $ {orderInfo.tip}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </FuseScrollbars>
                </Paper>
            </div>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="p-24">
                    <DialogContent className="p-0">
                        <h1 className="mt-12 mb-12">
                            Are you sure to delete this Item?
                        </h1>
                    </DialogContent>
                    <DialogActions className="p-0 mt-12">
                        <Button
                            variant="outline"
                            color="secondary"
                            onClick={handleClose}
                            className="rounded-md"
                        >
                            <span>{t('cancel')}</span>
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleRemoveItem}
                            className="rounded-md"
                        >
                            <span>{t('ok')}</span>
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
};

export default withReducer('ordersApp', reducer)(OrderDetail);
