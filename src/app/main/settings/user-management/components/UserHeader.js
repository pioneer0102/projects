import { Paper } from '@mui/material';
import Input from '@mui/material/Input';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import { selectFilter, setFilter } from '../../store/userSlice';

const breadCrumbs = [{ name: 'User Management', url: null }];

const UserHeader = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filter = useSelector(selectFilter);

    const handleChange = (type, value) => {
        dispatch(setFilter({ ...filter, page: 0, [type]: value }));
    };
    const handleAdd = () => navigate('/settings/user-management/add/0');

    return (
        <>
            <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between pt-24 px-24 md:px-24">
                <Breadcrumb breadCrumbs={breadCrumbs} />
                <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                    <Paper className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0">
                        <FuseSvgIcon color="disabled">
                            heroicons-solid:search
                        </FuseSvgIcon>
                        <Input
                            placeholder={t('search')}
                            className="flex flex-1"
                            disableUnderline
                            fullWidth
                            value={filter.searchText}
                            onChange={(event) =>
                                handleChange('searchText', event.target.value)
                            }
                        />
                    </Paper>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAdd}
                    >
                        <FuseSvgIcon size={24}>
                            heroicons-solid:plus
                        </FuseSvgIcon>
                        <span className="mx-4">{t('add')}</span>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default UserHeader;
