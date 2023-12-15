import Button from '@mui/material/Button';
import _ from '@lodash';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography } from '@mui/material';
import styles from '../../style.module.scss';
import { logoSrc } from 'src/app/model/PartnerModel';
import history from '@history';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
    name: yup.string().required('You must enter a name'),
    address: yup.string().required('You must enter a address'),
    email: yup.string().required('You must enter a email'),
    phoneNumber: yup.string().required('You must enter a phone Number')
});

const IntegrationTab = (props) => {
    const { channel } = props;
    const { t } = useTranslation();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    const handleCancel = () => history.push('/partners');
    const onSubmit = () => {};

    return (
        <>
            <div className={`mx-16 ${styles.form}`}>
                <div className="flex flex-row justify-between">
                    <div className="flex self-center items-center justify-center">
                        <img
                            className={styles.logo_size}
                            src={logoSrc[channel]}
                            alt="user background"
                        />
                        <Typography
                            className={`font-bold text-32 px-16 ${styles[channel]}`}
                        >
                            {channel}
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
                                        <FuseSvgIcon size={24}>
                                            heroicons-solid:location-marker
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
                                        <FuseSvgIcon size={24}>
                                            heroicons-solid:mail
                                        </FuseSvgIcon>
                                    </InputAdornment>
                                )
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
                                        <FuseSvgIcon size={24}>
                                            heroicons-solid:phone
                                        </FuseSvgIcon>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
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
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {t('integrate')}
                    </Button>
                </Box>
            </div>
        </>
    );
};

export default IntegrationTab;
