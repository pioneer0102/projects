import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
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
import { useTranslation } from 'react-i18next';
import PartnerBreadcrumb from './PartnerBreadCrumb';
import { logoSrc } from 'src/app/model/PartnerModel';
import { Channels } from 'src/app/model/Global';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    name: yup.string().required('You must enter a name'),
    address: yup.string().required('You must enter a address'),
    email: yup.string().required('You must enter a email'),
    phoneNumber: yup.string().required('You must enter a phone Number')
});

function PartnerForm() {
    const routeParams = useParams();

    const { control, watch, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    const form = watch();
    const channel = routeParams.channel;
    /**
     * Form Submit
     */
    function onSubmit(data) {
        // if (routeParams.either === 'new') {

        // } else {
        // }

        if (_.isEmpty(form) || !channel) {
            return <FuseLoading />;
        }
    }

    return (
        <>
            <PartnerBreadcrumb channel={channel} />
            <div className="flex flex-col m-32">
                <Paper className={`px-32 py-32 ${styles.paper}`}>
                    <div className='flex items-center justify-center pb-32'>
                        {channel === "DoorDash" &&
                            (<><img
                                className={styles.header_size}
                                src={logoSrc.DoorDash}
                                alt="user background" />
                                <Typography className="ml-8 font-bold text-20 text-red-500">
                                    {Channels[0]}
                                </Typography></>)
                        }
                        {channel === "Uber" &&
                            (<><img
                                className={styles.header_size}
                                src={logoSrc.Uber}
                                alt="user background" />
                                <Typography className="ml-8 font-bold text-20">
                                    {Channels[1]}
                                </Typography></>)
                        }
                        {channel === "GrubHub" &&
                            (<><img
                                className={styles.header_size}
                                src={logoSrc.GrubHub}
                                alt="user background" />
                                <Typography className="ml-8 font-bold text-20 text-orange-500">
                                    {Channels[2]}
                                </Typography></>)
                        }
                        {/* <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { navigate('/partners'); }}>
                            <Icon>arrow_back</Icon>
                            <span className='ml-8'>{t('back')}</span>
                        </Button> */}
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
                                            <FuseSvgIcon size={20}>heroicons-solid:user-circle</FuseSvgIcon>
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
                                            <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
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
                                            <FuseSvgIcon size={20}>heroicons-solid:mail</FuseSvgIcon>
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
                                            <FuseSvgIcon size={20}>heroicons-solid:phone</FuseSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Box
                        className="flex items-center mt-24"
                    >
                        <Button className="ml-auto">
                            Cancel
                        </Button>
                        <Button
                            className="ml-8"
                            variant="contained"
                            color="secondary"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Integrate
                        </Button>
                    </Box>
                </Paper>
            </div>
        </>
    );
}

export default PartnerForm;
