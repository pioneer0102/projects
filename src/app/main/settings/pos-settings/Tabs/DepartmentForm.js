import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography } from "@mui/material";
import _ from '@lodash';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import {
    setFormdata
} from '../../store/posSlice';

const schema = yup.object().shape({
    department_name: yup.string().required('You must enter a departmentname'),
    tax_rate: yup.string().required('You must enter a taxrate')
});

const useStyles = makeStyles(() => ({
    dialog: {
        '& .muiltr-7en360-MuiPaper-root-MuiDialog-paper': {
            borderRadius: '6px'
        }
    },
}));

const DepartmentForm = (props) => {
    const { dialogOpen, handleClose, item, action } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const classes = useStyles();
    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        reset({ ...item });
    }, [item, reset, action]);

    const onSubmit = (data) => {
        if (routeParams.action === 'Add') {
            dispatch(setFormdata({ type: 'department', value: data }));
        }
        if (routeParams.action === 'Edit') {
            dispatch(setFormdata({ type: 'department', value: data }));
        }
        handleClose();
    }

    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                className={classes.dialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <Typography className={`font-semibold text-32 mt-16 ml-8`}>
                        <span>{t('search_filter')}</span>
                    </Typography>
                </DialogTitle>
                <DialogContent className='flex flex-col' sx={{ width: '450px' }}>
                    <Controller
                        control={control}
                        name="department_name"
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Department Name"
                                placeholder="Department Name"
                                id="department_name"
                                error={!!errors.department_name}
                                helperText={errors?.department_name?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>heroicons-solid:user-circle</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="tax_rate"
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Tax Rate"
                                placeholder="Tax Rate"
                                id="tax_rate"
                                error={!!errors.tax_rate}
                                helperText={errors?.tax_rate?.message}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>heroicons-solid:currency-dollar</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions className='mx-24 mb-24'>
                    <Button
                        className={`ml-auto rounded-md`}
                        onClick={handleClose}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        className={`ml-8 rounded-md`}
                        variant="contained"
                        color="info"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {/* {routeParams.action == "Add" ? t('add') : t('save')} */}
                        {t('apply')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DepartmentForm;


