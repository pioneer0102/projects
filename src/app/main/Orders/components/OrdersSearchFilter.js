import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import Input from '@mui/material/Input';
import styles from '../style.module.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { Status, SubTotals } from 'src/app/model/OrdersModel';
import { Channels } from 'src/app/model/Global';
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

import {
    setSubtotal,
    setChannel,
    setStatus,
    setOrderSearchText,
    setPagenumber,
    submit,
    selectFilter,
    setFilter
} from '../store/ordersSlice';

const useStyles = makeStyles(() => ({
    dialog: {
        '& .muiltr-7en360-MuiPaper-root-MuiDialog-paper': {
            borderRadius: '6px'
        }
    },
}));

const OrdersSearchFilter = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = useState(false);

    const filter = useSelector(selectFilter);

    const handleChange = (type, value) => {
        dispatch(setFilter({type: type, value: value}));
        dispatch(setPagenumber(0));
    };
    const handleOpenDialog = () => {
        setDialogOpen(true);
    }
    const handleClose = () => {
        setDialogOpen(false);
    }
    const handleSubmit = () => {
        const filterData = {
            subtotal: filter.subtotal,
            channel: filter.channel,
            status: filter.status
        }
        dispatch(submit(filterData));
        setPagenumber(0);
        setDialogOpen(false);
    }

    return (
        <>
            <Paper className={`px-16 py-8 border-b-1 mt-32 mx-32 ${styles.paper}`}>
                <div className="flex md:flex-row flex-col justify-between sm:space-y-0 mt-8 -mx-8">
                    <Box
                        className="flex flex-auto items-center px-16 mx-8 mb-8 border-1">
                        <FuseSvgIcon color="action" size={20}>
                            heroicons-outline:search
                        </FuseSvgIcon>
                        <Input
                            placeholder={t('search')}
                            className="flex px-16"
                            disableUnderline
                            fullWidth
                            value={filter.searchText}
                            onChange={(event) => handleChange("searchText", event.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={handleOpenDialog}
                        className={`mx-8 my-8 ${styles.backButton}`}
                    >
                        <FuseSvgIcon className="text-gray-500" size={24}>
                            material-solid:filter_alt
                        </FuseSvgIcon>
                        <span className='mx-4'> {t('search_filter')}</span>
                    </Button>
                </div>
            </Paper>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                className={classes.dialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <Typography className={`font-semibold text-32 mt-16 ml-8`}>
                        <span>{t('search_filter')}</span>
                    </Typography>
                </DialogTitle>
                <DialogContent className='flex flex-col' sx={{ width: '450px' }}>
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel
                            id="select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >{t('orders.subTotal')}</InputLabel>
                        <Select
                            labelId="select-small-label"
                            id="select-small"
                            value={filter.subtotal}
                            label="Subtotal"
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
                            onChange={(event) => handleChange("subtotal", event.target.value)}
                        >
                            <MenuItem value="">
                                {t('none')}
                            </MenuItem>
                            {
                                SubTotals.map((subTotal, index) => {
                                    return (
                                        <MenuItem key={index} value={index}>
                                            {subTotal}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel
                            id="demo-select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >{t('channel')}</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={filter.channel}
                            label="Channel"
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
                            onChange={(event) => handleChange("channel", event.target.value)}
                        >
                            <MenuItem value="">
                                {t('none')}
                            </MenuItem>
                            {
                                Channels.map((channel, index) => {
                                    return (
                                        <MenuItem key={index} value={channel}>
                                            {channel}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel
                            id="demo-select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >{t('status')}</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={filter.status}
                            label="Status"
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
                            onChange={(event) => handleChange("status", event.target.value)}
                        >
                            <MenuItem value="">
                                {t('none')}
                            </MenuItem>
                            {
                                Status.map((status, index) => {
                                    return (
                                        <MenuItem key={index} value={status.toLowerCase()}>
                                            {status.toUpperCase()}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions className='mx-24 mb-24'>
                    <Button
                        variant="outline"
                        color="secondary"
                        onClick={handleClose}
                        className={styles.backButton}
                    >
                        <span>{t('cancel')}</span>
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={handleSubmit}
                        className={styles.backButton}
                    >
                        <span>{t('ok')}</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default OrdersSearchFilter;
