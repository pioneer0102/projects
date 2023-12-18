import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Channels } from 'src/app/model/Global';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import { Status, SubTotals } from 'src/app/model/OrdersModel';
import {
    Paper,
    Input,
    Button,
    Dialog,
    Select,
    MenuItem,
    Typography,
    InputLabel,
    FormControl,
    DialogTitle,
    DialogActions,
    DialogContent
} from '@mui/material';
import { setPagenumber, selectFilter, setFilter } from '../store/ordersSlice';

const breadCrumbs = [{ name: 'Orders', url: null }];

const OrdersHeader = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [dialogOpen, setDialogOpen] = useState(false);

    const filter = useSelector(selectFilter);

    const handleChange = (type, value) => {
        dispatch(setFilter({ ...filter, [type]: value }));
        dispatch(setPagenumber(0));
    };

    const handleOpenDialog = () => setDialogOpen(true);
    const handleClose = () => setDialogOpen(false);

    const handleCancel = () => {
        dispatch(
            setFilter({
                ...filter,
                searchText: '',
                subtotal: '',
                channel: '',
                status: ''
            })
        );
        dispatch(setPagenumber(0));
        setDialogOpen(false);
    };

    const handleOk = () => setDialogOpen(false);

    return (
        <>
            <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between pt-24 px-24 md:px-24">
                <Breadcrumb breadCrumbs={breadCrumbs} />
                <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                    <Paper className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0">
                        <FuseSvgIcon color="disabled">
                            heroicons-solid:search
                        </FuseSvgIcon>
                        <Input
                            placeholder={t('search')}
                            className="flex flex-1"
                            disableUnderline
                            fullWidth
                            value={filter.searchText}
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                            onChange={(event) =>
                                handleChange('searchText', event.target.value)
                            }
                        />
                    </Paper>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpenDialog}
                    >
                        <FuseSvgIcon size={24}>
                            material-solid:filter_alt
                        </FuseSvgIcon>
                        <span className="mx-4"> {t('searchFilter')}</span>
                    </Button>
                </div>
            </div>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <Typography className={'font-semibold text-32'}>
                        <span>{t('searchFilter')}</span>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    className="flex flex-col"
                    sx={{ width: '450px' }}
                >
                    <FormControl className="mx-8 my-8" size="small">
                        <InputLabel
                            id="select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >
                            {t('orders.subTotal')}
                        </InputLabel>
                        <Select
                            labelId="select-small-label"
                            id="select-small"
                            value={filter.subtotal}
                            label="Subtotal"
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: '#e2e8f0'
                                    },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0'
                                }
                            }}
                            onChange={(event) =>
                                handleChange('subtotal', event.target.value)
                            }
                        >
                            <MenuItem value="">{t('none')}</MenuItem>
                            {SubTotals.map((subTotal, index) => {
                                return (
                                    <MenuItem key={index} value={index}>
                                        {subTotal}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className="mx-8 my-8" size="small">
                        <InputLabel
                            id="demo-select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >
                            {t('channel')}
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={filter.channel}
                            label="Channel"
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: '#e2e8f0'
                                    },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0'
                                }
                            }}
                            onChange={(event) =>
                                handleChange('channel', event.target.value)
                            }
                        >
                            <MenuItem value="">{t('none')}</MenuItem>
                            {Channels.map((channel, index) => {
                                return (
                                    <MenuItem key={index} value={channel}>
                                        {channel}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className="mx-8 my-8" size="small">
                        <InputLabel
                            id="demo-select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >
                            {t('status')}
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={filter.status}
                            label="Status"
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: '#e2e8f0'
                                    },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#e2e8f0'
                                }
                            }}
                            onChange={(event) =>
                                handleChange('status', event.target.value)
                            }
                        >
                            <MenuItem value="">{t('none')}</MenuItem>
                            {Status.map((status, index) => {
                                return (
                                    <MenuItem
                                        key={index}
                                        value={status.toLowerCase()}
                                    >
                                        {status.toUpperCase()}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions className="mx-24 mb-16">
                    <Button
                        variant="outline"
                        color="secondary"
                        onClick={handleCancel}
                    >
                        <span>{t('cancel')}</span>
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={handleOk}
                    >
                        <span>{t('ok')}</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default OrdersHeader;
