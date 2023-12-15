import _ from '@lodash';
import * as yup from 'yup';
import history from '@history';
import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userRole } from 'src/app/model/UserModel';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from './store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
    Button,
    Avatar,
    MenuItem,
    TextField,
    IconButton,
    InputAdornment
} from '@mui/material';

import { getUserById, addUser, updateUser } from './store/userSlice';
import Breadcrumb from 'app/shared-components/Breadcrumbs';

const schema = yup.object().shape({
    name: yup.string().required('You must enter a Name'),
    email: yup.string().required('You must enter a Email'),
    role: yup.string().required('You must select a Role'),
    phone: yup.string().required('You must select a Phone'),
    address: yup.string().required('You must select a Address')
});

const UserDetail = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const user = useSelector(selectUser);

    const [showUpload, setShowUpload] = useState(false);
    const [breadCrumbs, setBreadCrumbs] = useState([]);

    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { isValid, dirtyFields, errors } = formState;

    const handleUpload = (state) => setShowUpload(state);
    const handleCancel = () => history.push('/admin/users/');

    const onSubmit = (data) => {
        const action = routeParams.userId === 'add' ? addUser : updateUser;
        const successMessage =
            routeParams.userId === 'add'
                ? 'User added successfully!'
                : 'User updated successfully!';

        dispatch(action(data));
        dispatch(showMessage({ message: successMessage, variant: 'success' }));
        history.push('/admin/users');
    };

    useEffect(() => {
        reset({ ...user });
    }, [user, reset]);

    useEffect(() => {
        let crumbs = [{ name: 'User Management', url: 'admin/users' }];

        if (routeParams.userId === 'add') {
            dispatch(setUser({ user, id: '', name: '', url: '', role: '' }));
            crumbs.push({ name: 'Add', url: null });
        } else {
            dispatch(getUserById(routeParams.userId));
            crumbs.push({ name: 'Edit', url: null });
        }

        setBreadCrumbs(crumbs);
    }, [dispatch, routeParams]);

    return (
        <div className="w-full min-h-full flex flex-col">
            <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between pt-24 px-24 md:px-24">
                <Breadcrumb breadCrumbs={breadCrumbs} />

                <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                    <Button
                        component={Link}
                        to="/admin/users"
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
            <Paper className="flex flex-col mx-24 my-24 py-24 px-24 overflow-auto">
                <Controller
                    control={control}
                    name="avatar"
                    render={({ field: { onChange, value } }) => (
                        <Box
                            sx={{
                                borderWidth: 4,
                                borderStyle: 'solid'
                            }}
                            className="relative self-center flex items-center justify-center w-128 h-128 rounded-full overflow-hidden mt-32"
                            onMouseOver={() => handleUpload(true)}
                            onMouseOut={() => handleUpload(false)}
                        >
                            {showUpload && (
                                <>
                                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div>
                                            <label
                                                htmlFor="button-avatar"
                                                className="flex p-8 cursor-pointer"
                                            >
                                                <input
                                                    accept="image/*"
                                                    className="hidden"
                                                    id="button-avatar"
                                                    type="file"
                                                    onChange={async (e) => {
                                                        function readFileAsync() {
                                                            return new Promise(
                                                                (
                                                                    resolve,
                                                                    reject
                                                                ) => {
                                                                    const file =
                                                                        e.target
                                                                            .files[0];
                                                                    if (!file) {
                                                                        return;
                                                                    }
                                                                    const reader =
                                                                        new FileReader();

                                                                    reader.onload =
                                                                        () => {
                                                                            resolve(
                                                                                `data:${
                                                                                    file.type
                                                                                };base64,${btoa(
                                                                                    reader.result
                                                                                )}`
                                                                            );
                                                                        };

                                                                    reader.onerror =
                                                                        reject;

                                                                    reader.readAsBinaryString(
                                                                        file
                                                                    );
                                                                }
                                                            );
                                                        }

                                                        const newImage =
                                                            await readFileAsync();
                                                        onChange(newImage);
                                                    }}
                                                />
                                                <FuseSvgIcon className="text-white">
                                                    heroicons-outline:camera
                                                </FuseSvgIcon>
                                            </label>
                                        </div>
                                        <div>
                                            <IconButton
                                                onClick={() => {
                                                    onChange('');
                                                }}
                                            >
                                                <FuseSvgIcon className="text-white">
                                                    heroicons-outline:trash
                                                </FuseSvgIcon>
                                            </IconButton>
                                        </div>
                                    </div>
                                </>
                            )}
                            <Avatar
                                sx={{
                                    backgroundColor: 'background.default',
                                    color: 'text.secondary'
                                }}
                                className="object-cover w-full h-full text-64 font-bold"
                                src={value}
                            />
                        </Box>
                    )}
                />
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
                                                heroicons-outline:mail
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="role"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                className="mt-32"
                                label="Role"
                                placeholder="Role"
                                id="role"
                                error={!!errors.role}
                                helperText={errors?.role?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:lock-open
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            >
                                <MenuItem value="">{t('none')}</MenuItem>
                                {userRole.map((role, index) => {
                                    return (
                                        <MenuItem key={index} value={role}>
                                            {role.charAt(0).toUpperCase() +
                                                role.slice(1)}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        )}
                    />
                    <Controller
                        control={control}
                        name="phone"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Phone"
                                placeholder="Phone"
                                id="phone"
                                error={!!errors.phone}
                                helperText={errors?.phone?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:phone
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
                </div>
                <Box className="flex items-center mt-32">
                    <Button className="ml-auto" onClick={handleCancel}>
                        {t('cancel')}
                    </Button>
                    <Button
                        className="ml-8"
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {routeParams.action === 'add' ? t('add') : t('save')}
                    </Button>
                </Box>
            </Paper>
        </div>
    );
};

export default UserDetail;
