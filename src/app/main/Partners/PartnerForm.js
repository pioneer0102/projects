import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
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
import PartnerBreadcrumb from './PartnerBreadCrumb';
import { logoSrc } from 'src/app/model/PartnerModel';
import history from '@history';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
    name: yup.string().required('You must enter a name'),
    address: yup.string().required('You must enter a address'),
    email: yup.string().required('You must enter a email'),
    phoneNumber: yup.string().required('You must enter a phone Number')
});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function PartnerForm() {
    const routeParams = useParams();
    const { t } = useTranslation();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;
    const channel = routeParams.channel;

    const handleCancel = () => history.push('/partners');
    const onSubmit = () => { }

    return (
        <>
            <PartnerBreadcrumb channel={channel} />
            <Paper
                className={`mx-24 my-32 px-32 py-32 ${styles.form}`}
            >
                <div className='flex flex-row justify-between'>
                    <div className='flex self-center items-center justify-center'>
                        <img
                            className={styles.logo_size}
                            src={logoSrc[channel]}
                            alt="user background" />
                        <Typography className={`font-bold text-32 px-16 ${styles[channel]}`}>
                            {channel}
                        </Typography>
                    </div>
                    <div className="flex self-center">
                        <StyledBadge
                        className='self-center'
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                        </StyledBadge>
                        <Typography className={`inline font-semibold text-16 px-16 text-green-500`}>
                            {t('partners.connected')}
                        </Typography>
                    </div>
                </div>
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Business Name"
                            placeholder="Business Name"
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
                    name="address"
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

                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-32"
                            label="Email"
                            placeholder="Email"
                            variant="outlined"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FuseSvgIcon size={24}>heroicons-solid:mail</FuseSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-32"
                            label="Phone Number"
                            placeholder="Phone Number"
                            variant="outlined"
                            fullWidth
                            error={!!errors.phoneNumber}
                            helperText={errors?.phoneNumber?.message}
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
                <Box
                    className="flex items-center mt-32"
                >
                    <Button
                        className={`ml-auto ${styles.button}`}
                        onClick={handleCancel}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        className={`ml-8 ${styles.button}`}
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {t('integrate')}
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

export default PartnerForm;
