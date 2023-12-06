import reducer from './store';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import _ from '@lodash';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography } from "@mui/material";
import styles from './style.module.scss';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import history from '@history';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { showMessage } from 'app/store/fuse/messageSlice';
import { grey } from '@mui/material/colors';
import {
    getInventoryById,
    selectInventory,
    initializeInventory,
    addInventory,
    updateInventory
} from './store/inventorySlice';

const schema = yup.object().shape({
    category: yup.string().required('You must enter a name'),
    price: yup.string().required('You must enter a address'),
    upc: yup.string().required('You must enter a email'),
    quantity: yup.string().required('You must enter a phone Number'),
    image: yup.string().required('You must select image'),
    name: yup.string().required('You must enter a name'),
});

const InvForm = () => {

    const [image, setImage] = useState({});

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const inventory = useSelector(selectInventory);
    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (routeParams.action === 'Edit') {
            dispatch(getInventoryById(routeParams.id));
            
        }
        if (routeParams.action === 'Add') {
            dispatch(initializeInventory({}));
            setImage({});
        }
    }, [dispatch, routeParams.action, routeParams.id]);

    useEffect(() => {
        reset({ ...inventory });
        setImage(inventory.image);
    }, [inventory, reset]);

    const { isValid, dirtyFields, errors } = formState;

    const handleCancel = () => history.push('/inventoryManager');
    const onSubmit = (data) => {
        const formData = {
            ...data,
            image: image
        }
        if (routeParams.action === 'Add') {
            dispatch(addInventory(formData));
        }
        if (routeParams.action === 'Edit') {
            dispatch(updateInventory(formData));
        }
        history.push('/inventoryManager');
    }
    function handleChange(e) {
        // eslint-disable-next-line no-constant-condition
        if(e.target.files[0].type===("image/png" || "image/jpg") ){
            setImage(URL.createObjectURL(e.target.files[0]));
        } else{
            dispatch(showMessage({message: "Select Image Correctly", variant: "error"}));
            setImage({});
        }
    }

    return (
        <>
            <div className='flex items-center mx-32 mt-32 justify-between'>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            className="inline text-18 text-center font-medium"
                            color="text.secondary"
                            role="button"
                            component={NavLinkAdapter}
                            to={`../inventoryManager`}>
                            {t('inventory.inventoryManager')}
                        </Typography>
                        <Typography className="inline text-18 text-center font-medium text-pink-500">
                            {routeParams.action}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <Button
                    variant="contained"
                    color="info"
                    onClick={() => { history.push('/inventorymanager'); }}
                    className={styles.backButton}
                >
                    <FuseSvgIcon size={18}>heroicons-solid:arrow-left</FuseSvgIcon>
                    <span className='ml-8'>{t('back')}</span>
                </Button>
            </div>
            <Paper
                className={`mx-24 my-32 px-32 py-32 ${styles.form}`}
            >
                <div className='flex items-center justify-between'>
                    <Typography className={`font-bold text-32`} color="text.secondary">
                        {routeParams.action} Item
                    </Typography>
                    <Controller
                        control={control}
                        name="active"
                        defaultValue={true}
                        render={({ field }) => (
                            <FormControlLabel
                                label="Active"
                                className={`self-end ${styles.backButton}`}
                                control={
                                    <Checkbox
                                        color='info'
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                }
                            />
                        )}
                    />
                </div>
                <div className='grid grid-cols-2 gap-16'>
                    <Controller
                        control={control}
                        name="name"
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="name"
                                placeholder="Name"
                                id="name"
                                error={!!errors.name}
                                helperText={errors?.name?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>heroicons-solid:cube</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="category"
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="category"
                                placeholder="Category"
                                id="category"
                                error={!!errors.category}
                                helperText={errors?.category?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>heroicons-solid:cube</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="price"
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="price"
                                placeholder="Price"
                                id="price"
                                error={!!errors.price}
                                helperText={errors?.price?.message}
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
                    <Controller
                        control={control}
                        name="tax"
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="tax"
                                placeholder="Tax"
                                id="tax"
                                error={!!errors.tax}
                                helperText={errors?.tax?.message}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>heroicons-outline:currency-dollar</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="upc"
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-32"
                                label="upc"
                                placeholder="UPC code"
                                variant="outlined"
                                fullWidth
                                error={!!errors.upc}
                                helperText={errors?.upc?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>heroicons-solid:key</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="quantity"
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="mt-32"
                                label="quantity"
                                placeholder="Quantity"
                                variant="outlined"
                                fullWidth
                                error={!!errors.quantity}
                                helperText={errors?.quantity?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>heroicons-solid:database</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />

                </div>
                <div className='flex flex-col items-center justify-center'>

                    {(Object.entries(image).length==0) ?
                        <Box
                            sx={{
                                backgroundColor: grey[300],
                            }}
                            component="label"
                            className="flex items-center justify-center relative w-128 h-128 mx-12 mt-32 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                        ><FuseSvgIcon size={32} color="action">
                                heroicons-solid:upload
                            </FuseSvgIcon>
                        </Box> : <img className='mt-32 w-128' src={image} />
                    }

                    <Controller
                        name="image"
                        control={control}
                        defaultValue=''
                        render={(field) => (
                            <>
                                <Button
                                    {...field}
                                    color="info"
                                    variant="contained"
                                    component="label"
                                    className="mx-12 mt-32 rounded overflow-hidden cursor-pointer shadow hover:shadow-lg"
                                >
                                    {t('inventory.upload')}
                                    <input className="hidden" type="file" onChange={handleChange} />
                                </Button>
                            </>
                        )}
                    />

                </div>
                <Box
                    className="flex items-center mt-32"
                >
                    <Button
                        className={`ml-auto ${styles.backButton}`}
                        onClick={handleCancel}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        className={`ml-8 ${styles.backButton}`}
                        variant="contained"
                        color="info"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {routeParams.action == "Add" ? t('add') : t('save')}
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

export default withReducer('inventoryApp', reducer)(InvForm);
