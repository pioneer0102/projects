import TaxItem from "./TaxItem";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import TextField from '@mui/material/TextField';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Grid from "@mui/system/Unstable_Grid/Grid";
import InputAdornment from '@mui/material/InputAdornment';

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
    rateError: { isError: false, text: '' },
};

const TaxTab = () => {
    const [errors, setErrors] = useState(initialErrors);
    const [newTaxItem, setNewTaxItem] = useState({ name: '', rate: 0 });
    const [taxItems, setTaxItems] = useState([]);

    const addNewTax = () => {
        const validationErrors = validateTaxItem(newTaxItem);

        if (Object.keys(validationErrors).length > 0) {
            setErrors((prevErrors) => ({
                ...initialErrors,
                ...Object.fromEntries(Object.entries(validationErrors).map(([key, value]) => [`${key}Error`, { isError: true, text: value }])),
            }));

            return;
        }

        setTaxItems((prevTaxItems) => [...prevTaxItems, { ...newTaxItem }]);
        setNewTaxItem({ name: '', rate: 0 });
    };

    const removeTax = (index) => {
        setTaxItems(prevTaxItems => prevTaxItems.filter((_, i) => i !== index));
    };

    const handleChange = (key, value) => {
        setErrors((prevErrors) => ({ ...prevErrors, [`${key}Error`]: { isError: false, text: '' } }));
        setNewTaxItem({ ...newTaxItem, [key]: value});
    }

    const handleEdit = (index, key, value) => {
        const updatedTaxItems = [...taxItems];
        const taxItemToUpdate = updatedTaxItems[index];
        taxItemToUpdate[key] = value;
        updatedTaxItems[index] = taxItemToUpdate;
        setTaxItems(updatedTaxItems);
    };

    return (
        <Paper className='rounded-md shadow-none'>
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
                        onChange={(event) => handleChange('name', event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FuseSvgIcon size={24}>heroicons-outline:receipt-tax</FuseSvgIcon>
                                </InputAdornment>
                            ),
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
                        onChange={(event) => handleChange('rate', event.target.value)}
                        InputProps={{
                            inputProps: {
                                type: 'number',
                                min: 0,
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FuseSvgIcon size={24}>heroicons-outline:currency-dollar</FuseSvgIcon>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid lg={2} md={2} sm={2} xs={2}>
                    <IconButton
                        onClick={addNewTax}
                        variant="outline"
                        className='btn_tax_add mt-32'>
                        <FuseSvgIcon size={20}>heroicons-outline:plus-circle</FuseSvgIcon>
                    </IconButton>
                </Grid>
            </Grid>
            {
                taxItems.map((taxItem, index) => {
                    return (
                        <TaxItem key={index} index={index} value={taxItem} handleEdit={handleEdit} handleRemove={removeTax} />
                    );
                })
            }
        </Paper>
    );
};

export default TaxTab;
