import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import styles from '../../style.module.scss';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { posType } from 'src/app/model/PosModel';
import { setFormdata, selectPosDetail } from '../../store/posSlice';

const UserTab = () => {
    const posDetail = useSelector(selectPosDetail);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleChange = (type, value) => {
        dispatch(setFormdata({ type: type, value: value }));
    };

    return (
        <Paper className={`rounded-md shadow-none ${styles.paper}`}>
            <div className="grid grid-cols-2 gap-x-40">
                <TextField
                    select
                    className="mt-32"
                    label="POS Type"
                    placeholder="POS Type"
                    id="type"
                    variant="outlined"
                    required
                    fullWidth
                    value={posDetail.type || ''}
                    onChange={(event) =>
                        handleChange('type', event.target.value)
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FuseSvgIcon size={24}>
                                    heroicons-outline:globe-alt
                                </FuseSvgIcon>
                            </InputAdornment>
                        )
                    }}
                >
                    <MenuItem value="">{t('none')}</MenuItem>
                    {posType.map((type, index) => (
                        <MenuItem key={index} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    className="mt-32"
                    label="User Name"
                    placeholder="User Name"
                    id="userName"
                    variant="outlined"
                    required
                    fullWidth
                    value={posDetail.userName || ''}
                    onChange={(event) =>
                        handleChange('userName', event.target.value)
                    }
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
                <TextField
                    className="mt-32"
                    label="Password"
                    placeholder="Password"
                    id="password"
                    variant="outlined"
                    fullWidth
                    value={posDetail.password || ''}
                    onChange={(event) =>
                        handleChange('password', event.target.value)
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FuseSvgIcon size={24}>
                                    heroicons-outline:key
                                </FuseSvgIcon>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    className="mt-32"
                    label="Url"
                    placeholder="Url"
                    id="url"
                    variant="outlined"
                    fullWidth
                    value={posDetail.url}
                    onChange={(event) =>
                        handleChange('url', event.target.value)
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FuseSvgIcon size={24}>
                                    heroicons-outline:currency-dollar
                                </FuseSvgIcon>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
        </Paper>
    );
};

export default UserTab;
