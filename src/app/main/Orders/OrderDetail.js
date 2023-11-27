import Paper from "@mui/material/Paper";
import { motion } from 'framer-motion';
import { Breadcrumbs, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import { selectItems, selectCustomer } from "./store/ordersSlice";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { useParams, useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import OrderBreadcrumb from "./OrderBreadCrumb";
import clsx from 'clsx';
import { format } from "date-fns";
import history from '@history';

const headerCustomer = [
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
];

const headers = [
    // {
    //     id: 'id',
    //     align: 'left',
    //     disablePadding: true,
    //     label: 'NO',
    //     sort: true,
    // },

    {
        id: 'image',
        align: 'left',
        disablePadding: true,
        label: 'Image',
        sort: true,
    },
    {
        id: 'productname',
        align: 'left',
        disablePadding: false,
        label: 'Product Name',
        sort: true,
    },
    {
        id: 'price',
        align: 'left',
        disablePadding: true,
        label: 'Price',
        sort: true,
    },
    {
        id: 'quantity',
        align: 'left',
        disablePadding: true,
        label: 'Quantity',
        sort: true,
    },

];


function OrderDetail(props) {
    const routeParams = useParams();
    const itemsInfo = useSelector(selectItems);
    const customerInfo = useSelector(selectCustomer);

    return (
        <>
            <OrderBreadcrumb id={routeParams.id} subtotal={routeParams.subtotal} />
            <Button
                className="mx-32"
                variant="contained"
                color="secondary"
                sx={{ alignSelf: 'flex-end', borderRadius: 1, display: 'inline' }}
                onClick={() => { history.push('/orders'); }}
            >
                Back
            </Button>
            <div className="flex flex-row">
                <Paper
                    className="flex flex-col px-8 py-24 border-b-10 my-32 mx-32 w-1/2"
                    component={motion.div}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    sx={{ boxShadow: 'none', borderRadius: 1 }}
                >
                    <div className="flex flex-col sm:items-start mx-24">
                        <Typography
                            className="inline text-20 text-center font-medium"
                            color="text.secondary"
                        >
                            Customer Information
                        </Typography>
                    </div>
                    <FuseScrollbars className="grow overflow-x-auto mx-24 mt-16">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {headerCustomer.map((item, index) => (
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

                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customerInfo &&
                                    <TableRow>
                                        {/* <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14 ml-12"
                                            >
                                                {parseInt(index) + 1}
                                            </Typography>
                                        </TableCell> */}
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14 ml-8"
                                            >
                                                {customerInfo.customer}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14 -ml-8"
                                            >
                                                {customerInfo.date}
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14"
                                            >
                                                {customerInfo.channel}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                className={clsx(
                                                    'inline-flex items-center font-bold text-12 px-10 py-2 tracking-wide uppercase',
                                                    customerInfo.status === "completed" &&
                                                    'bg-green-500 text-grey-100',
                                                    customerInfo.status === "pending" &&
                                                    'bg-yellow-600 text-grey-100',
                                                    customerInfo.status === "rejected" &&
                                                    'bg-red-500 text-grey-100',
                                                )}
                                                sx={{
                                                    borderRadius: "3px"
                                                }}
                                            >
                                                {customerInfo.status}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </FuseScrollbars>
                </Paper>
                <Paper
                    className="flex flex-col px-8 py-24 border-b-10 my-32 mx-32 w-1/2"
                    component={motion.div}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    sx={{ boxShadow: 'none', borderRadius: 1 }}
                >
                    <div className="flex flex-col sm:items-start mx-24">
                        <Typography
                            className="inline text-20 text-center font-medium"
                            color="text.secondary"
                        >
                            Detail Information
                        </Typography>
                    </div>
                    <FuseScrollbars className="grow overflow-x-auto mx-24 mt-16">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {headers.map((item, index) => (
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

                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itemsInfo
                                    .map((item, index) => {
                                        return (itemsInfo &&
                                            <TableRow
                                                key={index}
                                                role="button"
                                            >
                                                {/* <TableCell align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="font-semibold text-14 ml-12"
                                                >
                                                    {parseInt(index) + 1}
                                                </Typography>
                                            </TableCell> */}
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14 ml-8"
                                                    >
                                                        image
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14 -ml-8"
                                                    >
                                                        {item.productname}
                                                    </Typography>

                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14"
                                                    >
                                                        $ {item.price}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14"
                                                    >
                                                        {item.quantity}
                                                    </Typography>

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-semibold text-16"
                                        >
                                            subtotal
                                        </Typography>

                                    </TableCell>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-bold text-30"
                                        >
                                            $ {customerInfo.subtotal}
                                        </Typography>

                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </FuseScrollbars>
                </Paper>
            </div >

        </>
    );
}

export default OrderDetail;
