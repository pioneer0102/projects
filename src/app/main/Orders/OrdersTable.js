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
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import TableContainer from '@mui/material/TableContainer';
import { Divider } from "@mui/material";
import { useQuery } from "react-query";
import axios from 'axios';

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

const fetchMyData = async () => {
    const response = await axios.post('/api/getorders', searchData);
    const data = await response.json();
    return data;
}

function OrdersTable(props) {
    const dispatch = useDispatch();
    // const allOrders = useSelector(selectOrders);
    const page = useSelector(selectPageNumber);
    const rowsPerPage = useSelector(selectPageSize);
    const dbSize = useSelector(selectDBsize);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const itemsInfo = useSelector(selectItems);
    const {data, isLoading, error} = useQuery('myData', fetchMyData);
    const allOrders = data;
    console.log(allOrders);

    // Dialog constants
    const [open, setOpen] = useState(false);

    const handleDialogOpen = (item) => {
        dispatch(getItem(item));
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
    // useEffect(() => {
    //     dispatch(getOrders());
    // }, [page, rowsPerPage]);

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

    return (
        <>
            <Paper
                className="flex flex-col px-8 py-24 border-b-10 my-32 mx-32"
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                sx={{ boxShadow: 'none', borderRadius: 1 }}
            >
                <div className="mx-24">
                    <Typography
                        className="inline text-16 text-center font-medium"
                        color="text.secondary"
                    >
                        Total Orders : {dbSize}
                    </Typography>

                </div>
                <FuseScrollbars className="grow overflow-x-auto mx-24 mt-16">
                    <Table className="simple">
                        <TableHead>
                            <TableRow>
                                {headers.map((item, index) => (
                                    <TableCell
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

                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allOrders
                                .map((item, index) => {
                                    return (allOrders &&
                                        <TableRow
                                            key={index}
                                            role="button"
                                            onClick={() => handleDialogOpen(item)}
                                            component={NavLinkAdapter}
                                            to={`${item.id}`}
                                        >
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
                                                    className="font-semibold text-14 ml-8"
                                                >
                                                    {item.customer}
                                                </Typography>

                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14 -ml-8"
                                                >
                                                    {format(new Date(item.date), 'MMMM d,y')}
                                                </Typography>

                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    $ {item.subtotal}
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
                                                        'inline-flex items-center font-bold text-12 px-10 py-2 tracking-wide uppercase',
                                                        item.status === "completed" &&
                                                        'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-50',
                                                        item.status === "pending" &&
                                                        'bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-50',
                                                        item.status === "rejected" &&
                                                        'bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-50',
                                                    )}
                                                    sx={{
                                                        borderRadius: "3px"
                                                    }}
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
                    <>

                        <TablePagination
                            className="border-t-1"
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

                    </>
                </FuseScrollbars>
            </Paper>
        </>
    )
}

export default OrdersTable;
