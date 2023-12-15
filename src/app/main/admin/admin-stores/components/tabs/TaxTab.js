import TaxItem from './TaxItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Grid from '@mui/system/Unstable_Grid/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { useParams } from 'react-router-dom';
import {
    selectStore,
    update,
    remove,
    setFormdata,
    updateStoreDetail
} from '../../store/adminStoresSlice';

const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

const validateTaxItem = (taxItem) => {
    const errors = {};

    if (!taxItem.name.trim()) {
        errors.name = 'Please input tax name.';
    }

    if (!isNumeric(taxItem.rate)) {
        errors.rate = 'Please input a numeric value.';
    }

    return errors;
};

const initialErrors = {
    nameError: { isError: false, text: '' },
    rateError: { isError: false, text: '' }
};

const TaxTab = () => {
    const dispatch = useDispatch();
    const routeParams = useParams();
    const storeDetail = useSelector(selectStore);
    const [errors, setErrors] = useState(initialErrors);
    const [newTaxItem, setNewTaxItem] = useState({ name: '', rate: 0 });
    const [change, setChange] = useState(false);

    useEffect(() => {
        const data = {
            type: 'taxes',
            id: routeParams.storeId,
            detailData: storeDetail.taxes
        };
        {
            change && dispatch(updateStoreDetail(data));
        }
    }, [storeDetail.taxes]);

    const addNewTax = () => {
        const validationErrors = validateTaxItem(newTaxItem);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(() => ({
                ...initialErrors,
                ...Object.fromEntries(
                    Object.entries(validationErrors).map(([key, value]) => [
                        `${key}Error`,
                        { isError: true, text: value }
                    ])
                )
            }));

            return;
        }

        // handleTaxItems(newTaxItem);

        dispatch(setFormdata({ type: 'tax', value: newTaxItem }));
        setChange(true);
        setNewTaxItem({ name: '', rate: 0 });
    };

    const removeTax = (index) => {
        dispatch(remove({ type: 'tax', id: index }));
        setChange(true);
    };

    const handleChange = (key, value) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [`${key}Error`]: { isError: false, text: '' }
        }));
        setNewTaxItem({ ...newTaxItem, [key]: value });
    };

    const handleEdit = (index, key, value) => {
        dispatch(update({ type: 'tax', id: index, key: key, value: value }));
        setChange(true);
    };

    return (
        <div className="mx-16">
            <Grid container spacing={2} className="flex items-center">
                <Grid lg={5} md={5} sm={5} xs={5}>
                    <TextField
                        className="mt-32"
                        label="Tax Name"
                        placeholder="Tax Name"
                        id="name"
                        error={errors.nameError.isError}
                        helperText={errors.nameError.text}
                        variant="outlined"
                        required
                        fullWidth
                        value={newTaxItem.name}
                        onChange={(event) =>
                            handleChange('name', event.target.value)
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FuseSvgIcon size={24}>
                                        heroicons-outline:receipt-tax
                                    </FuseSvgIcon>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid lg={5} md={5} sm={5} xs={5}>
                    <TextField
                        className="mt-32"
                        label="Tax Rate"
                        placeholder="Tax Rate"
                        id="rate"
                        error={errors.rateError.isError}
                        helperText={errors.rateError.text}
                        variant="outlined"
                        fullWidth
                        value={newTaxItem.rate}
                        onChange={(event) =>
                            handleChange('rate', event.target.value)
                        }
                        InputProps={{
                            inputProps: {
                                type: 'number',
                                min: 0
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FuseSvgIcon size={24}>
                                        heroicons-outline:currency-dollar
                                    </FuseSvgIcon>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid lg={2} md={2} sm={2} xs={2}>
                    <IconButton
                        onClick={addNewTax}
                        variant="outline"
                        className="btn_tax_add mt-32"
                    >
                        <FuseSvgIcon size={20}>
                            heroicons-outline:plus-circle
                        </FuseSvgIcon>
                    </IconButton>
                </Grid>
            </Grid>
            {storeDetail.taxes !== null &&
                storeDetail.taxes.map((taxItem, index) => {
                    return (
                        <TaxItem
                            key={index}
                            index={index}
                            value={taxItem}
                            handleEdit={handleEdit}
                            handleRemove={removeTax}
                        />
                    );
                })}
        </div>
    );
};

export default TaxTab;
