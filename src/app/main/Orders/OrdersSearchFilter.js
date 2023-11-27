import Paper from "@mui/material/Paper";
import Input from '@mui/material/Input';
import { Box } from '@mui/system';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { motion } from 'framer-motion';
import { Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "@fuse/hooks";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from "./store/ordersSlice";

import { selectSearchText, selectSubtotal, selectChannel, selectStatus } from './store/ordersSlice';
import { setOrderSubtotal, setOrderChannel, setOrderStatus, setOrderSearchText } from './store/ordersSlice';

function OrdersSearchFilter(props) {
    const dispatch = useDispatch();

    // useDeepCompareEffect(() => {
    //     dispatch(getOrders());
    // }, [dispatch]);

    const [date, setDate] = useState();
    const searchText = useSelector(selectSearchText);
    const subtotal = useSelector(selectSubtotal);
    const channel = useSelector(selectChannel);
    const status = useSelector(selectStatus);

    const handleSearchText = (event) => {
        dispatch(setOrderSearchText(event.target.value));
    }

    useEffect(() => {
        dispatch(getOrders());
    }, [subtotal]);
    useEffect(() => {
        dispatch(getOrders());
    }, [searchText]);
    useEffect(() => {
        dispatch(getOrders());
    }, [channel]);
    useEffect(() => {
        dispatch(getOrders());
    }, [status]);

    return (
        <>
            <Paper
                className="px-24 py-8 border-b-1 mt-32 mx-32"
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                sx={{ boxShadow: 'none', borderRadius: 1 }}
            >
                {/* <div className="flex flex-col items-center sm:items-start">
                    <Typography
                        className="inline text-20 text-center font-bold"
                        variant="body2"
                        color="text.secondary"
                    >
                        Search Filters
                    </Typography>
                </div> */}
                <div className="flex flex-col sm:flex-row sm:space-y-0 mt-8 -mx-8">
                    <Box
                        className="flex w-full items-center px-16 mx-8 mb-8 border-1"
                        sx={{ borderRadius: 1 }}
                    >
                        <FuseSvgIcon color="action" size={20}>
                            heroicons-outline:search
                        </FuseSvgIcon>
                        <Input
                            placeholder="Search"
                            className="flex flex-1 px-16"
                            disableUnderline
                            fullWidth
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                            value={searchText}
                            onChange={(event) => { handleSearchText(event) }}
                        />
                    </Box>
                    {/* Datepicker Select Component */}
                    {/* 
                    <DatePicker
                        label="Date"
                        size="small"
                        value={new Date()}
                        className="flex rounded-full"
                        onChange={(newValue) => setDate(newValue)}
                    /> */}

                    {/* Subtotal Select Component */}
                    <FormControl className="flex" sx={{ m: 1, minWidth: 160 }} size="small">
                        <InputLabel
                            id="select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >Subtotal</InputLabel>
                        <Select
                            labelId="select-small-label"
                            id="select-small"
                            value={subtotal}
                            label="Subtotal"
                            className=""
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0',
                                },
                            }}
                            onChange={(event) => dispatch(setOrderSubtotal(event.target.value))}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value='0'>$10 - $100</MenuItem>
                            <MenuItem value='1'>$100 - $500</MenuItem>
                            <MenuItem value='2'>$500 - $1000</MenuItem>
                            <MenuItem value='3'>$1000 - $5000</MenuItem>
                            <MenuItem value='4'>$5000 - $10000</MenuItem>
                        </Select>
                    </FormControl>
                    {/* Channel Select Component */}
                    <FormControl className="flex" sx={{ m: 1, minWidth: 160 }} size="small">
                        <InputLabel
                            id="demo-select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >Channel</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={channel}
                            label="Channel"
                            className=""
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0',
                                },
                            }}
                            onChange={(event) => dispatch(setOrderChannel(event.target.value))}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="DoorDash">DoorDash</MenuItem>
                            <MenuItem value="Uber">Uber</MenuItem>
                            <MenuItem value="GrubHub">GrubHub</MenuItem>
                        </Select>
                    </FormControl>
                    {/* Status Select Component */}
                    <FormControl className="flex" sx={{ m: 1, minWidth: 160 }} size="small">
                        <InputLabel
                            id="demo-select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >Status</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={status}
                            label="Status"
                            className=""
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0',
                                },
                            }}
                            onChange={(event) => dispatch(setOrderStatus(event.target.value))}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Paper>
        </>
    )
}

export default OrdersSearchFilter;
