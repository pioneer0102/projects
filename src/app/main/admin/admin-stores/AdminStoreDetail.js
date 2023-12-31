import * as yup from 'yup';
import reducer from './store';
import history from '@history';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StoreTabs from './components/StoreTabs';
import withReducer from 'app/store/withReducer';
import { Channels } from 'src/app/model/Global';
import { selectUser } from 'app/store/userSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { showMessage } from 'app/store/fuse/messageSlice';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
    Checkbox,
    Autocomplete,
    InputAdornment,
    TextField,
    Paper,
    Box,
    Button
} from '@mui/material';
import {
    getStoreById,
    initializeStore,
    selectStore,
    addStore,
    updateStore
} from './store/adminStoresSlice';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const schema = yup.object().shape({
    name: yup.string().required('You must enter a Name'),
    address: yup.string().required('You must enter a Address'),
    email: yup.string().required('You must enter a Email')
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AdminStoreDetail = () => {
    const user = useSelector(selectUser);
    if (user.role === 'user') {
        history.push('/partners');
        return;
    }
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const storeDetail = useSelector(selectStore);

    const [breadCrumbs, setBreadCrumbs] = useState([]);
    const [integrations, setIntegrations] = useState([]);

    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { errors } = formState;

    const handleCancel = () => history.push('admin/stores');
    const onSubmit = (data) => {
        const submitData = {
            ...data,
            integrations: integrations
        };
        if (routeParams.storeId === 'add') {
            dispatch(addStore(submitData));
            dispatch(
                showMessage({
                    message: 'User added successfully!',
                    variant: 'success'
                })
            );
        } else {
            dispatch(updateStore(submitData));
            dispatch(
                showMessage({
                    message: 'User updated successsfully!',
                    variant: 'success'
                })
            );
        }
        history.push('/admin/stores');
    };

    useEffect(() => {
        let crumbs = [{ name: 'Stores', url: '/admin/stores' }];

        if (routeParams.storeId === 'add') {
            dispatch(initializeStore({}));
            crumbs.push({ name: 'Add', url: null });
        } else {
            const data = {
                id: routeParams.storeId
            };
            dispatch(getStoreById(data));
            crumbs.push({ name: 'Edit', url: null });
        }

        setBreadCrumbs(crumbs);
    }, [dispatch, routeParams]);

    useEffect(() => {
        setIntegrations([...storeDetail.integrations]);

        reset({ ...storeDetail });
    }, [storeDetail, reset]);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between pt-24 px-24 md:px-24">
                <Breadcrumb breadCrumbs={breadCrumbs} />

                <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                    <Button
                        component={Link}
                        to="/admin/stores"
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
            <Paper className="flex flex-col mx-24 my-24 px-16 md:px-40 pb-32 pt-24">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-40">
                    <Controller
                        control={control}
                        name="name"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Name"
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
                                                heroicons-solid:user-circle
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="address"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Address"
                                placeholder="Address"
                                id="address"
                                error={!!errors.address}
                                helperText={errors?.address?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:location-marker
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />

                    <Autocomplete
                        multiple
                        className="mt-32"
                        id="checkboxes-tags-demo"
                        value={integrations}
                        onChange={(event, newValue) => {
                            setIntegrations([...newValue]);
                        }}
                        options={Channels}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Integraions"
                                placeholder="Integraions"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Email"
                                placeholder="Email"
                                id="email"
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:mail
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </div>
                <Box className="flex items-center mt-32">
                    <Button className="ml-auto" onClick={handleCancel}>
                        {t('cancel')}
                    </Button>
                    <Button
                        className="ml-8"
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {t('save')}
                    </Button>
                </Box>
            </Paper>
            {routeParams.storeId !== 'add' && <StoreTabs />}
        </QueryClientProvider>
    );
};

export default withReducer('adminStores', reducer)(AdminStoreDetail);
