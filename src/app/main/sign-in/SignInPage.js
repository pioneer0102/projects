import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import jwtService from '../../auth/services/jwtService';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('You must enter a valid email')
        .required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(4, 'Password is too short - must be at least 4 chars.')
});

const defaultValues = {
    email: '',
    password: '',
    remember: true
};

function SignInPage() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        setValue('email', 'admin@bagdash.com', {
            shouldDirty: true,
            shouldValidate: true
        });
        setValue('password', '123456789', {
            shouldDirty: true,
            shouldValidate: true
        });
    }, [setValue]);

    function onSubmit({ email, password }) {
        jwtService
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                setLoading(false);
                // No need to do anything, user data will be set at app/auth/AuthContext
            })
            .catch((_errors) => {
                setLoading(false);
                _errors.forEach((error) => {
                    setError(error.type, {
                        type: 'manual',
                        message: error.message
                    });
                });
            });
    }

    return (
        <div className="flex flex-col items-center sm:justify-center md:justify-center flex-1 min-w-0">
            <Paper className="flex flex-col md:items-center md:justify-center w-full sm:w-auto h-100 w-auto p-48 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
                <div className="flex flex-col items-center w-full max-w-320 sm:w-320 sm:mx-0">
                    <img
                        className="w-250"
                        src="assets/images/logo/Logo.png"
                        alt="logo"
                    />
                    <Typography
                        className="mt-24 font-bold tracking-tight leading-tight"
                        variant="h6"
                    >
                        Welcome to Bag N Dash!
                    </Typography>

                    <form
                        name="loginForm"
                        noValidate
                        className="flex flex-col justify-center w-full mt-32"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Email"
                                    autoFocus
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors?.email?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Password"
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors?.password?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field }) => (
                                    <FormControl>
                                        <FormControlLabel
                                            label="Remember me"
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    {...field}
                                                />
                                            }
                                        />
                                    </FormControl>
                                )}
                            />

                            <Link
                                className="text-md font-medium"
                                to="/pages/auth/forgot-password"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className=" w-full mt-16"
                                aria-label="Sign in"
                                disabled={
                                    _.isEmpty(dirtyFields) ||
                                    !isValid ||
                                    loading
                                }
                                type="submit"
                                size="large"
                            >
                                Login
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: 'inherit',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '0px',
                                        marginLeft: '-12px'
                                    }}
                                />
                            )}
                        </Box>
                    </form>
                    <div className="flex items-baseline mt-32 font-medium">
                        <Typography>{t('haveAccount')}</Typography>
                        <Link className="ml-4" to="/sign-up">
                            Create an account
                        </Link>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default SignInPage;
