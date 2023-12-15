import Input from '@mui/material/Input';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'app/shared-components/Breadcrumbs';
import { selectFilter, setFilter } from '../store/adminStoresSlice';

const breadCrumbs = [{ name: 'Stores', url: null }];

const SearchFilter = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const filter = useSelector(selectFilter);

    const handleSearch = (type, value) => {
        dispatch(setFilter({ type: type, value: value }));
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
                        placeholder="Search stores"
                        className="flex flex-1"
                        disableUnderline
                        fullWidth
                        value={filter.searchText}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                        onChange={(event) =>
                            handleSearch('searchText', event.target.value)
                        }
                    />
                </Paper>
                <Button
                    component={Link}
                    to="/admin/stores/add"
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

export default SearchFilter;
