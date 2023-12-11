import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { selectPosDetail } from '../../store/posSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';

const DepartmentItem = ({ index, value, handleEdit, handleRemove }) => {
    const { t } = useTranslation();

    const posDetail = useSelector(selectPosDetail);
    const [taxes, setTaxes] = useState([]);

    const [department, setDepartment] = useState({ name: '', taxId: 0 });
    const [isEditable, setEditable] = useState(true);

    const handleChange = (key, value) => {
        setDepartment({ ...department, [key]: value });
        handleEdit(index, key, value);
    };
    const handleEditable = (state) => setEditable(state);

    useEffect(() => {
        setDepartment(value);
    }, [value]);

    useEffect(() => {
        setTaxes(posDetail.taxes);
    }, [posDetail]);

    return (
        <Grid container spacing={2} className="flex items-center">
            <Grid lg={5} md={5} sm={5} xs={5}>
                <TextField
                    className="mt-32"
                    label="Department Name"
                    placeholder="Department Name"
                    id="name"
                    variant="outlined"
                    required
                    fullWidth
                    disabled={isEditable}
                    value={department.name}
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
                    select
                    className="mt-32"
                    label="Department Tax"
                    placeholder="Department Tax"
                    id="taxId"
                    variant="outlined"
                    required
                    fullWidth
                    disabled={isEditable}
                    value={department.taxId}
                    onChange={(event) =>
                        handleChange('taxId', event.target.value)
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FuseSvgIcon size={24}>
                                    heroicons-outline:currency-dollar
                                </FuseSvgIcon>
                            </InputAdornment>
                        )
                    }}
                >
                    <MenuItem value="-1">{t('none')}</MenuItem>
                    {taxes.map((tax, index) => (
                        <MenuItem key={index} value={index}>
                            {tax.rate} ({tax.name})
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid lg={2} md={2} sm={2} xs={2}>
                <IconButton
                    variant="outline"
                    onClick={() => handleEditable(!isEditable)}
                    className={isEditable ? 'mt-32' : 'text-cyan-400 mt-32'}
                >
                    <FuseSvgIcon size={20}>
                        {isEditable
                            ? 'heroicons-outline:lock-closed'
                            : 'heroicons-outline:lock-open'}
                    </FuseSvgIcon>
                </IconButton>
                <IconButton
                    variant="outline"
                    onClick={() => handleRemove(index)}
                    className="mt-32 text-red"
                >
                    <FuseSvgIcon size={20}>heroicons-outline:trash</FuseSvgIcon>
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default DepartmentItem;
