import reducer from '../../store';
import withReducer from 'app/store/withReducer';
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
import { IconButton } from '@mui/material';
import { Avatar } from '@mui/material';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import styles from '../../style.module.scss';
import history from '@history';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';
import { userRole } from 'src/app/model/UserModel';
import {
    getUserById,
    initializeUser,
    selectUser,
    addUser,
    updateUser
} from '../../store/userSlice';

const schema = yup.object().shape({
    name: yup.string().required('You must enter a Name'),
    email: yup.string().required('You must enter a Email'),
    role: yup.string().required('You must select a Role'),
    phone: yup.string().required('You must select a Phone'),
    address: yup.string().required('You must select a Address')
});

const UserForm = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const user = useSelector(selectUser);

    useEffect(() => {
        if (routeParams.action === 'edit') {
            dispatch(getUserById(routeParams.id));
        }
        if (routeParams.action === 'add') {
            dispatch(initializeUser({}));
        }
    }, [dispatch, routeParams]);

    useEffect(() => {
        reset({ ...user });
    }, [user, reset]);

    const { isValid, dirtyFields, errors } = formState;

    const handleCancel = () => history.push('/settings/user-management');
    const onSubmit = (data) => {
        console.log(data);
        if (routeParams.action === 'add') {
            dispatch(addUser(data));
            dispatch(showMessage({ message: "User added successfully!", variant: "success" }));
        }
        if (routeParams.action === 'edit') {
            dispatch(updateUser(data));
            dispatch(showMessage({ message: "User updated successsfully!", variant: "success" }));
        }
        history.push('/settings/user-management');
    }

    return (
        <>
            <Breadcrumb parentUrl = "settings/user-management" parent = "User Management" child = {routeParams.action.charAt(0).toUpperCase() + routeParams.action.slice(1)} />
            <Paper
                className={`mx-24 my-32 px-40 pb-32 ${styles.form}`}
            >
                <Controller
                    control={control}
                    name="avatar"
                    render={({ field: { onChange, value } }) => (
                        <Box
                            sx={{
                                borderWidth: 4,
                                borderStyle: 'solid',
                            }}
                            className="relative flex items-center justify-center w-128 h-128 rounded-full overflow-hidden mt-32"
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div>
                                    <label htmlFor="button-avatar" className="flex p-8 cursor-pointer">
                                        <input
                                            accept="image/*"
                                            className="hidden"
                                            id="button-avatar"
                                            type="file"
                                            onChange={async (e) => {
                                                function readFileAsync() {
                                                    return new Promise((resolve, reject) => {
                                                        const file = e.target.files[0];
                                                        if (!file) {
                                                            return;
                                                        }
                                                        const reader = new FileReader();

                                                        reader.onload = () => {
                                                            resolve(`data:${file.type};base64,${btoa(reader.result)}`);
                                                        };

                                                        reader.onerror = reject;

                                                        reader.readAsBinaryString(file);
                                                    });
                                                }

                                                const newImage = await readFileAsync();
                                                onChange(newImage);
                                            }}
                                        />
                                        <FuseSvgIcon className="text-white">heroicons-outline:camera</FuseSvgIcon>
                                    </label>
                                </div>
                                <div>
                                    <IconButton
                                        onClick={() => {
                                            onChange('');
                                        }}
                                    >
                                        <FuseSvgIcon className="text-white">heroicons-outline:trash</FuseSvgIcon>
                                    </IconButton>
                                </div>
                            </div>
                            <Avatar
                                sx={{
                                    backgroundColor: 'background.default',
                                    color: 'text.secondary',
                                }}
                                className="object-cover w-full h-full text-64 font-bold"
                                src={value}
                            />
                        </Box>
                    )}
                />
                <div className='grid md:grid-cols-2 grid-cols-1 gap-x-40'>
                    <Controller
                        control={control}
                        name="name"
                        defaultValue=''
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
                                            <FuseSvgIcon size={24}>heroicons-solid:user-circle</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        defaultValue=''
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
                                            <FuseSvgIcon size={24}>heroicons-solid:external-link</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
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
                                            <FuseSvgIcon size={24}>heroicons-solid:lock-open</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                <MenuItem value="">
                                    {t('none')}
                                </MenuItem>
                                {
                                    userRole.map((role, index) => {
                                        return (
                                            <MenuItem key={index} value={role}>
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </TextField>
                        )}
                    />
                    <Controller
                        control={control}
                        name="phone"
                        defaultValue=''
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
                                            <FuseSvgIcon size={24}>heroicons-solid:phone</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="address"
                        defaultValue=''
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
                                            <FuseSvgIcon size={24}>heroicons-solid:location-marker</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                </div>
                <Box
                    className="flex items-center mt-32"
                >
                    <Button
                        className={`ml-auto rounded-md`}
                        onClick={handleCancel}
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
                        {routeParams.action == "add" ? t('add') : t('save')}
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

export default withReducer('inventoryApp', reducer)(UserForm);
