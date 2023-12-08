import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Grid from "@mui/system/Unstable_Grid/Grid";

const TaxItem = ({index, value, handleEdit, handleRemove}) => {
    const [tax, setTax] = useState({ 'name': '', 'rate': 0 });
    const [isEditable, setEditable] = useState(true);

    const handleChange = (key, value) => {
        setTax({ ...tax, [key]: value});
        handleEdit(index, key, value);
    };
    const handleEditable = (state) => setEditable(state);

    useEffect(() => {
        setTax(value);
    }, [value]);

    return (
        <Grid container spacing={2} className="flex items-center">
            <Grid lg={5} md={5} sm={5} xs={5}>
                <TextField
                    className="mt-32"
                    label="Tax Name"
                    placeholder="Tax Name"
                    id="name"
                    variant="outlined"
                    required
                    fullWidth
                    disabled={isEditable}
                    value={tax.name}
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
                    variant="outlined"
                    fullWidth
                    disabled={isEditable}
                    value={tax.rate}
                    onChange={(event) => handleChange('rate', event.target.value)}
                    InputProps={{
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
                    variant="outline"
                    onClick={() => handleEditable(!isEditable)}
                    className={isEditable ? 'mt-32' : 'text-cyan-400 mt-32'}>
                    <FuseSvgIcon size={20}>{isEditable ? 'heroicons-outline:lock-closed' : 'heroicons-outline:lock-open'}</FuseSvgIcon>
                </IconButton>
                <IconButton
                    variant="outline"
                    onClick={() => handleRemove(index)}
                    className='mt-32 text-red'>
                    <FuseSvgIcon size={20}>heroicons-outline:trash</FuseSvgIcon>
                </IconButton>
            </Grid>
        </Grid>
    ); 
}

export default TaxItem;
