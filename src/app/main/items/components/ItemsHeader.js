import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import { selectFilter, setFilter } from '../store/itemSlice';
import { PriceRange, Category } from 'src/app/model/ItemModel';
import {
    Paper,
    Input,
    Dialog,
    Button,
    Select,
    MenuItem,
    Typography,
    InputLabel,
    FormControl,
    DialogTitle,
    DialogActions,
    DialogContent
} from '@mui/material';

const breadCrumbs = [{ name: 'Item Management', url: null }];

const ItemsHeader = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);
    const filter = useSelector(selectFilter);

    const handleChange = (key, value) =>
        dispatch(setFilter({ ...filter, pageNumber: 0, [key]: value }));
    const handleOpenDialog = () => setDialogOpen(true);
    const handleClose = () => setDialogOpen(false);
    const handleCancel = () => {
        dispatch(setFilter({ ...filter, price: '', category: '' }));
        setDialogOpen(false);
    };

    const handleSubmit = () => {
        dispatch(setFilter({ ...filter, pageNumber: 0 }));
        setDialogOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between pt-24 px-24 md:px-24">
            <Breadcrumb breadCrumbs={breadCrumbs} />

            <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                <Paper className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0">
                    <FuseSvgIcon color="disabled">
                        heroicons-solid:search
                    </FuseSvgIcon>

                    <Input
                        placeholder="Search items"
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
                <Button
                    component={Link}
                    to="/items/add"
                    variant="contained"
                    color="secondary"
                    startIcon={
                        <FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>
                    }
                >
                    {t('add')}
                </Button>
            </div>

            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <Typography className="font-semibold text-32">
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
                            {t('item.priceRange')}
                        </InputLabel>
                        <Select
                            labelId="select-small-label"
                            id="select-small"
                            value={filter.price}
                            label={t('item.priceRange')}
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
                                handleChange('price', event.target.value)
                            }
                        >
                            <MenuItem value="">{t('none')}</MenuItem>
                            {PriceRange.map((price, index) => {
                                return (
                                    <MenuItem key={index} value={index}>
                                        {price}
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
                            {t('item.category')}
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={filter.category}
                            label={t('item.category')}
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
                                handleChange('category', event.target.value)
                            }
                        >
                            <MenuItem value="">{t('none')}</MenuItem>
                            {Category.map((category, index) => {
                                return (
                                    <MenuItem key={index} value={category}>
                                        {category}
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
                        onClick={handleSubmit}
                    >
                        <span>{t('ok')}</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ItemsHeader;
