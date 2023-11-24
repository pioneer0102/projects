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
import { selectOrders } from "./store/ordersSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { format } from "date-fns";
import IconButton from '@mui/material/IconButton';
import { Button } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import clsx from 'clsx';
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { setPagenumber, setPagesize } from "./store/ordersSlice";
import { useDispatch } from 'react-redux';
import { selectPageSize, selectPageNumber, selectDBsize } from "./store/ordersSlice";
import { getOrders } from "./store/ordersSlice";
import { Popover } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";


const headerColor = red[500];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: headerColor,
        color: theme.palette.common.white,
    }
}));

const headers = [
    {
        id: 'id',
        align: 'center',
        disablePadding: true,
        label: 'NO',
        sort: false,
    },
    {
        id: 'customer',
        align: 'center',
        disablePadding: false,
        label: 'Customer',
        sort: true,
    },
    {
        id: 'datetime',
        align: 'center',
        disablePadding: false,
        label: 'Datetime',
        sort: true,
    },
    {
        id: 'subtotal',
        align: 'center',
        disablePadding: false,
        label: 'Subtotal',
        sort: true,
    },
    {
        id: 'channel',
        align: 'center',
        disablePadding: false,
        label: 'Channel',
        sort: true,
    },
    {
        id: 'status',
        align: 'center',
        disablePadding: false,
        label: 'Status',
        sort: true,
    },
    {
        id: 'action',
        align: 'center',
        disablePadding: false,
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

    useEffect(() => {
        dispatch(getOrders());
    }, [page, rowsPerPage]);

    const status = ["Completed", "Pending", "Rejected"];

    // const tableStyles = makeStyles({
    //     tableBody: {
    //         height: 20
    //     },
    // })

    // const classes = tableStyles();

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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = anchorEl;
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Paper
                className="flex flex-col p-8 border-b-1 my-32 mx-32"
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            >
                <FuseScrollbars className="grow overflow-x-auto">
                    <Table className="simple w-full">
                        <TableHead>
                            <TableRow>
                                {headers.map((item, index) => (
                                    <TableCell
                                        key={index}
                                        align={item.align}
                                        padding={item.disablePadding ? 'none' : 'normal'}
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
                                    return (
                                        <TableRow key={index}>
                                            <TableCell align="center">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    {parseInt(index) + 1}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    {item.customer}
                                                </Typography>

                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    {format(new Date(item.date), 'MMMM d,y')}
                                                </Typography>

                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    ${item.subtotal}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14"
                                                >
                                                    {item.channel}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
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
                                            <TableCell align="center">
                                                <IconButton aria-describedby={id} onClick={handleClick}>
                                                    <MoreHoriz />
                                                </IconButton>
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
                                                    <Paper className="flex flex-col" sx={{p:1}}>
                                                        <Button className = "text-blue-500" onClick = {handleClose} startIcon={<EditIcon />}>
                                                            Replace
                                                        </Button>
                                                        <Button className = "text-blue-500" onClick = {handleClose} startIcon={<DeleteIcon />}>
                                                            Cancel
                                                        </Button>
                                                    </Paper>
                                                </Popover>
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
        </>
    )
}

export default OrdersTable;
