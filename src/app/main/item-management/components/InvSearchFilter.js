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
import { PriceRange, Category } from 'src/app/model/InvManModel';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import {
    selectSearchText,
    setInventorySearchText,
    selectPrice,
    selectCategory,
    setInventoryPrice,
    setInventoryCategory,
    setPagenumber,
    submit
} from '../store/inventorySlice';

const useStyles = makeStyles(() => ({
    dialog: {
        '& .muiltr-7en360-MuiPaper-root-MuiDialog-paper': {
            borderRadius: '6px'
        }
    }
}));

const InvSearchFilter = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);

    const searchText = useSelector(selectSearchText);
    const price = useSelector(selectPrice);
    const category = useSelector(selectCategory);

    const handleChange = (action, value) => {
        dispatch(action(value));
        dispatch(setPagenumber(0));
    };

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    const handleClose = () => {
        setDialogOpen(false);
    };
    const handleSubmit = () => {
        const filterData = {
            price: price,
            category: category
        };
        dispatch(submit(filterData));
        setPagenumber(0);
        setDialogOpen(false);
    };
    const handleAdd = () => {
        navigate('/item-management/add/0');
    };

    return (
        <>
            <Paper
                className={`px-16 py-8 border-b-1 mt-32 mx-24 ${styles.paper}`}
            >
                <div className="flex md:flex-row flex-col justify-between sm:space-y-0 mt-8 -mx-8">
                    <Box className="flex flex-auto items-center px-16 mx-8 mb-8 border-1">
                        <FuseSvgIcon color="action" size={20}>
                            heroicons-outline:search
                        </FuseSvgIcon>
                        <Input
                            placeholder={t('search')}
                            className="flex px-16"
                            disableUnderline
                            fullWidth
                            value={searchText}
                            onChange={(event) =>
                                handleChange(
                                    setInventorySearchText,
                                    event.target.value
                                )
                            }
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
                        <span className="mx-4"> {t('searchFilter')}</span>
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={handleAdd}
                        className={`mx-8 my-8 ${styles.backButton}`}
                    >
                        <FuseSvgIcon size={24}>
                            heroicons-solid:plus
                        </FuseSvgIcon>
                        <span className="mx-4">{t('add')}</span>
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
                    <Typography className={'font-semibold text-32 mt-16 ml-8'}>
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
                            {t('inventory.priceRange')}
                        </InputLabel>
                        <Select
                            labelId="select-small-label"
                            id="select-small"
                            value={price}
                            label={t('inventory.priceRange')}
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
                                handleChange(
                                    setInventoryPrice,
                                    event.target.value
                                )
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
                            {t('inventory.category')}
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={category}
                            label={t('inventory.category')}
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
                                handleChange(
                                    setInventoryCategory,
                                    event.target.value
                                )
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
                <DialogActions className="mx-24 mb-24">
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

export default InvSearchFilter;
