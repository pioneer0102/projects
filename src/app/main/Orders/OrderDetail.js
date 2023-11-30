import clsx from 'clsx';
import history from '@history';
import { motion } from 'framer-motion';
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectItems, selectCustomer } from "./store/ordersSlice";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getItem } from './store/ordersSlice';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import { OrderDetailContentHeader, OrderDetailCustomHeader } from 'src/app/model/OrdersModel';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import styles from './style.module.scss';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const OrderDetail = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const itemsInfo = useSelector(selectItems);
    const customerInfo = useSelector(selectCustomer);

    useEffect(() => {
        dispatch(getItem(routeParams.id));
    }, [routeParams]);

    return (
        <>
            <div className='flex items-center mx-32 mt-32 justify-between'>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            className="inline text-18 text-center font-medium"
                            color="text.secondary"
                            role="button"
                            component={NavLinkAdapter}
                            to={`../orders`}>
                            { t('orders.orders') }
                        </Typography>
                        <Typography className="inline text-18 text-center font-medium text-pink-500">
                            { t('orders.detail') }
                        </Typography>
                    </Breadcrumbs>
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => { history.push('/orders'); }}
                    className = {styles.backButton}
                    >
                    <FuseSvgIcon size={18}>heroicons-solid:arrow-left</FuseSvgIcon>
                    <span className='ml-8'>{ t('back') }</span>
                </Button>
            </div>
            <div className="flex flex-row">
                <Paper
                    className="flex flex-col px-8 py-24 border-b-10 my-32 mx-32 w-1/2"
                    component={motion.div}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    sx={{ boxShadow: 'none', borderRadius: 1 }}>
                    <div className="flex flex-col sm:items-start mx-24">
                        <Typography
                            className="inline text-20 text-center font-medium"
                            color="text.secondary">
                            { t('orders.customerInfo') }
                        </Typography>
                    </div>
                    <FuseScrollbars className="grow overflow-x-auto mx-24 mt-16">
                        <Table>
                            <TableHead>
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
                                {customerInfo &&
                                    <TableRow>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14 ml-8">
                                                {customerInfo.customer}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14 -ml-8">
                                                {customerInfo.date}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="font-semibold text-14">
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
                                                }}>
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
                    className="flex flex-col px-8 py-24 border-b-10 my-32 mr-32 w-1/2"
                    component={motion.div}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    sx={{ boxShadow: 'none', borderRadius: 1 }}>
                    <div className="flex flex-col sm:items-start mx-24">
                        <Typography
                            className="inline text-20 text-center font-medium"
                            color="text.secondary">
                            { t('orders.detailInfo') }
                        </Typography>
                    </div>
                    <FuseScrollbars className="grow overflow-x-auto mx-24 mt-16">
                        <Table>
                            <TableHead>
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
                                {itemsInfo
                                    .map((item, index) => {
                                        return (itemsInfo &&
                                            <TableRow
                                                key={index}
                                                role="button">
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14 ml-8">
                                                        image
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14 -ml-8">
                                                        {item.productname}
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
                                                    <Typography
                                                        color="text.secondary"
                                                        className="font-semibold text-14">
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
                                            className="font-semibold text-16">
                                            subtotal
                                        </Typography>

                                    </TableCell>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell align="left">
                                        <Typography
                                            color="text.secondary"
                                            className="font-bold text-30">
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
};

export default withReducer('ordersApp', reducer)(OrderDetail);

