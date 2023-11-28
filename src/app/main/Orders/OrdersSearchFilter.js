import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import Input from '@mui/material/Input';
import styles from './style.module.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { Status, SubTotals } from 'src/app/model/OrdersModel';
import { Channels } from 'src/app/model/Global';
import { 
    selectSearchText,
    selectSubtotal,
    selectChannel,
    selectStatus,
    setOrderSubtotal,
    setOrderChannel,
    setOrderStatus,
    setOrderSearchText,
    setPagenumber
} from './store/ordersSlice';

const OrdersSearchFilter = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText);
    const subtotal = useSelector(selectSubtotal);
    const channel = useSelector(selectChannel);
    const status = useSelector(selectStatus);

    const handleChange = (actionCreator, value) => {
        dispatch(actionCreator(value));
        dispatch(setPagenumber(0));
    };

    return (
        <>
            <Paper className={`px-16 py-8 border-b-1 mt-32 mx-32 ${styles.paper}`}>
                <div className="flex md:flex-row sm:flex-col justify-between flex-wrap sm:space-y-0 mt-8 -mx-8">
                    <Box
                        className="flex flex-auto items-center px-16 mx-8 mb-8 border-1">
                        <FuseSvgIcon color="action" size={20}>
                            heroicons-outline:search
                        </FuseSvgIcon>
                        <Input
                            placeholder={ t('search') }
                            className="flex px-16"
                            disableUnderline
                            fullWidth
                            value={searchText}
                            onChange={(event) => handleChange(setOrderSearchText, event.target.value)}
                        />
                    </Box>
                    <FormControl className="flex flex-auto" sx={{ m: 1, minWidth: 160 }} size="small">
                        <InputLabel
                            id="select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >{ t('orders.subTotal') }</InputLabel>
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
                            onChange={(event) => handleChange(setOrderSubtotal, event.target.value)}>
                            <MenuItem value="">
                                { t('none') }
                            </MenuItem>
                            {
                                SubTotals.map((subTotal, index) => {
                                    console.log(subTotal);
                                    return (
                                        <MenuItem key={index} value={index}>
                                            { subTotal }
                                        </MenuItem>
                                    );                                    
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl className="flex flex-auto" sx={{ m: 1, minWidth: 160 }} size="small">
                        <InputLabel
                            id="demo-select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >{ t('channel') }</InputLabel>
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
                            onChange={(event) => handleChange(setOrderChannel, event.target.value)}>
                            <MenuItem value="">
                                { t('none') }
                            </MenuItem>
                            {
                                Channels.map((channel, index) => {
                                    return (
                                        <MenuItem key={index} value={channel}>
                                            { channel }
                                        </MenuItem>
                                    );                                    
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl className="flex flex-auto" sx={{ m: 1, minWidth: 160 }} size="small">
                        <InputLabel
                            id="demo-select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >{ t('status') }</InputLabel>
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
                            onChange={(event) => handleChange(setOrderStatus, event.target.value)}>
                            <MenuItem value="">
                                { t('none') }
                            </MenuItem>
                            {
                                Status.map((status, index) => {
                                    return (
                                        <MenuItem key={index} value={status.toLowerCase()}>
                                            { status }
                                        </MenuItem>
                                    );                                    
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
            </Paper>
        </>
    );
};

export default OrdersSearchFilter;
