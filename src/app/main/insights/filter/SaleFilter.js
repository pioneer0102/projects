import { DatePicker } from '@mui/x-date-pickers';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { Button } from '@mui/material';
import { Category } from '../../../model/Global';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'app/store/fuse/messageSlice';
import { saleFilter, setSaleFilter, setRefresh } from '../store/saleSlice';

const current = new Date();
current.setDate(new Date(current) - 365);

const SaleFilter = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const filter = useSelector(saleFilter);

    const handleChange = (type, value) => {
        var fromDate = '';
        var toDate = '';
        switch (type) {
            case 'fromDate':
                fromDate = value;
                break;
            case 'toDate':
                toDate = value;
                break;
        }
        if (new Date(toDate) <= new Date(fromDate)) {
            dispatch(
                showMessage({
                    message:
                        'Input date correctly! From should be smaller than To',
                    variant: 'warning'
                })
            );
        } else {
            dispatch(setSaleFilter({ type: type, value: value }));
        }
    };

    const handleRefresh = () => {
        dispatch(setRefresh());
    };

    return (
        <Paper className="flex md:flex-row justify-between flex-col mx-24 mb-24 px-16 py-16 rounded-md">
            <div className="grid md:grid-cols-4 grid-cols-1 md:gap-24 gap-32 w-full mr-24">
                <TextField
                    label="Item"
                    placeholder="Item"
                    id="name"
                    size="small"
                    variant="outlined"
                    value={filter.item || ''}
                    onChange={(event) =>
                        handleChange('item', event.target.value)
                    }
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
                <FormControl size="small">
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
                <DatePicker
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
            </div>
            <Button
                variant="contained"
                color="inherit"
                onClick={handleRefresh}
                className="rounded-md"
            >
                <FuseSvgIcon className="text-gray-500" size={24}>
                    material-solid:refresh
                </FuseSvgIcon>
                <span className="mx-4"> Refresh</span>
            </Button>
            {/* <FormControl size="small">
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
                    <MenuItem value="">{t('all')}</MenuItem>
                    {Items.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl> */}
        </Paper>
    );
};

export default SaleFilter;
