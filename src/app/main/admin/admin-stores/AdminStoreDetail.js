import reducer from './store';
import withReducer from 'app/store/withReducer';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import { Channels } from 'src/app/model/Global';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import UserList from './components/UserList';
import history from '@history';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStoreById,
    initializeStore,
    selectStore,
    addStore,
    updateStore,
    selectUserFilter
} from './store/adminStoresSlice';

const schema = yup.object().shape({
    name: yup.string().required('You must enter a Name'),
    address: yup.string().required('You must enter a Email')
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AdminStoreDetail = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const storeDetail = useSelector(selectStore);
    const userFilter = useSelector(selectUserFilter);
    const [breadCrumbs, setBreadCrumbs] = useState([]);
    const [integrations, setIntegrations] = useState([]);

    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { errors } = formState;

    const handleCancel = () => history.push('admin/stores');
    const onSubmit = (data) => {
        console.log(data);
        const submitData = {
            ...data,
            integrations: integrations
        };
        console.log(submitData);
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
                id: routeParams.storeId,
                ...userFilter
            };
            dispatch(getStoreById(data));
            crumbs.push({ name: 'Edit', url: null });
        }

        setBreadCrumbs(crumbs);
    }, [dispatch, userFilter, routeParams]);

    useEffect(() => {
        setIntegrations(storeDetail.integrations);

        reset({ ...storeDetail });
    }, [storeDetail, reset]);

    return (
        <>
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
            <Paper
                className={
                    'flex flex-col mx-24 my-24 px-16 md:px-40 pb-32 pt-24 rounded-md'
                }
            >
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
                                                heroicons-outline:user-circle
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
                                                heroicons-outline:location-marker
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
                            var array = [];
                            newValue.map((item) => {
                                array.push(item);
                            });
                            setIntegrations(array);
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
                </div>
                <Box className="flex items-center mt-32">
                    <Button
                        className={'ml-auto rounded-md'}
                        onClick={handleCancel}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        className={'ml-8 rounded-md'}
                        variant="contained"
                        color="info"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {t('save')}
                    </Button>
                </Box>
            </Paper>
            <UserList />
        </>
    );
};

export default withReducer('adminStores', reducer)(AdminStoreDetail);
