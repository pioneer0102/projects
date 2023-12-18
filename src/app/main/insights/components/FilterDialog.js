import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Category, Channels } from '../../../model/Global';
import { saleFilter, setSaleFilter } from '../store/saleSlice';
import {
    InputAdornment,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';

const current = new Date();
current.setDate(new Date(current) - 90);

const FilterDialog = () => {
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

    useEffect(() => {
        setFromDate(filter.fromDate);
        setToDate(filter.toDate);
    }, [filter]);

    return (
        <div className="flex flex-col px-8">
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
        </div>
    );
};

export default FilterDialog;
