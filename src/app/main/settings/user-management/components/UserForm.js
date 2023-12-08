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
import { Typography } from "@mui/material";
import styles from '../../style.module.scss';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
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
    url: yup.string().required('You must enter a Url'),
    role: yup.string().required('You must select a Role')
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
            dispatch(showMessage({ message: "Success to Add User !", variant: "success" }));
        }
        if (routeParams.action === 'edit') {
            dispatch(updateUser(data));
            dispatch(showMessage({ message: "Success to Update User !", variant: "success" }));
        }
        history.push('/settings/user-management');
    }

    return (
        <>
            <div className='flex items-center mx-24 mt-32 justify-between'>
                <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            className="inline text-18 text-center font-medium"
                            color="text.secondary"
                            role="button"
                            component={NavLinkAdapter}
                            to={`../settings/user-management`}>
                            {t('users.userManagement')}
                        </Typography>
                        <Typography className="inline text-18 text-center font-medium text-pink-500">
                            {routeParams.action.charAt(0).toUpperCase() + routeParams.action.slice(1)}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <Button
                    variant="contained"
                    color="info"
                    onClick={() => { history.push('/settings/user-management'); }}
                    className="rounded-md"
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
                        {routeParams.action.charAt(0).toUpperCase() + routeParams.action.slice(1)} Item
                    </Typography>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-16'>
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
                                            <FuseSvgIcon size={24}>heroicons-solid:user-circle</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="url"
                        defaultValue=''
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="url"
                                placeholder="URL"
                                id="url"
                                error={!!errors.url}
                                helperText={errors?.url?.message}
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
                                label="role"
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
