import withReducer from 'app/store/withReducer';
import reducer from '../../store';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography } from "@mui/material";
import styles from '../../style.module.scss';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { posType } from 'src/app/model/PosModel';
import {
    setFormdata
} from '../../store/posSlice';

const UserTab = (props) => {
    const { posById } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const handleChange = (type, value) => {
        dispatch(setFormdata({ type: type, value: value }));
    }

    return (
        <>
            <Paper
                className={`px-24 py-24 rounded-md shadow-none ${styles.paper}`}
            >
                <div className='flex items-center justify-between'>
                    <Typography className={`font-bold text-32`} color="text.secondary">
                        {routeParams.action} User
                    </Typography>
                </div>
                <div className='grid grid-cols-2 gap-x-48'>
                    <TextField
                        select
                        className="mt-32"
                        label="POS Type"
                        placeholder="POS Type"
                        id="type"
                        // error="You must type POS Type"
                        // helperText={errors?.posType?.message}
                        variant="outlined"
                        required
                        fullWidth
                        value={posById.type}
                        onChange={(event) => handleChange('type', event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FuseSvgIcon size={24}>heroicons-solid:user-circle</FuseSvgIcon>
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="">
                            {t('none')}
                        </MenuItem>
                        {
                            posType.map((type, index) => {
                                return (
                                    <MenuItem key={index} value={type}>
                                        {type}
                                    </MenuItem>
                                );
                            })
                        }
                    </TextField>
                    <TextField
                        className="mt-32"
                        label="User Name"
                        placeholder="User Name"
                        id="user_name"
                        // error="You must type User Name"
                        // helperText={errors?.user_name?.message}
                        variant="outlined"
                        required
                        fullWidth
                        value={posById.user_name}
                        onChange={(event) => handleChange('user_name', event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FuseSvgIcon size={24}>heroicons-solid:user-circle</FuseSvgIcon>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className="mt-32"
                        label="Password"
                        placeholder="Password"
                        id="password"
                        // error="You must type Password"
                        // helperText={errors?.password?.message}
                        variant="outlined"
                        fullWidth
                        value={posById.password}
                        onChange={(event) => handleChange('password', event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FuseSvgIcon size={24}>heroicons-solid:briefcase</FuseSvgIcon>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className="mt-32"
                        label="Url"
                        placeholder="Url"
                        id="url"
                        // error="You must type URL"
                        // helperText={errors?.tax?.message}
                        variant="outlined"
                        fullWidth
                        value={posById.url}
                        onChange={(event) => handleChange('url', event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FuseSvgIcon size={24}>heroicons-solid:currency-dollar</FuseSvgIcon>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div >
                {/* <Box
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
                        onClick={handleSubmit(onSubmit)}
                    >
                        {t('apply')}
                    </Button>
                </Box> */}
            </Paper >
        </>
    );
}

export default withReducer('settingsApp', reducer)(UserTab);
