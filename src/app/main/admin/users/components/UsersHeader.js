import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import { setFilter, selectFilter } from '../store/userSlice';

const breadCrumbs = [{ name: 'User Management', url: 'admin/users' }];

const UsersHeader = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const filter = useSelector(selectFilter);

    const handleSearchText = (event) => {
        dispatch(
            setFilter({ ...filter, page: 0, searchText: event.target.value })
        );
    };

    return (
        <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between pt-24 px-24 md:px-24">
            <Breadcrumb breadCrumbs={breadCrumbs} />

            <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                <Paper className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0">
                    <FuseSvgIcon color="disabled">
                        heroicons-solid:search
                    </FuseSvgIcon>

                    <Input
                        placeholder="Search users"
                        className="flex flex-1"
                        disableUnderline
                        fullWidth
                        value={filter.searchText}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                        onChange={handleSearchText}
                    />
                </Paper>
                <Button
                    component={Link}
                    to="/admin/users/add"
                    variant="contained"
                    color="secondary"
                    startIcon={
                        <FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>
                    }
                >
                    {t('add')}
                </Button>
            </div>
        </div>
    );
};

export default UsersHeader;
