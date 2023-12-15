import { DatePicker } from '@mui/x-date-pickers';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { Button } from '@mui/material';
import { Category, Channels } from '../../../model/Global';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'app/store/fuse/messageSlice';
import { saleFilter, setSaleFilter, setRefresh } from '../store/saleSlice';
import { useEffect, useState } from 'react';

const current = new Date();
current.setDate(new Date(current) - 90);

const SaleFilter = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const filter = useSelector(saleFilter);

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const handleChange = (type, value) => {
        switch (type) {
            case 'fromDate':
                if (new Date(toDate) <= new Date(value)) {
                    dispatch(
                        showMessage({
                            message:
                                'Input date correctly! From should be smaller than To',
                            variant: 'warning'
                        })
                    );
                    return;
                } else {
                    setFromDate(value);
                    dispatch(setSaleFilter({ type: type, value: value }));
                }
                break;
            case 'toDate':
                setToDate(value);
                dispatch(setSaleFilter({ type: type, value: value }));
                break;
            default:
                dispatch(setSaleFilter({ type: type, value: value }));
                break;
        }
    };

    const handleRefresh = () => {
        dispatch(setRefresh());
    };

    useEffect(() => {
        setFromDate(filter.fromDate);
        setToDate(filter.toDate);
    }, [filter]);

    return (
        <div className="flex flex-col px-8 py-8">
            <DatePicker
                value={fromDate ? fromDate : new Date()}
                onChange={(newValue) => handleChange('fromDate', newValue)}
                className="mt-32"
                clearable
                slotProps={{
                    textField: {
                        id: 'fromdate',
                        label: 'From date',
                        InputLabelProps: {
                            shrink: true
                        },
                        size: 'small',
                        fullWidth: true,
                        variant: 'outlined'
                    },
                    actionBar: {
                        actions: ['clear', 'today']
                    }
                }}
                slots={{
                    openPickerIcon: () => (
                        <FuseSvgIcon size={20}>
                            heroicons-solid:calendar
                        </FuseSvgIcon>
                    )
                }}
            />
            <DatePicker
                value={toDate ? toDate : new Date()}
                onChange={(newDate) => handleChange('toDate', newDate)}
                className="mt-32"
                clearable
                slotProps={{
                    textField: {
                        id: 'todate',
                        label: 'To date',
                        InputLabelProps: {
                            shrink: true
                        },
                        size: 'small',
                        fullWidth: true,
                        variant: 'outlined'
                    },
                    actionBar: {
                        actions: ['clear', 'today']
                    }
                }}
                slots={{
                    openPickerIcon: () => (
                        <FuseSvgIcon size={20}>
                            heroicons-solid:calendar
                        </FuseSvgIcon>
                    )
                }}
            />
            <TextField
                label="Item"
                placeholder="Item"
                id="name"
                size="small"
                variant="outlined"
                className="mt-32"
                value={filter.item || ''}
                onChange={(event) => handleChange('item', event.target.value)}
                required
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FuseSvgIcon size={20}>
                                heroicons-solid:search
                            </FuseSvgIcon>
                        </InputAdornment>
                    )
                }}
            />
            <FormControl size="small" className="mt-32">
                <InputLabel id="select-small-label">Category</InputLabel>
                <Select
                    labelId="select-small-label"
                    id="select-small"
                    value={filter.category || ''}
                    label="Category"
                    onChange={(event) =>
                        handleChange('category', event.target.value)
                    }
                >
                    <MenuItem value="">{t('all')}</MenuItem>
                    {Category.map((category, index) => {
                        return (
                            <MenuItem key={index} value={category.name}>
                                {category.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl size="small" className="mt-32">
                <InputLabel id="select-small-label">Channels</InputLabel>
                <Select
                    labelId="select-small-label"
                    id="select-small"
                    value={filter.channel || ''}
                    label="Channels"
                    onChange={(event) =>
                        handleChange('channel', event.target.value)
                    }
                >
                    <MenuItem value="">{t('all')}</MenuItem>
                    {Channels.map((channel, index) => {
                        return (
                            <MenuItem key={index} value={channel}>
                                {channel}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleRefresh}
                className="mt-32"
            >
                <FuseSvgIcon size={24}>material-solid:refresh</FuseSvgIcon>
                <span className="mx-4"> Refresh</span>
            </Button>
        </div>
    );
};

export default SaleFilter;
