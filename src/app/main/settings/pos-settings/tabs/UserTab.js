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
import Grid from "@mui/system/Unstable_Grid/Grid";
import { posType } from 'src/app/model/PosModel';
import { setFormdata } from '../../store/posSlice';

const UserTab = (props) => {
    const { posById } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const routeParams = useParams();
    const handleChange = (type, value) => {
        dispatch(setFormdata({ type: type, value: value }));
    }

    return (
        <Paper className='rounded-md shadow-none'>
            <Grid container spacing={2}>
                <Grid lg={6} md={6} sm={6} xs={12}>
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
                </Grid>
                <Grid lg={6} md={6} sm={6} xs={12}>
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
                </Grid>
                <Grid lg={6} md={6} sm={6} xs={12}>
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
                </Grid>
                <Grid lg={6} md={6} sm={6} xs={12}>
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
                </Grid>
            </Grid>
        </Paper >
    );
}

export default UserTab;
