import { useTranslation } from 'react-i18next';
import { posType } from 'src/app/model/PosModel';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    MenuItem
} from '@mui/material';
import {
    selectStore,
    modifyPos,
    updataPos
} from '../../store/adminStoresSlice';

const PosTab = () => {
    const store = useSelector(selectStore);
    const posDetail = store.pos;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleChange = (type, value) => {
        dispatch(modifyPos({ ...posDetail, [type]: value }));
    };
    const Save = () => {
        const data = {
            storeId: store.id,
            ...posDetail
        };
        dispatch(updataPos(data));
    };

    return (
        <div className="flex flex-col">
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
                    value={posDetail.url || ''}
                    onChange={(event) =>
                        handleChange('url', event.target.value)
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FuseSvgIcon size={24}>
                                    heroicons-outline:link
                                </FuseSvgIcon>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <Box className="flex self-end mt-32">
                <Button
                    className="ml-8"
                    variant="contained"
                    color="secondary"
                    onClick={Save}
                >
                    Save
                </Button>
            </Box>
        </div>
    );
};

export default PosTab;
