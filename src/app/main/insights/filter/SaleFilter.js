import { DatePicker } from '@mui/x-date-pickers';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Category, Items } from '../../../model/Global';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    saleFilter,
    setSaleFilter,
    selectTableFilter,
    setTableFilter
} from '../store/saleSlice';

const SaleFilter = (props) => {
    const { parent } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const filter = useSelector(saleFilter);
    const tableFilter = useSelector(selectTableFilter);

    const handleChange = (type, value) => {
        if (parent === 'graph') {
            dispatch(setSaleFilter({ type: type, value: value }));
        }
        if (parent === 'table') {
            dispatch(setTableFilter({ type: type, value: value }));
        }
    };

    return (
        <div className="flex flex-col items-center mx-24 pb-32 rounded-md">
            {parent === 'graph' && (
                <DatePicker
                    className="mt-32"
                    value={filter.fromDate ? filter.fromDate : new Date()}
                    onChange={(newValue) => handleChange('fromDate', newValue)}
                    clearable
                    slotProps={{
                        textField: {
                            id: 'fromdate',
                            label: 'From date',
                            InputLabelProps: {
                                shrink: true
                            },
                            size: 'medium',
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
            )}
            {parent === 'table' && (
                <DatePicker
                    className="mt-32"
                    value={
                        tableFilter.fromDate ? tableFilter.fromDate : new Date()
                    }
                    onChange={(newValue) => handleChange('fromDate', newValue)}
                    clearable
                    slotProps={{
                        textField: {
                            id: 'fromdate',
                            label: 'From date',
                            InputLabelProps: {
                                shrink: true
                            },
                            size: 'medium',
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
            )}
            {parent === 'graph' && (
                <DatePicker
                    className="mt-32"
                    value={filter.toDate ? filter.toDate : new Date()}
                    onChange={(newDate) => handleChange('toDate', newDate)}
                    clearable
                    slotProps={{
                        textField: {
                            id: 'todate',
                            label: 'To date',
                            InputLabelProps: {
                                shrink: true
                            },
                            size: 'medium',
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
            )}
            {parent === 'table' && (
                <DatePicker
                    className="mt-32"
                    value={tableFilter.toDate ? tableFilter.toDate : new Date()}
                    onChange={(newDate) => handleChange('toDate', newDate)}
                    clearable
                    slotProps={{
                        textField: {
                            id: 'todate',
                            label: 'To date',
                            InputLabelProps: {
                                shrink: true
                            },
                            size: 'medium',
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
            )}
            <FormControl size="medium" className="mt-32 w-full">
                <InputLabel id="select-small-label">Category</InputLabel>
                <Select
                    labelId="select-small-label"
                    id="select-small"
                    value={
                        (parent === 'graph' && filter.category) ||
                        (parent === 'table' && tableFilter.category) ||
                        ''
                    }
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
            <FormControl size="medium" className="mt-32 w-full">
                <InputLabel id="select-small-label">Item</InputLabel>
                <Select
                    labelId="select-small-label"
                    id="select-small"
                    value={
                        (parent === 'graph' && filter.item) ||
                        (parent === 'table' && tableFilter.item) ||
                        ''
                    }
                    label="Item"
                    onChange={(event) =>
                        handleChange('item', event.target.value)
                    }
                >
                    <MenuItem value="">{t('all')}</MenuItem>
                    {Items.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default SaleFilter;
