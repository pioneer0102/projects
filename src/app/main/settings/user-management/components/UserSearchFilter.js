import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import Input from '@mui/material/Input';
import styles from '../../style.module.scss';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import {
    selectFilter,
    setFilter
} from '../../store/userSlice';

const UserSearchFilter = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filter = useSelector(selectFilter);

    const handleChange = (type, value) => {
        dispatch(setFilter({type: type, value: value}));
        dispatch(setFilter({ type: 'page', value: 0 }));
    };
    const handleAdd = () => navigate('/settings/user-management/add/0');

    return (
        <>
            <Paper className={`px-16 py-8 border-b-1 mt-32 mx-24 rounded-md shadow-none ${styles.paper}`}>
                <div className="flex md:flex-row flex-col justify-between sm:space-y-0 mt-8 -mx-8">
                    <Box
                        className="flex flex-auto items-center px-16 mx-8 mb-8 border-1 rounded-md">
                        <FuseSvgIcon color="action" size={20}>
                            heroicons-outline:search
                        </FuseSvgIcon>
                        <Input
                            placeholder={t('search')}
                            className="flex px-16"
                            disableUnderline
                            fullWidth
                            value={filter.searchText}
                            onChange={(event) => handleChange("searchText", event.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={handleAdd}
                        className={`mx-8 my-8 rounded-md ${styles.backButton}`}
                    >
                        <FuseSvgIcon size={24}>
                            heroicons-solid:plus
                        </FuseSvgIcon>
                        <span className='mx-4'>{t('add')}</span>
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default UserSearchFilter;
