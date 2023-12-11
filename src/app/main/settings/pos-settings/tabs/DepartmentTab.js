import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import DepartmentItem from './DepartmentItem';
import TextField from '@mui/material/TextField';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Grid from '@mui/system/Unstable_Grid/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    selectPosDetail,
    setFormdata,
    update,
    remove
} from '../../store/posSlice';

const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

const validateTaxItem = (department) => {
    const errors = {};

    if (!department.name.trim()) {
        errors.name = 'Please input department name.';
    }

    if (!isNumeric(department.rate)) {
        errors.rate = 'Please input a numeric value.';
    }

    return errors;
};

const initialErrors = {
    nameError: { isError: false, text: '' },
    rateError: { isError: false, text: '' }
};

const DepartmentTab = () => {
    const dispatch = useDispatch();
    const posDetail = useSelector(selectPosDetail);
    const [errors, setErrors] = useState(initialErrors);
    const [newDepartmentItem, setNewDepartmentItem] = useState({
        name: '',
        rate: 0
    });
    // const [departmentItems, setDepartmentItems] = useState([]);
    // useEffect(() => {
    //     setDepartmentItems(departmentDetail);
    // }, [departmentDetail])

    const handleAdd = () => {
        const validationErrors = validateTaxItem(newDepartmentItem);

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

        // handleDepartmentItems(newDepartmentItem);
        dispatch(setFormdata({ type: 'department', value: newDepartmentItem }));
        setNewDepartmentItem({ name: '', rate: 0 });
    };

    const removeTax = (index) => {
        dispatch(remove({ type: 'department', id: index }));
    };

    const handleChange = (key, value) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [`${key}Error`]: { isError: false, text: '' }
        }));
        setNewDepartmentItem({ ...newDepartmentItem, [key]: value });
    };

    const handleEdit = (index, key, value) => {
        dispatch(
            update({ type: 'department', id: index, key: key, value: value })
        );
    };

    return (
        <Paper className="rounded-md shadow-none">
            <Grid container spacing={2} className="flex items-center">
                <Grid lg={5} md={5} sm={5} xs={5}>
                    <TextField
                        className="mt-32"
                        label="Department Name"
                        placeholder="Department Name"
                        id="name"
                        error={errors.nameError.isError}
                        helperText={errors.nameError.text}
                        variant="outlined"
                        required
                        fullWidth
                        value={newDepartmentItem.name}
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
                        label="Department Tax Rate"
                        placeholder="Department Tax Rate"
                        id="rate"
                        error={errors.rateError.isError}
                        helperText={errors.rateError.text}
                        variant="outlined"
                        fullWidth
                        value={newDepartmentItem.rate}
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
                        onClick={handleAdd}
                        variant="outline"
                        className="btn_tax_add mt-32"
                    >
                        <FuseSvgIcon size={20}>
                            heroicons-outline:plus-circle
                        </FuseSvgIcon>
                    </IconButton>
                </Grid>
            </Grid>
            {
                posDetail.departments !== null && posDetail.departments.map((taxItem, index) => {
                    return (
                        <DepartmentItem
                            key={index}
                            index={index}
                            value={taxItem}
                            handleEdit={handleEdit}
                            handleRemove={removeTax}
                        />
                    );
                })}
        </Paper>
    );
};

export default DepartmentTab;
