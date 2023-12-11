import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Status } from '../../../model/OrdersModel';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { orderFilter, setOrderFilter } from '../store/orderSlice';

const OrderFilter = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const filter = useSelector(orderFilter);

    const handleChange = (type, value) => {
        dispatch(setOrderFilter({ type: type, value: value }));
    };

    return (
        <div className="flex flex-col">
            <FormControl className="mt-32">
                <InputLabel id="select-small-label">Order Status</InputLabel>
                <Select
                    labelId="select-small-label"
                    id="select-small"
                    value={filter.category || ''}
                    label="Order Status"
                    onChange={(event) =>
                        handleChange('status', event.target.value)
                    }
                >
                    <MenuItem value="">{t('none')}</MenuItem>
                    {Status.map((category, index) => {
                        return (
                            <MenuItem key={index} value={category.name}>
                                {category.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default OrderFilter;
