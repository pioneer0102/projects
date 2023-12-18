import * as yup from 'yup';
import reducer from './store';
import history from '@history';
import Box from '@mui/system/Box';
import { useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useParams, Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
    Button,
    Paper,
    Checkbox,
    TextField,
    InputAdornment,
    FormControlLabel
} from '@mui/material';
import {
    getItemById,
    selectItem,
    addItem,
    updateItem,
    setItem
} from './store/itemSlice';

const schema = yup.object().shape({
    category: yup.string().required('You must enter a name'),
    price: yup.string().required('You must enter a address'),
    upc: yup.string().required('You must enter a email'),
    quantity: yup.string().required('You must enter a phone Number'),
    name: yup.string().required('You must enter a name')
});

const ItemDetail = () => {
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const item = useSelector(selectItem);
    const [breadCrumbs, setBreadCrumbs] = useState([]);

    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        let crumbs = [{ name: 'Item Management', url: 'items' }];

        if (routeParams.itemId === 'add') {
            dispatch(
                setItem({
                    ...item,
                    id: '',
                    name: '',
                    category: '',
                    description: '',
                    image: null,
                    price: '',
                    quantity: '',
                    tax: '',
                    upc: ''
                })
            );
            setImage(null);
            crumbs.push({ name: 'Add', url: null });
        } else {
            dispatch(getItemById(routeParams.itemId));
            crumbs.push({ name: 'Edit', url: null });
        }

        setBreadCrumbs(crumbs);
    }, [dispatch, routeParams]);

    useEffect(() => {
        reset({ ...item });
        setImage(item.image);
    }, [item, reset]);

    const { errors } = formState;

    const handleCancel = () => history.push('/items');
    const onSubmit = (data) => {
        const action = routeParams.itemId === 'add' ? addItem : updateItem;
        const successMessage =
            routeParams.itemId === 'add'
                ? 'Item added successfully!'
                : 'Item updated successfully!';

        console.log(data);
        const formData = {
            ...data,
            image: image
        };

        dispatch(action(formData));
        dispatch(showMessage({ message: successMessage, variant: 'success' }));
        history.push('/items');
    };

    function handleChange(e) {
        // setImage(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0].type);
        if (
            e.target.files[0].type === 'image/png' ||
            e.target.files[0].type === 'image/jpg' ||
            e.target.files[0].type === 'image/jpeg' ||
            e.target.files[0].type === 'image/gif' ||
            e.target.files[0].type === 'image/tif' ||
            e.target.files[0].type === 'image/tiff' ||
            e.target.files[0].type === 'image/bmp' ||
            e.target.files[0].type === 'image/svg' ||
            e.target.files[0].type === 'image/webp'
        ) {
            setImage(URL.createObjectURL(e.target.files[0]));
        } else {
            dispatch(
                showMessage({
                    message: 'Please select correct image.',
                    variant: 'error'
                })
            );
            setImage({});
        }
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between pt-24 px-24 md:px-24">
                <Breadcrumb breadCrumbs={breadCrumbs} />

                <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                    <Button
                        component={Link}
                        to="/items"
                        variant="contained"
                        color="secondary"
                        startIcon={
                            <FuseSvgIcon size={18}>
                                heroicons-solid:arrow-left
                            </FuseSvgIcon>
                        }
                    >
                        {t('back')}
                    </Button>
                </div>
            </div>
            <Paper className="mx-24 my-24 px-32 py-32">
                <div className="grid grid-cols-2 gap-16">
                    <Controller
                        control={control}
                        name="name"
                        defaultValue=""
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
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:cube
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="category"
                        defaultValue=""
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
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:cube
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="price"
                        defaultValue=""
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
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:currency-dollar
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="tax"
                        defaultValue=""
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
                                            <FuseSvgIcon size={24}>
                                                heroicons-outline:currency-dollar
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="upc"
                        defaultValue=""
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
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:key
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="quantity"
                        defaultValue=""
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
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:database
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </div>
                <div className="w-full flex my-8">
                    <Controller
                        control={control}
                        name="active"
                        defaultValue={true}
                        render={({ field }) => (
                            <FormControlLabel
                                label="Active"
                                className="ml-auto"
                                control={
                                    <Checkbox
                                        color="info"
                                        checked={field.value}
                                        onChange={(e) =>
                                            field.onChange(e.target.checked)
                                        }
                                    />
                                }
                            />
                        )}
                    />
                </div>
                <div className="flex flex-col items-center justify-center">
                    {image === null ? (
                        <Box
                            sx={{
                                backgroundColor: grey[300]
                            }}
                            component="label"
                            className="flex items-center justify-center relative w-128 h-128 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                        >
                            <FuseSvgIcon size={32} color="action">
                                heroicons-solid:upload
                            </FuseSvgIcon>
                        </Box>
                    ) : (
                        <img className="w-128 h-128 object-cover" src={image} />
                    )}

                    <Controller
                        name="image"
                        control={control}
                        defaultValue=""
                        render={() => (
                            <>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    component="label"
                                    className="mx-12 mt-32 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                                >
                                    {t('item.upload')}
                                    <input
                                        className="hidden"
                                        type="file"
                                        onChange={handleChange}
                                    />
                                </Button>
                            </>
                        )}
                    />
                </div>
                <Box className="flex items-center mt-32">
                    <Button className="ml-auto mr-8" onClick={handleCancel}>
                        {t('cancel')}
                    </Button>
                    <Button
                        className="ml-8"
                        variant="contained"
                        color="secondary"
                        // disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {t('save')}
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default withReducer('itemsApp', reducer)(ItemDetail);
