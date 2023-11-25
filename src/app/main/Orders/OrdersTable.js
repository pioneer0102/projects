import Paper from "@mui/material/Paper";
import { motion } from 'framer-motion';
import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from "@mui/material";
import { red } from '@mui/material/colors';
import { useSelector } from "react-redux/es/hooks/useSelector";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { format } from "date-fns";
import IconButton from '@mui/material/IconButton';
import { Button } from "@mui/material";
import { MoreHoriz, NoEncryption } from "@mui/icons-material";
import { TablePagination } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import clsx from 'clsx';
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { setPagenumber, setPagesize } from "./store/ordersSlice";
import { useDispatch } from 'react-redux';
import { selectOrders, selectPageSize, selectPageNumber, selectDBsize, selectItems } from "./store/ordersSlice";
import { getOrders, getItem } from "./store/ordersSlice";
import Popover from "@mui/material/Popover";
import DeleteIcon from '@mui/icons-material/Delete';
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

const headerColor = red[500];

const useStyles = makeStyles({
    myCustomClass: {
        boxShadow: 'none'
    }

})

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

function OrdersTable(props) {
    const dispatch = useDispatch();
    const allOrders = useSelector(selectOrders);
    const page = useSelector(selectPageNumber);
    const rowsPerPage = useSelector(selectPageSize);
    const dbSize = useSelector(selectDBsize);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const itemsInfo = useSelector(selectItems);
    const [total, setTotal] = useState(0);

    // Dialog constants
    const [open, setOpen] = useState(false);

    const handleDialogOpen = (item) => {
        setOpen(true);
        dispatch(getItem(item.items));
        setTotal(item.subtotal);
    }

    const handleDialogClose = () => {
        setOpen(false);
    }

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    })

    // dispatch -> getOrders()
    useEffect(() => {
        dispatch(getOrders());
    }, [page, rowsPerPage]);

    // case: empty Orders
    if (allOrders == null) {
        return <FuseSplashScreen />
    }

    if (allOrders.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="text.secondary" variant="h5">
                    There are no Orders!
                </Typography>
            </div>
        )
    }

    // Popover constants
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("asdfsdafsdf");
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const popOpen = Boolean(anchorEl);
    const id = popOpen ? 'simple-popover' : undefined;

    // Detail Component
    const Detail = () => {
        return (
            <Table aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Image</TableCell>
                        <TableCell align="center">Product Name</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {itemsInfo.map((item, index) => {
                        return ( itemsInfo && 
                            <TableRow key = {index}>
                                <TableCell align="center">image</TableCell>
                                <TableCell align="center">{item.productname}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                            </TableRow>
                        )
                    })}
                    {/* <Divider 
                    variant = "middle"
                    className = "w-96"
                    sx = {{
                        borderTopWidth: 2,
                        borderTopColor: 'text.secondary'
                    }} /> */}
                    <TableRow>
                        <TableCell align = "center">Subtotal</TableCell>
                        <TableCell colspan = {2}></TableCell>
                        <TableCell align="center">{total}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        )
    }

    return (
        <>
            <Paper
                className="flex flex-col px-16 py-24 border-b-10 my-32 mx-32"
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            >
                <FuseScrollbars className="grow overflow-x-auto mx-16 ">
                    <Table className="simple">
                        <TableHead>
                            <TableRow>
                                {headers.map((item, index) => (
                                    <TableCell
                                        key={index}
                                        align={item.align}
                                        padding='none'
                                    >
                                        <Typography
                                            color="text.secondary"
                                            className="font-bold text-16"
                                        >
                                            {item.label}
                                        </Typography>
                                    </TableCell>

                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allOrders
                                .map((item, index) => {
                                    return (allOrders &&
                                        <TableRow key={index} onClick={() => handleDialogOpen(item)}>
                                            {/* <TableCell align="center">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    {parseInt(index) + 1}
                                                </Typography>
                                            </TableCell> */}
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    {item.customer}
                                                </Typography>

                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    {format(new Date(item.date), 'MMMM d,y')}
                                                </Typography>

                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    ${item.subtotal}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    {item.channel}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    className={clsx(
                                                        'inline-flex items-center font-bold text-12 px-10 py-2 rounded-full tracking-wide uppercase',
                                                        item.status === "completed" &&
                                                        'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-50',
                                                        item.status === "pending" &&
                                                        'bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-50',
                                                        item.status === "rejected" &&
                                                        'bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-50',
                                                    )}
                                                >
                                                    {item.status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton aria-describedby={id} onClick={handleClick}>
                                                    <MoreHoriz />
                                                </IconButton>
                                                {/* <Popover
                                                    id={id}
                                                    open={popOpen}
                                                    anchorEl={anchorEl}
                                                    onClose={handleClose}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    
                                                >
                                                    <Box className='flex flex-col' sx={{ p: 1 }}>
                                                        <Button className="text-blue-500" onClick={handleClose} startIcon={<EditIcon />}>
                                                            Replace
                                                        </Button>
                                                        <Button className="text-blue-500" onClick={handleClose} startIcon={<DeleteIcon />}>
                                                            Cancel
                                                        </Button>
                                                    </Box>
                                                </Popover> */}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        className="shrink-0 border-t-1"
                        component="div"
                        // count={filteredData.length}
                        count={dbSize}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onPageChange={(event, newPage) => dispatch(setPagenumber(parseInt(newPage, 10)))}
                        onRowsPerPageChange={(event) => {
                            dispatch(setPagesize(parseInt(event.target.value, 10)));
                            dispatch(setPagenumber(0));
                        }
                        }
                    />
                </FuseScrollbars>
            </Paper>
            <OrderDialog
                open={open}
                onClose={handleDialogClose}
                scroll="paper"
                aria-labelledby="order-dialog-title"
                aria-describedby="order-dialog-description"
            >
                <DialogTitle
                    id="scroll-dialog-title"
                    sx={{ m: 0, p: 4 }}
                >
                    Order Detail Information
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Detail />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleDialogClose}>Subscribe</Button>
                </DialogActions>
            </OrderDialog>
        </>
    )
}

export default OrdersTable;
