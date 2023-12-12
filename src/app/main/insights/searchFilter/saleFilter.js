import { DateTimePicker } from '@mui/x-date-pickers';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Category, Items } from '../../../model/Global';
import parseISO from 'date-fns/parseISO';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { saleFilter, setSaleFilter } from '../store/saleSlice';

const SaleFilter = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const filter = useSelector(saleFilter);

    const handleChange = (type, value) => {
        dispatch(setSaleFilter({ type: type, value: value }));
    };

    return (
        <div className="flex flex-col">
            <div className="flex mt-32 items-center grid grid-cols-5 gap-2">
                <Typography
                    color="text.secondary"
                    className="text-16 col-span-1"
                >
                    From :
                </Typography>
                <DateTimePicker
                    value={filter.fromDate ? parseISO(filter.fromDate) : null}
                    onChange={(newDate) => handleChange('fromDate', newDate)}
                    className="col-span-4"
                    clearable
                    slotProps={{
                        textField: {
                            id: 'fromdate',
                            label: 'From date',
                            InputLabelProps: {
                                shrink: true
                            },
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
            </div>
            <div className="flex mt-32 items-center grid grid-cols-5 gap-2">
                <Typography
                    color="text.secondary"
                    className="text-16 col-span-1"
                >
                    To :
                </Typography>
                <DateTimePicker
                    value={filter.toDate ? parseISO(filter.toDate) : null}
                    onChange={(newDate) => handleChange('toDate', newDate)}
                    className="col-span-4"
                    clearable
                    slotProps={{
                        textField: {
                            id: 'todate',
                            label: 'To date',
                            InputLabelProps: {
                                shrink: true
                            },
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
            </div>
            <FormControl className="mt-32">
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
                    <MenuItem value="">{t('none')}</MenuItem>
                    {Category.map((category, index) => {
                        return (
                            <MenuItem key={index} value={category.name}>
                                {category.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl className="mt-32">
                <InputLabel id="select-small-label">Item</InputLabel>
                <Select
                    labelId="select-small-label"
                    id="select-small"
                    value={filter.item || ''}
                    label="Item"
                    onChange={(event) =>
                        handleChange('item', event.target.value)
                    }
                >
                    <MenuItem value="">{t('none')}</MenuItem>
                    {Items.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        );
                    })}
                    {/* {Category.filter(
                        (category) => category.name === filter.category
                    ).items.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        );
                    })} */}
                </Select>
            </FormControl>
        </div>
    );
};

export default SaleFilter;
