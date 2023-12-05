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
import { PriceRange, Category } from 'src/app/model/InvManModel';
import {
    selectSearchText,
    selectPrice,
    selectCategory,
    setInventorySearchText,
    setInventoryPrice,
    setInventoryCategory,
    setPagenumber
} from './store/inventorySlice';

const InvSearchFilter = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText);
    const price = useSelector(selectPrice);
    const category = useSelector(selectCategory);

    const handleChange = (action, value) => {
        dispatch(action(value));
        dispatch(setPagenumber(0));
    };

    return (
        <>
            <Paper className={`px-16 py-8 border-b-1 mt-32 ${styles.search_paper}`}>
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
                            value={searchText}
                            onChange={(event) => handleChange(setInventorySearchText, event.target.value)}
                        />
                    </Box>
                    <FormControl className="flex flex-auto" sx={{ m: 1, maxWidth: 250 }} size="small">
                        <InputLabel
                            id="select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >{t('inventory.priceRange')}</InputLabel>
                        <Select
                            labelId="select-small-label"
                            id="select-small"
                            value={price}
                            label={t('inventory.priceRange')}
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
                            onChange={(event) => handleChange(setInventoryPrice, event.target.value)}>
                            <MenuItem value="">
                                {t('none')}
                            </MenuItem>
                            {
                                PriceRange.map((price, index) => {
                                    return (
                                        <MenuItem key={index} value={index}>
                                            {price}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl className="flex flex-auto" sx={{ m: 1, maxWidth: 250 }} size="small">
                        <InputLabel
                            id="demo-select-small-label"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'grey.600'
                                }
                            }}
                        >{t('inventory.category')}</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={category}
                            label={t('inventory.category')}
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
                            onChange={(event) => handleChange(setInventoryCategory, event.target.value)}>
                            <MenuItem value="">
                                {t('none')}
                            </MenuItem>
                            {
                                Category.map((category, index) => {
                                    return (
                                        <MenuItem key={index} value={category}>
                                            {category}
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

export default InvSearchFilter;
